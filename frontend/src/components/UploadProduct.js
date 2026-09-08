// C:\Users\User\Documents\AMRYLUXE MERN ECOMMERCE\frontend\src\components\UploadProduct.js

import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import SummaryApi from "../common";
import { toast } from "react-toastify";

// Listado de 15 Colores y Degradados Premium para AMRYLUXE
const COLOR_OPTIONS = [
  { name: "Negro Absoluto", value: "negro-absoluto" },
  { name: "Amarillo Pastel", value: "amarillo-pastel" },
  { name: "Tricolor Neon", value: "tricolor-neon" },
  { name: "Azul Aqua", value: "azul-aqua" },
  { name: "Marron", value: "marron" },
  { name: "Verde Lima", value: "verde-lima" },
  { name: "Celeste Pastel", value: "celeste-pastel" },
  { name: "Blanco Marfil", value: "blanco-marfil" },
  { name: "Nude Glam", value: "nude-glam" },
  { name: "Champagne Satin", value: "champagne-satin" },
  { name: "Rojo Pasión", value: "rojo-pasion" },
  { name: "Rosa Pastel", value: "rosa-pastel" },
  { name: "Azul Noche", value: "azul-noche" },
  { name: "Verde Esmeralda", value: "verde-esmeralda" },
  { name: "Verde Lima", value: "verde-lima" },
  { name: "Verde", value: "verde" },
  { name: "Fucsia Vibrante", value: "fucsia-vibrante" },
  { name: "Gris Perla", value: "gris-perla" },
  { name: "Lila Soft", value: "lila-soft" },
  { name: "Lila Rosa", value: "lila-rosa" },
  { name: "Celeste", value: "celeste" },
  { name: "Celeste Blanco", value: "celeste-blanco" },
  { name: "Degradado Sunset Elegance", value: "degradado-sunset" },
  { name: "Multicolor", value: "multicolor" },
  { name: "Verde Rosa", value: "verde-rosa" }
];

const AVAILABLE_SIZES = ["S", "M", "L", "XL"];

const UploadProduct = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
    // --- Nuevas propiedades inicializadas ---
    slug: "",
    stock: 0,
    color: "",
    sizes: [], // Array vacío para almacenar multiselección
    isActive: 1, // 1 = Activo por defecto
    isLiquidation: 0,
    isOffer: 0,
    metaTitle: "",
    metaDescription: "",
    metaKeywords: ""
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  // Manejador de cambios dinámico (Parsea números automáticamente si se requiere)
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    
    // Campos que el backend espera estrictamente como numéricos (0, 1 o cantidades)
    const numericFields = ["price", "sellingPrice", "stock", "isActive", "isLiquidation", "isOffer"];
    const finalValue = numericFields.includes(name) ? Number(value) : value;

    setData((preve) => ({
      ...preve,
      [name]: finalValue,
    }));
  };

  // Manejador específico para el sistema de Tallas (Multiselección Checkbox)
  const handleSizeChange = (size) => {
    setData((prev) => {
      const currentSizes = [...prev.sizes];
      if (currentSizes.includes(size)) {
        // Si ya existe la quita del array
        return { ...prev, sizes: currentSizes.filter((s) => s !== size) };
      } else {
        // Si no existe la agrega
        return { ...prev, sizes: [...currentSizes, size] };
      }
    });
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadImageCloudinary = await uploadImage(file);

    if (uploadImageCloudinary?.secure_url) {
      setData((prev) => ({
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.secure_url],
      }));
    }
  };

  const handleDeleteProductImage = async (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((preve) => ({
      ...preve,
      productImage: [...newProductImage],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación mínima opcional: exigir al menos 1 talla seleccionada
    if (data.sizes.length === 0) {
      toast.warning("Por favor, selecciona al menos una talla disponible.");
      return;
    }

    const response = await fetch(SummaryApi.uploadProduct.url, {
      method: SummaryApi.uploadProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchData();
    }

    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className="fixed w-full h-full bg-slate-900 bg-opacity-40 top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 backdrop-blur-xs">
      <div className="bg-white p-6 rounded-xl w-full max-w-3xl h-full max-h-[90%] overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Cabecera */}
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <h2 className="font-bold text-xl text-slate-800">Subir Nueva Prenda AMRYLUXE</h2>
          <button
            className="text-2xl hover:text-red-600 transition-colors cursor-pointer p-1 rounded-lg hover:bg-slate-50"
            onClick={onClose}
          >
            <CgClose />
          </button>
        </div>

        {/* Formulario con Scroll */}
        <form className="overflow-y-auto h-full pr-2 mt-4 flex flex-col gap-5 pb-8" onSubmit={handleSubmit}>
          
          {/* SECCIÓN 1: INFORMACIÓN BÁSICA */}
          <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-100">
            <h3 className="font-semibold text-sm text-slate-700 uppercase tracking-wider mb-3">Información General</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="productName" className="text-xs font-medium text-slate-600">Nombre de Producto :</label>
                <input
                  type="text"
                  id="productName"
                  placeholder="Ingrese el nombre de la prenda"
                  name="productName"
                  value={data.productName}
                  onChange={handleOnChange}
                  className="p-2 bg-white border border-slate-200 rounded text-sm focus:outline-slate-400"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="brandName" className="text-xs font-medium text-slate-600">Marca :</label>
                <input
                  type="text"
                  id="brandName"
                  placeholder="Ingresa la marca"
                  value={data.brandName}
                  onChange={handleOnChange}
                  name="brandName"
                  className="p-2 bg-white border border-slate-200 rounded text-sm focus:outline-slate-400"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="category" className="text-xs font-medium text-slate-600">Categoría :</label>
                <select
                  required
                  value={data.category}
                  name="category"
                  onChange={handleOnChange}
                  className="p-2 bg-white border border-slate-200 rounded text-sm focus:outline-slate-400"
                >
                  <option value={""}>Seleccionar Categoría</option>
                  {productCategory.map((el, index) => (
                    <option value={el.value} key={el.value + index}>{el.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="slug" className="text-xs font-medium text-slate-600">Slug (URL Amigable) :</label>
                <input
                  type="text"
                  id="slug"
                  placeholder="ej: vestido-seda-rojo"
                  value={data.slug}
                  onChange={handleOnChange}
                  name="slug"
                  className="p-2 bg-white border border-slate-200 rounded text-sm focus:outline-slate-400"
                  required
                />
              </div>
            </div>
          </div>

          {/* SECCIÓN 2: INVENTARIO, COSTOS Y VARIACIONES */}
          <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-100">
            <h3 className="font-semibold text-sm text-slate-700 uppercase tracking-wider mb-3">Variaciones e Inventario</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="price" className="text-xs font-medium text-slate-600">Precio Regular (S/.) :</label>
                <input
                  type="number"
                  id="price"
                  placeholder="Ingresar Precio"
                  value={data.price}
                  name="price"
                  onChange={handleOnChange}
                  className="p-2 bg-white border border-slate-200 rounded text-sm focus:outline-slate-400"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="sellingPrice" className="text-xs font-medium text-slate-600">Precio de Venta (S/.) :</label>
                <input
                  type="number"
                  id="sellingPrice"
                  placeholder="Ingresar Precio de Venta"
                  value={data.sellingPrice}
                  name="sellingPrice"
                  onChange={handleOnChange}
                  className="p-2 bg-white border border-slate-200 rounded text-sm focus:outline-slate-400"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="stock" className="text-xs font-medium text-slate-600">Stock Disponible :</label>
                <input
                  type="number"
                  id="stock"
                  min="0"
                  placeholder="0"
                  value={data.stock}
                  name="stock"
                  onChange={handleOnChange}
                  className="p-2 bg-white border border-slate-200 rounded text-sm focus:outline-slate-400"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-3 border-t border-slate-200/60">
              {/* Selector de Color Único */}
              <div className="flex flex-col gap-1">
                <label htmlFor="color" className="text-xs font-medium text-slate-600">Color o Degradado Principal :</label>
                <select
                  required
                  id="color"
                  value={data.color}
                  name="color"
                  onChange={handleOnChange}
                  className="p-2 bg-white border border-slate-200 rounded text-sm focus:outline-slate-400"
                >
                  <option value={""}>Seleccionar Color</option>
                  {COLOR_OPTIONS.map((c) => (
                    <option key={c.value} value={c.value}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Selector de Múltiples Tallas Checkbox */}
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-slate-600 mb-1">Tallas Disponibles (Multiselección) :</span>
                <div className="flex gap-3 h-full items-center">
                  {AVAILABLE_SIZES.map((size) => (
                    <label key={size} className="flex items-center gap-1.5 cursor-pointer bg-white px-3 py-1.5 border border-slate-200 rounded text-sm hover:bg-slate-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={data.sizes.includes(size)}
                        onChange={() => handleSizeChange(size)}
                        className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
                      />
                      <span className="font-semibold text-slate-700">{size}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SECCIÓN 3: CONTROL DE VISIBILIDAD Y BANDERAS */}
          <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-100">
            <h3 className="font-semibold text-sm text-slate-700 uppercase tracking-wider mb-3">Visibilidad y Promociones</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="isActive" className="text-xs font-medium text-slate-600">Estado de Publicación :</label>
                <select
                  id="isActive"
                  value={data.isActive}
                  name="isActive"
                  onChange={handleOnChange}
                  className="p-2 bg-white border border-slate-200 rounded text-sm focus:outline-slate-400"
                >
                  <option value={1}>Activado (Visible)</option>
                  <option value={0}>Desactivado (Oculto)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="isOffer" className="text-xs font-medium text-slate-600">¿Se encuentra en Oferta? :</label>
                <select
                  id="isOffer"
                  value={data.isOffer}
                  name="isOffer"
                  onChange={handleOnChange}
                  className="p-2 bg-white border border-slate-200 rounded text-sm focus:outline-slate-400"
                >
                  <option value={0}>No</option>
                  <option value={1}>Sí (Aplicar Etiqueta)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="isLiquidation" className="text-xs font-medium text-slate-600">¿Es Liquidación de Temporada? :</label>
                <select
                  id="isLiquidation"
                  value={data.isLiquidation}
                  name="isLiquidation"
                  onChange={handleOnChange}
                  className="p-2 bg-white border border-slate-200 rounded text-sm focus:outline-slate-400"
                >
                  <option value={0}>No</option>
                  <option value={1}>Sí (Últimas Unidades)</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECCIÓN 4: IMÁGENES Y DESCRIPCIÓN */}
          <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-100">
            <h3 className="font-semibold text-sm text-slate-700 uppercase tracking-wider mb-3">Multimedia y Detalle</h3>
            <div className="flex flex-col gap-1">
              <label htmlFor="productImage" className="text-xs font-medium text-slate-600">Imágenes de la Prenda :</label>
              <label htmlFor="uploadImageInput">
                <div className="p-4 bg-white border border-dashed border-slate-300 rounded-lg h-28 w-full flex justify-center items-center cursor-pointer hover:bg-slate-50 transition-colors">
                  <div className="text-slate-500 flex justify-center items-center flex-col gap-1">
                    <span className="text-3xl"><FaCloudUploadAlt /></span>
                    <p className="text-xs font-medium">Click aquí para cargar archivos fotográficos</p>
                    <input
                      type="file"
                      id="uploadImageInput"
                      className="hidden"
                      onChange={handleUploadProduct}
                    />
                  </div>
                </div>
              </label>

              <div className="mt-2">
                {data?.productImage[0] ? (
                  <div className="flex items-center gap-2 flex-wrap">
                    {data.productImage.map((el, index) => (
                      <div className="relative group border rounded-lg overflow-hidden bg-white shadow-xs" key={el + index}>
                        <img
                          src={el}
                          alt={el}
                          className="w-16 h-20 object-cover cursor-pointer"
                          onClick={() => {
                            setOpenFullScreenImage(true);
                            setFullScreenImage(el);
                          }}
                        />
                        <div
                          className="absolute bottom-1 right-1 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer shadow-md text-xs hover:bg-red-700"
                          onClick={() => handleDeleteProductImage(index)}
                        >
                          <br /><MdDelete />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-red-500 text-xs font-medium mt-1">* Se requiere al menos una imagen para la tienda.</p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1 mt-3">
              <label htmlFor="description" className="text-xs font-medium text-slate-600">Descripción Detallada :</label>
              <textarea
                className="h-24 bg-white border border-slate-200 rounded resize-none p-2 text-sm focus:outline-slate-400"
                placeholder="Ingrese detalles de la tela, corte, material y especificaciones de lavado..."
                rows={3}
                name="description"
                value={data.description}
                onChange={handleOnChange}
              />
            </div>
          </div>

          {/* SECCIÓN 5: METADATOS SEO */}
          <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-100">
            <h3 className="font-semibold text-sm text-slate-700 uppercase tracking-wider mb-3">Configuración SEO (Motores de Búsqueda)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
              <div className="flex flex-col gap-1">
                <label htmlFor="metaTitle" className="text-xs font-medium text-slate-600">Meta Título (Recomendado &lt; 60 car.) :</label>
                <input
                  type="text"
                  id="metaTitle"
                  placeholder="Título optimizado para buscadores"
                  value={data.metaTitle}
                  onChange={handleOnChange}
                  name="metaTitle"
                  className="p-2 bg-white border border-slate-200 rounded text-sm focus:outline-slate-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="metaKeywords" className="text-xs font-medium text-slate-600">Meta Keywords (Separadas por comas) :</label>
                <input
                  type="text"
                  id="metaKeywords"
                  placeholder="ej: vestido elegante, ropa de noche, moda lima"
                  value={data.metaKeywords}
                  onChange={handleOnChange}
                  name="metaKeywords"
                  className="p-2 bg-white border border-slate-200 rounded text-sm focus:outline-slate-400"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1 mt-2">
              <label htmlFor="metaDescription" className="text-xs font-medium text-slate-600">Meta Descripción (Recomendado &lt; 160 car.) :</label>
              <textarea
                className="h-16 bg-white border border-slate-200 rounded resize-none p-2 text-sm focus:outline-slate-400"
                placeholder="Breve resumen del producto que aparecerá en los resultados de Google..."
                rows={2}
                name="metaDescription"
                value={data.metaDescription}
                onChange={handleOnChange}
              />
            </div>
          </div>

          {/* Botón de Envío */}
          <button className="w-full mt-2 px-4 py-2.5 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors shadow-md text-sm uppercase tracking-wider mb-4">
            Grabar prenda en catálogo
          </button>
        </form>
      </div>

      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default UploadProduct;
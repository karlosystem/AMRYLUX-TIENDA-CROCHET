import React, { useState } from "react";
import { MdModeEditOutline, MdDeleteOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displaySolesCurrency from "../helpers/displayCurrency";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);

  const handleDeleteProduct = async () => {
    // Confirmación antes de eliminar
    const confirmDelete = window.confirm(
      `¿Estás segura de eliminar "${data?.productName}"? Esta acción no se puede deshacer.`
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(SummaryApi.deleteProduct.url, {
        method: SummaryApi.deleteProduct.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: data?._id,
        }),
      });

      const dataResponse = await response.json();

      if (dataResponse.success) {
        toast.success(dataResponse.message || "Prenda eliminada correctamente");
        fetchdata(); // Recargar la lista de productos
      } else {
        toast.error(dataResponse.message || "Error al eliminar la prenda");
      }
    } catch (error) {
      console.log("Error al eliminar:", error);
      toast.error("Error de conexión al eliminar el producto");
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group relative">
      
      {/* 1. Contenedor de Imagen Profesional */}
      <div className="w-full h-72 bg-slate-50 overflow-hidden relative flex items-center justify-center">
        <img
          src={data?.productImage[0]}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          alt={data?.productName}
        />
        
        {/* Etiqueta flotante de Categoría */}
        {data?.category && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded shadow-xs text-slate-700">
            {data.category}
          </span>
        )}

        {/* Botones Flotantes de Acción (Aparecen al pasar el mouse) */}
        <div className="absolute bottom-3 right-3 flex gap-2 md:opacity-0 md:group-hover:opacity-100 transition-all duration-200 transform translate-y-0 md:translate-y-2 md:group-hover:translate-y-0">
          
          {/* Botón de Editar */}
          <button 
            onClick={() => setEditProduct(true)}
            className="p-2.5 bg-white text-slate-700 hover:bg-slate-900 hover:text-white rounded-full shadow-md transition-all duration-200"
            title="Editar prenda"
          >
            <MdModeEditOutline className="text-lg" />
          </button>

          {/* Botón de Eliminar */}
          <button 
            onClick={handleDeleteProduct}
            className="p-2.5 bg-white text-red-600 hover:bg-red-600 hover:text-white rounded-full shadow-md transition-all duration-200"
            title="Eliminar prenda"
          >
            <MdDeleteOutline className="text-lg" />
          </button>
        </div>
      </div>

      {/* 2. Información de la Prenda */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          {/* Título limpio con límite de dos líneas */}
          <h2 className="font-medium text-slate-800 text-sm md:text-base line-clamp-2 min-h-[2.5rem] leading-snug">
            {data?.productName}
          </h2>
          
          {/* Fila de Precios */}
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-lg font-bold text-slate-900">
              {displaySolesCurrency(data?.sellingPrice)}
            </span>
            {data?.price && data?.price > data?.sellingPrice && (
              <span className="text-xs text-slate-400 line-through">
                {displaySolesCurrency(data?.price)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 3. Modal de Edición */}
      {editProduct && (
        <AdminEditProduct 
          data={data} 
          onClose={() => setEditProduct(false)} 
          fetchdata={fetchdata} 
        />
      )}

    </div>
  );
};

export default AdminProductCard;
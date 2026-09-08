import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import UploadProduct from "../components/UploadProduct";
import AdminProductCard from "../components/AdminProductCard";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  
  // --- ESTADOS PARA FILTRO Y PAGINACIÓN ---
  const [selectedCategory, setSelectedCategory] = useState("all"); // "all", "top", "sweater"
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url, {
      method: SummaryApi.allProduct.method,
      credentials: "include",
    });
    const dataResponse = await response.json();
    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  // --- FILTRAR PRODUCTOS POR CATEGORÍA ---
  const filteredProducts = selectedCategory === "all" 
    ? allProduct 
    : allProduct.filter(product => product.category?.toLowerCase() === selectedCategory.toLowerCase());

  // --- LÓGICA DE PAGINACIÓN (aplicada sobre los productos filtrados) ---
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Resetear a página 1 cuando cambia el filtro
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-white">
      {/* Encabezado con Filtro y Botón */}
      <div className="bg-white py-4 px-6 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-gray-100 mb-8">
        <h2 className="font-serif text-2xl text-gray-900">
          Catálogo de Prendas <span className="text-sm font-sans text-gray-400 normal-case">({filteredProducts.length} totales)</span>
        </h2>
        
        <div className="flex items-center gap-4">
          {/* SELECT DE FILTRO POR CATEGORÍA */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2.5 px-4 pr-8 rounded-sm text-xs font-medium uppercase tracking-wider focus:outline-none focus:border-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <option value="all">Todas las Categorías</option>
              <option value="top">Top</option>
              <option value="sweater">Sweater</option>
              {/* Agrega más categorías aquí cuando las tengas */}
              {/* <option value="vestido">Vestido</option> */}
              {/* <option value="blusa">Blusa</option> */}
            </select>
            {/* Icono de flecha personalizado */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>

          <button
            className="bg-gray-900 text-white text-[11px] font-medium uppercase tracking-widest px-6 py-2.5 hover:bg-gray-800 transition-colors rounded-sm"
            onClick={() => setOpenUploadProduct(true)}
          >
            Subir Nueva Prenda
          </button>
        </div>
      </div>

      {/* Grid de Productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <AdminProductCard
              data={product}
              key={product._id}
              fetchdata={fetchAllProduct}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <div className="text-gray-300 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-gray-500 font-serif text-lg">
              {selectedCategory === "all" 
                ? "No hay prendas registradas aún en el catálogo." 
                : `No se encontraron productos en la categoría "${selectedCategory}".`}
            </p>
            {selectedCategory !== "all" && (
              <button 
                onClick={() => setSelectedCategory("all")}
                className="mt-4 text-gray-900 underline text-sm hover:text-gray-700"
              >
                Ver todas las categorías
              </button>
            )}
          </div>
        )}
      </div>

      {/* Controles de Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 mt-12 mb-8">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`flex items-center gap-2 px-5 py-2.5 border text-[11px] font-medium uppercase tracking-widest transition-all rounded-sm ${
              currentPage === 1 
                ? "border-gray-200 text-gray-300 cursor-not-allowed" 
                : "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
            }`}
          >
            <FaAngleLeft /> Anterior
          </button>
          
          <span className="text-sm text-gray-500 font-medium font-sans">
            Página {currentPage} de {totalPages}
          </span>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-2 px-5 py-2.5 border text-[11px] font-medium uppercase tracking-widest transition-all rounded-sm ${
              currentPage === totalPages 
                ? "border-gray-200 text-gray-300 cursor-not-allowed" 
                : "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
            }`}
          >
            Siguiente <FaAngleRight />
          </button>
        </div>
      )}

      {/* Modal de Subida de Producto */}
      {openUploadProduct && (
        <UploadProduct 
          onClose={() => setOpenUploadProduct(false)} 
          fetchData={fetchAllProduct} 
        />
      )}
    </div>
  );
};

export default AllProducts;
import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategoryProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(SummaryApi.categoryProduct.url);
      const dataResponse = await response.json();
      
      if (dataResponse.success && dataResponse.data) {
        setCategoryProduct(dataResponse.data);
      } else {
        console.warn("No se encontraron categorías en la base de datos.");
        setCategoryProduct([]);
      }
    } catch (error) {
      console.error("Error al obtener categorías del backend:", error);
      setCategoryProduct([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  // Si la base de datos tiene categorías, usamos las primeras 3.
  // Si está vacía, usamos categorías por defecto
  const displayCategories = categoryProduct.length > 0 
    ? categoryProduct.slice(0, 3) 
    : [
        { category: "sweater", productImage: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80"] },
        { category: "top", productImage: ["https://images.unsplash.com/photo-1503342394128-c104d54efd0a?auto=format&fit=crop&w=800&q=80"] },
        { category: "vestido", productImage: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80"] }
      ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {loading ? (
        // Skeleton de carga
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[280px] bg-neutral-100 animate-pulse rounded-sm"></div>
          ))}
        </div>
      ) : (
        // Grid de 3 categorías
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {displayCategories.map((product, index) => (
            <Link
              to={`/product-category?category=${product?.category}`}
              key={product?.category || index}
              className="group relative bg-white border border-neutral-200 hover:border-neutral-400 hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              <div className="flex h-[280px] md:h-[320px]">
                {/* Columna Izquierda: Información (40%) */}
                <div className="w-2/5 p-5 md:p-6 flex flex-col justify-between bg-white">
                  <div>
                    {/* Nombre de la Categoría */}
                    <h3 className="font-serif text-xl md:text-2xl text-neutral-900 mb-1 capitalize tracking-wide">
                      {product?.category || "Categoría"}
                    </h3>
                    
                    {/* Subtítulo */}
                    <p className="text-[9px] tracking-[0.25em] text-neutral-500 uppercase">
                      Colección 2026
                    </p>
                  </div>

                  {/* Botón VER MÁS PRENDAS */}
                  <div className="flex items-center gap-2 group-hover:gap-3 transition-all">
                    <span className="text-[10px] uppercase tracking-[0.15em] font-medium text-neutral-900">
                      Ver Prendas
                    </span>
                    <div className="w-7 h-7 flex items-center justify-center border border-neutral-300 rounded-full group-hover:border-neutral-900 group-hover:bg-neutral-900 group-hover:text-white transition-all duration-300">
                      <FaArrowRight className="text-[8px] transform group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Columna Derecha: Imagen (60%) */}
                <div className="w-3/5 relative overflow-hidden bg-neutral-50">
                  <img
                    src={product?.productImage?.[0] || "https://via.placeholder.com/400x500?text=AMRYLUXE"}
                    alt={product?.category}
                    className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                  
                  {/* Sticker "Tenemos tu talla" */}
                  <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-white/95 backdrop-blur-sm px-2 py-1 md:px-3 md:py-1.5 shadow-md">
                    <span className="text-[8px] md:text-[9px] font-semibold text-neutral-900 uppercase tracking-wider leading-tight block text-center">
                      Tenemos<br />tu talla
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
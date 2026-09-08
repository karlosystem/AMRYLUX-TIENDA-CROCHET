import React, { useContext, useEffect, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredImageIndex, setHoveredImageIndex] = useState({});
  const loadingList = new Array(8).fill(null);

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    e.preventDefault();
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    // Limitar a solo 8 productos (2 filas de 4)
    setData(categoryProduct?.data?.slice(0, 8) || []);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  const handleMouseEnter = (productId) => {
    setHoveredImageIndex((prev) => ({ ...prev, [productId]: true }));
  };

  const handleMouseLeave = (productId) => {
    setHoveredImageIndex((prev) => ({ ...prev, [productId]: false }));
  };

  return (
    <div className="container mx-auto px-4 my-12">
      {/* Título de Sección */}
      <h2 className="font-serif text-3xl text-neutral-900 tracking-wide mb-8">
        {heading}
      </h2>

      {/* Grid de 4 columnas - Sin scroll horizontal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? // Skeleton de carga
            loadingList.map((_, index) => (
              <div
                key={"loading-card-" + index}
                className="bg-white border border-neutral-100"
              >
                <div className="flex h-[400px]">
                  <div className="w-1/2 bg-neutral-100 animate-pulse"></div>
                  <div className="w-1/2 p-5 flex flex-col gap-3">
                    <div className="h-4 bg-neutral-100 animate-pulse rounded"></div>
                    <div className="h-3 w-16 bg-neutral-100 animate-pulse rounded"></div>
                    <div className="h-4 w-20 bg-neutral-100 animate-pulse rounded mt-2"></div>
                    <div className="h-3 w-12 bg-neutral-100 animate-pulse rounded"></div>
                    <div className="h-3 w-12 bg-neutral-100 animate-pulse rounded"></div>
                    <div className="flex gap-2 mt-auto">
                      <div className="h-9 flex-1 bg-neutral-100 animate-pulse rounded"></div>
                      <div className="h-9 flex-1 bg-neutral-100 animate-pulse rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : data.map((product) => {
              const isHovered = hoveredImageIndex[product._id];
              const hasSecondImage =
                product.productImage && product.productImage.length > 1;
              const currentImage =
                isHovered && hasSecondImage
                  ? product.productImage[1]
                  : product.productImage[0];

              return (
                <Link
                  to={`/product/${product?.slug || product?._id}`}
                  key={product?._id}
                  className="bg-white border border-neutral-100 hover:border-neutral-300 hover:shadow-lg transition-all duration-300 group"
                  onMouseEnter={() => handleMouseEnter(product._id)}
                  onMouseLeave={() => handleMouseLeave(product._id)}
                >
                  <div className="flex h-[400px]">
                    {/* Columna 1: Imagen con efecto hover */}
                    <div className="w-1/2 bg-neutral-50 overflow-hidden relative">
                      <img
                        src={currentImage}
                        alt={product?.productName}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Badge si hay segunda imagen */}
                      {hasSecondImage && (
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-sm">
                          <span className="text-[9px] uppercase tracking-wider text-neutral-700 font-medium">
                            {isHovered ? "Vista Trasera" : "Vista Frontal"}
                          </span>
                        </div>
                      )}

                      {/* Wishlist Icon */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:shadow-md"
                      >
                        <FaHeart className="text-xs text-neutral-600 hover:text-red-500 transition-colors" />
                      </button>
                    </div>

                    {/* Columna 2: Información */}
                    <div className="w-1/2 p-5 flex flex-col justify-between">
                      <div>
                        {/* Nombre del producto */}
                        <h3 className="font-serif text-sm text-neutral-900 leading-tight mb-1 line-clamp-2">
                          {product?.productName}
                        </h3>

                        {/* Categoría */}
                        <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-3">
                          {product?.category}
                        </p>

                        {/* Precios */}
                        <div className="flex items-baseline gap-2 mb-4">
                          <p className="text-neutral-900 font-semibold text-sm">
                            {displayINRCurrency(product?.sellingPrice)}
                          </p>
                          {product?.price !== product?.sellingPrice && (
                            <p className="text-neutral-400 line-through text-xs">
                              {displayINRCurrency(product?.price)}
                            </p>
                          )}
                        </div>

                        {/* Color y Talla */}
                        <div className="space-y-2 mb-4">
                          {product?.color && (
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-neutral-500 uppercase tracking-wider">
                                Color:
                              </span>
                              <span className="text-xs text-neutral-700">
                                {product.color}
                              </span>
                            </div>
                          )}
                          {product?.sizes && product.sizes.length > 0 && (
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-neutral-500 uppercase tracking-wider">
                                Talla:
                              </span>
                              <div className="flex gap-1">
                                {product.sizes.map((size) => (
                                  <span
                                    key={size}
                                    className="text-[10px] px-2 py-0.5 border border-neutral-300 text-neutral-700"
                                  >
                                    {size}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Botones de Acción con Iconos */}
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddToCart(e, product?._id);
                          }}
                          className="flex-1 text-[10px] uppercase tracking-wider font-medium border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all py-2.5 rounded-sm flex items-center justify-center gap-1.5"
                          title="Agregar al Carrito"
                        >
                          <FaShoppingCart className="text-xs" />
                          Añadir
                        </button>

                        {/* Botón Ver - SIN onClick para que el Link funcione */}
                        <div
                          className="flex-1 text-[10px] uppercase tracking-wider font-medium bg-neutral-900 text-white hover:bg-neutral-800 transition-all py-2.5 rounded-sm flex items-center justify-center gap-1.5 cursor-pointer"
                          title="Ver Detalles del Producto"
                        >
                          <FaEye className="text-xs" />
                          Ver
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
      </div>

      {/* Botón VER MÁS PRENDAS */}
      <div className="flex justify-center mt-10">
        <Link
          to={`/product-category?category=${category}`}
          className="text-[11px] uppercase tracking-[0.2em] font-medium border-b-2 border-neutral-900 text-neutral-900 hover:border-neutral-600 transition-all pb-1 inline-flex items-center gap-2"
        >
          Ver Más Prendas
          <FaEye className="text-xs" />
        </Link>
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
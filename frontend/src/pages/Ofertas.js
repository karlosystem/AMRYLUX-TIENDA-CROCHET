import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SummaryApi from "../common";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaShoppingBag, FaHeart, FaTag } from "react-icons/fa";
import addToCart from "../helpers/addToCart";
import { useContext } from "react";
import Context from "../context";
import { Helmet } from "react-helmet-async";

const Ofertas = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.ofertaProduct.url, {
        method: SummaryApi.ofertaProduct.method,
      });
      const dataResponse = await response.json();

      if (dataResponse.success) {
        setData(dataResponse.data);
      }
    } catch (error) {
      console.error("Error fetching ofertas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>
          Ofertas en Ropa Crochet | AMRY LUXE Lima - Descuentos Exclusivos
        </title>
        <meta
          name="description"
          content="¡Aprovecha nuestras ofertas exclusivas en prendas de crochet hechas a mano en Lima! Sweaters, tops y vestidos con descuentos especiales. Envíos a todo el Perú. ¡Compra ahora y luce única con estilo artesanal!"
        />
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-neutral-50 border-b border-neutral-200 py-4">
        <div className="container mx-auto px-4">
          <nav className="text-xs text-neutral-500">
            <Link to="/" className="hover:text-neutral-900 transition-colors">
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <span className="text-neutral-900">Ofertas Especiales</span>
          </nav>
        </div>
      </div>

      {/* Header de Página */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-neutral-100 px-4 py-2 mb-4">
            <FaTag className="text-neutral-600" />
            <span className="text-xs uppercase tracking-widest text-neutral-600">
              Promoción Limitada
            </span>
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl text-neutral-900 mb-4">
            OFERTAS ESPECIALES
          </h1>
          <div className="w-24 h-px bg-neutral-300 mx-auto mb-4"></div>
          <p className="text-neutral-600 max-w-2xl mx-auto text-sm">
            Descubre nuestras prendas crochet con descuentos exclusivos.
            ¡Aprovecha antes de que se agoten!
          </p>
        </div>

        {/* Grid de Productos */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {new Array(8).fill(null).map((_, index) => (
              <div key={index} className="bg-white border border-neutral-200">
                <div className="aspect-[3/4] bg-neutral-100 animate-pulse"></div>
                <div className="p-4 space-y-3">
                  <div className="h-3 w-16 bg-neutral-100 animate-pulse rounded"></div>
                  <div className="h-4 w-full bg-neutral-100 animate-pulse rounded"></div>
                  <div className="h-4 w-24 bg-neutral-100 animate-pulse rounded"></div>
                  <div className="h-9 bg-neutral-100 animate-pulse rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-neutral-400 mb-4">
              <FaTag className="text-6xl mx-auto" />
            </div>
            <h2 className="font-serif text-2xl text-neutral-900 mb-2">
              No hay ofertas disponibles
            </h2>
            <p className="text-neutral-500 mb-6">
              Pronto tendremos nuevas promociones
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-neutral-900 text-white px-8 py-3 text-xs uppercase tracking-widest hover:bg-neutral-800 transition-all duration-300"
            >
              <FaShoppingBag className="text-sm" />
              Ver Tienda
            </Link>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.map((product) => {
                const discount = Math.round(
                  ((product.price - product.sellingPrice) / product.price) *
                    100,
                );

                return (
                  <div
                    key={product._id}
                    className="group bg-white border border-neutral-200 hover:border-neutral-400 hover:shadow-xl transition-all duration-300"
                  >
                    <Link
                      to={`/product/${product?.slug || product?._id}`}
                      className="block relative"
                    >
                      {/* Badge de Oferta */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="bg-neutral-900 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5">
                          -{discount}%
                        </span>
                      </div>

                      {/* Badge de Oferta Especial */}
                      <div className="absolute top-3 right-3 z-10">
                        <span className="bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5">
                          OFERTA
                        </span>
                      </div>

                      {/* Imagen */}
                      <div className="aspect-[3/4] bg-neutral-50 overflow-hidden relative">
                        <img
                          src={
                            product.productImage[0] ||
                            "https://via.placeholder.com/300x400?text=AMRYLUXE"
                          }
                          alt={product.productName}
                          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                        />

                        {/* Botón Wishlist */}
                        <button className="absolute top-16 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm border border-neutral-200 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-neutral-900 hover:text-white">
                          <FaHeart className="text-xs" />
                        </button>
                      </div>

                      {/* Información del Producto */}
                      <div className="p-4">
                        {/* Categoría */}
                        <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">
                          {product.category}
                        </p>

                        {/* Nombre */}
                        <h3 className="font-serif text-sm text-neutral-900 mb-2 line-clamp-2 min-h-[2.5rem]">
                          {product.productName}
                        </h3>

                        {/* Precios */}
                        <div className="flex items-baseline gap-2 mb-3">
                          <p className="text-neutral-900 font-bold text-lg">
                            {displayINRCurrency(product.sellingPrice)}
                          </p>
                          <p className="text-neutral-400 line-through text-xs">
                            {displayINRCurrency(product.price)}
                          </p>
                        </div>

                        {/* Ahorro */}
                        <p className="text-[10px] text-green-600 mb-3">
                          Ahorras:{" "}
                          {displayINRCurrency(
                            product.price - product.sellingPrice,
                          )}
                        </p>

                        {/* Botón Añadir */}
                        <button
                          onClick={(e) => handleAddToCart(e, product._id)}
                          className="w-full text-[10px] uppercase tracking-wider font-medium border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all py-2.5 flex items-center justify-center gap-1"
                        >
                          <FaShoppingBag className="text-xs" />
                          Añadir al Carrito
                        </button>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Contador de Productos */}
            <div className="mt-10 text-center">
              <p className="text-sm text-neutral-500">
                Mostrando{" "}
                <span className="font-semibold text-neutral-900">
                  {data.length}
                </span>{" "}
                productos en oferta
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ofertas;
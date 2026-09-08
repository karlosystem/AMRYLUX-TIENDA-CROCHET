import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SummaryApi from "../common";
import {
  FaStar,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaHeart,
  FaShoppingBag,
  FaWhatsapp,
  FaShareAlt,
  FaChevronRight,
  FaCartPlus,
} from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import displayINRCurrency from "../helpers/displayCurrency";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
    isActive: 1,
    sizes: [],
    color: "",
    slug: "",
    stock: 0,
    isLiquidation: 0,
    isOffer: 0,
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
  });

  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [activeSize, setActiveSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);

  const { fetchUserAddToCart } = useContext(Context);
  const navigate = useNavigate();

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        productId: params?.slug, // Ahora usamos slug en lugar de id
      }),
    });
    setLoading(false);
    const dataReponse = await response.json();
    setData(dataReponse?.data);
    setActiveImage(dataReponse?.data?.productImage?.[0] || "");
    setActiveSize("");
    setQuantity(1);
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomImageCoordinate({ x, y });
  }, []);

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const canAddToCart = () => {
    if (data.stock <= 0) {
      alert("Lo sentimos, este producto está agotado.");
      return false;
    }
    if (data.sizes?.length > 0 && !activeSize) {
      alert("Por favor, selecciona una talla antes de continuar.");
      return false;
    }
    return true;
  };

  const handleAddToCart = async (e, id) => {
    if (!canAddToCart()) return;
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const handleBuyProduct = async (e, id) => {
    if (!canAddToCart()) return;
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate("/cart");
  };

  const handleWhatsAppRedirect = () => {
    const message = `Hola AMRYLUXE, me interesa el producto: ${data.productName}`;
    const url = `https://wa.me/51994148453?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // FUNCIÓN PARA GENERAR SEO DINÁMICO DEL PRODUCTO
  const getProductSEO = () => {
    // Validar que data exista
    if (!data || !data.productName) {
      return {
        title: "Producto no encontrado | AMRY LUXE",
        description: "El producto que buscas no está disponible",
        keywords: "crochet, AMRY LUXE, Lima",
      };
    }

    // Si el producto tiene meta tags personalizados en la BD, úsalos
    if (data.metaTitle && data.metaDescription) {
      return {
        title: data.metaTitle,
        description: data.metaDescription,
        keywords:
          data.metaKeywords ||
          `${data.productName}, ${data.category}, crochet, AMRY LUXE, Lima`,
      };
    }

    // SEO generado automáticamente
    const discount =
      data.price && data.price !== data.sellingPrice
        ? Math.round(((data.price - data.sellingPrice) / data.price) * 100)
        : null;

    const offerText = discount ? ` - ¡${discount}% OFF!` : "";
    const colorText = data.color ? ` ${data.color}` : "";

    return {
      title: `${data.productName} | AMRY LUXE - ${data.category} en Lima${offerText}`,
      description: `Compra ${data.productName}${colorText} hecho a mano en Lima. ${data.category} de crochet artesanal. ${data.description?.substring(0, 100) || ""}... Precio: S/ ${data.sellingPrice}. ${data.stock > 0 ? "✓ En stock. Envíos a todo el Perú." : "Producto agotado."}`,
      keywords:
        `${data.productName}, ${data.category}, crochet, AMRY LUXE, Lima, ${data.color || ""}, hecho a mano, artesanal, Perú`.toLowerCase(),
    };
  };

  const seo = getProductSEO();

  // Schema.org structured data for Product
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: data.productName,
    image: data.productImage[0] || "",
    description: data.description,
    brand: {
      "@type": "Brand",
      name: data.brandName || "AMRY LUXE",
    },
    offers: {
      "@type": "Offer",
      url: `https://amryluxe.com/product/${params?.id}`,
      priceCurrency: "PEN",
      price: data.sellingPrice,
      availability:
        data.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "AMRY LUXE",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "0",
    },
  };

  const features = [
    {
      icon: (
        <svg
          className="w-8 h-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ),
      text: "Hecho a mano con amor",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      ),
      text: "Materiales sostenibles",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            d="M4 6h16v12H4z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 10h16M8 6v4M12 6v4M16 6v4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      text: "Diseños Exclusivos",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      ),
      text: "Diseñado y tejido en Perú",
    },
  ];

  return (
    <>
      {/*  SEO Dinámico con Helmet */}
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />

        {/* Open Graph para Facebook/Instagram */}
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:type" content="product" />
        <meta
          property="og:url"
          content={`https://amryluxe.com/product/${params?.id}`}
        />
        <meta property="og:locale" content="es_PE" />
        {data.productImage[0] && (
          <meta property="og:image" content={data.productImage[0]} />
        )}
        <meta property="product:price:amount" content={data.sellingPrice} />
        <meta property="product:price:currency" content="PEN" />
        <meta
          property="product:availability"
          content={data.stock > 0 ? "in stock" : "out of stock"}
        />
        <meta
          property="product:brand"
          content={data.brandName || "AMRY LUXE"}
        />
        <meta property="product:category" content={data.category} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        {data.productImage[0] && (
          <meta name="twitter:image" content={data.productImage[0]} />
        )}

        {/* Canonical URL */}
        <link
          rel="canonical"
          href={`https://amryluxe.com/product/${params?.id}`}
        />

        {/* Schema.org JSON-LD para Rich Snippets en Google */}
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      </Helmet>

      <div className="bg-neutral-50 min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-neutral-200 py-4">
          <div className="container mx-auto px-4">
            <nav className="text-xs text-neutral-500">
              <Link to="/" className="hover:text-neutral-900 transition-colors">
                Inicio
              </Link>
              <span className="mx-2">/</span>
              <Link
                to="/shop"
                className="hover:text-neutral-900 transition-colors"
              >
                Tienda
              </Link>
              <span className="mx-2">/</span>
              <span className="text-neutral-900 capitalize">
                {data.category}
              </span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Columna Izquierda: Imágenes + Características + Compartir */}
            <div className="lg:w-1/2 flex flex-col gap-8">
              <div className="flex flex-col-reverse lg:flex-row gap-4 items-start">
                <div className="grid grid-cols-2 gap-2 lg:w-28">
                  {loading
                    ? productImageListLoading.map((_, index) => (
                        <div
                          key={"loadingImage" + index}
                          className="h-16 w-full bg-neutral-200 rounded-sm animate-pulse"
                        ></div>
                      ))
                    : data?.productImage?.map((imgURL, index) => (
                        <div
                          key={imgURL}
                          className={`h-16 w-full bg-neutral-100 rounded-sm p-0.5 cursor-pointer border-2 transition-all ${
                            activeImage === imgURL
                              ? "border-neutral-900"
                              : "border-transparent hover:border-neutral-300"
                          }`}
                          onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                          onClick={() => handleMouseEnterProduct(imgURL)}
                        >
                          <img
                            src={
                              imgURL ||
                              "https://via.placeholder.com/200x200?text=AMRYLUXE"
                            }
                            className="w-full h-full object-contain"
                            alt={`Vista ${index + 1}`}
                          />
                        </div>
                      ))}
                </div>

                {/* Imagen Principal con ZOOM FUNCIONAL */}
                <div className="flex-1 relative">
                  <div className="relative w-full aspect-[3/4] bg-neutral-50">
                    {loading ? (
                      <div className="w-full h-full bg-neutral-200 animate-pulse"></div>
                    ) : (
                      <img
                        src={
                          activeImage ||
                          "https://via.placeholder.com/600x800?text=AMRYLUXE"
                        }
                        className="w-full h-full object-contain cursor-crosshair"
                        onMouseMove={handleZoomImage}
                        onMouseLeave={handleLeaveImageZoom}
                        alt={data?.productName}
                      />
                    )}
                  </div>

                  {/* ZOOM OVERLAY */}
                  {zoomImage && !loading && (
                    <div className="hidden lg:block absolute left-full top-0 ml-4 w-[400px] h-[500px] bg-white border border-neutral-200 z-50 overflow-hidden shadow-2xl">
                      <div
                        className="w-full h-full scale-150"
                        style={{
                          background: `url(${activeImage})`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`,
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Características */}
              {!loading && (
                <div className="bg-neutral-100 rounded-sm p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center text-center gap-2"
                    >
                      <div className="text-neutral-600">{feature.icon}</div>
                      <span className="text-[10px] uppercase tracking-wider text-neutral-700 leading-tight">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Compartir / Redes Sociales */}
              {!loading && (
                <div className="text-center">
                  <h3 className="font-medium text-neutral-900 mb-3 text-sm uppercase tracking-wider flex items-center gap-2 justify-center">
                    <FaShareAlt />
                    Compartir
                  </h3>
                  <div className="flex items-center gap-3 justify-center">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 flex items-center justify-center border border-neutral-300 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300"
                    >
                      <FaFacebookF className="text-sm" />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 flex items-center justify-center border border-neutral-300 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300"
                    >
                      <FaInstagram className="text-sm" />
                    </a>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 flex items-center justify-center border border-neutral-300 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300"
                    >
                      <AiOutlineYoutube className="text-lg" />
                    </a>
                    <a
                      href="https://tiktok.com"
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 flex items-center justify-center border border-neutral-300 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300"
                    >
                      <FaTiktok className="text-lg" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Columna Derecha: Información del Producto */}
            <div className="lg:w-1/2">
              {loading ? (
                <div className="space-y-4">
                  <div className="h-6 bg-neutral-200 animate-pulse rounded w-32"></div>
                  <div className="h-10 bg-neutral-200 animate-pulse rounded w-full"></div>
                  <div className="h-6 bg-neutral-200 animate-pulse rounded w-24"></div>
                  <div className="h-8 bg-neutral-200 animate-pulse rounded w-40"></div>
                  <div className="h-20 bg-neutral-200 animate-pulse rounded w-full"></div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Badges */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-medium border border-neutral-300 px-3 py-1">
                      {data?.brandName}
                    </span>
                    {data.isLiquidation === 1 && (
                      <span className="text-[10px] uppercase tracking-widest text-white font-medium bg-red-600 px-3 py-1">
                        Liquidación
                      </span>
                    )}
                    {data.isOffer === 1 && (
                      <span className="text-[10px] uppercase tracking-widest text-white font-medium bg-neutral-900 px-3 py-1">
                        Oferta
                      </span>
                    )}
                  </div>

                  {/* Título */}
                  <h1 className="font-serif text-3xl lg:text-4xl text-neutral-900 leading-tight">
                    {data?.productName}
                  </h1>

                  {/* Categoría */}
                  <p className="text-sm uppercase tracking-widest text-neutral-500">
                    {data?.category}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-400 text-sm">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                    <span className="text-xs text-neutral-500">
                      (0 reseñas)
                    </span>
                  </div>

                  {/* Precios */}
                  <div className="flex items-baseline gap-3">
                    <p className="text-3xl font-semibold text-neutral-900">
                      {displayINRCurrency(data.sellingPrice)}
                    </p>
                    {data.price && data.price !== data.sellingPrice && (
                      <p className="text-lg text-neutral-400 line-through">
                        {displayINRCurrency(data.price)}
                      </p>
                    )}
                  </div>

                  {/* Stock */}
                  <p
                    className={`text-sm font-medium ${data.stock > 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {data.stock > 0
                      ? `✓ En stock: ${data.stock} unidades disponibles`
                      : "✗ Producto agotado"}
                  </p>

                  {/* Color */}
                  {data.color && (
                    <div>
                      <p className="text-sm text-neutral-600 mb-2">
                        Color:{" "}
                        <span className="font-semibold capitalize text-neutral-900">
                          {data.color}
                        </span>
                      </p>
                    </div>
                  )}

                  {/* Tallas */}
                  {data.sizes?.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-neutral-900 mb-3">
                        Selecciona tu talla:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {data.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setActiveSize(size)}
                            className={`px-5 py-2.5 text-xs uppercase tracking-wider border transition-all duration-300 ${
                              activeSize === size
                                ? "bg-neutral-900 text-white border-neutral-900"
                                : "bg-white text-neutral-700 border-neutral-300 hover:border-neutral-900"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Cantidad */}
                  <div>
                    <p className="text-sm font-medium text-neutral-900 mb-3">
                      Cantidad:
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-neutral-300">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-4 py-2.5 text-neutral-700 hover:bg-neutral-100 transition-colors"
                        >
                          −
                        </button>
                        <span className="px-4 py-2.5 text-neutral-900 font-medium min-w-[60px] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-4 py-2.5 text-neutral-700 hover:bg-neutral-100 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Botones de Acción - Horizontal */}
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => handleAddToCart(e, data?._id)}
                      disabled={data.stock <= 0}
                      className="flex-1 border border-neutral-900 text-neutral-900 text-[10px] uppercase tracking-widest font-medium py-3 px-3 hover:bg-neutral-900 hover:text-white transition-all duration-300 disabled:border-neutral-300 disabled:text-neutral-300 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                    >
                      <FaCartPlus className="text-xs" />
                      Agregar al Carrito
                    </button>
                    
                    <button
                      onClick={handleWhatsAppRedirect}
                      className="flex-1 bg-green-600 text-white text-[10px] uppercase tracking-widest font-medium py-3 px-3 hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-1.5"
                    >
                      <FaWhatsapp className="text-xs" />
                      WhatsApp
                    </button>
                  </div>

                  {/* Custom Sizing */}
                  <div className="bg-neutral-100 rounded-sm p-5 border-l-4 border-neutral-400">
                    <div className="flex items-start gap-4">
                      <div className="text-neutral-600 flex-shrink-0">
                        <svg
                          className="w-10 h-10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <path d="M3 9h18M9 21V9" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-neutral-900 mb-1">
                          ¿No encuentras tu talla?
                        </h4>
                        <p className="text-sm text-neutral-600 leading-relaxed">
                          Lo confeccionamos para ti, con amor y a mano.{" "}
                          <span className="font-semibold">
                            Tiempo de elaboración en la descripción.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Descripción */}
                  <div>
                    <h3 className="font-medium text-neutral-900 mb-3 text-sm uppercase tracking-wider">
                      Descripción
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {data?.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Productos Recomendados */}
        {data.category && !loading && (
          <RecommendedProducts category={data.category} />
        )}
      </div>
    </>
  );
};

const RecommendedProducts = ({ category }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(SummaryApi.categoryWiseProduct.url, {
          method: SummaryApi.categoryWiseProduct.method,
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ category }),
        });
        const dataResponse = await response.json();
        setData(dataResponse?.data?.slice(0, 8) || []);
      } catch (error) {
        console.error("Error fetching recommended products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category]);

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  return (
    <div className="bg-white border-t border-neutral-200 py-12 mt-12">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl text-neutral-900 mb-2 text-center">
          También Te Podría Gustar
        </h2>
        <div className="w-16 h-px bg-neutral-300 mx-auto mb-8"></div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? new Array(8).fill(null).map((_, index) => (
                <div key={index} className="bg-white border border-neutral-200">
                  <div className="aspect-[3/4] bg-neutral-100 animate-pulse"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-3 w-16 bg-neutral-100 animate-pulse rounded"></div>
                    <div className="h-4 w-full bg-neutral-100 animate-pulse rounded"></div>
                    <div className="h-4 w-24 bg-neutral-100 animate-pulse rounded"></div>
                    <div className="h-9 bg-neutral-100 animate-pulse rounded"></div>
                  </div>
                </div>
              ))
            : data.map((product) => (
                <div
                  key={product._id}
                  className="group bg-white border border-neutral-200 hover:border-neutral-400 hover:shadow-lg transition-all duration-300"
                >
                  <Link to={`/product/${product?.slug || product?._id}`} className="block">
                    <div className="aspect-[3/4] bg-neutral-50 overflow-hidden relative">
                      <img
                        src={
                          product.productImage[0] ||
                          "https://via.placeholder.com/300x400?text=AMRYLUXE"
                        }
                        alt={product.productName}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                      />
                      <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm border border-neutral-200 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-neutral-900 hover:text-white">
                        <FaHeart className="text-xs" />
                      </button>
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">
                        {product.category}
                      </p>
                      <h3 className="font-serif text-sm text-neutral-900 mb-2 line-clamp-2">
                        {product.productName}
                      </h3>
                      <div className="flex items-baseline gap-2 mb-3">
                        <p className="text-neutral-900 font-semibold text-base">
                          {displayINRCurrency(product.sellingPrice)}
                        </p>
                        {product.price &&
                          product.price !== product.sellingPrice && (
                            <p className="text-neutral-400 line-through text-xs">
                              {displayINRCurrency(product.price)}
                            </p>
                          )}
                      </div>
                      <button
                        onClick={(e) => handleAddToCart(e, product._id)}
                        className="w-full text-[10px] uppercase tracking-wider font-medium border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all py-2.5 flex items-center justify-center gap-1"
                      >
                        <FaShoppingBag className="text-xs" />
                        Añadir
                      </button>
                    </div>
                  </Link>
                </div>
              ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link
            to={`/product-category?category=${category}`}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-medium border-b-2 border-neutral-900 text-neutral-900 hover:border-neutral-600 transition-all pb-1"
          >
            Ver Más {category}
            <FaChevronRight className="text-xs" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

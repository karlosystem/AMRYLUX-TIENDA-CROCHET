import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaShoppingBag, FaTag, FaArrowLeft } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const context = useContext(Context);
  const navigate = useNavigate();
  const loadingCart = new Array(4).fill(null);

  const fetchData = async () => {
    try {
      const response = await fetch(SummaryApi.addToCardProductView.url, {
        method: SummaryApi.addToCardProductView.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });

      const responseData = await response.json();

      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const handleLoading = async () => {
    await fetchData();
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, []);

  const increaseQty = async (id, qty, stock) => {
    if (qty >= stock) {
      alert("No hay más stock disponible de este producto");
      return;
    }

    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
    }
  };

  const decreaseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const confirmDelete = window.confirm("¿Estás segura de eliminar este producto del carrito?");
    if (!confirmDelete) return;

    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const handlePayment = async () => {
    try {
      const response = await fetch(SummaryApi.payment.url, {
        method: SummaryApi.payment.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          cartItems: data,
        }),
      });

      const responseData = await response.json();

      if (responseData?.url) {
        window.location.href = responseData.url;
      } else {
        console.error("No se recibió una URL de pago:", responseData);
        alert("Hubo un error al iniciar el pago.");
      }
    } catch (error) {
      console.error("Error en el proceso de pago:", error);
    }
  };

  const handleApplyCoupon = () => {
    // Próximamente: Lógica para aplicar cupón de descuento
    alert("Funcionalidad de cupones próximamente disponible");
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );

  const totalPrice = data.reduce(
    (prev, curr) => prev + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  const shippingCost = totalPrice > 100 ? 0 : 15; // Envío gratis sobre $100
  const finalTotal = totalPrice + shippingCost;

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-neutral-200 py-4">
        <div className="container mx-auto px-4">
          <nav className="text-xs text-neutral-500">
            <Link to="/" className="hover:text-neutral-900 transition-colors">
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <span className="text-neutral-900">Carrito de Compras</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Título de Página */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl md:text-4xl text-neutral-900 mb-3">
            CARRITO DE COMPRAS
          </h1>
          <p className="text-sm text-neutral-500 max-w-2xl mx-auto">
            Revisa tus productos seleccionados. Puedes modificar las cantidades o eliminar artículos antes de continuar con tu compra.
            <span className="block mt-1 text-xs">Envío gratis en pedidos superiores a S/ 100</span>
          </p>
        </div>

        {data.length === 0 && !loading ? (
          <div className="bg-white border border-neutral-200 rounded-sm p-12 text-center">
            <div className="text-neutral-400 mb-4">
              <FaShoppingBag className="text-6xl mx-auto" />
            </div>
            <h2 className="font-serif text-2xl text-neutral-900 mb-2">
              Tu carrito está vacío
            </h2>
            <p className="text-neutral-500 mb-6">
              ¡Agrega algunas de nuestras hermosas prendas crochet!
            </p>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 bg-neutral-900 text-white px-8 py-3 text-xs uppercase tracking-widest hover:bg-neutral-800 transition-all duration-300"
            >
              <FaArrowLeft className="text-sm" />
              Comenzar a Comprar
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Productos del Carrito */}
            <div className="flex-1">
              <div className="space-y-4">
                {loading
                  ? loadingCart?.map((el, index) => {
                      return (
                        <div
                          key={el + "Add To Cart Loading" + index}
                          className="w-full bg-white border border-neutral-200 h-40 animate-pulse rounded-sm"
                        ></div>
                      );
                    })
                  : data.map((product, index) => {
                      const availableStock = product?.productId?.stock || 0;
                      const isOutOfStock = availableStock === 0;
                      const selectedSize =
                        product?.size || product?.productId?.sizes?.[0];
                      const selectedColor =
                        product?.color || product?.productId?.color;

                      return (
                        <div
                          key={product?._id + "Add To Cart"}
                          className={`bg-white border rounded-sm overflow-hidden transition-all duration-300 ${
                            isOutOfStock
                              ? "border-neutral-200 opacity-60"
                              : "border-neutral-200 hover:border-neutral-300 hover:shadow-md"
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row">
                            {/* Imagen */}
                            <div className="w-full sm:w-40 h-40 sm:h-auto bg-neutral-50 relative flex-shrink-0">
                              <img
                                src={product?.productId?.productImage?.[0]}
                                className="w-full h-full object-contain p-4"
                                alt={product?.productId?.productName}
                              />
                              {isOutOfStock && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                  <span className="text-white font-medium text-xs uppercase tracking-wider">
                                    Sin Stock
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Información */}
                            <div className="flex-1 p-4 sm:p-6 relative">
                              {/* Botón Eliminar */}
                              <button
                                className="absolute right-4 top-4 text-neutral-400 hover:text-red-600 transition-colors"
                                onClick={() =>
                                  !isOutOfStock && deleteCartProduct(product?._id)
                                }
                                disabled={isOutOfStock}
                              >
                                <MdDelete className="text-xl" />
                              </button>

                              {/* Nombre y Categoría */}
                              <h2 className="font-serif text-lg text-neutral-900 mb-1 pr-16">
                                {product?.productId?.productName}
                              </h2>
                              <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3">
                                {product?.productId?.category}
                              </p>

                              {/* Talla y Color */}
                              <div className="flex flex-wrap gap-4 text-xs mb-3">
                                {selectedSize && (
                                  <div className="flex items-center gap-2">
                                    <span className="text-neutral-500 uppercase tracking-wider">
                                      Talla:
                                    </span>
                                    <span className="px-2 py-1 border border-neutral-300 text-neutral-900">
                                      {selectedSize}
                                    </span>
                                  </div>
                                )}
                                {selectedColor && (
                                  <div className="flex items-center gap-2">
                                    <span className="text-neutral-500 uppercase tracking-wider">
                                      Color:
                                    </span>
                                    <div className="flex items-center gap-2">
                                      <span className="text-neutral-900 capitalize">
                                        {selectedColor}
                                      </span>
                                      <div
                                        className="w-5 h-5 border border-neutral-300 rounded-sm"
                                        style={{
                                          backgroundColor: selectedColor.toLowerCase().replace(/\s/g, ""),
                                        }}
                                        title={selectedColor}
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Stock */}
                              <p
                                className={`text-xs mb-3 ${
                                  isOutOfStock ? "text-red-600" : "text-green-600"
                                }`}
                              >
                                {isOutOfStock
                                  ? "Producto agotado"
                                  : `✓ Stock disponible: ${availableStock} und.`}
                              </p>

                              {/* Precio y Cantidad */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <button
                                    className={`w-8 h-8 flex items-center justify-center border transition-all ${
                                      isOutOfStock || product.quantity <= 1
                                        ? "border-neutral-200 text-neutral-300 cursor-not-allowed"
                                        : "border-neutral-300 text-neutral-700 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
                                    }`}
                                    onClick={() =>
                                      !isOutOfStock &&
                                      decreaseQty(product?._id, product?.quantity)
                                    }
                                    disabled={isOutOfStock || product.quantity <= 1}
                                  >
                                    −
                                  </button>

                                  <span className="font-medium text-neutral-900 min-w-[40px] text-center">
                                    {product?.quantity}
                                  </span>

                                  <button
                                    className={`w-8 h-8 flex items-center justify-center border transition-all ${
                                      isOutOfStock ||
                                      product.quantity >= availableStock
                                        ? "border-neutral-200 text-neutral-300 cursor-not-allowed"
                                        : "border-neutral-300 text-neutral-700 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
                                    }`}
                                    onClick={() =>
                                      !isOutOfStock &&
                                      increaseQty(
                                        product?._id,
                                        product?.quantity,
                                        availableStock
                                      )
                                    }
                                    disabled={
                                      isOutOfStock ||
                                      product.quantity >= availableStock
                                    }
                                  >
                                    +
                                  </button>
                                </div>

                                <div className="text-right">
                                  <p className="text-neutral-900 font-semibold text-lg">
                                    {displayINRCurrency(
                                      product?.productId?.sellingPrice *
                                        product?.quantity
                                    )}
                                  </p>
                                  <p className="text-xs text-neutral-500">
                                    {displayINRCurrency(
                                      product?.productId?.sellingPrice
                                    )}{" "}
                                    c/u
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
              </div>

              {/* Botón Seguir Comprando */}
              <button
                onClick={() => navigate("/")}
                className="mt-6 inline-flex items-center gap-2 text-neutral-900 hover:text-neutral-600 transition-colors text-sm font-medium"
              >
                <FaArrowLeft className="text-xs" />
                Seguir Comprando
              </button>
            </div>

            {/* Resumen del Pedido */}
            <div className="w-full lg:w-96">
              <div className="bg-white border border-neutral-200 rounded-sm sticky top-24">
                <div className="p-6">
                  <h2 className="font-serif text-xl text-neutral-900 mb-6 pb-4 border-b border-neutral-200">
                    Resumen del Pedido
                  </h2>

                  {/* Cupón de Descuento */}
                  <div className="mb-6">
                    <label className="text-xs uppercase tracking-widest text-neutral-500 mb-2 block">
                      ¿Tienes un cupón de descuento?
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Ingresa el código"
                        className="flex-1 px-3 py-2 border border-neutral-300 text-sm focus:outline-none focus:border-neutral-900 transition-colors"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="px-4 py-2 border border-neutral-900 text-neutral-900 text-xs uppercase tracking-wider hover:bg-neutral-900 hover:text-white transition-all"
                      >
                        <FaTag className="inline mr-1" />
                        Aplicar
                      </button>
                    </div>
                    <p className="text-[10px] text-neutral-400 mt-1">
                      (Próximamente disponible)
                    </p>
                  </div>

                  {/* Subtotal */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-neutral-600">Subtotal</span>
                    <span className="text-neutral-900 font-medium">
                      {displayINRCurrency(totalPrice)}
                    </span>
                  </div>

                  {/* Envío */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-neutral-600">Envío</span>
                    <span
                      className={`font-medium ${
                        shippingCost === 0 ? "text-green-600" : "text-neutral-900"
                      }`}
                    >
                      {shippingCost === 0 ? "GRATIS" : displayINRCurrency(shippingCost)}
                    </span>
                  </div>

                  {shippingCost > 0 && (
                    <p className="text-[10px] text-neutral-500 mb-4">
                      Envío gratis en pedidos sobre S/ 100
                    </p>
                  )}

                  {/* Total */}
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-200 mb-6">
                    <span className="text-base font-medium text-neutral-900">Total</span>
                    <span className="text-2xl font-semibold text-neutral-900">
                      {displayINRCurrency(finalTotal)}
                    </span>
                  </div>

                  {/* Botón Pagar */}
                  <button
                    onClick={handlePayment}
                    disabled={data.length === 0}
                    className="w-full bg-neutral-900 text-white py-3.5 text-xs uppercase tracking-widest font-medium hover:bg-neutral-800 transition-all duration-300 disabled:bg-neutral-300 disabled:cursor-not-allowed"
                  >
                    Proceder al Pago
                  </button>

                  {/* Métodos de Pago */}
                  <div className="mt-4 pt-4 border-t border-neutral-200">
                    <p className="text-[10px] text-neutral-500 text-center uppercase tracking-wider mb-2">
                      Métodos de pago seguros
                    </p>
                    <div className="flex items-center justify-center gap-2 text-xs text-neutral-400">
                      <span>💳</span>
                      <span>Visa</span>
                      <span>•</span>
                      <span>Mastercard</span>
                      <span>•</span>
                      <span>PayPal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
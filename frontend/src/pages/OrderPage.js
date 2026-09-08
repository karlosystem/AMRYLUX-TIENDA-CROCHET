import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SummaryApi from '../common'
import moment from 'moment'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaBoxOpen, FaCreditCard, FaTruck, FaCheckCircle, FaClock, FaFileInvoice } from 'react-icons/fa'

const OrderPage = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrderDetails = async () => {
    setLoading(true)
    try {
      const response = await fetch(SummaryApi.getOrder.url, {
        method: SummaryApi.getOrder.method,
        credentials: 'include'
      })
      const responseData = await response.json()
      setData(responseData.data || [])
    } catch (error) {
      console.error("Error al obtener pedidos:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrderDetails()
  }, [])

  // Calcular IGV (18%)
  const calculateIGV = (total) => {
    const igv = total * 0.18
    const subtotal = total - igv
    return { subtotal, igv, total }
  }

  // Badge de estado de pago
  const PaymentStatusBadge = ({ status }) => {
    const statusMap = {
      paid: { label: 'Pagado', color: 'bg-green-100 text-green-800 border-green-200' },
      pending: { label: 'Pendiente', color: 'bg-amber-100 text-amber-800 border-amber-200' },
      failed: { label: 'Fallido', color: 'bg-red-100 text-red-800 border-red-200' },
      refunded: { label: 'Reembolsado', color: 'bg-blue-100 text-blue-800 border-blue-200' }
    }
    const statusInfo = statusMap[status] || statusMap.pending
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] uppercase tracking-wider font-medium rounded-sm border ${statusInfo.color}`}>
        {status === 'paid' ? <FaCheckCircle className="text-xs" /> : <FaClock className="text-xs" />}
        {statusInfo.label}
      </span>
    )
  }

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-neutral-200 py-4">
        <div className="container mx-auto px-4">
          <nav className="text-xs text-neutral-500">
            <Link to="/" className="hover:text-neutral-900 transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <Link to="/cuenta" className="hover:text-neutral-900 transition-colors">Mi Cuenta</Link>
            <span className="mx-2">/</span>
            <span className="text-neutral-900">Mis Pedidos</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Header de Página */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-neutral-100 px-4 py-2 mb-4">
            <FaFileInvoice className="text-neutral-600" />
            <span className="text-xs uppercase tracking-widest text-neutral-600">Historial de Compras</span>
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl text-neutral-900 mb-4">
            Orden de Pedido
          </h1>
          <div className="w-24 h-px bg-neutral-300 mx-auto mb-4"></div>
          <p className="text-neutral-600 max-w-2xl mx-auto text-sm leading-relaxed">
            Revisa el detalle de tus pedidos realizados. Aquí encontrarás información sobre productos, pagos, envíos y el estado de cada compra.
          </p>
        </div>

        {loading ? (
          // Skeleton de carga
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white border border-neutral-200 rounded-sm p-6 animate-pulse">
                <div className="h-6 bg-neutral-200 rounded w-48 mb-4"></div>
                <div className="h-32 bg-neutral-100 rounded"></div>
              </div>
            ))}
          </div>
        ) : !data[0] ? (
          // Estado vacío
          <div className="bg-white border border-neutral-200 rounded-sm p-12 text-center">
            <div className="text-neutral-400 mb-4">
              <FaBoxOpen className="text-6xl mx-auto" />
            </div>
            <h2 className="font-serif text-2xl text-neutral-900 mb-2">
              No tienes pedidos aún
            </h2>
            <p className="text-neutral-500 mb-6 text-sm">
              ¡Explora nuestra colección y realiza tu primera compra!
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-neutral-900 text-white px-8 py-3 text-xs uppercase tracking-widest hover:bg-neutral-800 transition-all duration-300"
            >
              Comenzar a Comprar
            </Link>
          </div>
        ) : (
          // Lista de Pedidos
          <div className="space-y-6 max-w-5xl mx-auto">
            {data.map((item, index) => {
              const { subtotal, igv, total } = calculateIGV(item.totalAmount || 0)
              const shippingAmount = item.shipping_options?.[0]?.shipping_amount || 0

              return (
                <div
                  key={item.userId + index}
                  className="bg-white border border-neutral-200 rounded-sm overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Cabecera del Pedido */}
                  <div className="bg-neutral-50 border-b border-neutral-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <FaBoxOpen className="text-neutral-400" />
                      <div>
                        <p className="text-xs uppercase tracking-wider text-neutral-500">
                          Pedido realizado el
                        </p>
                        <p className="font-serif text-lg text-neutral-900">
                          {moment(item.createdAt).format('DD [de] MMMM [de] YYYY')}
                        </p>
                      </div>
                    </div>
                    <PaymentStatusBadge status={item.paymentDetails?.payment_status} />
                  </div>

                  {/* Contenido del Pedido */}
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Productos */}
                      <div className="flex-1">
                        <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-medium mb-4 pb-2 border-b border-neutral-200">
                          Productos
                        </h3>
                        <div className="space-y-4">
                          {item?.productDetails?.map((product, pIndex) => (
                            <div
                              key={product.productId + pIndex}
                              className="flex gap-4 pb-4 border-b border-neutral-100 last:border-b-0 last:pb-0"
                            >
                              {/* Imagen */}
                              <div className="w-24 h-24 bg-neutral-50 border border-neutral-200 rounded-sm flex-shrink-0 overflow-hidden">
                                <img
                                  src={product.image?.[0]}
                                  className="w-full h-full object-contain p-2"
                                  alt={product.name}
                                />
                              </div>

                              {/* Información */}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-serif text-base text-neutral-900 mb-1 truncate">
                                  {product.name}
                                </h4>
                                <p className="text-[10px] uppercase tracking-wider text-neutral-500 mb-2">
                                  {product.category || 'Producto'}
                                </p>

                                {/* Color y Talla */}
                                <div className="flex flex-wrap gap-3 mb-2">
                                  {product.color && (
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-[10px] uppercase tracking-wider text-neutral-500">Color:</span>
                                      <span className="text-xs text-neutral-900 capitalize">{product.color}</span>
                                    </div>
                                  )}
                                  {product.size && (
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-[10px] uppercase tracking-wider text-neutral-500">Talla:</span>
                                      <span className="text-xs px-2 py-0.5 border border-neutral-300 text-neutral-900">{product.size}</span>
                                    </div>
                                  )}
                                </div>

                                {/* Precio y Cantidad */}
                                <div className="flex items-center gap-4">
                                  <div>
                                    <span className="text-[10px] uppercase tracking-wider text-neutral-500">Precio:</span>
                                    <p className="text-neutral-900 font-semibold">
                                      {displayINRCurrency(product.price)}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="text-[10px] uppercase tracking-wider text-neutral-500">Cantidad:</span>
                                    <p className="text-neutral-900 font-medium">{product.quantity}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Resumen del Pedido */}
                      <div className="lg:w-80 flex-shrink-0">
                        <div className="bg-neutral-50 border border-neutral-200 rounded-sm p-5">
                          <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-medium mb-4 pb-2 border-b border-neutral-200">
                            Resumen
                          </h3>

                          {/* Detalles de Pago */}
                          <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <FaCreditCard className="text-neutral-400 text-sm" />
                              <span className="text-xs uppercase tracking-wider text-neutral-500 font-medium">
                                Pago
                              </span>
                            </div>
                            <div className="space-y-1 pl-6">
                              <p className="text-sm text-neutral-700">
                                <span className="text-neutral-500">Método:</span>{' '}
                                <span className="capitalize">
                                  {item.paymentDetails?.payment_method_type?.[0] || 'Tarjeta'}
                                </span>
                              </p>
                              <p className="text-sm text-neutral-700">
                                <span className="text-neutral-500">Estado:</span>{' '}
                                <span className="capitalize">{item.paymentDetails?.payment_status || 'pendiente'}</span>
                              </p>
                            </div>
                          </div>

                          {/* Detalles de Envío */}
                          <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <FaTruck className="text-neutral-400 text-sm" />
                              <span className="text-xs uppercase tracking-wider text-neutral-500 font-medium">
                                Envío
                              </span>
                            </div>
                            <div className="space-y-1 pl-6">
                              <p className="text-sm text-neutral-700">
                                <span className="text-neutral-500">Costo:</span>{' '}
                                {shippingAmount > 0 ? displayINRCurrency(shippingAmount) : 'Gratis'}
                              </p>
                            </div>
                          </div>

                          {/* Desglose de Precios */}
                          <div className="border-t border-neutral-200 pt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-neutral-600">Subtotal</span>
                              <span className="text-neutral-900">{displayINRCurrency(subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-neutral-600">IGV (18%)</span>
                              <span className="text-neutral-900">{displayINRCurrency(igv)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-neutral-600">Envío</span>
                              <span className="text-neutral-900">
                                {shippingAmount > 0 ? displayINRCurrency(shippingAmount) : 'Gratis'}
                              </span>
                            </div>
                            <div className="border-t border-neutral-200 pt-2 mt-2">
                              <div className="flex justify-between items-baseline">
                                <span className="text-base font-medium text-neutral-900">Total</span>
                                <span className="text-2xl font-serif font-semibold text-neutral-900">
                                  {displayINRCurrency(total)}
                                </span>
                              </div>
                              <p className="text-[10px] text-neutral-500 text-right mt-1">
                                * Precio total incluye IGV (18%)
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderPage
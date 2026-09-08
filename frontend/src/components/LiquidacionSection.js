import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import displayINRCurrency from '../helpers/displayCurrency'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import { FaShoppingCart, FaTag } from 'react-icons/fa'

const LiquidacionSection = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()
    }

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await fetch(SummaryApi.ofertaProduct.url, {
                method: SummaryApi.ofertaProduct.method,
            })
            const dataResponse = await response.json()
            // Mostrar solo 3-4 productos de oferta/liquidación
            setData(dataResponse?.data?.slice(0, 4) || [])
        } catch (error) {
            console.error("Error fetching liquidation products:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className='bg-neutral-50 py-12 md:py-16'>
            <div className='container mx-auto px-4'>
                {/* Header de Sección */}
                <div className='text-center mb-10'>
                    <div className='inline-flex items-center gap-2 bg-red-100 px-4 py-2 mb-4'>
                        <FaTag className='text-red-600' />
                        <span className='text-xs uppercase tracking-widest text-red-700 font-medium'>
                            Liquidación de Temporada
                        </span>
                    </div>
                    <h2 className='font-serif text-3xl md:text-4xl text-neutral-900 mb-3'>
                        Últimas Unidades
                    </h2>
                    <div className='w-20 h-px bg-neutral-300 mx-auto mb-4'></div>
                    <p className='text-sm text-neutral-600 max-w-2xl mx-auto'>
                        Aprovecha nuestras ofertas exclusivas en prendas seleccionadas. 
                        Cada pieza es única, tejida artesanalmente en Lima, Perú.
                    </p>
                </div>

                {/* Grid de Productos */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
                    {loading ? (
                        new Array(4).fill(null).map((_, index) => (
                            <div key={"loading-liq-" + index} className='bg-white rounded-sm shadow-sm'>
                                <div className='aspect-[3/4] bg-neutral-200 animate-pulse'></div>
                                <div className='p-5 space-y-3'>
                                    <div className='h-4 bg-neutral-200 animate-pulse rounded'></div>
                                    <div className='h-5 bg-neutral-200 animate-pulse rounded w-1/2'></div>
                                    <div className='h-10 bg-neutral-200 animate-pulse rounded'></div>
                                </div>
                            </div>
                        ))
                    ) : data.length > 0 ? (
                        data.map((product) => {
                            const discount = Math.round(
                                ((product.price - product.sellingPrice) / product.price) * 100
                            )
                            
                            return (
                                <Link
                                    key={product._id}
                                    to={`/product/${product?.slug || product._id}`}
                                    className='group bg-white rounded-sm shadow-sm hover:shadow-xl transition-all duration-300'
                                >
                                    {/* Imagen */}
                                    <div className='aspect-[3/4] bg-neutral-50 overflow-hidden relative'>
                                        <img
                                            src={product.productImage[0]}
                                            alt={product.productName}
                                            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                                        />
                                        
                                        {/* Badge de Descuento */}
                                        <span className='absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1'>
                                            -{discount}%
                                        </span>
                                        
                                        {/* Badge Liquidación */}
                                        <span className='absolute top-3 right-3 bg-neutral-900 text-white text-[10px] uppercase tracking-wider px-2 py-1'>
                                            Liquidación
                                        </span>
                                    </div>

                                    {/* Info */}
                                    <div className='p-5'>
                                        <h3 className='font-serif text-base text-neutral-900 mb-2 line-clamp-2'>
                                            {product.productName}
                                        </h3>
                                        
                                        {/* Precios */}
                                        <div className='flex items-baseline gap-2 mb-3'>
                                            <p className='text-xl font-bold text-red-600'>
                                                {displayINRCurrency(product.sellingPrice)}
                                            </p>
                                            <p className='text-sm text-neutral-400 line-through'>
                                                {displayINRCurrency(product.price)}
                                            </p>
                                        </div>

                                        <button
                                            onClick={(e) => handleAddToCart(e, product._id)}
                                            className='w-full text-xs uppercase tracking-wider font-medium bg-red-600 text-white hover:bg-red-700 transition-all py-2.5 flex items-center justify-center gap-2'
                                        >
                                            <FaShoppingCart className='text-xs' />
                                            Agregar al Carrito
                                        </button>
                                    </div>
                                </Link>
                            )
                        })
                    ) : (
                        <div className='col-span-full text-center py-12'>
                            <p className='text-neutral-500 text-sm'>
                                No hay productos en liquidación en este momento.
                            </p>
                        </div>
                    )}
                </div>

                {/* Botón Ver Todas las Ofertas */}
                {data.length > 0 && (
                    <div className='text-center mt-10'>
                        <Link
                            to='/ofertas'
                            className='inline-flex items-center gap-2 bg-neutral-900 text-white px-8 py-3 text-xs uppercase tracking-widest hover:bg-neutral-800 transition-all'
                        >
                            Ver Todas las Ofertas
                            <FaTag className='text-sm' />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LiquidacionSection
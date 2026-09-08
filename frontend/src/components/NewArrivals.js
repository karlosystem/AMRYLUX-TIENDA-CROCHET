import React, { useContext, useEffect, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import { FaShoppingCart } from 'react-icons/fa'

const NewArrivals = ({category, heading}) => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const loadingList = new Array(4).fill(null)

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e,id)=>{
       await addToCart(e,id)
       fetchUserAddToCart()
    }

    const fetchData = async() =>{
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)
        // Mostrar solo los primeros 4 productos
        setData(categoryProduct?.data?.slice(0, 4) || [])
    }

    useEffect(()=>{
        fetchData()
    },[])

    return (
        <div className='container mx-auto px-4 py-12'>
            {/* Título de Sección */}
            <div className='text-center mb-10'>
                <h2 className='font-serif text-3xl md:text-4xl text-neutral-900 mb-3'>
                    {heading}
                </h2>
                <div className='w-20 h-px bg-neutral-300 mx-auto mb-4'></div>
                <p className='text-sm text-neutral-600 max-w-2xl mx-auto'>
                    Cada prenda es tejida a mano con amor por artesanas peruanas, 
                    utilizando técnicas tradicionales y materiales de la más alta calidad.
                </p>
            </div>

            {/* Grid de Productos */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
                {loading ? (
                    loadingList.map((_, index) => (
                        <div key={"loading-" + index} className='bg-white rounded-sm shadow-sm border border-neutral-100'>
                            <div className='aspect-[3/4] bg-neutral-100 animate-pulse'></div>
                            <div className='p-5 space-y-3'>
                                <div className='h-4 bg-neutral-100 animate-pulse rounded w-3/4'></div>
                                <div className='h-3 bg-neutral-100 animate-pulse rounded w-1/2'></div>
                                <div className='h-5 bg-neutral-100 animate-pulse rounded w-1/3'></div>
                                <div className='h-10 bg-neutral-100 animate-pulse rounded'></div>
                            </div>
                        </div>
                    ))
                ) : (
                    data.map((product) => (
                        <Link 
                            key={product?._id} 
                            to={`/product/${product?.slug || product?._id}`} 
                            className='group bg-white rounded-sm shadow-sm border border-neutral-100 hover:shadow-xl hover:border-neutral-300 transition-all duration-300'
                        >
                            {/* Imagen */}
                            <div className='aspect-[3/4] bg-neutral-50 overflow-hidden relative'>
                                <img 
                                    src={product.productImage[0]} 
                                    alt={product.productName}
                                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                                />
                                
                                {/* Badge si es oferta */}
                                {product.isOffer === 1 && (
                                    <span className='absolute top-3 left-3 bg-neutral-900 text-white text-[10px] uppercase tracking-wider px-3 py-1 font-medium'>
                                        Oferta
                                    </span>
                                )}
                                
                                {/* Badge si es liquidación */}
                                {product.isLiquidation === 1 && (
                                    <span className='absolute top-3 left-3 bg-red-600 text-white text-[10px] uppercase tracking-wider px-3 py-1 font-medium'>
                                        Liquidación
                                    </span>
                                )}
                            </div>

                            {/* Información del Producto */}
                            <div className='p-5'>
                                <h3 className='font-serif text-base text-neutral-900 mb-1 line-clamp-2 group-hover:text-neutral-700 transition-colors'>
                                    {product?.productName}
                                </h3>
                                <p className='text-xs uppercase tracking-wider text-neutral-500 mb-3'>
                                    {product?.category}
                                </p>
                                
                                {/* Precios */}
                                <div className='flex items-baseline gap-2 mb-3'>
                                    <p className='text-lg font-semibold text-neutral-900'>
                                        {displayINRCurrency(product?.sellingPrice)}
                                    </p>
                                    {product?.price !== product?.sellingPrice && (
                                        <p className='text-sm text-neutral-400 line-through'>
                                            {displayINRCurrency(product?.price)}
                                        </p>
                                    )}
                                </div>

                                {/* Botón Agregar al Carrito */}
                                <button
                                    onClick={(e) => handleAddToCart(e, product?._id)}
                                    className='w-full text-xs uppercase tracking-wider font-medium border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all py-2.5 flex items-center justify-center gap-2'
                                >
                                    <FaShoppingCart className='text-xs' />
                                    Agregar al Carrito
                                </button>
                            </div>
                        </Link>
                    ))
                )}
            </div>

            {/* Botón Ver Más */}
            <div className='text-center mt-10'>
                <Link 
                    to={`/product-category?category=${category}`}
                    className='inline-block text-xs uppercase tracking-[0.2em] font-medium border-b-2 border-neutral-900 text-neutral-900 hover:border-neutral-600 transition-all pb-1'
                >
                    Ver Más {category === 'sweater' ? 'Sweaters' : category === 'top' ? 'Tops' : category}
                </Link>
            </div>
        </div>
    )
}

export default NewArrivals
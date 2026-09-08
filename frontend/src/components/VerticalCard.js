import React, { useContext } from 'react'
import scrollTop from '../helpers/scrollTop'
import displayINRCurrency from '../helpers/displayCurrency'
import Context from '../context'
import addToCart from '../helpers/addToCart'
import { Link } from 'react-router-dom'
import { FaShoppingBag, FaHeart } from 'react-icons/fa'

const VerticalCard = ({ loading, data = [] }) => {
    const loadingList = new Array(8).fill(null)
    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async (e, id) => {
        e.preventDefault()
        await addToCart(e, id)
        fetchUserAddToCart()
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading ? (
                // Skeleton de carga elegante
                loadingList.map((_, index) => (
                    <div key={"loading-" + index} className="bg-white border border-neutral-200">
                        <div className="aspect-[3/4] bg-neutral-100 animate-pulse"></div>
                        <div className="p-5 space-y-3">
                            <div className="h-3 w-16 bg-neutral-100 animate-pulse rounded"></div>
                            <div className="h-4 w-full bg-neutral-100 animate-pulse rounded"></div>
                            <div className="h-4 w-24 bg-neutral-100 animate-pulse rounded"></div>
                            <div className="flex gap-2 pt-2">
                                <div className="h-9 flex-1 bg-neutral-100 animate-pulse rounded"></div>
                                <div className="h-9 w-9 bg-neutral-100 animate-pulse rounded"></div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                data.map((product) => (
                    <div
                        key={product?._id}
                        className="group bg-white border border-neutral-200 hover:border-neutral-400 hover:shadow-lg transition-all duration-300"
                    >
                        <Link to={`/product/${product?.slug || product?._id}`} onClick={scrollTop}>
                            {/* Imagen del Producto */}
                            <div className="relative aspect-[3/4] bg-neutral-50 overflow-hidden">
                                <img
                                    src={product?.productImage[0]}
                                    alt={product?.productName}
                                    className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-700"
                                />

                                {/* Botón Wishlist */}
                                <button
                                    onClick={(e) => e.preventDefault()}
                                    className="absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur-sm border border-neutral-200 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-neutral-900 hover:text-white hover:border-neutral-900"
                                >
                                    <FaHeart className="text-xs" />
                                </button>

                                {/* Badge de Categoría */}
                                <div className="absolute top-4 left-4">
                                    <span className="text-[9px] uppercase tracking-widest bg-white/90 backdrop-blur-sm px-3 py-1.5 text-neutral-900 font-medium">
                                        {product?.category}
                                    </span>
                                </div>
                            </div>

                            {/* Información del Producto */}
                            <div className="p-5">
                                {/* Nombre */}
                                <h2 className="font-serif text-base text-neutral-900 mb-2 line-clamp-2 leading-tight min-h-[2.5rem]">
                                    {product?.productName}
                                </h2>

                                {/* Color */}
                                {product?.color && (
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-[10px] uppercase tracking-wider text-neutral-500">Color:</span>
                                        <span className="text-xs text-neutral-700 capitalize">{product.color}</span>
                                    </div>
                                )}

                                {/* Tallas */}
                                {product?.sizes && product.sizes.length > 0 && (
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-[10px] uppercase tracking-wider text-neutral-500">Talla:</span>
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

                                {/* Precios */}
                                <div className="flex items-baseline gap-2 mb-4">
                                    <p className="text-neutral-900 font-semibold text-base">
                                        {displayINRCurrency(product?.sellingPrice)}
                                    </p>
                                    {product?.price !== product?.sellingPrice && (
                                        <p className="text-neutral-400 line-through text-xs">
                                            {displayINRCurrency(product?.price)}
                                        </p>
                                    )}
                                </div>

                                {/* Botones de Acción */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={(e) => handleAddToCart(e, product?._id)}
                                        className="flex-1 flex items-center justify-center gap-2 text-[10px] uppercase tracking-wider font-medium border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all duration-300 py-2.5 rounded-sm"
                                    >
                                        <FaShoppingBag className="text-xs" />
                                        Añadir
                                    </button>
                                    <Link
                                        to={"/product/" + product?._id}
                                        onClick={scrollTop}
                                        className="w-9 h-9 flex items-center justify-center border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white transition-all duration-300 rounded-sm"
                                    >
                                        <span className="text-xs font-medium">Ver</span>
                                    </Link>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))
            )}
        </div>
    )
}

export default VerticalCard
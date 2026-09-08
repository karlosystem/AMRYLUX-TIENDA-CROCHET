import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import productCategory from '../helpers/productCategory'
import VerticalCard from '../components/VerticalCard'
import SummaryApi from '../common'
import { FaFilter, FaSortAmountDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const CategoryProduct = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListinArray = urlSearch.getAll("category")

    const urlCategoryListObject = {}
    urlCategoryListinArray.forEach(el => {
        urlCategoryListObject[el] = true
    })

    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)
    const [filterCategoryList, setFilterCategoryList] = useState([])
    const [sortBy, setSortBy] = useState("")
    
    // Estados para paginación
    const [currentPage, setCurrentPage] = useState(1)
    const productsPerPage = 8

    const fetchData = async () => {
        setLoading(true)
        const response = await fetch(SummaryApi.filterProduct.url, {
            method: SummaryApi.filterProduct.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                category: filterCategoryList
            })
        })

        const dataResponse = await response.json()
        setData(dataResponse?.data || [])
        setLoading(false)
        setCurrentPage(1)
    }

    const handleSelectCategory = (e) => {
        const { name, value, checked } = e.target

        setSelectCategory((prev) => {
            return {
                ...prev,
                [value]: checked
            }
        })
    }

    useEffect(() => {
        fetchData()
    }, [filterCategoryList])

    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
            if (selectCategory[categoryKeyName]) {
                return categoryKeyName
            }
            return null
        }).filter(el => el)

        setFilterCategoryList(arrayOfCategory)

        const urlFormat = arrayOfCategory.map((el, index) => {
            if ((arrayOfCategory.length - 1) === index) {
                return `category=${el}`
            }
            return `category=${el}&&`
        })

        navigate("/product-category?" + urlFormat.join(""))
    }, [selectCategory, navigate])

    useEffect(() => {
        const urlSearch = new URLSearchParams(location.search)
        const urlCategoryListinArray = urlSearch.getAll("category")
        
        const urlCategoryListObject = {}
        urlCategoryListinArray.forEach(el => {
            urlCategoryListObject[el] = true
        })
        
        setSelectCategory(urlCategoryListObject)
    }, [location.search])

    const handleOnChangeSortBy = (e) => {
        const { value } = e.target
        setSortBy(value)

        if (value === 'asc') {
            setData(prev => [...prev].sort((a, b) => a.sellingPrice - b.sellingPrice))
        }

        if (value === 'dsc') {
            setData(prev => [...prev].sort((a, b) => b.sellingPrice - a.sellingPrice))
        }
    }

    // Lógica de paginación
    const totalPages = Math.ceil(data.length / productsPerPage)
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct)

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber)
        window.scrollTo({ top: 400, behavior: 'smooth' })
    }

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
            window.scrollTo({ top: 400, behavior: 'smooth' })
        }
    }

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
            window.scrollTo({ top: 400, behavior: 'smooth' })
        }
    }

    const getPageNumbers = () => {
        const pages = []
        const maxVisible = 5
        
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i)
                }
                pages.push('...')
                pages.push(totalPages)
            } else if (currentPage >= totalPages - 2) {
                pages.push(1)
                pages.push('...')
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i)
                }
            } else {
                pages.push(1)
                pages.push('...')
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i)
                }
                pages.push('...')
                pages.push(totalPages)
            }
        }
        
        return pages
    }

    //  GENERAR SEO DINÁMICO BASADO EN CATEGORÍAS SELECCIONADAS
    const getDynamicSEO = () => {
        const selectedCategories = Object.keys(selectCategory)
            .filter(cat => selectCategory[cat])
            .map(cat => cat.charAt(0).toUpperCase() + cat.slice(1))

        if (selectedCategories.length === 0) {
            return {
                title: "Colección Completa | AMRY LUXE - Ropa Crochet en Lima",
                description: "Descubre toda nuestra colección de prendas de crochet artesanales hechas a mano en Lima. Sweaters, tops, vestidos y más. Envíos a todo el Perú.",
                keywords: "ropa crochet lima, colección crochet, prendas artesanales, amry luxe"
            }
        }

        const categoriesText = selectedCategories.join(' y ')
        
        return {
            title: `${categoriesText} de Crochet en Lima | AMRY LUXE - Hecho a Mano`,
            description: `Explora nuestra colección de ${categoriesText.toLowerCase()} de crochet hechos a mano en Lima. Diseños exclusivos, materiales de calidad y confección artesanal. Envíos a todo el Perú.`,
            keywords: `${selectedCategories.join(', ').toLowerCase()} crochet lima, ${selectedCategories.join(' y ').toLowerCase()} artesanales, ropa crochet peru`
        }
    }

    const seo = getDynamicSEO()

    return (
        <>
            {/* SEO Dinámico con Helmet */}
            <Helmet>
                <title>{seo.title}</title>
                <meta name="description" content={seo.description} />
                <meta name="keywords" content={seo.keywords} />
                
                {/* Open Graph para redes sociales */}
                <meta property="og:title" content={seo.title} />
                <meta property="og:description" content={seo.description} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://amryluxe.com${location.pathname}${location.search}`} />
                <meta property="og:locale" content="es_PE" />
                
                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={seo.title} />
                <meta name="twitter:description" content={seo.description} />
                
                {/* Canonical URL */}
                <link rel="canonical" href={`https://amryluxe.com${location.pathname}${location.search}`} />
            </Helmet>

            <div className="bg-neutral-50 min-h-screen">
                {/* Header de Página */}
                <div className="bg-white border-b border-neutral-200 py-6">
                    <div className="container mx-auto px-4">
                        <h1 className="font-serif text-3xl md:text-4xl text-neutral-900 mb-2">
                            Colección
                        </h1>
                        <p className="text-sm text-neutral-500 tracking-wider uppercase">
                            Descubre nuestras prendas artesanales
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar - Filtros */}
                        <div className="lg:w-64 flex-shrink-0">
                            <div className="bg-white border border-neutral-200 p-6 sticky top-24">
                                {/* Título de Filtros */}
                                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-neutral-200">
                                    <FaFilter className="text-neutral-400" />
                                    <h3 className="font-medium text-neutral-900 uppercase tracking-wider text-sm">
                                        Filtrar Por
                                    </h3>
                                </div>

                                {/* Ordenar Por */}
                                <div className="mb-8">
                                    <div className="flex items-center gap-2 mb-4">
                                        <FaSortAmountDown className="text-neutral-400 text-sm" />
                                        <h4 className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
                                            Ordenar Por
                                        </h4>
                                    </div>

                                    <form className="flex flex-col gap-3">
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="sortBy"
                                                checked={sortBy === 'asc'}
                                                onChange={handleOnChangeSortBy}
                                                value="asc"
                                                className="w-4 h-4 border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                                            />
                                            <span className="text-sm text-neutral-700 group-hover:text-neutral-900 transition-colors">
                                                Precio: Menor a Mayor
                                            </span>
                                        </label>

                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="sortBy"
                                                checked={sortBy === 'dsc'}
                                                onChange={handleOnChangeSortBy}
                                                value="dsc"
                                                className="w-4 h-4 border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                                            />
                                            <span className="text-sm text-neutral-700 group-hover:text-neutral-900 transition-colors">
                                                Precio: Mayor a Menor
                                            </span>
                                        </label>
                                    </form>
                                </div>

                                {/* Categoría */}
                                <div>
                                    <h4 className="text-xs uppercase tracking-widest text-neutral-500 font-medium mb-4">
                                        Categoría
                                    </h4>

                                    <form className="flex flex-col gap-3">
                                        {productCategory.map((categoryName, index) => (
                                            <label key={index} className="flex items-center gap-3 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    name="category"
                                                    checked={selectCategory[categoryName?.value]}
                                                    value={categoryName?.value}
                                                    id={categoryName?.value}
                                                    onChange={handleSelectCategory}
                                                    className="w-4 h-4 border-neutral-300 rounded-sm text-neutral-900 focus:ring-neutral-900"
                                                />
                                                <span className="text-sm text-neutral-700 group-hover:text-neutral-900 transition-colors capitalize">
                                                    {categoryName?.label}
                                                </span>
                                            </label>
                                        ))}
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* Grid de Productos */}
                        <div className="flex-1">
                            {/* Contador y Paginación Superior */}
                            {data.length > 0 && (
                                <div className="bg-white border border-neutral-200 px-6 py-4 mb-6 flex items-center justify-between">
                                    <p className="text-neutral-900">
                                        Mostrando <span className="font-semibold">{indexOfFirstProduct + 1}</span> - <span className="font-semibold">{Math.min(indexOfLastProduct, data.length)}</span> de <span className="font-semibold">{data.length}</span> productos
                                    </p>
                                    
                                    {/* Paginación Superior */}
                                    {totalPages > 1 && (
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={prevPage}
                                                disabled={currentPage === 1}
                                                className={`w-9 h-9 flex items-center justify-center border transition-all duration-300 ${
                                                    currentPage === 1
                                                        ? 'border-neutral-200 text-neutral-300 cursor-not-allowed'
                                                        : 'border-neutral-300 text-neutral-700 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white'
                                                }`}
                                            >
                                                <FaChevronLeft className="text-xs" />
                                            </button>
                                            
                                            {getPageNumbers().map((page, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => typeof page === 'number' && goToPage(page)}
                                                    disabled={page === '...'}
                                                    className={`min-w-[36px] h-9 px-3 flex items-center justify-center text-xs transition-all duration-300 ${
                                                        page === currentPage
                                                            ? 'bg-neutral-900 text-white border border-neutral-900'
                                                            : page === '...'
                                                            ? 'text-neutral-400 cursor-default'
                                                            : 'border border-neutral-300 text-neutral-700 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white'
                                                    }`}
                                                >
                                                    {page}
                                                </button>
                                            ))}
                                            
                                            <button
                                                onClick={nextPage}
                                                disabled={currentPage === totalPages}
                                                className={`w-9 h-9 flex items-center justify-center border transition-all duration-300 ${
                                                    currentPage === totalPages
                                                        ? 'border-neutral-200 text-neutral-300 cursor-not-allowed'
                                                        : 'border-neutral-300 text-neutral-700 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white'
                                                }`}
                                            >
                                                <FaChevronRight className="text-xs" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Productos */}
                            <div className="min-h-[600px]">
                                <VerticalCard data={currentProducts} loading={loading} />
                            </div>

                            {/* Paginación Inferior */}
                            {totalPages > 1 && (
                                <div className="mt-8 flex justify-center">
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={prevPage}
                                            disabled={currentPage === 1}
                                            className={`w-10 h-10 flex items-center justify-center border transition-all duration-300 ${
                                                currentPage === 1
                                                    ? 'border-neutral-200 text-neutral-300 cursor-not-allowed'
                                                    : 'border-neutral-300 text-neutral-700 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white'
                                            }`}
                                        >
                                            <FaChevronLeft className="text-xs" />
                                        </button>
                                        
                                        {getPageNumbers().map((page, index) => (
                                            <button
                                                key={index}
                                                onClick={() => typeof page === 'number' && goToPage(page)}
                                                disabled={page === '...'}
                                                className={`min-w-[40px] h-10 px-3 flex items-center justify-center text-sm transition-all duration-300 ${
                                                    page === currentPage
                                                        ? 'bg-neutral-900 text-white border border-neutral-900'
                                                        : page === '...'
                                                        ? 'text-neutral-400 cursor-default'
                                                        : 'border border-neutral-300 text-neutral-700 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white'
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                        
                                        <button
                                            onClick={nextPage}
                                            disabled={currentPage === totalPages}
                                            className={`w-10 h-10 flex items-center justify-center border transition-all duration-300 ${
                                                currentPage === totalPages
                                                    ? 'border-neutral-200 text-neutral-300 cursor-not-allowed'
                                                    : 'border-neutral-300 text-neutral-700 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white'
                                            }`}
                                        >
                                            <FaChevronRight className="text-xs" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryProduct
import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import imagen1 from '../assest/home/pagina_72.png'
import imagen2 from '../assest/home/pagina_73.png'
import imagen3 from '../assest/home/pagina_74.png'

const EditorialSection = () => {
    return (
        <div className='bg-white py-12 md:py-16'>
            <div className='container mx-auto px-4'>
                {/* Contenido Editorial */}
                <div className='max-w-4xl mx-auto text-center mb-12'>
                    <h2 className='font-serif text-3xl md:text-4xl text-neutral-900 mb-4'>
                        Carteras de Junco Hechas a Mano
                    </h2>
                    <div className='w-20 h-px bg-neutral-300 mx-auto mb-6'></div>
                    <p className='text-neutral-600 leading-relaxed mb-8 text-sm md:text-base'>
                        Descubre nuestra exclusiva colección de carteras de junco tejidas artesanalmente 
                        por manos peruanas. Cada pieza es única, combinando técnicas tradicionales con 
                        diseños contemporáneos llenos de color y elegancia.
                    </p>
                    <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                        <Link
                            to='/product-category?category=bolso'
                            className='inline-flex items-center gap-2 bg-neutral-900 text-white px-8 py-3 text-xs uppercase tracking-widest hover:bg-neutral-800 transition-all'
                        >
                            Ver Colección
                            <FaArrowRight className='text-sm' />
                        </Link>
                        <Link
                            to='/about'
                            className='inline-flex items-center gap-2 border border-neutral-900 text-neutral-900 px-8 py-3 text-xs uppercase tracking-widest hover:bg-neutral-900 hover:text-white transition-all'
                        >
                            Nuestra Artesanía
                        </Link>
                    </div>
                </div>

                {/* Grid de Carteras de Junco */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6'>
                    {/* Cartera Elena - Multicolor */}
                    <div className='relative aspect-[4/5] overflow-hidden rounded-sm group'>
                        <img
                            src={imagen1}
                            alt='Cartera de Junco Elena Multicolor'
                            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6'>
                            <div className='text-white'>
                                <p className='text-xs uppercase tracking-widest mb-1'>Modelo Elena</p>
                                <p className='font-serif text-lg'>Colores Vibrantes</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Cartera Elena - Natural con Pompones */}
                    <div className='relative aspect-[4/5] overflow-hidden rounded-sm group'>
                        <img
                            src={imagen2}
                            alt='Cartera de Junco Elena Natural'
                            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6'>
                            <div className='text-white'>
                                <p className='text-xs uppercase tracking-widest mb-1'>Modelo Elena</p>
                                <p className='font-serif text-lg'>Pompones Decorativos</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Cartera Barbara - Natural con Pompones Rosas */}
                    <div className='relative aspect-[4/5] overflow-hidden rounded-sm group'>
                        <img
                            src={imagen3}
                            alt='Cartera de Junco Barbara'
                            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6'>
                            <div className='text-white'>
                                <p className='text-xs uppercase tracking-widest mb-1'>Modelo Barbara</p>
                                <p className='font-serif text-lg'>Toque Romántico</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Estadísticas */}
                <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-neutral-200'>
                    <div className='text-center'>
                        <p className='font-serif text-3xl md:text-4xl text-neutral-900 mb-1'>100%</p>
                        <p className='text-xs uppercase tracking-wider text-neutral-500'>Hecho a Mano</p>
                    </div>
                    <div className='text-center'>
                        <p className='font-serif text-3xl md:text-4xl text-neutral-900 mb-1'>Junco</p>
                        <p className='text-xs uppercase tracking-wider text-neutral-500'>Material Natural</p>
                    </div>
                    <div className='text-center'>
                        <p className='font-serif text-3xl md:text-4xl text-neutral-900 mb-1'>Lima</p>
                        <p className='text-xs uppercase tracking-wider text-neutral-500'>Hecho en Perú</p>
                    </div>
                    <div className='text-center'>
                        <p className='font-serif text-3xl md:text-4xl text-neutral-900 mb-1'>2026</p>
                        <p className='text-xs uppercase tracking-wider text-neutral-500'>Colección Verano</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditorialSection
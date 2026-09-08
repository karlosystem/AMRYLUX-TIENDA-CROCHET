import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Importar imágenes del Slider A
import sliderA01 from "../assest/banner/sliderA_01.png";
import sliderA02 from "../assest/banner/sliderA_02.png";
import sliderA03 from "../assest/banner/sliderA_03.png";

// Importar imágenes del Slider B
import sliderB01 from "../assest/banner/sliderB_01.png";
import sliderB02 from "../assest/banner/sliderB_02.png";
import sliderB03 from "../assest/banner/sliderB_03.png";

// Importar imágenes del Slider C
import sliderC01 from "../assest/banner/sliderC_01.png";
import sliderC02 from "../assest/banner/sliderC_02.png";
import sliderC03 from "../assest/banner/sliderC_03.png";

const BannerProduct = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Declarar el estado de slides
  const [slides, setSlides] = useState([
    {
      id: 1,
      title: "Nueva Colección 2026",
      subtitle: "Tejidos Artesanales con Estilo",
      cta: "Ver Colección",
      images: [sliderA01, sliderA02, sliderA03],
      currentImageIndex: 0,
    },
    {
      id: 2,
      title: "Crochet Premium",
      subtitle: "Diseños Exclusivos AMRYLUXE",
      cta: "Comprar Ahora",
      images: [sliderB01, sliderB02, sliderB03],
      currentImageIndex: 0,
    },
    {
      id: 3,
      title: "Tendencia que Impone Glamour",
      subtitle: "Edición Limitada",
      cta: "Descubrir Más",
      images: [sliderC01, sliderC02, sliderC03],
      currentImageIndex: 0,
    },
  ]);

  // Auto-avance del slide principal cada 6 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Auto-avance de imágenes dentro de cada slide cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setSlides((prevSlides) =>
        prevSlides.map((slide) => ({
          ...slide,
          currentImageIndex:
            slide.currentImageIndex === slide.images.length - 1
              ? 0
              : slide.currentImageIndex + 1,
        }))
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="bg-neutral-50 py-8 md:py-12 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Contenedor Principal del Carrusel */}
        <div className="relative">
          {/* Slides */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide) => (
                <div key={slide.id} className="w-full flex-shrink-0">
                  <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    {/* Lado Izquierdo: Texto */}
                    <div className="md:w-1/2 text-center md:text-left px-4 md:px-8">
                      <p className="text-[10px] md:text-xs tracking-[0.3em] text-neutral-500 mb-3 uppercase">
                        {slide.subtitle}
                      </p>
                      <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-neutral-900 mb-6 md:mb-8 leading-tight">
                        {slide.title}
                      </h1>
                      <Link
                        to="/shop"
                        className="inline-block bg-neutral-900 text-white px-8 md:px-10 py-3 md:py-4 text-[10px] md:text-xs tracking-[0.25em] uppercase hover:bg-neutral-800 transition-all duration-300 hover:shadow-lg"
                      >
                        {slide.cta}
                      </Link>
                    </div>

                    {/* Lado Derecho: Imágenes con efecto carrusel */}
                    <div className="md:w-1/2 relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden bg-white">
                      <div className="relative w-full h-full">
                        {slide.images.map((image, index) => (
                          <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ${
                              index === slide.currentImageIndex
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          >
                            <img
                              src={image}
                              alt={`${slide.title} - Imagen ${index + 1}`}
                              className="w-full h-full object-contain object-center"
                            />
                          </div>
                        ))}
                      </div>

                      {/* Indicadores de imágenes dentro del slide */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {slide.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() =>
                              setSlides((prev) =>
                                prev.map((s, i) =>
                                  i === currentSlide
                                    ? { ...s, currentImageIndex: index }
                                    : s
                                )
                              )
                            }
                            className={`w-1.5 h-1.5 rounded-full transition-all ${
                              index === slide.currentImageIndex
                                ? "bg-neutral-900 w-4"
                                : "bg-neutral-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Flechas de Navegación - Elegantes y minimalistas */}
          <button
            onClick={prevSlide}
            className="absolute left-0 md:left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm border border-neutral-200 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 flex items-center justify-center transition-all duration-300 shadow-sm z-10"
            aria-label="Anterior"
          >
            <FaChevronLeft className="text-xs md:text-sm" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 md:right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm border border-neutral-200 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 flex items-center justify-center transition-all duration-300 shadow-sm z-10"
            aria-label="Siguiente"
          >
            <FaChevronRight className="text-xs md:text-sm" />
          </button>

          {/* Indicadores de Slide */}
          <div className="flex justify-center gap-3 mt-6 md:mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-px md:h-0.5 transition-all duration-500 ${
                  index === currentSlide
                    ? "w-12 md:w-16 bg-neutral-900"
                    : "w-6 md:w-8 bg-neutral-300 hover:bg-neutral-400"
                }`}
                aria-label={`Ir al slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
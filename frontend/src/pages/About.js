import React from "react";
import { Link } from "react-router-dom";
import banner from "../assest/nosotros/banner.png";
import irma from "../assest/nosotros/irma-acerca.webp";
import nosotros from "../assest/nosotros/nosotros.webp";
import { FaHeart, FaAward, FaUsers, FaGlobe } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>Sobre AMRY LUXE | Marca de Ropa Crochet Peruana en Lima</title>
        <meta
          name="description"
          content="Conoce AMRY LUXE, marca peruana de ropa crochet artesanal en Lima desde 2016. Compromiso con la calidad, diseño exclusivo y trabajo artesanal. Cada prenda cuenta una historia de amor y dedicación."
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
            <span className="text-neutral-900">Nosotros</span>
          </nav>
        </div>
      </div>

      {/* Banner Principal */}
      <div className="w-full bg-neutral-100 py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <img
              src={banner}
              alt="AMRY LUXE - Tendencia que Impone Glamour"
              className="max-w-full h-auto max-h-[300px] object-contain"
            />
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        {/* Título */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl lg:text-5xl text-neutral-900 mb-4">
            Acerca De
          </h1>
          <div className="w-24 h-px bg-neutral-300 mx-auto"></div>
        </div>

        {/* Historia de la Marca */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
            <div>
              <img
                src={nosotros}
                alt="Sobre AMRY LUXE"
                className="w-full h-auto rounded-sm shadow-md"
              />
            </div>
            <div className="space-y-4 text-neutral-600 leading-relaxed">
              <p className="text-sm">
                <strong className="text-neutral-900">AMRY LUXE</strong> es una
                marca peruana reconocida a nivel nacional que nace en el año
                2016 buscando satisfacer la demanda de prendas de crochet de la
                más alta calidad en acabado y diseño.
              </p>
              <p className="text-sm">
                Nuestro compromiso con la excelencia se refleja en cada costura,
                textura y diseño, ofreciendo prendas que no solo complementan tu
                look, sino que también cuentan con una historia de lujo,
                funcionalidad y artesanía.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-neutral-600 leading-relaxed">
            <p className="text-sm">
              Desde nuestros comienzos en 2016, hemos puesto pasión en ofrecer
              una colección de productos que potencien tu estilo y te hagan
              sentir bien. Somos un aliado de la moda y comodidad para cada
              cliente que busca regalarse o regalar con amor.
            </p>
            <p className="text-sm">
              Nuestra esencia se encuentra en el trabajo artesanal, utilizando
              materiales genuinos cuidadosamente seleccionados para garantizar
              productos que reflejen sofisticación y durabilidad. Creemos que
              cada prenda es una extensión de la personalidad de quien la lleva,
              y nos esforzamos por diseñar piezas únicas que cuenten historias.
            </p>
            <p className="text-sm">
              Nos motiva la idea de ser parte de tus momentos más importantes,
              acompañándote con accesorios que realzan tu esencia y te inspiran
              a destacar.
            </p>
          </div>
        </div>

        {/* Equipo Directivo */}
        <div className="mb-16">
          <h2 className="font-serif text-3xl text-neutral-900 text-center mb-10">
            Nuestro Equipo
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Irma Huamanchari */}
            <div className="text-center">
              <div className="overflow-hidden rounded-sm shadow-md mb-4">
                <img
                  src={irma}
                  alt="Irma Huamanchari - Gerente General"
                  className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-medium text-neutral-900 text-lg">
                Irma Huamanchari
              </h3>
              <p className="text-sm text-neutral-500 uppercase tracking-wider mt-1">
                Gerente General
              </p>
            </div>

            {/* José Manuel Quispe Acosta */}
            <div className="text-center">
              <div className="overflow-hidden rounded-sm shadow-md mb-4 bg-neutral-200">
                <div className="w-full h-[400px] flex items-center justify-center text-neutral-400">
                  <span className="text-sm">Foto Próximamente</span>
                </div>
              </div>
              <h3 className="font-medium text-neutral-900 text-lg">
                José Manuel Quispe Acosta
              </h3>
              <p className="text-sm text-neutral-500 uppercase tracking-wider mt-1">
                Gerente Comercial
              </p>
            </div>
          </div>
        </div>

        {/* Visión y Misión */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
          {/* Visión */}
          <div className="bg-neutral-50 p-8 rounded-sm border border-neutral-200">
            <h3 className="font-serif text-2xl text-neutral-900 mb-4 uppercase tracking-wide">
              Visión
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Lograr, producir y tangibilizar en nuestra clientela sensaciones
              de glamour y exclusividad a través de prendas tejidas a crochet y
              afines de puro material genuino capaces de recorrer el mundo
              imponiendo un sentir de vanguardia.
            </p>
          </div>

          {/* Misión */}
          <div className="bg-neutral-50 p-8 rounded-sm border border-neutral-200">
            <h3 className="font-serif text-2xl text-neutral-900 mb-4 uppercase tracking-wide">
              Misión
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Brindar colecciones únicas que resalte el perfil sensual y
              profesional de nuestros clientes merecedores de una excelente
              atención.
            </p>
          </div>
        </div>

        {/* Valores */}
        <div className="max-w-3xl mx-auto mb-16">
          <h3 className="font-serif text-2xl text-neutral-900 text-center mb-8">
            Nuestros Valores
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-neutral-100 rounded-full flex items-center justify-center">
                <FaAward className="text-2xl text-neutral-600" />
              </div>
              <p className="text-xs font-medium text-neutral-900">
                Productos de alta calidad
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-neutral-100 rounded-full flex items-center justify-center">
                <FaHeart className="text-2xl text-neutral-600" />
              </div>
              <p className="text-xs font-medium text-neutral-900">
                Finos accesorios
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-neutral-100 rounded-full flex items-center justify-center">
                <FaAward className="text-2xl text-neutral-600" />
              </div>
              <p className="text-xs font-medium text-neutral-900">
                Diseños únicos
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-neutral-100 rounded-full flex items-center justify-center">
                <FaHeart className="text-2xl text-neutral-600" />
              </div>
              <p className="text-xs font-medium text-neutral-900">
                100% cuero genuino
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-neutral-100 rounded-full flex items-center justify-center">
                <FaAward className="text-2xl text-neutral-600" />
              </div>
              <p className="text-xs font-medium text-neutral-900">
                Calidad superior
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-neutral-100 rounded-full flex items-center justify-center">
                <FaHeart className="text-2xl text-neutral-600" />
              </div>
              <p className="text-xs font-medium text-neutral-900">
                Diseño exclusivo
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-neutral-100 rounded-full flex items-center justify-center">
                <FaUsers className="text-2xl text-neutral-600" />
              </div>
              <p className="text-xs font-medium text-neutral-900">
                Versatilidad
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-neutral-100 rounded-full flex items-center justify-center">
                <FaGlobe className="text-2xl text-neutral-600" />
              </div>
              <p className="text-xs font-medium text-neutral-900">
                Lujo accesible
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

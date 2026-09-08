import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaPinterestP, FaWhatsapp, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import mastercardLogo from '../assest/home/master_card.webp';
import libroReclamacionesLogo from '../assest/home/logo_libro_reclamaciones.webp';
import yapeLogo from '../assest/home/yape.png';

const Footer = () => {
  return (
    <footer className='bg-[#111111] text-gray-400 text-sm mt-20'>
      
      {/* Barra Superior - Newsletter */}
      <div className='border-b border-neutral-800'>
        <div className='container mx-auto px-6 py-10'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
            <div className='text-center md:text-left'>
              <h3 className='text-white font-serif text-xl tracking-wide mb-1'>
                Únete a Nuestra Comunidad
              </h3>
              <p className='text-xs text-gray-500'>
                Recibe novedades, ofertas exclusivas y tendencias crochet.
              </p>
            </div>
            <div className='flex w-full md:w-auto gap-2'>
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className='flex-1 md:w-72 px-4 py-3 bg-neutral-900 border border-neutral-700 text-white text-xs tracking-wider placeholder-gray-600 focus:outline-none focus:border-neutral-500 transition-colors'
              />
              <button className='px-6 py-3 bg-white text-neutral-900 text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-neutral-200 transition-colors'>
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenedor Principal de Columnas */}
      <div className='container mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
        
        {/* Columna 1: Sobre la Marca */}
        <div className='flex flex-col gap-4'>
          <h3 className='text-white font-serif text-xl tracking-[3px] font-semibold uppercase'>
            AMRYLUXE
          </h3>
          <p className='text-xs leading-relaxed text-gray-500'>
            Inspirando elegancia, sofisticación y confianza en cada prenda. 
            Diseños exclusivos de crochet artesanal pensados para la mujer contemporánea.
          </p>
          
          {/* Información de Contacto */}
          <div className='flex flex-col gap-3 mt-2'>
            <div className='flex items-start gap-3'>
              <FaMapMarkerAlt className='text-neutral-500 mt-0.5 flex-shrink-0' />
              <span className='text-xs text-gray-500 leading-relaxed'>
                Jr. Maximiliano Velarde 171,<br />Surco, Lima - Perú
              </span>
            </div>
            <a href="mailto:contacto@amryluxe.com" className='flex items-center gap-3 hover:text-white transition-colors group'>
              <FaEnvelope className='text-neutral-500 group-hover:text-white transition-colors' />
              <span className='text-xs text-gray-500 group-hover:text-white'>
                contacto@amryluxe.com
              </span>
            </a>
            <a href="https://wa.me/51994148453" target="_blank" rel="noreferrer" className='flex items-center gap-3 hover:text-white transition-colors group'>
              <FaPhone className='text-neutral-500 group-hover:text-white transition-colors' />
              <span className='text-xs text-gray-500 group-hover:text-white'>
                +51 994 148 453
              </span>
            </a>
          </div>
        </div>

        {/* Columna 2: Colecciones */}
        <div className='flex flex-col gap-4'>
          <h4 className='text-white font-medium tracking-[0.2em] uppercase text-xs'>
            Colecciones
          </h4>
          <div className='flex flex-col gap-3'>
            <Link to="/product-category?category=sweater" className='hover:text-white transition-colors text-xs text-gray-500 hover:pl-1 duration-300'>
              Sweaters
            </Link>
            <Link to="/product-category?category=top" className='hover:text-white transition-colors text-xs text-gray-500 hover:pl-1 duration-300'>
              Tops & Blusas
            </Link>
            <Link to="/product-category?category=vestido" className='hover:text-white transition-colors text-xs text-gray-500 hover:pl-1 duration-300'>
              Vestidos
            </Link>
            <Link to="/ofertas" className='hover:text-white transition-colors text-xs text-gray-500 hover:pl-1 duration-300'>
              Ofertas Especiales
            </Link>
            <Link to="/product-category?category=enteriso" className='hover:text-white transition-colors text-xs text-gray-500 hover:pl-1 duration-300'>
              Enterizos
            </Link>
          </div>
        </div>

        {/* Columna 3: Asistencia */}
        <div className='flex flex-col gap-4'>
          <h4 className='text-white font-medium tracking-[0.2em] uppercase text-xs'>
            Asistencia
          </h4>
          <div className='flex flex-col gap-3'>
            <Link to="/contact" className='hover:text-white transition-colors text-xs text-gray-500 hover:pl-1 duration-300'>
              Contáctenos
            </Link>
            <Link to="/about" className='hover:text-white transition-colors text-xs text-gray-500 hover:pl-1 duration-300'>
              Sobre Nosotros
            </Link>
            <a href="https://wa.me/51994148453?text=Hola%20AMRYLUXE,%20necesito%20ayuda%20con%20mi%20talla" target="_blank" rel="noreferrer" className='hover:text-white transition-colors text-xs text-gray-500 hover:pl-1 duration-300'>
              Guía de Tallas
            </a>
            <a href="https://wa.me/51994148453?text=Hola%20AMRYLUXE,%20quiero%20información%20sobre%20envíos" target="_blank" rel="noreferrer" className='hover:text-white transition-colors text-xs text-gray-500 hover:pl-1 duration-300'>
              Envíos & Devoluciones
            </a>
            <a href="https://wa.me/51994148453?text=Hola%20AMRYLUXE,%20tengo%20una%20consulta" target="_blank" rel="noreferrer" className='hover:text-white transition-colors text-xs text-gray-500 hover:pl-1 duration-300'>
              Preguntas Frecuentes
            </a>
          </div>
        </div>

        {/* Columna 4: Métodos de Pago & Redes */}
        <div className='flex flex-col gap-4'>
          <h4 className='text-white font-medium tracking-[0.2em] uppercase text-xs'>
            Métodos de Pago
          </h4>
          
          {/* Logos de Pago */}
          <div className='flex items-center gap-3 flex-wrap'>
            <div className='bg-white rounded-sm p-2 w-14 h-9 flex items-center justify-center'>
              <img src={mastercardLogo} alt="MasterCard" className='max-w-full max-h-full object-contain' />
            </div>
            <div className='bg-white rounded-sm p-2 w-14 h-9 flex items-center justify-center'>
              <img src={yapeLogo} alt="Yape" className='max-w-full max-h-full object-contain' />
            </div>
          </div>

          {/* Libro de Reclamaciones */}
          <div className='mt-4'>
            <a 
              href="https://www.libroderclamaciones.gob.pe" 
              target="_blank" 
              rel="noreferrer"
              className='inline-block bg-white rounded-sm p-2 hover:opacity-90 transition-opacity'
              title="Libro de Reclamaciones Virtual"
            >
              <img 
                src={libroReclamacionesLogo} 
                alt="Libro de Reclamaciones Virtual" 
                className='h-12 w-auto object-contain'
              />
            </a>
          </div>

          {/* Redes Sociales */}
          <div className='mt-4'>
            <h4 className='text-white font-medium tracking-[0.2em] uppercase text-xs mb-3'>
              Síguenos
            </h4>
            <div className='flex items-center gap-3'>
              <a 
                href="https://instagram.com/amryluxe" 
                target="_blank" 
                rel="noreferrer" 
                className='w-9 h-9 flex items-center justify-center border border-neutral-700 text-neutral-400 hover:border-white hover:text-white hover:bg-white hover:text-neutral-900 transition-all duration-300'
                title="Instagram"
              >
                <FaInstagram className='text-sm' />
              </a>
              <a 
                href="https://facebook.com/amryluxe" 
                target="_blank" 
                rel="noreferrer" 
                className='w-9 h-9 flex items-center justify-center border border-neutral-700 text-neutral-400 hover:border-white hover:text-white hover:bg-white hover:text-neutral-900 transition-all duration-300'
                title="Facebook"
              >
                <FaFacebookF className='text-sm' />
              </a>
              <a 
                href="https://pinterest.com/amryluxe" 
                target="_blank" 
                rel="noreferrer" 
                className='w-9 h-9 flex items-center justify-center border border-neutral-700 text-neutral-400 hover:border-white hover:text-white hover:bg-white hover:text-neutral-900 transition-all duration-300'
                title="Pinterest"
              >
                <FaPinterestP className='text-sm' />
              </a>
              <a 
                href="https://wa.me/51994148453" 
                target="_blank" 
                rel="noreferrer" 
                className='w-9 h-9 flex items-center justify-center border border-neutral-700 text-neutral-400 hover:border-green-500 hover:text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300'
                title="WhatsApp"
              >
                <FaWhatsapp className='text-sm' />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Línea Divisoria Inferior */}
      <div className='border-t border-neutral-800'>
        <div className='container mx-auto px-6 py-5'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-3'>
            <p className='text-[10px] text-neutral-600 tracking-widest uppercase text-center md:text-left'>
              © 2026 AMRYLUXE — Todos los derechos reservados.
            </p>
            <div className='flex items-center gap-4 text-[10px] text-neutral-600'>
              <a href="#" className='hover:text-white transition-colors'>Términos y Condiciones</a>
              <span className='text-neutral-800'>|</span>
              <a href="#" className='hover:text-white transition-colors'>Política de Privacidad</a>
              <span className='text-neutral-800'>|</span>
              <a href="#" className='hover:text-white transition-colors'>Libro de Reclamaciones</a>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
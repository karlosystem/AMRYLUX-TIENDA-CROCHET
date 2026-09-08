import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';

const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // Mostrar el botón con animación después de 2 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Ocultar el tooltip automáticamente después de 8 segundos
  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  const phoneNumber = '51994148453';
  const message = encodeURIComponent('Hola AMRYLUXE, necesito ayuda con mi compra.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  const handleCloseTooltip = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowTooltip(false);
  };

  return (
    <div className='fixed bottom-6 right-6 z-50 flex items-end gap-3 flex-row-reverse'>
      {/* Tooltip tipo nube */}

      {/* Tooltip tipo nube */}
{showTooltip && (
  <div className='relative animate-slideInRight'>
    <div className='bg-white border border-neutral-200 rounded-lg shadow-2xl px-5 py-3 max-w-[220px] relative'>
      {/* Pico de la nube (ahora apuntando hacia la derecha) */}
      <div className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1.5 w-0 h-0 border-t-[8px] border-t-transparent border-r-[10px] border-r-white border-b-[8px] border-b-transparent'></div>
      <div className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[7px] w-0 h-0 border-t-[9px] border-t-transparent border-r-[11px] border-r-neutral-200 border-b-[9px] border-b-transparent -z-10'></div>
      
      {/* Contenido */}
      <div className='flex items-start gap-2'>
        <button
          onClick={handleCloseTooltip}
          className='text-neutral-400 hover:text-neutral-700 transition-colors flex-shrink-0'
          aria-label='Cerrar'
        >
          <FaTimes className='text-xs' />
        </button>
        <div className='flex-1'>
          <p className='text-sm font-medium text-neutral-900 leading-tight mb-1'>
            ¿Necesitas Ayuda?
          </p>
          <p className='text-[11px] text-neutral-500 leading-snug'>
            Escríbenos por WhatsApp y te atenderemos al instante.
          </p>
        </div>
      </div>
    </div>
  </div>
)}

      {/* Botón de WhatsApp */}
      <a
        href={whatsappUrl}
        target='_blank'
        rel='noreferrer'
        onMouseEnter={() => setShowTooltip(true)}
        className={`group relative transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        aria-label='Contactar por WhatsApp'
      >
        {/* Anillo pulsante */}
        <span className='absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30'></span>
        
        {/* Botón principal */}
        <div className='relative w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 hover:shadow-green-500/50 transition-all duration-300 group-hover:from-green-600 group-hover:to-green-700'>
          <FaWhatsapp className='text-white text-2xl md:text-3xl' />
        </div>
        
        {/* Indicador de estado online */}
        <span className='absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full'></span>
      </a>
    </div>
  );
};

export default WhatsAppButton;
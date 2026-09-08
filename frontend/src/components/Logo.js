import React from 'react';
// Importamos tu logo real desde la carpeta de recursos
import AmryluxeLogo from '../assest/logo.png'; 

const Logo = ({ w, h }) => {
  return (
    <div className="flex items-center">
      <img 
        src={AmryluxeLogo} 
        alt="AMRYLUXE Logo" 
        style={{ width: w ? `${w}px` : 'auto', height: h ? `${h}px` : 'auto' }}
        className="object-contain"
      />
    </div>
  );
};

export default Logo;
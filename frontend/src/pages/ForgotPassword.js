import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegEnvelope, FaChevronLeft } from "react-icons/fa";
import Logo from "../components/Logo"; // Importamos tu logo reutilizable

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enviando enlace de recuperación para:", email);
    // Aquí se conectará la API del backend para enviar el token de restablecimiento
  };

  return (
    <section id="forgot-password" className="min-h-[85vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Contenedor Principal de Doble Columna */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* COLUMNA IZQUIERDA: Identidad de Marca y Mensaje de Seguridad */}
        <div className="bg-[#111111] text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
          {/* Decoración geométrica sutil de fondo */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-neutral-900 rounded-full blur-2xl opacity-50 transform translate-x-10 -translate-y-10"></div>
          
          <div>
            {/* Logo de la marca con filtro invertido para fondo oscuro */}
            <div className="mb-8 filter invert brightness-200">
              <Logo w={150} h={55} />
            </div>
            
            <h2 className="text-2xl font-serif tracking-[2px] uppercase mb-4 text-neutral-100">
              Recuperación de Credenciales
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed mb-6 font-light">
              La seguridad de tu perfil privado es nuestra prioridad. Si has olvidado tu clave de acceso, nuestro sistema automatizado te guiará para restablecerla de forma inmediata y segura.
            </p>
            
            <div className="border-l border-neutral-700 pl-4 mt-6">
              <p className="text-xs text-neutral-400 italic font-light">
                "Diseñamos un entorno protegido para que tu experiencia de alta costura digital sea siempre impecable."
              </p>
            </div>
          </div>

          {/* Eslogan en la base de la columna */}
          <div className="mt-8 md:mt-0 pt-6 border-t border-neutral-800 text-xs text-neutral-500 tracking-wider uppercase">
            Tendencia que Impone Glamour
          </div>
        </div>

        {/* COLUMNA DERECHA: El Formulario */}
        <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
          
          {/* Botón sutil para regresar al Login */}
          <div className="mb-6">
            <Link to="/login" className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-black transition-colors group">
              <FaChevronLeft className="transform group-hover:-translate-x-0.5 transition-transform" />
              Volver al inicio de sesión
            </Link>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-medium text-gray-900 tracking-wide">¿Olvidaste tu contraseña?</h3>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              Introduce la dirección de correo electrónico vinculada a tu cuenta. Te enviaremos un enlace de verificación para restablecer tus credenciales.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Input de Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                Correo Electrónico
              </label>
              <div className="border-b-2 border-gray-200 focus-within:border-black transition-colors py-1.5 flex items-center justify-between">
                <input
                  type="email"
                  placeholder="ejemplo@amryluxe.com"
                  name="email"
                  value={email}
                  onChange={handleOnChange}
                  className="w-full outline-none bg-transparent text-sm text-gray-800 placeholder-gray-300"
                  required
                />
                <FaRegEnvelope className="text-gray-300 text-base" />
              </div>
            </div>

            {/* Botón de Envío Premium */}
            <button className="w-full bg-[#111111] hover:bg-neutral-800 text-white py-3 text-xs tracking-[2px] uppercase font-medium rounded-md transition-all shadow-md hover:shadow-lg mt-4 transform active:scale-[0.98]">
              Enviar enlace de recuperación
            </button>
          </form>

          {/* Soporte adicional en la base */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">
              ¿Tienes problemas para recibir el correo? <br />
              Contacta a nuestro{" "}
              <Link to="/contacto" className="text-black font-semibold hover:underline">
                Soporte Premium
              </Link>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ForgotPassword;
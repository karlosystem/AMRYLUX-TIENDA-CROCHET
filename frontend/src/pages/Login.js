import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaRegCheckCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo"; // Importamos tu logo reutilizable
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from '../context';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.signIn.url,{
            method : SummaryApi.signIn.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })
        const dataApi = await dataResponse.json()

        if(dataApi.success){
            toast.success(dataApi.message)            
            navigate('/')
            fetchUserDetails()
            fetchUserAddToCart() // Llamada para actualizar el contador de productos en el carrito
        }

        if(dataApi.error){
            toast.error(dataApi.message)
        }
  };

  return (
    <section id="login" className="min-h-[85vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Contenedor Principal de Doble Columna */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* COLUMNA IZQUIERDA: Identidad de Marca y Beneficios (Estilo Editorial de Moda) */}
        <div className="bg-[#111111] text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
          {/* Decoración geométrica sutil de fondo */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-neutral-900 rounded-full blur-2xl opacity-50 transform translate-x-10 -translate-y-10"></div>
          
          <div>
            {/* Logo de la marca centrado en el bloque */}
            <div className="mb-8 filter invert brightness-200">
              <Logo w={150} h={55} />
            </div>
            
            <h2 className="text-2xl font-serif tracking-[2px] uppercase mb-4 text-neutral-100">
              Panel de Control Privado
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed mb-8 font-light">
              Bienvenida a tu espacio exclusivo. Desde aquí podrás gestionar tus órdenes premium, configurar tus preferencias de estilo y agilizar tus adquisiciones.
            </p>
            
            {/* Lista de beneficios con diseño minimalista */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold tracking-widest text-neutral-300 uppercase mb-2">
                Beneficios de ser Miembro:
              </h3>
              
              <div className="flex items-start gap-3 text-sm">
                <FaRegCheckCircle className="text-neutral-400 mt-1 flex-shrink-0" />
                <p className="text-neutral-300 font-light">Acceso inmediato a colecciones cápsula y lanzamientos privados.</p>
              </div>
              
              <div className="flex items-start gap-3 text-sm">
                <FaRegCheckCircle className="text-neutral-400 mt-1 flex-shrink-0" />
                <p className="text-neutral-300 font-light">Historial de compras centralizado y seguimiento prioritario en tiempo real.</p>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <FaRegCheckCircle className="text-neutral-400 mt-1 flex-shrink-0" />
                <p className="text-neutral-300 font-light">Invitaciones exclusivas a eventos de preventa de temporada.</p>
              </div>
            </div>
          </div>

          {/* Mensaje de cierre en la base de la columna */}
          <div className="mt-8 md:mt-0 pt-6 border-t border-neutral-800 text-xs text-neutral-500 tracking-wider uppercase">
            Tendencia que Impone Glamour
          </div>
        </div>

        {/* COLUMNA DERECHA: El Formulario Elegante */}
        <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
          <div className="mb-6">
            <h3 className="text-xl font-medium text-gray-900 tracking-wide">Iniciar Sesión</h3>
            <p className="text-xs text-gray-500 mt-1">Por favor, introduce tus credenciales de acceso.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            
            {/* Input de Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                Correo Electrónico
              </label>
              <div className="border-b-2 border-gray-200 focus-within:border-black transition-colors py-1.5">
                <input
                  type="email"
                  placeholder="ejemplo@amryluxe.com"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  className="w-full outline-none bg-transparent text-sm text-gray-800 placeholder-gray-300"
                  required
                />
              </div>
            </div>

            {/* Input de Contraseña */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Contraseña
                </label>
                <Link to="/forgot-password" className="text-xs text-gray-400 hover:text-black hover:underline transition-all">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="border-b-2 border-gray-200 focus-within:border-black transition-colors py-1.5 flex items-center justify-between">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  className="w-full outline-none bg-transparent text-sm text-gray-800 placeholder-gray-300 tracking-wide"
                  required
                />
                <button
                  type="button"
                  className="cursor-pointer text-gray-400 hover:text-black transition-colors pl-2" 
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Botón de Envío Premium */}
            <button className="w-full bg-[#111111] hover:bg-neutral-800 text-white py-3 text-xs tracking-[2px] uppercase font-medium rounded-md transition-all shadow-md hover:shadow-lg mt-4 transform active:scale-[0.98]">
              Acceder al panel
            </button>
          </form>

          {/* Sección inferior para ir al Registro */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              ¿Eres nueva en la firma?{" "}
              <Link to="/sign-up" className="text-black font-semibold hover:underline ml-1">
                Crear una cuenta gratis
              </Link>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Login;

/* 2. useState (El Hook de Estado Local)
Es la herramienta que le permite a tus componentes recordar cosas. En React, si una variable cambia, la pantalla no se actualiza sola. Necesitas usar useState para crear variables especiales que, al cambiar de valor, le ordenen a React volver a dibujar (renderizar) el componente en el navegador.

Ejemplo en tu E-commerce: Lo usarás para saber si un menú desplegable está abierto o cerrado (true o false), o para guardar el texto que el usuario escribe en la barra de búsqueda mientras escribe.

3. useContext (El Hook de Estado Global)
Es la herramienta que sirve para compartir información entre muchos componentes sin importar qué tan lejos estén, evitando tener que pasar los datos manualmente de padre a hijo a través de props todo el tiempo.

Ejemplo en tu E-commerce (AMRYLUXE): Imagina que el usuario inicia sesión o agrega un producto al carrito en la página de catálogo. Con useContext, creas un "Contexto de Carrito" o "Contexto de Usuario". Así, tanto el Navbar (para mostrar el número de prendas en el carrito) como la pantalla de Checkout (para cobrar) pueden acceder a la misma lista de productos e información del cliente instantáneamente.

En resumen, con esa sola línea estás preparando tu componente para que pueda renderizar contenido, manejar datos dinámicos internos (useState) y conectarse a la información global de tu aplicación (useContext). */

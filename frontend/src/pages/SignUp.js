import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaCamera, FaRegCheckCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../helpers/imageTobase64";
import loginIcons from "../assest/signin.gif";
import Logo from "../components/Logo"; // Tu logo reutilizable
import SummaryApi from "../common";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profilePic, setProfilePic] = useState(loginIcons);

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePic: '',
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];

    const imagePic = await imageTobase64(file);

    setData((preve) => {
      return {
        ...preve,
        profilePic: imagePic,
      };
    });
  };

const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      try {
        const dataResponse = await fetch(SummaryApi.signUP.url, {
          method: SummaryApi.signUP.method,
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        });
        
        const dataApi = await dataResponse.json();
        
        // ESTO TE DIRÁ EN CONSOLA QUÉ VIENE DEL BACKEND:
        console.log("Respuesta exacta del servidor:", dataApi);
        
        if (dataApi.success) {
          toast.success(dataApi.message);
          
          // Redirige al login después de 2 segundos
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
  
        if (dataApi.error) {
          toast.error(dataApi.message);
        }
      } catch (error) {
        console.error("Error en la petición:", error);
        toast.error("Error al conectar con el servidor");
      }
    } else {
      toast.error("Por favor verificar su contraseña y la confirmacion");
    }
  };
  return (
    <section
      id="signup"
      className="min-h-[85vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="bg-[#111111] text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-neutral-900 rounded-full blur-2xl opacity-50 transform translate-x-10 -translate-y-10"></div>

          <div>
            <div className="mb-8 filter invert brightness-200">
              <Logo w={150} h={55} />
            </div>

            <h2 className="text-2xl font-serif tracking-[2px] uppercase mb-4 text-neutral-100">
              Crea una cuenta exclusiva
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed mb-8 font-light">
              Únete al universo AMRYLUXE. Al registrarte, desbloqueas una
              experiencia de adquisición personalizada diseñada a la medida de
              tus expectativas.
            </p>

            <div className="space-y-4">
              <h3 className="text-xs font-semibold tracking-widest text-neutral-300 uppercase mb-2">
                Privilegios de tu perfil:
              </h3>

              <div className="flex items-start gap-3 text-sm">
                <FaRegCheckCircle className="text-neutral-400 mt-1 flex-shrink-0" />
                <p className="text-neutral-300 font-light">
                  Pasarela de pago agilizada con cifrado de seguridad premium.
                </p>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <FaRegCheckCircle className="text-neutral-400 mt-1 flex-shrink-0" />
                <p className="text-neutral-300 font-light">
                  Seguimiento detallado de envíos nacionales e internacionales.
                </p>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <FaRegCheckCircle className="text-neutral-400 mt-1 flex-shrink-0" />
                <p className="text-neutral-300 font-light">
                  Soporte personalizado y canales de atención preferencial.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-0 pt-6 border-t border-neutral-800 text-xs text-neutral-500 tracking-wider uppercase">
            Tendencia que Impone Glamour
          </div>
        </div>

        <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
          <div className="mb-6 text-center md:text-left">
            <h3 className="text-xl font-medium text-gray-900 tracking-wide">
              Registrarse
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Completa tus datos para formar parte de nuestra firma.
            </p>
          </div>

          <div className="w-24 h-24 mx-auto relative group mb-6">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-neutral-200 bg-neutral-50 shadow-inner flex items-center justify-center">
              <img
                className="w-full h-full object-cover"
                src={data.profilePic || loginIcons}
                alt="login icons"
              />
            </div>
            <label className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-300">
              <FaCamera className="text-lg mb-0.5" />
              <span className="text-[10px] tracking-wide font-light uppercase">
                Subir
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleUploadPic}
                className="hidden"
              />
            </label>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                Nombre Completo
              </label>
              <div className="border-b-2 border-gray-200 focus-within:border-black transition-colors py-1">
                <input
                  type="text"
                  placeholder="Tu nombre aquí"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  className="w-full outline-none bg-transparent text-sm text-gray-800 placeholder-gray-300"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                Correo Electrónico
              </label>
              <div className="border-b-2 border-gray-200 focus-within:border-black transition-colors py-1">
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

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                Contraseña
              </label>
              <div className="border-b-2 border-gray-200 focus-within:border-black transition-colors py-1 flex items-center justify-between">
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

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                Confirmar Contraseña
              </label>
              <div className="border-b-2 border-gray-200 focus-within:border-black transition-colors py-1 flex items-center justify-between">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  className="w-full outline-none bg-transparent text-sm text-gray-800 placeholder-gray-300 tracking-wide"
                  required
                />
                <button
                  type="button"
                  className="cursor-pointer text-gray-400 hover:text-black transition-colors pl-2"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full bg-[#111111] hover:bg-neutral-800 text-white py-3 text-xs tracking-[2px] uppercase font-medium rounded-md transition-all shadow-md hover:shadow-lg mt-4 transform active:scale-[0.98]">
              Crear Cuenta Gratis
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              ¿Ya posees una cuenta?{" "}
              <Link
                to="/login"
                className="text-black font-semibold hover:underline ml-1"
              >
                Iniciar Sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;

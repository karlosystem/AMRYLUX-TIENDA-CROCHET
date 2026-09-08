import React, { useContext, useState, useEffect } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { 
  FaShoppingBag, 
  FaChevronDown,
  FaTruck,
  FaMapMarkerAlt,
  FaClock,
  FaPhoneAlt,
  FaTiktok,
  FaFacebookF,
  FaInstagram
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify'
import { setUserDetails } from '../stores/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay, setMenuDisplay] = useState(false)
  const [categoryMenuDisplay, setCategoryMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search, setSearch] = useState(searchQuery)
  const [categories, setCategories] = useState([])
  const [loadingCategories, setLoadingCategories] = useState(true)

  // Fetch categories from database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log(" Iniciando carga de categorías...");
        setLoadingCategories(true);
        
        const response = await fetch(SummaryApi.categoryList.url, {
          method: SummaryApi.categoryList.method,
        });
        
        console.log("📡 Status de respuesta:", response.status);
        
        const dataResponse = await response.json();
        console.log("📦 Datos recibidos:", dataResponse);
        
        if (dataResponse.success && dataResponse.data) {
          console.log("✅ Categorías cargadas:", dataResponse.data);
          setCategories(dataResponse.data);
        } else {
          console.warn("⚠️ No se encontraron categorías en la respuesta");
          setCategories([]);
        }
      } catch (error) {
        console.error("❌ Error al cargar categorías:", error);
        setCategories([]);
      } finally {
        setLoadingCategories(false);
        console.log(" Carga de categorías completada");
      }
    };

    fetchCategories();
  }, []);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    })
    const data = await fetchData.json()
    if (data.success) {
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }
    if (data.error) {
      toast.error(data.message)
    }
  }

  const handleSearch = (e) => {
    const { value } = e.target
    setSearch(value)
    if (value) {
      navigate(`/search?q=${value}`)
    } else {
      navigate("/search")
    }
  }

  const handleCategoryClick = (category) => {
    console.log(" Categoría clickeada:", category);
    setCategoryMenuDisplay(false);
    navigate(`/product-category?category=${category.toLowerCase()}`);
  };

  return (
    <header className='fixed w-full z-50 bg-white'>
      {/* 1. BARRA SUPERIOR MEJORADA */}
      <div className='bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white text-[11px] py-2.5 px-4 md:px-6'>
        <div className='container mx-auto'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-3'>
            
            {/* Sección Izquierda: Envíos */}
            <div className='flex items-center gap-4 text-xs'>
              <div className='flex items-center gap-1.5 text-green-400'>
                <FaTruck className='text-sm' />
                <span className='hidden sm:inline font-medium'>Envíos gratis</span>
                <span className='hidden sm:inline'>sobre $100</span>
              </div>
              <span className='hidden md:inline text-neutral-600'>|</span>
              <div className='flex items-center gap-1.5 text-blue-400'>
                <FaMapMarkerAlt className='text-sm' />
                <span className='hidden sm:inline'>Lima</span>
              </div>
              <span className='hidden md:inline text-neutral-600'>|</span>
              <div className='flex items-center gap-1.5 text-amber-400'>
                <FaTruck className='text-sm' />
                <span className='hidden sm:inline'>Olva Courier</span>
              </div>
            </div>

            {/* Sección Centro: Horario y Teléfono */}
            <div className='flex items-center gap-4 text-xs'>
              <div className='flex items-center gap-1.5 text-gray-300'>
                <FaClock className='text-amber-400' />
                <span>Lun - Sáb: 9am - 7pm</span>
              </div>
              <span className='hidden md:inline text-neutral-600'>|</span>
              <a href="tel:+51994148453" className='flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors'>
                <FaPhoneAlt className='text-green-400' />
                <span>+51 994 148 453</span>
              </a>
            </div>

            {/* Sección Derecha: Redes y Links */}
            <div className='flex items-center gap-4'>
              {/* Iconos de Redes Sociales */}
              <div className='flex items-center gap-2'>
                <a 
                  href="https://tiktok.com/@amryluxe" 
                  target="_blank" 
                  rel="noreferrer"
                  className='w-7 h-7 flex items-center justify-center bg-white/10 hover:bg-white hover:text-neutral-900 rounded-full transition-all duration-300'
                  title="TikTok"
                >
                  <FaTiktok className='text-xs' />
                </a>
                <a 
                  href="https://facebook.com/amryluxe" 
                  target="_blank" 
                  rel="noreferrer"
                  className='w-7 h-7 flex items-center justify-center bg-white/10 hover:bg-blue-600 hover:text-white rounded-full transition-all duration-300'
                  title="Facebook"
                >
                  <FaFacebookF className='text-xs' />
                </a>
                <a 
                  href="https://instagram.com/amryluxe" 
                  target="_blank" 
                  rel="noreferrer"
                  className='w-7 h-7 flex items-center justify-center bg-white/10 hover:bg-pink-600 hover:text-white rounded-full transition-all duration-300'
                  title="Instagram"
                >
                  <FaInstagram className='text-xs' />
                </a>
              </div>

              <span className='hidden md:inline text-neutral-600'>|</span>
              
              <Link to="/ayuda" className='hidden sm:inline hover:text-amber-400 transition-colors font-medium'>Ayuda & FAQs</Link>
              <Link to="/cuenta" className='hidden sm:inline hover:text-amber-400 transition-colors font-medium'>Mi Cuenta</Link>
              
              <div className='flex items-center gap-2 text-neutral-400'>
                <span className='cursor-pointer hover:text-white transition-colors font-medium'>ES</span>
                <span>/</span>
                <span className='cursor-pointer hover:text-white transition-colors font-medium'>USD</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2. HEADER PRINCIPAL */}
      <div className='h-20 border-b border-gray-100 flex items-center justify-between px-6 md:px-12'>
        {/* Logo */}
        <div className='flex-shrink-0'>
          <Link to={"/"}>
            <Logo w={120} h={40} />
          </Link>
        </div>

        {/* Navegación Central */}
        <nav className='hidden lg:flex items-center gap-8 text-[13px] font-medium tracking-wider text-gray-800'>
          <Link to="/" className='hover:text-black transition-colors'>INICIO</Link>
          
          {/* Menú Desplegable - COLECCION CROCHET */}
          <div 
            className='relative'
            onMouseEnter={() => {
              console.log("👆 Mouse enter - mostrando dropdown");
              setCategoryMenuDisplay(true);
            }}
            onMouseLeave={() => {
              console.log("👋 Mouse leave - ocultando dropdown");
              setCategoryMenuDisplay(false);
            }}
          >
            <button 
              className='flex items-center gap-1 hover:text-black transition-colors focus:outline-none py-7'
            >
              COLECCION CROCHET
              <FaChevronDown className={`w-3 h-3 transition-transform duration-300 ${categoryMenuDisplay ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Dropdown */}
            {categoryMenuDisplay && (
              <div className='absolute top-full left-0 mt-0 w-64 bg-white border border-neutral-200 shadow-xl z-50'>
                <div className='py-3'>
                  {loadingCategories ? (
                    <div className='px-6 py-4 text-sm text-neutral-500 text-center'>
                      Cargando categorías...
                    </div>
                  ) : categories.length > 0 ? (
                    categories.map((category, index) => (
                      <button
                        key={index}
                        onClick={() => handleCategoryClick(category)}
                        className='block w-full text-left px-6 py-3 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors border-b border-neutral-100 last:border-b-0 capitalize'
                      >
                        {category}
                      </button>
                    ))
                  ) : (
                    <div className='px-6 py-4 text-sm text-neutral-500 text-center'>
                      No hay categorías disponibles
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <Link to="/ofertas" className='hover:text-black transition-colors'>OFERTAS</Link>
          <Link to="/blog" className='hover:text-black transition-colors'>BLOG</Link>
          <Link to="/about" className='hover:text-black transition-colors'>NOSOTROS</Link>
          <Link to="/contact" className='hover:text-black transition-colors'>CONTACTENOS</Link>
        </nav>

        {/* Iconos de la derecha */}
        <div className='flex items-center gap-5 text-gray-700'>
          {/* Buscador */}
          <button className='hover:text-black transition-colors'>
            <GrSearch className='text-lg' />
          </button>

          {/* Carrito */}
          {user?._id && (
            <Link to={"/cart"} className='relative hover:text-black transition-colors'>
              <FaShoppingBag className='text-lg' />
              <div className='absolute -top-2 -right-2 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center'>
                {context?.cartProductCount}
              </div>
            </Link>
          )}

          {/* Usuario / Login */}
          <div className='relative'>
            {user?._id ? (
              <div className='cursor-pointer hover:text-black transition-colors' onClick={() => setMenuDisplay(!menuDisplay)}>
                {user?.profilePic ? (
                  <img src={user?.profilePic} className='w-7 h-7 rounded-full object-cover' alt={user?.name} />
                ) : (
                  <FaRegCircleUser className='text-lg' />
                )}
              </div>
            ) : (
              <Link to="/login" className='text-[13px] font-medium tracking-wider hover:text-black transition-colors'>
                LOGIN
              </Link>
            )}

            {/* Dropdown Menu Usuario */}
            {menuDisplay && (
              <div className='absolute right-0 top-10 bg-white border border-gray-100 shadow-lg py-2 w-40 z-50'>
                {user?.role === ROLE.ADMIN && (
                  <Link to="/admin-panel/all-products" className='block px-4 py-2 text-xs hover:bg-gray-50' onClick={() => setMenuDisplay(false)}>Admin Panel</Link>
                )}
                <Link to="/order" className='block px-4 py-2 text-xs hover:bg-gray-50' onClick={() => setMenuDisplay(false)}>Pedidos</Link>
                <button onClick={handleLogout} className='block w-full text-left px-4 py-2 text-xs hover:bg-gray-50 text-red-600'>Cerrar Sesión</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
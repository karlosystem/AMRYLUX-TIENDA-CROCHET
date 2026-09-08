import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaRegCircleUser, FaUsers, FaBoxOpen } from "react-icons/fa6"; // 🌟 Importamos nuevos iconos para los links
import { NavLink, Outlet, useNavigate } from 'react-router-dom';     // 🌟 Cambiamos Link por NavLink para manejar estados activos
import ROLE from '../common/role';

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (user?.role !== ROLE.ADMIN) {
            navigate("/")
        }
    }, [user])

  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden bg-slate-50'>

        {/* ASIDE REDISEÑADO */}
        <aside className='bg-white min-h-full w-full max-w-60 shadow-md border-r border-slate-100 flex flex-col'>
            
            {/* 🌟 Bloque de Perfil: Más separado del header y estilizado */}
            <div className='pt-8 pb-6 flex justify-center items-center flex-col border-b border-slate-100'>
                <div className='text-5xl cursor-pointer relative flex justify-center transition-transform hover:scale-105 duration-200 drop-shadow-sm'>
                    {user?.profilePic ? (
                        <img 
                            src={user?.profilePic} 
                            className='w-20 h-20 rounded-full object-cover ring-4 ring-slate-50' 
                            alt={user?.name} 
                        />
                    ) : (
                        <FaRegCircleUser className='text-slate-400' />
                    )}
                </div>
                <p className='capitalize text-lg font-bold text-slate-800 mt-3'>{user?.name}</p>
                {/* Badge de Rol Premium */}
                <p className='text-xs font-semibold tracking-wider text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full mt-1 uppercase'>
                    {user?.role}
                </p>
            </div>

            {/* 🌟 Navegación con Links Elegantes e Interactivos */}
            <div className='p-4 flex-1'>   
                <nav className='flex flex-col gap-1.5'>
                    
                    {/* Link: Todos los usuarios */}
                    <NavLink 
                        to={"all-users"} 
                        className={({ isActive }) => 
                            `flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                                isActive 
                                ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10' 
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            }`
                        }
                    >
                        <FaUsers className='text-lg' />
                        <span>Todos los usuarios</span>
                    </NavLink>

                    {/* Link: Todos los productos */}
                    <NavLink 
                        to={"all-products"} 
                        className={({ isActive }) => 
                            `flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                                isActive 
                                ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10' 
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            }`
                        }
                    >
                        <FaBoxOpen className='text-lg' />
                        <span>Todos los productos</span>
                    </NavLink>

                </nav>
            </div>  
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <main className='w-full h-full p-2'>
            <Outlet/>
        </main>
    </div>
  )
}

export default AdminPanel
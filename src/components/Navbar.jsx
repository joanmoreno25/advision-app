import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Navbar = () => {
  return (
    <nav className="w-full h-[92px] bg-[#0F172A] flex items-center justify-between px-[5%] lg:px-[8%] border-b border-white/5 sticky top-0 z-50">
      
      {/* IZQUIERDA: Logo y Nombre */}
      <div className="flex items-center gap-4">
        {/* ESPACIO PARA TU LOGO */}
        <img src={logo} alt="AdVision Logo" className="w-10 h-10" />
        <span className="text-white text-[24px] font-bold tracking-tight">
          AdVision
        </span>
      </div>

      {/* CENTRO: Menú de Navegación */}
      <div className="hidden lg:flex items-center gap-[40px]">
        {['Funcionalidades', 'Seguridad', 'Tecnologías'].map((item) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`} 
            className="text-white text-[16px] font-medium opacity-80 hover:opacity-100 transition-opacity"
          >
            {item}
          </a>
        ))}
      </div>

      {/* DERECHA: Botones de Acción */}
      <div className="flex items-center gap-[16px]">
        <Link 
          to="/login" 
          className="bg-white text-[#0F172A] text-[16px] font-bold px-[32px] py-[12px] rounded-[8px] hover:bg-gray-200 transition-colors"
        >
          Iniciar Sesión
        </Link>
        <Link 
          to="/register" 
          className="bg-[#2563EB] text-white text-[16px] font-bold px-[32px] py-[12px] rounded-[8px] flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          Empezar Gratis
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
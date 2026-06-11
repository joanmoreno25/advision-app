import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] font-sans p-4 sm:p-8">
      
      {/* Contenedor Principal (Tarjeta Dividida) */}
      <div className="flex flex-col lg:flex-row w-full max-w-[1100px] bg-[#1E293B] rounded-[24px] shadow-2xl overflow-hidden border border-slate-800/50">
        
        {/* MITAD IZQUIERDA: Textos y Decoración */}
        <div className="lg:w-[45%] relative p-[40px] lg:p-[60px] flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800/50">
          {/* Brillo de fondo */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#3B82F6]/20 to-transparent -z-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#3B82F6]/10 blur-[100px] rounded-full -z-10"></div>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 z-10 w-fit">
            <img src={logo} alt="AdVision Logo" className="w-8 h-8 object-contain" />
            <span className="text-white text-[24px] font-bold tracking-tight">AdVision</span>
          </Link>

          {/* Textos */}
          <div className="mt-12 lg:mt-0 z-10">
            <h1 className="text-white text-[36px] lg:text-[48px] font-extrabold leading-[1.1] tracking-tight mb-[24px]">
              Crea tu cuenta <br /> gratis
            </h1>
            <p className="text-[#94A3B8] text-[18px] lg:text-[20px] leading-[1.6]">
              Centraliza y etiqueta automáticamente todo tu archivo publicitario con la potencia de la IA.
            </p>
          </div>
        </div>

        {/* MITAD DERECHA: Formulario */}
        <div className="lg:w-[55%] p-[40px] lg:p-[60px] bg-[#1E293B]">
          
          <form className="flex flex-col gap-5">
            {/* Nombre */}
            <div>
              <label className="block text-slate-300 text-[14px] font-medium mb-2">Nombre completo</label>
              <input 
                type="text" 
                placeholder="Ej. Joan Moreno"
                className="w-full bg-[#0F172A] border border-slate-700 text-white rounded-[10px] px-4 py-3 focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-colors placeholder:text-slate-500"
              />
            </div>

            {/* Correo */}
            <div>
              <label className="block text-slate-300 text-[14px] font-medium mb-2">Correo electrónico</label>
              <input 
                type="email" 
                placeholder="joan.moreno@ejemplo.com"
                className="w-full bg-[#0F172A] border border-slate-700 text-white rounded-[10px] px-4 py-3 focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-colors placeholder:text-slate-500"
              />
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-slate-300 text-[14px] font-medium mb-2">Contraseña</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  className="w-full bg-[#0F172A] border border-slate-700 text-white rounded-[10px] px-4 py-3 focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-colors placeholder:text-slate-500"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  )}
                </button>
              </div>
            </div>

            {/* Checkbox Términos */}
            <div className="flex items-start gap-3 mt-2">
              <input 
                type="checkbox" 
                id="terms" 
                className="mt-1 w-4 h-4 rounded border-slate-700 bg-[#0F172A] text-[#2563EB] focus:ring-[#2563EB] focus:ring-offset-0"
              />
              <label htmlFor="terms" className="text-slate-400 text-[14px] leading-snug">
                Acepto los <Link to="/terms" className="text-[#3B82F6] hover:underline">Términos de Servicio</Link> y la <Link to="/privacy" className="text-[#3B82F6] hover:underline">Política de Privacidad</Link>.
              </label>
            </div>

            {/* Botón Principal */}
            <button 
              type="submit" 
              className="w-full bg-[#2563EB] text-white text-[16px] font-bold px-4 py-3.5 rounded-[10px] hover:bg-blue-700 transition-colors mt-2 shadow-lg active:scale-[0.98]"
            >
              Crear cuenta
            </button>
          </form>

          {/* Separador */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-slate-700"></div>
            <span className="text-slate-400 text-[14px]">O registrarse con</span>
            <div className="flex-1 h-px bg-slate-700"></div>
          </div>

          {/* Botones Sociales */}
          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 bg-[#0F172A] border border-slate-700 text-white rounded-[10px] px-4 py-3 hover:bg-slate-800 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-[#0F172A] border border-slate-700 text-white rounded-[10px] px-4 py-3 hover:bg-slate-800 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              GitHub
            </button>
          </div>

          {/* Footer Card */}
          <p className="text-center text-slate-400 text-[14px] mt-8">
            ¿Ya tienes cuenta? <Link to="/login" className="text-[#3B82F6] font-medium hover:underline">Iniciar sesión</Link>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Register;
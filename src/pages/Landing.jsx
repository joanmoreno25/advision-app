import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import heroMockup from '../assets/hero-mockup.png'; 
import feature1Mockup from '../assets/feature1-mockup.png';
import feature2Mockup from '../assets/feature2-mockup.png';
import underlineDecor from '../assets/underline.png';
import securityMockup from '../assets/security-mockup.png';
import logo from '../assets/logo.svg';

/**
 * Landing page component.
 * Serves as the public-facing homepage of the AdVision application.
 * Features responsive sections highlighting product capabilities, dynamic navbar styling on scroll,
 * and clear calls to action (CTAs) for user registration and login.
 *
 * @returns {JSX.Element} The rendered Landing page component.
 */
const Landing = () => {
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll position to dynamically toggle the top bar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0F172A] font-sans overflow-x-hidden flex flex-col relative">
      
      <Helmet>
        <title>AdVision | Gestión Inteligente de Archivos Publicitarios</title>
        <meta name="description" content="Optimiza el flujo de trabajo de tu agencia con IA. Clasifica imágenes, detecta objetos y digitaliza textos automáticamente." />
        <style>{`
          html { scroll-behavior: smooth; }
        `}</style>
      </Helmet>

      {/* --- Fixed and Dynamic Navbar Wrapper (Glassmorphism Effect) --- */}
      <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0F172A]/90 backdrop-blur-md shadow-lg py-2 border-b border-white/10' : 'bg-transparent py-4'}`}>
        <Navbar />
      </div>

      {/* --- HERO SECTION --- */}
      <main id="inicio" className="flex-1 w-full px-[8%] xl:px-[12%] 2xl:px-[16%] pt-[140px] lg:pt-[180px] pb-[40px] flex flex-col lg:flex-row items-center justify-between gap-[60px] lg:gap-[80px]">
        
        {/* LEFT: Text and Buttons */}
        <div className="flex-1 w-full z-10 flex flex-col items-center lg:items-start text-center lg:text-left">
          
          <h1 className="text-white text-[48px] sm:text-[64px] lg:text-[80px] xl:text-[110px] font-extrabold leading-[1.1] tracking-tight mb-[30px]">
            Gestión Inteligente de <br className="hidden lg:block" />
            Archivos <span className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-transparent bg-clip-text">Publicitarios</span>
          </h1>
          
          <p className="text-[#94A3B8] text-[20px] lg:text-[24px] xl:text-[30px] leading-[1.6] mb-[50px] max-w-[800px]">
            Optimiza el flujo de trabajo de tu agencia. Clasifica imágenes, detecta objetos y digitaliza textos automáticamente utilizando visión artificial y tecnología OCR avanzada.
          </p>
          
          <div className="flex w-full sm:w-auto">
            <Link 
              to="/login" 
              className="w-full sm:w-auto bg-[#2563EB] text-white text-[20px] lg:text-[24px] font-bold px-[48px] py-[24px] rounded-[10px] hover:bg-blue-700 transition-colors text-center flex items-center justify-center gap-4 shadow-lg hover:shadow-blue-500/30"
            >
              Procesar mi primera imagen
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* RIGHT: Mockup Image with Browser Frame */}
        <div className="flex-1 w-full relative z-10 flex justify-end">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[90%] bg-[#3B82F6]/20 blur-[150px] rounded-full -z-10"></div>
          
          <div className="w-full max-w-[880px] xl:max-w-[1050px] bg-[#1E293B] border border-[#334155] rounded-xl p-2 shadow-2xl drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] origin-right">
            
            <div className="flex gap-2 pb-3 px-2 pt-1 border-b border-[#334155] mb-2">
              <div className="w-3 h-3 rounded-full bg-[#EF4444]"></div>
              <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
              <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
            </div>

            <img 
              src={heroMockup} 
              alt="AdVision Dashboard Demo" 
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
        </div>
      </main>

      {/* --- FEATURES SECTION --- */}
      <section id="funcionalidades" className="w-full bg-white px-[8%] xl:px-[12%] 2xl:px-[16%] py-[80px] lg:py-[120px] flex flex-col gap-[100px] lg:gap-[160px]">
        
        {/* BLOCK 1: Text Left, Image Right */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-[60px] lg:gap-[80px]">
          
          <div className="flex-1 w-full flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="relative inline-block mb-[24px]">
              <h2 className="text-[#0F172A] text-[46px] sm:text-[54px] lg:text-[64px] xl:text-[70px] font-extrabold leading-[1.1] tracking-tight relative z-10">
                Extracción de Texto <br className="hidden xl:block" /> Inmediata
              </h2>
              <img 
                src={underlineDecor} 
                alt="" 
                className="absolute -bottom-3 left-0 w-[220px] sm:w-[280px] lg:w-[380px] z-0"
              />
            </div>
            
            <p className="text-[#475569] text-[22px] lg:text-[26px] leading-[1.6] mb-[40px] max-w-[650px] mt-4 relative z-10">
              Olvídate de transcribir copys a mano. Nuestro motor basado en visión artificial detecta y digitaliza con precisión milimétrica cualquier texto presente en tus anuncios, banners o documentos escaneados.
            </p>
            <div className="flex w-full sm:w-auto">
              <a 
                href="#etiquetado" 
                className="w-full sm:w-auto bg-[#2563EB] text-white text-[18px] lg:text-[22px] font-bold px-[40px] py-[20px] rounded-[10px] hover:bg-blue-700 transition-colors text-center shadow-md"
              >
                Ver cómo funciona
              </a>
            </div>
          </div>

          <div className="flex-1 w-full relative flex justify-end">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#3B82F6]/10 blur-[120px] rounded-full -z-10"></div>
            <div className="w-full max-w-[880px] bg-white border border-[#E2E8F0] rounded-xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
              <div className="flex gap-2 pb-3 px-2 pt-1 border-b border-[#E2E8F0] mb-2">
                <div className="w-3 h-3 rounded-full bg-[#EF4444]"></div>
                <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
                <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
              </div>
              <img 
                src={feature1Mockup} 
                alt="Extracción de Texto OCR" 
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* BLOCK 2: Image Left, Text Right */}
        <div id="etiquetado" className="flex flex-col-reverse lg:flex-row items-center justify-between gap-[60px] lg:gap-[80px] pt-10">
          
          <div className="flex-1 w-full relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#3B82F6]/10 blur-[120px] rounded-full -z-10"></div>
            <div className="w-full max-w-[880px] bg-white border border-[#E2E8F0] rounded-xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
              <div className="flex gap-2 pb-3 px-2 pt-1 border-b border-[#E2E8F0] mb-2">
                <div className="w-3 h-3 rounded-full bg-[#EF4444]"></div>
                <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
                <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
              </div>
              <img 
                src={feature2Mockup} 
                alt="Etiquetado Inteligente" 
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
          </div>

          <div className="flex-1 w-full flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="relative inline-block mb-[24px]">
              <h2 className="text-[#0F172A] text-[46px] sm:text-[54px] lg:text-[64px] xl:text-[70px] font-extrabold leading-[1.1] tracking-tight relative z-10">
                Etiquetado <br className="hidden xl:block" /> Inteligente
              </h2>
              <img 
                src={underlineDecor} 
                alt="" 
                className="absolute -bottom-3 left-0 w-[220px] sm:w-[280px] lg:w-[380px] z-0"
              />
            </div>
            
            <p className="text-[#475569] text-[22px] lg:text-[26px] leading-[1.6] mb-[40px] max-w-[650px] mt-4 relative z-10">
              Clasificamos automáticamente tus imágenes publicitarias. Nuestro algoritmo analiza el contexto y etiqueta desde marcas y logos hasta objetos, personas y escenarios. Encuentra exactamente lo que buscas sin esfuerzo.
            </p>
            <div className="flex w-full sm:w-auto">
              <a 
                href="#seguridad" 
                className="w-full sm:w-auto bg-[#2563EB] text-white text-[18px] lg:text-[22px] font-bold px-[40px] py-[20px] rounded-[10px] hover:bg-blue-700 transition-colors text-center shadow-md"
              >
                Explorar la tecnología
              </a>
            </div>
          </div>
          
        </div>

      </section>

      {/* --- CTA ACCESS SECTION (Full Width & Dark) --- */}
      <section id="tecnologias" className="w-full bg-[#0F172A] px-[8%] xl:px-[12%] 2xl:px-[16%] py-[100px] lg:py-[160px] overflow-hidden flex flex-col items-center text-center">
        
        <div className="relative z-10 max-w-[900px] flex flex-col items-center">
          
          <div className="relative flex flex-col items-center mb-[32px]">
            <h2 className="text-white text-[40px] sm:text-[48px] lg:text-[60px] xl:text-[72px] font-extrabold leading-[1.1] tracking-tight relative z-10 text-center">
              Accede desde cualquier lugar
            </h2>
            <div className="absolute -bottom-4 w-full flex justify-center z-0 pointer-events-none">
              <img 
                src={underlineDecor} 
                alt="" 
                className="w-[200px] sm:w-[300px] lg:w-[400px] brightness-0 invert opacity-40" 
              />
            </div>
          </div>

          <p className="text-white/90 text-[20px] lg:text-[22px] xl:text-[26px] leading-[1.6] mb-[50px] max-w-[750px] font-medium relative z-10">
            Una plataforma en la nube rápida y accesible desde cualquier navegador. Únete y optimiza el flujo de trabajo de tu investigación hoy mismo.
          </p>

          <div className="flex w-full sm:w-auto relative z-10">
            <Link 
              to="/register" 
              className="w-full sm:w-auto bg-[#2563EB] text-white text-[18px] lg:text-[20px] font-bold px-[48px] py-[20px] rounded-[10px] hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95"
            >
              Crear cuenta gratuita
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

      </section>

      {/* --- SECURITY SECTION --- */}
      <section id="seguridad" className="w-full bg-white px-[8%] xl:px-[12%] 2xl:px-[16%] py-[80px] lg:py-[120px] flex flex-col lg:flex-row items-center justify-between gap-[60px] lg:gap-[80px]">
        
        {/* LEFT: Text and Button */}
        <div className="flex-1 w-full flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="relative inline-block mb-[24px]">
            <h2 className="text-[#0F172A] text-[46px] sm:text-[54px] lg:text-[64px] xl:text-[70px] font-extrabold leading-[1.1] tracking-tight relative z-10">
              Seguridad y <br className="hidden xl:block" /> Privacidad
            </h2>
            <img 
              src={underlineDecor} 
              alt="" 
              className="absolute -bottom-3 left-0 w-[220px] sm:w-[280px] lg:w-[380px] z-0"
            />
          </div>
          
          <p className="text-[#475569] text-[22px] lg:text-[26px] leading-[1.6] mb-[40px] max-w-[650px] mt-4 relative z-10">
            Tus imágenes son el activo más valioso. Utilizamos infraestructura en la nube de alta seguridad para garantizar que tus imágenes y metadatos estén protegidos y accesibles únicamente para ti.
          </p>
          
          <div className="flex w-full sm:w-auto">
            <a 
              href="#cta" 
              className="w-full sm:w-auto bg-[#2563EB] text-white text-[18px] lg:text-[22px] font-bold px-[40px] py-[20px] rounded-[10px] hover:bg-blue-700 transition-colors text-center flex items-center justify-center gap-3 shadow-md"
            >
              Saber más
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        {/* RIGHT: Mockup Image with Browser Frame */}
        <div className="flex-1 w-full relative flex justify-end">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#3B82F6]/10 blur-[120px] rounded-full -z-10"></div>
          
          <div className="w-full max-w-[880px] bg-white border border-[#E2E8F0] rounded-xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.08)] origin-right">
            <div className="flex gap-2 pb-3 px-2 pt-1 border-b border-[#E2E8F0] mb-2">
              <div className="w-3 h-3 rounded-full bg-[#EF4444]"></div>
              <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
              <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
            </div>
            <img 
              src={securityMockup} 
              alt="Dashboard de Seguridad y Privacidad" 
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
        </div>

      </section>

      {/* --- FINAL CTA SECTION --- */}
      <section id="cta" className="w-full bg-[#0F172A] px-[8%] xl:px-[12%] 2xl:px-[16%] py-[80px] lg:py-[120px] flex flex-col items-center justify-center text-center">
        
        <h2 className="text-white text-[42px] sm:text-[50px] lg:text-[60px] xl:text-[70px] font-extrabold leading-[1.1] tracking-tight mb-[24px]">
          Empieza a catalogar <br className="hidden lg:block" /> hoy mismo
        </h2>
        
        <p className="text-white/90 text-[20px] lg:text-[24px] xl:text-[28px] leading-[1.6] mb-[40px] max-w-[800px] font-medium">
          Centraliza y etiqueta automáticamente todo tu archivo publicitario con la potencia de la IA.
        </p>
        
        <div className="flex w-full sm:w-auto justify-center">
          <Link 
            to="/register" 
            className="w-full sm:w-auto bg-[#2563EB] text-white text-[18px] lg:text-[22px] font-bold px-[40px] py-[20px] rounded-[10px] hover:bg-blue-700 transition-colors flex items-center justify-center gap-3 shadow-md hover:shadow-blue-500/30"
          >
            Crear cuenta gratis
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

      </section>

      {/* --- FOOTER --- */}
      <footer className="w-full bg-[#0F172A] border-t border-slate-800/50 px-[8%] xl:px-[12%] 2xl:px-[16%] pt-[60px] pb-[30px] flex flex-col gap-[40px]">
        
        <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8">
          <div className="flex flex-col items-center lg:items-start max-w-[450px]">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={logo} 
                alt="AdVision Logo" 
                className="w-8 h-8 object-contain"
              />
              <span className="text-white text-[24px] font-bold tracking-tight">AdVision</span>
            </div>
            <p className="text-[#94A3B8] text-[16px] lg:text-[18px] leading-[1.6] text-center lg:text-left">
              Sistema inteligente de catalogación publicitaria desarrollado como Trabajo de Fin de Grado.
            </p>
          </div>
        </div>

        <div className="w-full border-t border-slate-800/60 pt-[24px] flex justify-center">
          <p className="text-[#64748B] text-[16px] text-center font-medium">
            ©2026 Joan Moreno Martin
          </p>
        </div>

      </footer>
    </div>
  );
};

export default Landing;
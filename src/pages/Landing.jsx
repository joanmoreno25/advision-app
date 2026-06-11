import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import heroMockup from '../assets/hero-mockup.png'; 
import feature1Mockup from '../assets/feature1-mockup.png';
import feature2Mockup from '../assets/feature2-mockup.png';
import underlineDecor from '../assets/underline.png';

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#0F172A] font-sans overflow-x-hidden flex flex-col">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <main className="flex-1 w-full px-[8%] xl:px-[12%] 2xl:px-[16%] pt-[40px] lg:pt-[80px] pb-[40px] flex flex-col lg:flex-row items-center justify-between gap-[60px] lg:gap-[80px]">
        
        {/* IZQUIERDA: Textos y Botones */}
        <div className="flex-1 w-full z-10 flex flex-col items-center lg:items-start text-center lg:text-left">
          
          <h1 className="text-white text-[48px] sm:text-[64px] lg:text-[80px] xl:text-[110px] font-extrabold leading-[1.1] tracking-tight mb-[30px]">
            Gestión Inteligente de <br className="hidden lg:block" />
            Archivos <span className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-transparent bg-clip-text">Publicitarios</span>
          </h1>
          
          <p className="text-[#94A3B8] text-[20px] lg:text-[24px] xl:text-[32px] leading-[1.6] mb-[50px] max-w-[800px]">
            Optimiza el flujo de trabajo de tu agencia. Clasifica imágenes, detecta objetos y digitaliza textos automáticamente utilizando visión artificial y tecnología OCR avanzada.
          </p>
          
          <div className="flex w-full sm:w-auto">
            <Link 
              to="/login" 
              className="w-full sm:w-auto bg-[#2563EB] text-white text-[20px] lg:text-[24px] font-bold px-[48px] py-[24px] rounded-[10px] hover:bg-blue-700 transition-colors text-center flex items-center justify-center gap-4"
            >
              Procesar mi primera imagen
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* DERECHA: Imagen Mockup con Marco de Navegador */}
        <div className="flex-1 w-full relative z-10 flex justify-end">
          {/* Brillo de fondo (Glow) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[90%] bg-[#3B82F6]/20 blur-[150px] rounded-full -z-10"></div>
          
          {/* Contenedor del Marco (Estilo Navegador) */}
          <div className="w-full max-w-[880px] xl:max-w-[1050px] bg-[#1E293B] border border-[#334155] rounded-xl p-2 shadow-2xl drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] origin-right">
            
            {/* Barra superior con puntos de control */}
            <div className="flex gap-2 pb-3 px-2 pt-1 border-b border-[#334155] mb-2">
              <div className="w-3 h-3 rounded-full bg-[#EF4444]"></div> {/* Rojo */}
              <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div> {/* Amarillo */}
              <div className="w-3 h-3 rounded-full bg-[#10B981]"></div> {/* Verde */}
            </div>

            {/* Imagen Mockup real */}
            <img 
              src={heroMockup} 
              alt="AdVision Dashboard Demo" 
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
        </div>
      </main>
      {/* --- FEATURES SECTION --- */}
      <section className="w-full bg-white px-[8%] xl:px-[12%] 2xl:px-[16%] py-[80px] lg:py-[120px] flex flex-col gap-[100px] lg:gap-[160px]">
        
        {/* BLOQUE 1: Texto izquierda, Imagen derecha */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-[60px] lg:gap-[80px]">
          
          <div className="flex-1 w-full flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="relative inline-block mb-[24px]">
              <h2 className="text-[#0F172A] text-[46px] sm:text-[54px] lg:text-[64px] xl:text-[70px] font-extrabold leading-[1.1] tracking-tight relative z-10">
                Extracción de Texto <br className="hidden xl:block" /> Inmediata
              </h2>
              {/* Elemento Subrayado arreglado */}
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
              <Link 
                to="/#" 
                className="w-full sm:w-auto bg-[#2563EB] text-white text-[18px] lg:text-[22px] font-bold px-[40px] py-[20px] rounded-[10px] hover:bg-blue-700 transition-colors text-center"
              >
                Ver cómo funciona
              </Link>
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

        {/* BLOQUE 2: Imagen izquierda, Texto derecha */}
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-[60px] lg:gap-[80px]">
          
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
              {/* Elemento Subrayado arreglado */}
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
              <Link 
                to="/#" 
                className="w-full sm:w-auto bg-[#2563EB] text-white text-[18px] lg:text-[22px] font-bold px-[40px] py-[20px] rounded-[10px] hover:bg-blue-700 transition-colors text-center"
              >
                Explorar la tecnología
              </Link>
            </div>
          </div>
          
        </div>

      </section>

    </div>
  );
};

export default Landing;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase-config'; 
import { Helmet } from 'react-helmet-async';

import logo from '../assets/logo-v2.png';

/**
 * ForgotPassword component.
 * Provides a user interface for requesting a password reset link via Firebase Authentication.
 * Handles validation, loading states, and success/error feedback.
 * 
 * @returns {JSX.Element} The rendered Forgot Password view.
 */
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Processes the password reset request using the provided email address.
   * 
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email) {
      return setErrorMsg("Por favor, introduce tu correo electrónico.");
    }

    setIsLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMsg("Enlace de recuperación enviado. Revisa tu bandeja de entrada.");
      setEmail('');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setErrorMsg("No existe ninguna cuenta con este correo electrónico.");
      } else {
        setErrorMsg("Error al enviar el correo. Inténtalo de nuevo más tarde.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Recuperar Contraseña | AdVision</title>
        <meta name="description" content="Recupera el acceso a tu cuenta de AdVision." />
      </Helmet>

      <div className="min-h-screen flex w-full items-center justify-center bg-[#2563EB] relative p-4 sm:p-8 overflow-hidden font-sans">
        
        {/* White dot background pattern */}
        <div 
          className="absolute inset-0 z-0 opacity-20" 
          style={{ 
            backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)', 
            backgroundSize: '32px 32px' 
          }}
        ></div>

        {/* Radial gradient for depth */}
        <div className="absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_center,_transparent_0%,_#1E40AF_100%)] z-0"></div>
        
        {/* Main White Card (Increased to max-w-[600px] with larger padding) */}
        <div className="relative z-10 w-full max-w-[600px] bg-white rounded-[24px] shadow-2xl p-10 sm:p-14 flex flex-col">
          
          {/* Header with Logo */}
          <div className="flex flex-col items-center mb-10">
            <img src={logo} alt="AdVision Logo" className="w-22 h-22 object-contain mb-4" />
            <h1 className="text-[#0F172A] text-[42px] font-extrabold mb-3 text-center leading-[1.1]">
              Recuperar contraseña
            </h1>
            {/* Description text increased to text-[19px] and expanded max-w */}
            <p className="text-[#64748B] text-[19px] text-center max-w-[450px] leading-[1.5]">
              Introduce tu correo electrónico para recibir un enlace de restauración
            </p>
          </div>

          {/* Status Messages */}
          {errorMsg && (
            <div className="mb-6 p-3 bg-red-100 text-red-600 border border-red-200 rounded-[8px] text-[15px] text-center font-medium">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-3 bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-[8px] text-[15px] text-center font-medium">
              {successMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handlePasswordReset} className="flex flex-col gap-6">
            <div>
              <label className="block text-[#0F172A] text-[17px] font-semibold mb-2">Correo electrónico</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu-correo@ejemplo.com"
                className="w-full bg-white border border-[#CBD5E1] text-[#0F172A] text-[17px] rounded-[10px] px-4 py-4 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors placeholder:text-[#94A3B8]"
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#2563EB] text-white text-[19px] font-bold px-4 py-4 rounded-[10px] hover:bg-blue-700 transition-colors shadow-md active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
            >
              {isLoading ? 'Enviando...' : 'Enviar enlace'}
            </button>
          </form>

          {/* Return Link */}
          <p className="text-center text-[#64748B] text-[17px] mt-8">
            Volver al <Link to="/login" className="text-[#2563EB] font-semibold hover:underline">Iniciar sesión</Link>
          </p>

        </div>

      </div>
    </>
  );
};

export default ForgotPassword;
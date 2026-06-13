import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-v2.png'; 

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white w-full font-sans">
      
      <div className="max-w-[900px] mx-auto px-6 sm:px-8 py-12 md:py-20">
        
        <button 
          onClick={() => navigate(-1)} 
          className="mb-10 text-[#2563EB] font-bold text-[16px] hover:underline flex items-center gap-2 transition-transform hover:-translate-x-1 w-fit"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Volver atrás
        </button>

        <div className="mb-12 border-b border-[#E2E8F0] pb-8">
          <h1 className="text-[#0F172A] text-[38px] sm:text-[46px] font-extrabold mb-4 leading-tight">
            Términos y Condiciones Generales de Uso
          </h1>
          <p className="text-[#64748B] text-[17px] font-medium">
            Última actualización: 13 de Junio de 2026
          </p>
        </div>

        <div className="text-[#475569] text-[17px] space-y-10 text-justify leading-relaxed">
          
          <section>
            <h3 className="text-[#0F172A] font-bold text-[22px] mb-3">1. Objeto y Ámbito de Aplicación</h3>
            <p className="mb-3">1.1. Los presentes Términos y Condiciones (en adelante, las "Condiciones") regulan el acceso, navegación y uso de la plataforma web AdVision (en adelante, el "Servicio" o la "Plataforma").</p>
            <p>1.2. El acceso, registro o uso de la Plataforma implica la aceptación expresa, plena y sin reservas de todas y cada una de las presentes Condiciones. Si el Usuario no está de acuerdo con estas Condiciones, deberá abstenerse de acceder y utilizar el Servicio.</p>
          </section>

          <section>
            <h3 className="text-[#0F172A] font-bold text-[22px] mb-3">2. Capacidad Legal y Registro de Usuarios</h3>
            <p className="mb-3">2.1. El acceso a los servicios de AdVision requiere el registro previo. Al registrarse, el Usuario garantiza que es mayor de dieciocho (18) años y posee plena capacidad jurídica y de obrar para suscribir contratos vinculantes conforme a la legislación vigente.</p>
            <p className="mb-3">2.2. El Usuario se compromete a proporcionar información veraz, exacta, actual y completa durante el proceso de registro. Queda terminantemente prohibida la suplantación de identidad o el uso de datos de terceros sin su consentimiento expreso.</p>
            <p>2.3. Las credenciales de acceso (correo electrónico y contraseña) son personales e intransferibles. El Usuario es el único y exclusivo responsable de la custodia y confidencialidad de sus claves, asumiendo íntegramente la responsabilidad por cualesquiera daños, perjuicios, filtraciones o accesos no autorizados derivados de su negligencia o cesión a terceros.</p>
          </section>

          <section>
            <h3 className="text-[#0F172A] font-bold text-[22px] mb-3">3. Uso Aceptable y Prohibiciones Expresas</h3>
            <p className="mb-3">3.1. El Usuario se obliga a utilizar el Servicio de conformidad con la ley, la moral, el orden público y las presentes Condiciones.</p>
            <p className="mb-3">3.2. Queda expresamente prohibido, de manera enunciativa pero no limitativa:</p>
            <ul className="list-disc pl-6 space-y-2 mb-3">
              <li>Realizar actividades ilícitas, ilegales o contrarias a la buena fe y al orden público.</li>
              <li>Intentar vulnerar, eludir o manipular los sistemas de seguridad de AdVision, sus redes, servidores o cuentas de otros usuarios.</li>
              <li>Utilizar técnicas de <i>scraping</i>, bots, <i>spiders</i> o cualquier sistema automatizado para extraer datos de la Plataforma sin autorización explícita por escrito.</li>
              <li>Introducir o difundir virus informáticos, troyanos, <i>ransomware</i> o cualquier otro software malicioso susceptible de provocar daños en los sistemas físicos o lógicos de la Plataforma o de sus proveedores.</li>
              <li>Sobrecargar deliberadamente la infraestructura del Servicio mediante ataques de denegación de servicio (DDoS).</li>
              <li>Utilizar la Plataforma para transmitir publicidad no autorizada (spam).</li>
            </ul>
            <p>3.3. AdVision se reserva el derecho incondicional de suspender, bloquear o cancelar de manera inmediata y sin previo aviso la cuenta de cualquier Usuario que incumpla estas obligaciones, reservándose el ejercicio de las acciones legales oportunas, incluyendo la reclamación por daños y perjuicios.</p>
          </section>

          <section>
            <h3 className="text-[#0F172A] font-bold text-[22px] mb-3">4. Propiedad Intelectual e Industrial</h3>
            <p className="mb-3">4.1. Todos los derechos de propiedad intelectual e industrial sobre el código fuente, bases de datos, diseño gráfico, interfaces de usuario, logotipos, marcas, algoritmos y textos de AdVision son titularidad exclusiva de los creadores de la Plataforma o de sus legítimos licenciantes.</p>
            <p className="mb-3">4.2. Se otorga al Usuario una licencia de uso personal, no exclusiva, intransferible y estrictamente limitada al uso ordinario del Servicio conforme a su finalidad. Esta licencia no autoriza en ningún caso la reproducción, distribución, comunicación pública, transformación o ingeniería inversa de la Plataforma.</p>
            <p>4.3. Cualquier contenido, idea o sugerencia que el Usuario proporcione a AdVision sobre mejoras del sistema podrá ser utilizado por la Plataforma de forma gratuita, perpetua e irrevocable, sin que ello genere derecho a compensación o reconocimiento alguno a favor del Usuario.</p>
          </section>

          <section>
            <h3 className="text-[#0F172A] font-bold text-[22px] mb-3">5. Exclusión de Garantías y Limitación de Responsabilidad</h3>
            <p className="mb-3">5.1. <b>Provisión del Servicio "Tal Cual":</b> El Servicio se proporciona "tal cual" (<i>as is</i>) y "según disponibilidad" (<i>as available</i>). AdVision rechaza explícitamente cualquier garantía implícita o explícita respecto a la idoneidad del servicio para un propósito particular, disponibilidad ininterrumpida o ausencia de errores.</p>
            <p className="mb-3">5.2. <b>Exoneración por Fallos Técnicos:</b> AdVision no garantiza la disponibilidad continua del Servicio. La Plataforma puede sufrir interrupciones por mantenimiento, actualizaciones o causas ajenas a su control (fuerza mayor, fallos en el proveedor de hosting, caídas de la red eléctrica o de telecomunicaciones). El Usuario acepta que AdVision no será responsable de ninguna pérdida económica o de datos derivada de estas interrupciones.</p>
            <p className="mb-3">5.3. <b>Pérdida de Datos:</b> Aunque AdVision utiliza infraestructuras seguras y copias de respaldo, no se hace responsable de la pérdida fortuita, eliminación accidental o corrupción de la información del Usuario. Se recomienda al Usuario mantener sus propias copias de seguridad.</p>
            <p>5.4. <b>Limitación Económica:</b> En la máxima medida permitida por la ley aplicable, la responsabilidad total y acumulada de AdVision frente al Usuario por cualquier reclamación derivada o relacionada con este contrato o el uso del Servicio no excederá, en ningún caso, la cantidad que el Usuario haya abonado a AdVision en los últimos doce (12) meses, si aplicase.</p>
          </section>

          <section>
            <h3 className="text-[#0F172A] font-bold text-[22px] mb-3">6. Enlaces y Servicios de Terceros</h3>
            <p>6.1. La Plataforma puede contener enlaces a sitios web de terceros o integrar herramientas de proveedores externos (como Firebase, servicios de pago o analíticas). AdVision no ejerce control alguno sobre dichos sitios y no asume ninguna responsabilidad por su contenido, políticas de privacidad, prácticas o disponibilidad técnica. El acceso y uso de servicios de terceros se rige exclusivamente por los términos y condiciones estipulados por dichos proveedores.</p>
          </section>

          <section>
            <h3 className="text-[#0F172A] font-bold text-[22px] mb-3">7. Protección de Datos de Carácter Personal</h3>
            <p>7.1. El tratamiento de los datos personales del Usuario se realiza en estricto cumplimiento de lo dispuesto en el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD) de España. Los detalles completos sobre qué datos recopilamos, cómo los protegemos y los derechos que asisten al Usuario (Acceso, Rectificación, Supresión, Limitación, Portabilidad y Oposición) se encuentran descritos en nuestra Política de Privacidad, que se considera parte integrante y vinculante de estas Condiciones.</p>
          </section>

          <section>
            <h3 className="text-[#0F172A] font-bold text-[22px] mb-3">8. Indemnidad</h3>
            <p>8.1. El Usuario se compromete a indemnizar, defender y mantener indemne a AdVision, sus directivos, empleados y proveedores, frente a cualquier reclamación, demanda, pérdida, gasto, daño y coste (incluyendo honorarios razonables de abogados) que surjan de o estén relacionados con: (a) la infracción por parte del Usuario de las presentes Condiciones; (b) el uso indebido de la Plataforma; o (c) la violación de derechos de terceros (incluyendo propiedad intelectual o privacidad) derivada de las acciones del Usuario.</p>
          </section>

          <section>
            <h3 className="text-[#0F172A] font-bold text-[22px] mb-3">9. Modificación de las Condiciones</h3>
            <p>9.1. AdVision se reserva el derecho exclusivo de modificar, alterar o actualizar estas Condiciones en cualquier momento para adaptarlas a novedades legislativas, jurisprudenciales o cambios en la operativa del Servicio. Las modificaciones sustanciales entrarán en vigor a los quince (15) días de su notificación al Usuario (mediante aviso en la web o correo electrónico). El uso continuado del Servicio tras dicha fecha constituye la aceptación íntegra de las Condiciones modificadas.</p>
          </section>

          <section>
            <h3 className="text-[#0F172A] font-bold text-[22px] mb-3">10. Nulidad e Ineficacia de Cláusulas</h3>
            <p>10.1. Si cualquier cláusula incluida en las presentes Condiciones fuese declarada total o parcialmente nula o ineficaz por un tribunal o autoridad competente, tal nulidad o ineficacia afectará tan solo a dicha disposición o a la parte de la misma que resulte nula o ineficaz, subsistiendo las presentes Condiciones en todo lo demás.</p>
          </section>

          <section>
            <h3 className="text-[#0F172A] font-bold text-[22px] mb-3">11. Legislación Aplicable y Jurisdicción</h3>
            <p className="mb-3">11.1. Las presentes Condiciones se regirán e interpretarán de acuerdo con la legislación vigente de España.</p>
            <p>11.2. Para la resolución de cualquier controversia, litigio o discrepancia que pudiera derivarse del acceso, uso del Servicio o interpretación de estas Condiciones, las partes se someten a los Juzgados y Tribunales competentes del territorio español, renunciando expresamente a cualquier otro fuero que pudiera corresponderles. En caso de que el Usuario actúe en condición de consumidor, los tribunales competentes serán los correspondientes a su lugar de residencia.</p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-[#E2E8F0] flex justify-start">
          <button 
            onClick={() => navigate(-1)} 
            className="text-[#2563EB] font-bold text-[16px] hover:underline flex items-center gap-2 transition-transform hover:-translate-x-1"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Volver atrás
          </button>
        </div>

      </div>
    </div>
  );
};

export default Terms;
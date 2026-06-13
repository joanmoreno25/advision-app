import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  es: {
    translation: {
      "dashboard": {
        "title": "Análisis Avanzado de Piezas Publicitarias",
        "process": "Procesar con IA",
        "processing": "Procesando...",
        "history_title": "Banco de Imágenes",
        "records": "registros",
        "search_placeholder": "Buscar por etiquetas, nombre de archivo o texto de la imagen...",
        "filename": "Nombre del archivo",
        "tags": "Etiquetas",
        "detected_text": "Texto detectado",
        "file_selected_singular": "archivo seleccionado",
        "files_selected_plural": "archivos seleccionados",
        "more": "más",
        "drag_drop": "Arrastre los archivos aquí o ",
        "navigate": "navegue",
        "edit_profile": "Editar Perfil",
        "logout": "Cerrar Sesión"
      }
    }
  },
  en: {
    translation: {
      "dashboard": {
        "title": "Advanced Ad Asset Analysis",
        "process": "Process with AI",
        "processing": "Processing...",
        "history_title": "Image Bank",
        "records": "records",
        "search_placeholder": "Search by tags, filename or image text...",
        "filename": "File name",
        "tags": "Tags",
        "detected_text": "Detected text",
        "file_selected_singular": "file selected",
        "files_selected_plural": "files selected",
        "more": "more",
        "drag_drop": "Drag files here or ",
        "navigate": "browse",
        "edit_profile": "Edit Profile",
        "logout": "Logout"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('appLanguage') || 'es',
    fallbackLng: 'es',
    interpolation: { escapeValue: false }
  });

export default i18n;
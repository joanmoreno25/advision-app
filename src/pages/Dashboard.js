import React, { useState, useEffect } from 'react';
import '../App.css';


import { s3Client, rekognitionClient, BUCKET_NAME } from '../aws-config';
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { DetectLabelsCommand, DetectTextCommand } from "@aws-sdk/client-rekognition";


import { db, auth } from '../firebase-config'; // Añadido auth
import { signOut } from "firebase/auth"; // Añadido signOut
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, where } from "firebase/firestore";
import { useAuth } from '../context/AuthContext';


function Dashboard() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { currentUser } = useAuth();


  const fetchHistory = async () => {
    if (!currentUser) return;


    try {
      const q = query(
        collection(db, "analisis"),
        where("userId", "==", currentUser.uid),
        orderBy("fechaCreacion", "desc")
      );
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setHistory(docs);
    } catch (error) {
      console.error("Error al cargar historial:", error);
    }
  };


  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);


  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };


  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };


  const saveToFirestore = async (imageName, detectedLabels, detectedText) => {
    try {
      const analysisData = {
        userId: currentUser.uid,
        nombreImagen: imageName,
        etiquetas: detectedLabels.map(l => ({
          nombre: l.Name,
          confianza: l.Confidence
        })),
        textoDetectado: detectedText.map(t => t.DetectedText),
        fechaCreacion: serverTimestamp()
      };
      await addDoc(collection(db, "analisis"), analysisData);
      fetchHistory();
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };


  const analyzeImage = async (imageName, fileData) => {
    try {
      const imageParams = {
        Image: { Bytes: fileData }
      };


      const labelsCommand = new DetectLabelsCommand({
        ...imageParams,
        MaxLabels: 10,
        MinConfidence: 75,
      });


      const textCommand = new DetectTextCommand(imageParams);


      const [labelsResponse, textResponse] = await Promise.all([
        rekognitionClient.send(labelsCommand),
        rekognitionClient.send(textCommand)
      ]);


      const textLines = textResponse.TextDetections.filter(item => item.Type === 'LINE');


      await saveToFirestore(imageName, labelsResponse.Labels, textLines);
    } catch (error) {
      console.error("ERROR DETALLADO AWS:", error);
      alert(`Error en IA: ${error.name}.`);
    }
  };


  const uploadToS3 = async () => {
    if (!file) return alert("Selecciona un archivo");
    setUploading(true);
   
    const safeFileName = file.name.replace(/\s+/g, '_');


    try {
      const arrayBuffer = await file.arrayBuffer();
      const fileData = new Uint8Array(arrayBuffer);
     
      await s3Client.send(new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: `originals/${safeFileName}`,
        Body: fileData,
        ContentType: file.type
      }));
     
      await analyzeImage(safeFileName, fileData);
     
    } catch (error) {
      console.error("Fallo general:", error);
    } finally {
      setUploading(false);
    }
  };


  const filteredHistory = history.filter(item => {
    if (!searchTerm) return true;
    return item.etiquetas?.some(label =>
      label.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });


  return (
    <div className="app-container">
      <div className="bg-shape bg-shape-1"></div>
      <div className="bg-shape bg-shape-2"></div>


      {/* Nueva barra de usuario y cierre de sesión */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', marginBottom: '1rem' }}>
        <span>Usuario: <strong>{currentUser?.email}</strong></span>
        <button onClick={handleLogout} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '5px', cursor: 'pointer' }}>
          Cerrar Sesión
        </button>
      </div>


      <header className="main-header">
        <h1>Catalogador <span className="text-gradient">IA</span></h1>
        <p>Análisis Avanzado de Piezas Publicitarias</p>
      </header>


      <main className="main-content">
        <section className="upload-section card glassmorphism">
          <h2>Nuevo Análisis</h2>
          <div className="upload-controls">
            <input type="file" className="file-input" onChange={handleFileChange} id="file-upload"/>
            <label htmlFor="file-upload" className="file-label">
              <span className="upload-icon">📁</span>
              {file ? file.name : "Subir imagen publicitaria"}
            </label>
            <button className="btn-primary" onClick={uploadToS3} disabled={uploading}>
              {uploading ? <span className="loader"></span> : "Procesar con IA"}
            </button>
          </div>
        </section>


        <section className="history-section">
          <div className="section-header">
            <div className="header-title-group">
              <h2>Base de Datos Histórica</h2>
              <span className="badge-count">{filteredHistory.length} registros</span>
            </div>
           
            <div className="search-container">
              <input
                type="text"
                placeholder="Buscar por etiqueta..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
         
          <div className="grid-container">
            {filteredHistory.map((item, index) => (
              <article
                key={item.id}
                className="analysis-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="image-wrapper">
                  <img
                    src={`https://${BUCKET_NAME}.s3.eu-south-2.amazonaws.com/originals/${item.nombreImagen}`}
                    alt={item.nombreImagen}
                  />
                  <div className="image-overlay"></div>
                </div>
                <div className="data-wrapper">
                  <h3 className="file-title">{item.nombreImagen}</h3>
                 
                  <div className="labels-list">
                    {item.etiquetas?.slice(0, 5).map((label, i) => (
                      <div key={i} className="label-item">
                        <div className="label-header">
                          <span className="label-name">{label.nombre}</span>
                          <span className="label-percent">{label.confianza.toFixed(1)}%</span>
                        </div>
                        <div className="progress-bar-bg">
                          <div
                            className="progress-bar-fill"
                            style={{
                              width: `${label.confianza}%`,
                              background: label.confianza > 95 ? 'linear-gradient(90deg, #10b981, #34d399)' :
                                         label.confianza > 85 ? 'linear-gradient(90deg, #3b82f6, #60a5fa)' :
                                         'linear-gradient(90deg, #f59e0b, #fbbf24)'
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>


                  {item.textoDetectado && item.textoDetectado.length > 0 && (
                    <div className="ocr-section">
                      <h4 className="ocr-title">📝 Texto Extraído</h4>
                      <div className="ocr-bubbles">
                        {item.textoDetectado.map((txt, idx) => (
                          <span key={idx} className="ocr-bubble">"{txt}"</span>
                        ))}
                      </div>
                    </div>
                  )}


                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}


export default Dashboard;




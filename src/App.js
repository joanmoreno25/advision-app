import React, { useState } from 'react';
import './App.css';

// Importamos los agentes y los comandos necesarios
import { s3Client, rekognitionClient, BUCKET_NAME } from './aws-config';
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { DetectLabelsCommand } from "@aws-sdk/client-rekognition";

function App() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [labels, setLabels] = useState([]); // Nueva memoria para guardar las etiquetas de la IA

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setLabels([]); // Limpiamos etiquetas anteriores al elegir nueva foto
  };

  // --- FUNCIÓN PARA LLAMAR A LA IA ---
  const analyzeImage = async (imageName) => {
    try {
      const command = new DetectLabelsCommand({
        Image: {
          S3Object: {
            Bucket: BUCKET_NAME,
            Name: `originals/${imageName}`, // Le damos la dirección de la foto
          },
        },
        MaxLabels: 10, // Le pedimos solo las 10 etiquetas más importantes
        MinConfidence: 75, // Solo queremos cosas de las que esté muy segura (>75%)
      });

      const response = await rekognitionClient.send(command);
      setLabels(response.Labels); // Guardamos el JSON de respuesta en el estado
    } catch (error) {
      console.error("Error en Rekognition:", error);
      alert("La IA no pudo analizar la imagen.");
    }
  };

  const uploadToS3 = async () => {
    if (!file) return alert("Selecciona una imagen.");
    setUploading(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const fileData = new Uint8Array(arrayBuffer);

      const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: `originals/${file.name}`,
        Body: fileData,
        ContentType: file.type
      });

      await s3Client.send(command);
      
      // Si la subida va bien, llamamos a la IA inmediatamente
      await analyzeImage(file.name);
      
      alert("¡Proceso completado!");
    } catch (error) {
      console.error("Fallo:", error);
      alert("Error en el proceso.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Catalogador IA</h1>
        <p className="subtitle">Investigación Publicitaria y Análisis Visual</p>
        
        <div className="upload-container">
          <input type="file" accept="image/*" onChange={handleFileChange} />
          
          <button onClick={uploadToS3} disabled={uploading || !file}>
            {uploading ? "Procesando Análisis..." : "Analizar Pieza Publicitaria"}
          </button>
          
          {file && <p style={{marginTop: '1rem', fontSize: '0.9rem'}}>Archivo: <strong>{file.name}</strong></p>}
        </div>

        {labels.length > 0 && (
          <div className="results-container">
            <h2>Resultados del Análisis</h2>
            <div className="results-grid">
              {labels.map((label, index) => (
                <div className="label-card" key={index}>
                  <span className="label-name">{label.Name}</span>
                  <div className="confidence-bar-bg">
                    <div 
                      className="confidence-bar-fill" 
                      style={{ width: `${label.Confidence}%` }}
                    ></div>
                  </div>
                  <span className="confidence-text">
                    Confianza: {label.Confidence.toFixed(2)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
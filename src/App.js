import React, { useState } from 'react';
import './App.css';

// --- IMPORTACIONES DE AWS ---
import { s3Client, rekognitionClient, BUCKET_NAME } from './aws-config';
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { DetectLabelsCommand } from "@aws-sdk/client-rekognition";

// --- IMPORTACIONES DE FIREBASE ---
import { db } from './firebase-config'; // Nuestra conexión
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; // Herramientas de la base de datos

function App() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [labels, setLabels] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setLabels([]);
  };

  // --- NUEVA FUNCIÓN: GUARDAR EN LA BASE DE DATOS ---
  const saveToFirestore = async (imageName, detectedLabels) => {
    try {
      // 1. Creamos la "ficha" con los datos que queremos guardar
      const analysisData = {
        nombreImagen: imageName,
        etiquetas: detectedLabels.map(l => ({ 
          nombre: l.Name, 
          confianza: l.Confidence 
        })),
        fechaCreacion: serverTimestamp() // Usa la hora oficial de Google
      };

      // 2. Le decimos a Firebase: "Añade este documento a la carpeta 'analisis'"
      const docRef = await addDoc(collection(db, "analisis"), analysisData);
      
      console.log("Análisis guardado en Firebase con ID: ", docRef.id);
    } catch (error) {
      console.error("Error al guardar en Firebase:", error);
    }
  };

  const analyzeImage = async (imageName) => {
    try {
      const command = new DetectLabelsCommand({
        Image: { S3Object: { Bucket: BUCKET_NAME, Name: `originals/${imageName}` } },
        MaxLabels: 10,
        MinConfidence: 75,
      });

      const response = await rekognitionClient.send(command);
      setLabels(response.Labels);

      // ¡PASO CLAVE!: Guardamos el resultado en la base de datos
      await saveToFirestore(imageName, response.Labels);

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
      await analyzeImage(file.name);
      alert("¡Imagen analizada y guardada con éxito!");
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
        <p className="subtitle">Investigación Publicitaria con Persistencia de Datos</p>
        
        <div className="upload-container">
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button onClick={uploadToS3} disabled={uploading || !file}>
            {uploading ? "Procesando..." : "Analizar y Guardar"}
          </button>
        </div>

        {labels.length > 0 && (
          <div className="results-container">
            <h2>Resultados Guardados</h2>
            <div className="results-grid">
              {labels.map((label, index) => (
                <div className="label-card" key={index}>
                  <span className="label-name">{label.Name}</span>
                  <div className="confidence-bar-bg">
                    <div className="confidence-bar-fill" style={{ width: `${label.Confidence}%` }}></div>
                  </div>
                  <span className="confidence-text">{label.Confidence.toFixed(2)}%</span>
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
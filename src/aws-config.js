import { S3Client } from "@aws-sdk/client-s3";
import { RekognitionClient } from "@aws-sdk/client-rekognition";

// Cargamos las llaves desde el archivo .env de forma segura
const credentials = {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
};

const region = process.env.REACT_APP_AWS_REGION;

// Creamos el cliente de S3 (para las fotos)
export const s3Client = new S3Client({
    region,
    credentials
});

// Creamos el cliente de Rekognition (para la IA)
export const rekognitionClient = new RekognitionClient({
    region,
    credentials
});

// Definimos el nombre de tu bucket para usarlo fácilmente
export const BUCKET_NAME = "tfg-joan-moreno";
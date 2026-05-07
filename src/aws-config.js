import { S3Client } from "@aws-sdk/client-s3";
import { RekognitionClient } from "@aws-sdk/client-rekognition";

// Cargamos las llaves desde el archivo .env
const credentials = {
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
};

const region = process.env.REACT_APP_AWS_REGION;

// Cliente de S3 (Guardará las fotos en tu bucket de España)
export const s3Client = new S3Client({
  region,
  credentials
});

// Cliente de Rekognition (Obligamos a que procese en Irlanda para evitar bloqueos)
export const rekognitionClient = new RekognitionClient({
  region: "eu-west-1", 
  credentials
});

export const BUCKET_NAME = "tfg-joan-moreno";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

/**
 * Envia um buffer de imagem para o Cloudinary e retorna a URL segura.
 * @param {Buffer} buffer - O buffer do arquivo (gerado pelo multer).
 * @param {String} folder - Nome da pasta no Cloudinary (opcional).
 * @returns {Promise<String>} - URL da imagem no Cloudinary.
 */
export function uploadToCloudinary(buffer, folder = "arte-sob-o-microscopio") {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
}
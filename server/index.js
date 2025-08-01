import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import userRoutes from "./routes/userRoutes.js";
import exhibitionRoutes from "./routes/exhibitionRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import authorRoutes from "./routes/authorRoutes.js";
import sectionRoutes from "./routes/sectionRoutes.js";
import publicRoutes from "./routes/publicRoutes.js";
import spotifyRoutes from "./routes/spotifyRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";

const app = express();

const allowedOrigins = [
  'https://olharsobomicroscopio.vercel.app',
  'http://localhost:5173'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'A política de CORS para este site não permite o acesso a partir da Origem especificada.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/exhibitions", exhibitionRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/sections", sectionRoutes);
app.use("/api/spotify", spotifyRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/images", imageRoutes);
app.use("/", publicRoutes);

app.use("*", (req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT} ✅`);
});
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

const app = express();

// Middlewares globais
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas da API
app.use("/api/users", userRoutes);
app.use("/api/exhibitions", exhibitionRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/sections", sectionRoutes);
app.use("/api/spotify", spotifyRoutes);
app.use("/", publicRoutes);

// Manipulador de rota não encontrada
app.use("*", (req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
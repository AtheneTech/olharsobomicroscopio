import { prisma } from "../prisma/client.js";
import { uploadToCloudinary } from "../services/uploadService.js";
import { imageSchema } from "../utils/zodSchemas.js";

export async function uploadImage(req, res) {
  try {
    if (req.body.predominance && typeof req.body.predominance === "string") {
      try {
        req.body.predominance = JSON.parse(req.body.predominance);
      } catch (e) {
        return res.status(400).json({ error: "O campo 'predominance' contém um JSON inválido." });
      }
    }

    const validation = imageSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: "Dados inválidos", details: validation.error.format() });
    }

    const { name, description, source, authorId, sectionId, song, predominance } = validation.data;

    if (!req.file) {
      return res.status(400).json({ error: "Arquivo de imagem ausente." });
    }

    const author = await prisma.author.findUnique({ where: { id: authorId } });
    if (!author) {
      return res.status(404).json({ error: "Autor não encontrado." });
    }

    const section = await prisma.section.findUnique({ where: { id: sectionId } });
    if (!section) {
      return res.status(404).json({ error: "Seção não encontrada." });
    }

    const imageUrl = await uploadToCloudinary(req.file.buffer);

    const image = await prisma.image.create({
      data: {
        name,
        description,
        source,
        url: imageUrl,
        section: { connect: { id: sectionId } },
        author: { connect: { id: authorId } },
        song,
        predominance,
      },
    });

    res.status(201).json({ message: "Imagem enviada com sucesso", image });
  } catch (err) {
    console.error("Erro ao fazer upload da imagem:", err);
    res.status(500).json({ error: "Erro interno ao processar o upload da imagem." });
  }
}
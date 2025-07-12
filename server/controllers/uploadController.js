import { prisma } from "../prisma/client.js";
import { uploadToCloudinary } from "../services/uploadService.js";

export async function uploadImage(req, res) {
  try {
    const { name, description, source, authorId, sectionId } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Arquivo de imagem ausente." });
    }
    if (!name || !authorId || !sectionId) {
      return res.status(400).json({ error: "Dados obrigatórios ausentes: nome, autor e seção." });
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
      },
    });

    res.status(201).json({ message: "Imagem enviada com sucesso", image });
  } catch (err) {
    console.error("Erro ao fazer upload da imagem:", err);
    res.status(500).json({ error: "Erro interno ao processar o upload da imagem." });
  }
}
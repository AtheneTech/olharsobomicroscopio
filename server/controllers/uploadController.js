import { prisma } from "../prisma/client.js";
import { uploadToCloudinary } from "../services/uploadService.js";

export async function uploadImage(req, res) {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: "Arquivo de imagem principal ausente." });
    }

    const data = req.body;

    if (data.predominance && typeof data.predominance === 'string') {
      data.predominance = JSON.parse(data.predominance);
    }
    if (data.additionalInfo && typeof data.additionalInfo === 'string') {
      data.additionalInfo = JSON.parse(data.additionalInfo);
    }

    let sectionIds = [];
    if (data.sectionIds && typeof data.sectionIds === 'string') {
      sectionIds = data.sectionIds.split(',').filter(id => id);
    }

    const author = await prisma.author.findUnique({ where: { id: data.authorId } });
    if (!author) {
      return res.status(404).json({ error: "Autor não encontrado." });
    }
    
    const imageUrl = await uploadToCloudinary(req.files.image[0].buffer);
    let iconUrl = null;

    // ✅ NOVO: Faz o upload do ícone, se ele existir
    if (req.files.icon) {
      iconUrl = await uploadToCloudinary(req.files.icon[0].buffer);
    }

    const image = await prisma.image.create({
      data: {
        name: data.name,
        description: data.description,
        source: data.source,
        url: imageUrl,
        iconUrl: iconUrl,
        song: data.song,
        predominance: data.predominance || null,
        additionalInfo: data.additionalInfo || null,
        author: {
          connect: { id: data.authorId },
        },
        sections: {
          connect: sectionIds.map(id => ({ id })),
        },
      },
    });

    res.status(201).json({ message: "Imagem enviada com sucesso", image });
  } catch (err) {
    console.error("Erro ao fazer upload da imagem:", err);
    res.status(500).json({ error: "Erro interno ao processar o upload da imagem." });
  }
}

import express from "express";
import { prisma } from "../prisma/client.js";

const router = express.Router();

router.get("/:edition", async (req, res) => {
  try {
    const { edition } = req.params;

    const exhibition = await prisma.exhibition.findUnique({
      where: { edition },
      include: {
        sections: {
          include: {
            images: {
              select: {
                id: true,
                name: true,
                description: true,
                source: true,
                url: true,
                song: true,
                predominance: true,
                additionalInfo: true,
                iconUrl: true,
                createdAt: true,
                updatedAt: true,
                author: true,
              }
            },
          },
        },
      },
    });

    if (!exhibition) {
      return res.status(404).json({ error: "Exposição não encontrada." });
    }

    res.json(exhibition);
  } catch (err) {
    console.error("Erro ao carregar exposição pública:", err);
    res.status(500).json({ error: "Erro interno ao carregar a exposição." });
  }
});

export default router;
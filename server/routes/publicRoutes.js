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
              include: {
                author: true,
              },
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
    console.error(`Erro ao carregar exposição pública '${req.params.edition}':`, err);
    res.status(500).json({ error: "Erro interno ao carregar a exposição." });
  }
});

export default router;
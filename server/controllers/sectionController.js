import { prisma } from "../prisma/client.js";

export async function createSection(req, res) {
  try {
    const { name, exhibitionId } = req.body;

    const exhibition = await prisma.exhibition.findUnique({ where: { id: exhibitionId } });
    if (!exhibition) {
      return res.status(404).json({ error: "Exposição não encontrada para vincular a seção." });
    }

    const section = await prisma.section.create({
      data: {
        name,
        exhibition: {
          connect: { id: exhibitionId },
        },
      },
    });

    res.status(201).json(section);
  } catch (err) {
    console.error("Erro ao criar seção:", err);
    res.status(500).json({ error: "Erro interno ao criar a seção." });
  }
}

export async function getSectionsByExhibition(req, res) {
  try {
    const { exhibitionId } = req.params;

    const sections = await prisma.section.findMany({
      where: { exhibitionId },
    });

    res.json(sections);
  } catch (err) {
    console.error(`Erro ao buscar seções para a exposição '${req.params.exhibitionId}':`, err);
    res.status(500).json({ error: "Erro interno ao buscar as seções." });
  }
}
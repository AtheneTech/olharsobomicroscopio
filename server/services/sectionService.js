import { prisma } from "../prisma/client.js";

export async function createSection(data) {
  const { name, exhibitionId } = data;

  const exhibition = await prisma.exhibition.findUnique({ where: { id: exhibitionId } });
  if (!exhibition) {
    throw new Error("Exposição não encontrada para vincular a seção.");
  }

  return prisma.section.create({
    data: {
      name,
      exhibition: {
        connect: { id: exhibitionId },
      },
    },
  });
}

export async function getSectionsByExhibition(exhibitionId) {
  return prisma.section.findMany({
    where: { exhibitionId },
  });
}

export async function getAllSections() {
  return prisma.section.findMany({
    orderBy: { name: 'asc' },
  });
}
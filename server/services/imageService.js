import { prisma } from "../prisma/client.js";
import { deleteFromCloudinary } from "./uploadService.js";

export async function getAllImages(query) {
  const whereClause = (query && query.trim() !== '') ? {
    OR: [
      { name: { contains: query, mode: 'insensitive' } },
      { author: { name: { contains: query, mode: 'insensitive' } } },
      { sections: { some: { name: { contains: query, mode: 'insensitive' } } } },
      { sections: { some: { exhibition: { title: { contains: query, mode: 'insensitive' } } } } },
      { sections: { some: { exhibition: { edition: { contains: query, mode: 'insensitive' } } } } },
    ],
  } : {};

  return prisma.image.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' },
    include: {
      author: { select: { name: true } },
      sections: {
        include: {
          exhibition: {
            select: {
              title: true,
              edition: true,
            },
          },
        },
      },
    },
  });
}

export async function getImageById(id) {
  const image = await prisma.image.findUnique({ 
    where: { id },
    include: { sections: true }
  });
  if (!image) throw new Error("Imagem não encontrada.");
  return image;
}

export async function updateImage(id, data) {
  const { sectionIds, ...otherData } = data;

  return prisma.image.update({
    where: { id },
    data: {
      ...otherData,
      sections: {
        set: sectionIds.map(id => ({ id })),
      },
    },
  });
}

export async function deleteImage(id) {
  const image = await prisma.image.findUnique({ where: { id } });
  if (!image) throw new Error("Imagem não encontrada para deletar.");

  if (image.url) {
    await deleteFromCloudinary(image.url);
  }

  return prisma.image.delete({ where: { id } });
}
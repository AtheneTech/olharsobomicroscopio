import { prisma } from "../prisma/client.js";
import { deleteFromCloudinary } from "./uploadService.js";

export async function getAllImages() {
  return prisma.image.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      author: { select: { name: true } },
      section: {
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
  const image = await prisma.image.findUnique({ where: { id } });
  if (!image) throw new Error("Imagem não encontrada.");
  return image;
}

export async function updateImage(id, data) {
  return prisma.image.update({
    where: { id },
    data,
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
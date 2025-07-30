import { prisma } from "../prisma/client.js";

export async function createAuthor(data) {
  return prisma.author.create({ data });
}

export async function getAllAuthors() {
  return prisma.author.findMany({
    orderBy: { name: 'asc' },
  });
}

export async function getAuthorById(id) {
  const author = await prisma.author.findUnique({ where: { id } });
  if (!author) throw new Error("Autor não encontrado.");
  return author;
}

export async function updateAuthor(id, data) {
  const existingAuthor = await prisma.author.findUnique({ where: { id } });
  if (!existingAuthor) throw new Error("Autor não encontrado para atualizar.");

  const updatedAuthor = await prisma.author.update({
    where: { id },
    data,
  });

  return { updatedAuthor, oldPhotoUrl: existingAuthor.photoUrl };
}

export async function deleteAuthor(id) {
  return prisma.author.delete({ where: { id } });
}

export async function getImagesByAuthorId(authorId) {
  return prisma.image.findMany({
    where: { authorId },
    orderBy: { createdAt: 'desc' },
  });
}
import { prisma } from "../prisma/client.js";

export async function createExhibition(data) {
  const existing = await prisma.exhibition.findUnique({
    where: { edition: data.edition },
  });
  if (existing) {
    throw new Error("Uma exposição com esta edição já existe.");
  }

  return prisma.exhibition.create({
    data,
  });
}

export async function getAllExhibitions() {
  return prisma.exhibition.findMany({
    orderBy: {
      edition: 'desc',
    },
  });
}

export async function getExhibitionById(id) {
  const exhibition = await prisma.exhibition.findUnique({
    where: { id },
  });

  if (!exhibition) {
    throw new Error("Exposição não encontrada.");
  }

  return exhibition;
}

export async function getExhibitionByEdition(edition) {
  const exhibition = await prisma.exhibition.findUnique({
    where: { edition },
    include: {
      sections: {
        include: {
          images: {
            include: { author: true },
          },
        },
      },
    },
  });

  if (!exhibition) {
    throw new Error("Exposição não encontrada.");
  }

  return exhibition;
}

export async function updateExhibition(id, data) {
  return prisma.exhibition.update({
    where: { id },
    data,
  });
}

export async function deleteExhibition(id) {
  return prisma.exhibition.delete({
    where: { id },
  });
}

export async function duplicateExhibition(originalId, newData) {
  const { title, edition } = newData;

  const editionExists = await prisma.exhibition.findUnique({ where: { edition } });
  if (editionExists) {
    throw new Error("A nova edição para a exposição duplicada já existe.");
  }

  const original = await prisma.exhibition.findUnique({
    where: { id: originalId },
    include: {
      sections: {
        include: {
          images: true,
        },
      },
    },
  });

  if (!original) {
    throw new Error("Exposição original não encontrada para duplicação.");
  }

  return prisma.exhibition.create({
    data: {
      title,
      edition,
      sections: {
        create: original.sections.map((section) => ({
          name: section.name,
          images: {
            create: section.images.map((image) => ({
              name: image.name,
              description: image.description,
              source: image.source,
              url: image.url,
              author: {
                connect: { id: image.authorId },
              },
              song: image.song,
              predominance: image.predominance,
            })),
          },
        })),
      },
    },
    include: {
      sections: {
        include: {
          images: true,
        },
      },
    },
  });
}
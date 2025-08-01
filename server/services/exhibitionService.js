import { prisma } from "../prisma/client.js";

export async function createExhibition(data) {
  const { title, edition, description, sections } = data;

  const existing = await prisma.exhibition.findUnique({
    where: { edition },
  });
  if (existing) {
    throw new Error("Uma exposição com esta edição já existe.");
  }

  return prisma.exhibition.create({
    data: {
      title,
      edition,
      description,
      sections: {
        create: sections || [],
      },
    },
  });
}

export async function getAllExhibitions(query) {
  let whereClause = {};

  if (query && typeof query === 'string' && query.trim() !== '') {
    whereClause = {
      OR: [
        {
          title: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          edition: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ],
    };
  }

  return prisma.exhibition.findMany({
    where: whereClause,
    orderBy: { edition: 'desc' },
  });
}

export async function getExhibitionById(id) {
  const exhibition = await prisma.exhibition.findUnique({
    where: { id },
    include: {
      sections: {
        include: {
          images: {
            orderBy: {
              createdAt: 'asc',
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
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
    throw new Error("Exposição não encontrada.");
  }

  return exhibition;
}

export async function updateExhibition(id, data) {
  const { title, edition, description, sections } = data;

  const existingExhibition = await prisma.exhibition.findUnique({
    where: { id },
    include: { sections: true },
  });
  const existingSectionIds = existingExhibition.sections.map(s => s.id);

  const sectionIdsToKeep = sections.map(s => s.id).filter(Boolean);
  const sectionIdsToDelete = existingSectionIds.filter(id => !sectionIdsToKeep.includes(id));

  return prisma.exhibition.update({
    where: { id },
    data: {
      title,
      edition,
      description,
      sections: {
        deleteMany: {
          id: { in: sectionIdsToDelete },
        },
        updateMany: sections
          .filter(s => s.id)
          .map(s => ({
            where: { id: s.id },
            data: { name: s.name },
          })),
        create: sections
          .filter(s => !s.id)
          .map(s => ({ name: s.name })),
      },
    },
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
      description: original.description,
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

export async function getLatestExhibition() {
  const latest = await prisma.exhibition.findFirst({
    orderBy: {
      edition: 'desc',
    },
  });

  if (!latest) {
    throw new Error("Nenhuma exposição encontrada.");
  }

  return latest;
}
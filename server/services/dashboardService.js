import { prisma } from "../prisma/client.js";

export async function getDashboardStats() {
  const [
    totalExhibitions,
    totalAuthors,
    totalImages,
    pendingUsers,
  ] = await prisma.$transaction([
    prisma.exhibition.count(),
    prisma.author.count(),
    prisma.image.count(),
    prisma.user.count({ where: { isApproved: false } }),
  ]);

  return {
    totalExhibitions,
    totalAuthors,
    totalImages,
    pendingUsers,
  };
}

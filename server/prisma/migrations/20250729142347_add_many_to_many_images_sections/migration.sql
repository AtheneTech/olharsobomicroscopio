/*
  Warnings:

  - You are about to drop the column `sectionId` on the `Image` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_sectionId_fkey";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "sectionId";

-- CreateTable
CREATE TABLE "_ImageToSection" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ImageToSection_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ImageToSection_B_index" ON "_ImageToSection"("B");

-- AddForeignKey
ALTER TABLE "_ImageToSection" ADD CONSTRAINT "_ImageToSection_A_fkey" FOREIGN KEY ("A") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImageToSection" ADD CONSTRAINT "_ImageToSection_B_fkey" FOREIGN KEY ("B") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

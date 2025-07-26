/*
  Warnings:

  - Added the required column `predominance` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `song` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "predominance" TEXT NOT NULL,
ADD COLUMN     "song" TEXT NOT NULL;

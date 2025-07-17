/*
  Warnings:

  - Changed the type of `predominance` on the `Image` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "predominance",
ADD COLUMN     "predominance" JSONB NOT NULL;

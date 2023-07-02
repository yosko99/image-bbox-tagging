/*
  Warnings:

  - Added the required column `imageURL` to the `CompletedTag` table without a default value. This is not possible if the table is not empty.
  - Made the column `imageURL` on table `Tag` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CompletedTag" ADD COLUMN     "imageURL" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tag" ALTER COLUMN "imageURL" SET NOT NULL,
ALTER COLUMN "imageURL" DROP DEFAULT;

-- CreateEnum
CREATE TYPE "Urgency" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "imageURL" TEXT DEFAULT 'no-image.png',
    "objectsToAnnotate" TEXT[],
    "withLabels" BOOLEAN NOT NULL,
    "urgency" "Urgency" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompletedTag" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "CompletedTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coordinate" (
    "id" SERIAL NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "completedTagId" INTEGER,

    CONSTRAINT "Coordinate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Coordinate" ADD CONSTRAINT "Coordinate_completedTagId_fkey" FOREIGN KEY ("completedTagId") REFERENCES "CompletedTag"("id") ON DELETE SET NULL ON UPDATE CASCADE;

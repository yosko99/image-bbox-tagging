-- DropForeignKey
ALTER TABLE "Coordinate" DROP CONSTRAINT "Coordinate_completedTagId_fkey";

-- AddForeignKey
ALTER TABLE "Coordinate" ADD CONSTRAINT "Coordinate_completedTagId_fkey" FOREIGN KEY ("completedTagId") REFERENCES "CompletedTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

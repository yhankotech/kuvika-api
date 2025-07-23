/*
  Warnings:

  - Added the required column `serviceRequestId` to the `rating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rating" ADD COLUMN     "serviceRequestId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_serviceRequestId_fkey" FOREIGN KEY ("serviceRequestId") REFERENCES "service_request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

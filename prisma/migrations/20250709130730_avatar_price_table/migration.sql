-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "avatar" TEXT;

-- AlterTable
ALTER TABLE "Worker" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "price" DOUBLE PRECISION;

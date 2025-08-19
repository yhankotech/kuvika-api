-- AlterTable
ALTER TABLE "client" ADD COLUMN     "activationCode" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "worker" ADD COLUMN     "activationCode" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;

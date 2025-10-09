-- AlterTable
ALTER TABLE "worker" ADD COLUMN     "birth_date" TIMESTAMP(3),
ADD COLUMN     "experience" INTEGER,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "municipality" TEXT,
ADD COLUMN     "neighborhood" TEXT,
ADD COLUMN     "profession" TEXT;

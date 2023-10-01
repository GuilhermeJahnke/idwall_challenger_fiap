/*
  Warnings:

  - You are about to drop the column `description` on the `Crime` table. All the data in the column will be lost.
  - You are about to drop the column `forename` on the `Criminal` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Criminal` table. All the data in the column will be lost.
  - You are about to drop the column `reward` on the `Criminal` table. All the data in the column will be lost.
  - Added the required column `fullName` to the `Criminal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Crime" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "Criminal" DROP COLUMN "forename",
DROP COLUMN "name",
DROP COLUMN "reward",
ADD COLUMN     "entityId" TEXT,
ADD COLUMN     "fullName" TEXT NOT NULL,
ALTER COLUMN "nationality" DROP NOT NULL,
ALTER COLUMN "dateOfBirth" DROP NOT NULL,
ALTER COLUMN "photoUrl" DROP NOT NULL,
ALTER COLUMN "sex" DROP NOT NULL,
ALTER COLUMN "collectedFrom" DROP NOT NULL;

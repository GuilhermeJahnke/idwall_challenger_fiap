/*
  Warnings:

  - You are about to drop the column `nationality` on the `Criminal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Criminal" DROP COLUMN "nationality",
ADD COLUMN     "nationalities" TEXT;

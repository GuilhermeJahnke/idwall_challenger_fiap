-- CreateTable
CREATE TABLE "Criminal" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "forename" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "reward" INTEGER NOT NULL,
    "collectedFrom" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Criminal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Crime" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Crime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CrimeToCriminal" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CrimeToCriminal_AB_unique" ON "_CrimeToCriminal"("A", "B");

-- CreateIndex
CREATE INDEX "_CrimeToCriminal_B_index" ON "_CrimeToCriminal"("B");

-- AddForeignKey
ALTER TABLE "_CrimeToCriminal" ADD CONSTRAINT "_CrimeToCriminal_A_fkey" FOREIGN KEY ("A") REFERENCES "Crime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CrimeToCriminal" ADD CONSTRAINT "_CrimeToCriminal_B_fkey" FOREIGN KEY ("B") REFERENCES "Criminal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

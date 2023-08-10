/*
  Warnings:

  - You are about to drop the column `photoPath` on the `Event` table. All the data in the column will be lost.
  - Added the required column `area` to the `Venue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Venue` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Area" AS ENUM ('JUNCTION', 'LITTLE_PORTUGAL', 'ANNEX', 'KENSINGTON', 'DOWNTOWN', 'RIVERDALE', 'BEACHES', 'NORTH_YORK', 'DAVISVILLE');

-- AlterTable
ALTER TABLE "Band" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "photoPath",
ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Venue" ADD COLUMN     "area" "Area" NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "facebookLink" TEXT,
ADD COLUMN     "phoneNumber" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Band_featured_idx" ON "Band"("featured");

-- CreateIndex
CREATE INDEX "Event_featured_idx" ON "Event"("featured");

-- CreateIndex
CREATE INDEX "Venue_featured_idx" ON "Venue"("featured");

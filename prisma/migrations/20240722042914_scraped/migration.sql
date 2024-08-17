/*
  Warnings:

  - You are about to drop the column `password` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `bandId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `area` on the `Venue` table. All the data in the column will be lost.
  - You are about to drop the `Band` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[startDate,venueId]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `artistId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('JAZZ', 'BLUES', 'FUNK', 'SOUL', 'ROCK', 'POP', 'HIPHOP', 'RNB', 'COUNTRY', 'CLASSICAL', 'ELECTRONIC', 'INDIE', 'OTHER');

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_bandId_fkey";

-- DropIndex
DROP INDEX "Event_featured_idx";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "password";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "bandId",
ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "artistId" TEXT NOT NULL,
ADD COLUMN     "conflict" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "conflictEventId" TEXT,
ADD COLUMN     "scraped" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Venue" DROP COLUMN "area",
ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "photoName" TEXT;

-- DropTable
DROP TABLE "Band";

-- DropEnum
DROP TYPE "Area";

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "genre" "Genre",
    "photoPath" TEXT,
    "photoName" TEXT,
    "instagramHandle" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "website" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "scraped" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Artist_name_key" ON "Artist"("name");

-- CreateIndex
CREATE INDEX "Artist_featured_name_idx" ON "Artist"("featured", "name");

-- CreateIndex
CREATE INDEX "Event_featured_name_idx" ON "Event"("featured", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Event_startDate_venueId_key" ON "Event"("startDate", "venueId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_conflictEventId_fkey" FOREIGN KEY ("conflictEventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `photo` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "photo",
ADD COLUMN     "avatar" TEXT;

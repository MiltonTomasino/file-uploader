/*
  Warnings:

  - Added the required column `folderName` to the `Folder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Folder" ADD COLUMN     "folderName" TEXT NOT NULL;

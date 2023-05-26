/*
  Warnings:

  - Added the required column `googleProviderId` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registerType` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `googleProviderId` VARCHAR(191) NOT NULL,
    ADD COLUMN `registerType` ENUM('Platform', 'google') NOT NULL;

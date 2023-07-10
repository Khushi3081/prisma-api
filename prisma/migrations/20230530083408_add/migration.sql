/*
  Warnings:

  - You are about to drop the column `registerType` on the `user` table. All the data in the column will be lost.
  - Made the column `password` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `registerType`,
    ADD COLUMN `register_type` ENUM('Platform', 'google') NULL,
    MODIFY `password` VARCHAR(191) NOT NULL,
    MODIFY `google_provider_id` VARCHAR(191) NULL;

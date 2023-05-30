/*
  Warnings:

  - You are about to drop the column `googleProviderId` on the `user` table. All the data in the column will be lost.
  - Added the required column `google_provider_id` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `googleProviderId`,
    ADD COLUMN `google_provider_id` VARCHAR(191) NOT NULL;

/*
  Warnings:

  - Added the required column `image_name` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_path` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `image_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `image_path` VARCHAR(191) NOT NULL;

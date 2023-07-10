/*
  Warnings:

  - Added the required column `total` to the `cart_product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cart_product` ADD COLUMN `total` INTEGER NOT NULL;

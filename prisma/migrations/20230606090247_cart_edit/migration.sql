/*
  Warnings:

  - You are about to drop the column `p_id` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `p_quantity` on the `cart` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `cart_p_id_fkey`;

-- AlterTable
ALTER TABLE `cart` DROP COLUMN `p_id`,
    DROP COLUMN `p_quantity`;

-- AlterTable
ALTER TABLE `order` ADD COLUMN `user_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `cart_product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `p_id` INTEGER NOT NULL,
    `p_quantuty` INTEGER NOT NULL,
    `cart_id` INTEGER NOT NULL,

    INDEX `cart_p_id_fkey`(`p_id`),
    INDEX `cart_cart_id_fkey`(`cart_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `order_user_id_fkey` ON `order`(`user_id`);

-- AddForeignKey
ALTER TABLE `cart_product` ADD CONSTRAINT `cart_product_p_id_fkey` FOREIGN KEY (`p_id`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart_product` ADD CONSTRAINT `cart_product_cart_id_fkey` FOREIGN KEY (`cart_id`) REFERENCES `cart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

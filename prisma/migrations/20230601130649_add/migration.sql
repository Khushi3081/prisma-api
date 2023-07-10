/*
  Warnings:

  - You are about to drop the column `p_id` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[c_id]` on the table `order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `c_id` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_p_id_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_user_id_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `p_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `c_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `order_c_id_key` ON `order`(`c_id`);

-- CreateIndex
CREATE INDEX `order_c_id_fkey` ON `order`(`c_id`);

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_c_id_fkey` FOREIGN KEY (`c_id`) REFERENCES `cart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

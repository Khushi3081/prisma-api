-- CreateTable
CREATE TABLE `product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `price` VARCHAR(191) NOT NULL,
    `quantity` VARCHAR(191) NOT NULL,
    `c_id` INTEGER NULL,
    `sub_id` INTEGER NULL,

    INDEX `product_c_id_fkey`(`c_id`),
    INDEX `product_sub_id_fkey`(`sub_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_c_id_fkey` FOREIGN KEY (`c_id`) REFERENCES `category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_sub_id_fkey` FOREIGN KEY (`sub_id`) REFERENCES `subCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

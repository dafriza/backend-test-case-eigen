/*
  Warnings:

  - Added the required column `updatedAt` to the `borrows` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `books` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `borrows` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `status` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `members` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `users` ALTER COLUMN `updatedAt` DROP DEFAULT;

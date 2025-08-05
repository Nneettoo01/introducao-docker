/*
  Warnings:

  - You are about to drop the column `categoria` on the `Produtos` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `Produtos` table. All the data in the column will be lost.
  - You are about to drop the column `imagem` on the `Produtos` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Produtos` table. All the data in the column will be lost.
  - You are about to drop the column `preco` on the `Produtos` table. All the data in the column will be lost.
  - Added the required column `category` to the `Produtos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Produtos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Produtos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Produtos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Produtos" DROP COLUMN "categoria",
DROP COLUMN "descricao",
DROP COLUMN "imagem",
DROP COLUMN "nome",
DROP COLUMN "preco",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

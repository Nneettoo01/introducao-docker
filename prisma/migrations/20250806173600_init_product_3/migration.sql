/*
  Warnings:

  - Changed the type of `category` on the `Produtos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."Categoria" AS ENUM ('ELETRONICOS', 'ROUPAS', 'ALIMENTOS');

-- AlterTable
ALTER TABLE "public"."Produtos" DROP COLUMN "category",
ADD COLUMN     "category" "public"."Categoria" NOT NULL;

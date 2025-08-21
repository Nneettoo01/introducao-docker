/*
  Warnings:

  - The primary key for the `Produtos` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "public"."Produtos" DROP CONSTRAINT "Produtos_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Produtos_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Produtos_id_seq";

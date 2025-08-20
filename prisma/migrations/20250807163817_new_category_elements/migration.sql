/*
  Warnings:

  - The values [ELETRONICOS,ROUPAS,ALIMENTOS] on the enum `Categoria` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."Categoria_new" AS ENUM ('LIMPEZA', 'BEBIDAS', 'ELETRONICO', 'ROUPA', 'ALIMENTO');
ALTER TABLE "public"."Produtos" ALTER COLUMN "category" TYPE "public"."Categoria_new" USING ("category"::text::"public"."Categoria_new");
ALTER TYPE "public"."Categoria" RENAME TO "Categoria_old";
ALTER TYPE "public"."Categoria_new" RENAME TO "Categoria";
DROP TYPE "public"."Categoria_old";
COMMIT;

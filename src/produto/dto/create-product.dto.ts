import { Categoria } from "@prisma/client";
import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsString } from "class-validator";

export class CreateProdutoDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    @Type(() => Number)
    price: number;

    @IsEnum(Categoria)
    category: Categoria
}
import { ApiProperty } from "@nestjs/swagger";
import { Categoria } from "@prisma/client";
import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsString } from "class-validator";

export class CreateProdutoDto {
    @ApiProperty({ example: 'Monster' })
    @IsString()
    name: string;

    @ApiProperty({ example: "Monster de morango" })
    @IsString()
    description: string;

    @ApiProperty({ example: 9.99 })
    @IsNumber()
    @Type(() => Number)
    price: number;

    @ApiProperty({ example: Categoria.BEBIDAS })
    @IsEnum(Categoria)
    category: Categoria
}
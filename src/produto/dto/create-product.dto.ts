import { ApiProperty } from "@nestjs/swagger";
import { Categoria } from "@prisma/client";
import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsString } from "class-validator";

export class CreateProdutoDto {
    @ApiProperty({ example: 'Cuscuz', description: 'Nome do produto' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'Melhor alimento possível', description: 'Descrição do produto' })
    @IsString()
    description: string;

    @ApiProperty({ example: 10, description: 'Preço do produto' })
    @IsNumber()
    @Type(() => Number)
    price: number;

    @ApiProperty({ enum: Categoria, example: 'ALIMENTOS' })
    @IsEnum(Categoria)
    category: Categoria
}
import { ApiProperty } from "@nestjs/swagger";
import { Categoria } from "@prisma/client";
import { IsEnum, IsNumber, IsString } from "class-validator";

export class CreateProdutoDto {
    @ApiProperty({ example: 'Detergente', description: 'Nome do produto' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'Limpeza de casa', description: 'Descrição do produto' })
    @IsString()
    description: string;

    @ApiProperty({ example: 9.99, description: 'Preço do produto' })
    @IsNumber()
    price: number;

    @ApiProperty({ example: 'Limpeza', description: 'Categoria do produto' })
    @IsEnum(Categoria)
    category: Categoria
}
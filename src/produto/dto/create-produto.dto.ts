import { ApiProperty } from "@nestjs/swagger";
import { Categoria } from "@prisma/client";
import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsString } from "class-validator";

export class CreateProdutoDto {
    @ApiProperty({ example: 'Monster', type: String })
    @IsString({ message: "O nome precisa ser string" })
    name: string;

    @ApiProperty({ example: "Monster de morango", type: String })
    @IsString({ message: "A descrição precisa ser string" })
    description: string;

    @ApiProperty({ example: 9.99, type: Number })
    @Type(() => Number)
    @IsNumber({}, { message: "O preço precisa ser um número" })
    price: number;

    @ApiProperty({ example: Categoria.BEBIDAS, enum: Categoria })
    @IsEnum(Categoria, { message: "Categoria inválida" })
    category: Categoria;
}

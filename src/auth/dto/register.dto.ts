import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class RegisterUserDto {
    @ApiProperty({
        example: 'Neto',
        description: 'Nome do usuário',
    })
    @IsString()
    name: string;

    @ApiProperty({ example: 'neto@gmail.com', description: 'Email do usuário' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'Neto12345', description: 'Senha do usuário' })
    @IsString()
    password: string;
}
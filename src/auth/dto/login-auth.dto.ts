import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginAuthDto {
    @ApiProperty({
        example: 'neto@gmail.com',
        description: 'Email do usuário/admin',
    })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'Neto12345', description: 'Senha do usuário/admin' })
    @IsString()
    password: string;
}
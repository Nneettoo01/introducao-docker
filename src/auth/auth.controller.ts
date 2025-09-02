import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterUserDto } from './dto/register.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@ApiTags('Register e Login')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @Post('register')
    @ApiOperation({ summary: 'Registrar Usuário' })
    @ApiBody({ type: RegisterUserDto })
    @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso' })
    @ApiResponse({
        status: 409,
        description: 'Usuário já cadastrado',
    })
    async register(@Body() userData: RegisterUserDto) {
        return this.authService.registerUser(userData);
    }

    @Post('login')
    @ApiOperation({ summary: 'Login do Usuário e Admin' })
    @ApiBody({ type: LoginAuthDto })
    @ApiResponse({ status: 200, description: 'Usuário/admin logado com sucesso' })
    @ApiResponse({
        status: 404,
        description: 'Usuário/admin não existente ou credenciais inválidas',
    })
    @ApiResponse({ status: 500, description: 'Erro interno no servidor' })
    async login(@Body() credentials: LoginAuthDto): Promise<LoginResponseDto> {
        return this.authService.login(credentials);
    }
}
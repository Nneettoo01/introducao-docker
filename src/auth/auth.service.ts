import {
    Injectable,
    ConflictException,
    UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { RegisterUserDto } from './dto/register.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async registerUser(UserData: RegisterUserDto) {
        const userExists = await this.prisma.user.findUnique({
            where: { email: UserData.email },
        });

        if (userExists) {
            throw new ConflictException('Usuário já cadastrado.');
        }

        const hashedPassword = await bcrypt.hash(UserData.password, 10);

        const newUser = await this.prisma.user.create({
            data: {
                name: UserData.name,
                email: UserData.email,
                password: hashedPassword,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
        });

        return newUser;
    }

    async validateUser(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) throw new UnauthorizedException('Credenciais inválidas');

        if (!user.password)
            throw new UnauthorizedException(
                'Usuário não possui senha definida()Logar com o Google',
            );

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new UnauthorizedException('Credenciais inválidas');

        return user;
    }

    async login(credentials: LoginAuthDto) {
        const user = await this.validateUser(
            credentials.email,
            credentials.password,
        );

        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
    let service: AuthService;
    let prisma: PrismaService;
    let jwtService: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: PrismaService,
                    useValue: {
                        user: {
                            findUnique: jest.fn() as jest.Mock,
                            create: jest.fn() as jest.Mock,
                        },
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn() as jest.Mock,
                    },
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        prisma = module.get(PrismaService);
        jwtService = module.get(JwtService);

        jest.spyOn(bcrypt, 'hash').mockImplementation(async () => 'hashedPassword');
        jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('registerUser', () => {
        it('Deve registrar um usuário novo', async () => {
            (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
            (prisma.user.create as jest.Mock).mockResolvedValue({
                id: 1,
                name: 'Neto',
                email: 'neto@gmail.com',
                role: 'USER',
            });

            const result = await service.registerUser({
                name: 'Neto',
                email: 'neto@gmail.com',
                password: '123456',
            });

            expect(result).toEqual({
                id: 1,
                name: 'Neto',
                email: 'neto@gmail.com',
                role: 'USER',
            });
            expect(prisma.user.create).toHaveBeenCalled();
        });

        it('Deve lançar erro se email já estiver cadastrado', async () => {
            (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: 1 } as any);

            await expect(
                service.registerUser({
                    name: 'Neto',
                    email: 'neto@gmail.com',
                    password: '123456',
                }),
            ).rejects.toThrow(ConflictException);
        });
    });

    describe('validateUser', () => {
        it('Deve retornar usuário válido', async () => {
            (prisma.user.findUnique as jest.Mock).mockResolvedValue({
                id: 1,
                email: 'neto@gmail.com',
                password: 'hashedPassword',
            } as any);

            const result = await service.validateUser('neto@gmail.com', '123456');

            expect(result.email).toBe('neto@gmail.com');
        });

        it('Deve lançar erro se usuário não existir', async () => {
            (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

            await expect(
                service.validateUser('neto@gmail.com', '123456'),
            ).rejects.toThrow(UnauthorizedException);
        });

        it('Deve lançar erro se senha não bater', async () => {
            (prisma.user.findUnique as jest.Mock).mockResolvedValue({
                id: 1,
                email: 'neto@gmail.com',
                password: 'hashedPassword',
            } as any);

            jest.spyOn(bcrypt, 'compare').mockImplementation(async () => false);

            await expect(
                service.validateUser('neto@gmail.com', 'HashPassword'),
            ).rejects.toThrow(UnauthorizedException);
        });
    });

    // 👇 Agora sim: login fora do bloco de validateUser
    describe('login', () => {
        it('deve retornar access_token válido', async () => {
            const user = { id: 1, email: 'neto@gmail.com', role: 'USER', password: 'hashPassword' };
            jest.spyOn(service, 'validateUser').mockResolvedValue(user as any);
            (jwtService.sign as jest.Mock).mockReturnValue('jwt-token');

            const result = await service.login({
                email: 'neto@gmail.com',
                password: '123456',
            });

            expect(result).toEqual({ access_token: 'jwt-token' });
            expect(jwtService.sign).toHaveBeenCalledWith({
                sub: 1,
                email: 'neto@gmail.com',
                role: 'USER',
            });
        });
    });
});

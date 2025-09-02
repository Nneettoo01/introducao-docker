import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterUserDto } from './dto/register.dto';
import { Role } from '@prisma/client';

describe('AuthController', () => {
    let controller: AuthController;
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        registerUser: jest.fn(),
                        login: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        service = module.get<AuthService>(AuthService);
    });

    describe('register', () => {
        it('Deve chamar o AuthService.registerUser e retornar usuário', async () => {
            const dto: RegisterUserDto = {
                name: 'Neto',
                email: 'neto@gmail.com',
                password: '123456',
            };

            const mockUser = {
                id: "1",
                name: 'Neto',
                email: 'neto@gmail.com',
                role: Role.USER
            };

            jest.spyOn(service, 'registerUser').mockResolvedValue(mockUser);

            const result = await controller.register(dto);

            expect(service.registerUser).toHaveBeenCalledWith(dto);
            expect(result).toEqual(mockUser);
        });
    });

    describe('login', () => {
        it('Deve chamar o AuthService.login e retornar token', async () => {
            const dto: LoginAuthDto = {
                email: 'neto@gmail.com',
                password: '123456',
            };

            const mockToken = { access_token: 'jwt-token' };

            jest.spyOn(service, 'login').mockResolvedValue(mockToken);

            const result = await controller.login(dto);

            expect(service.login).toHaveBeenCalledWith(dto);
            expect(result).toEqual(mockToken);
        });
    });
});

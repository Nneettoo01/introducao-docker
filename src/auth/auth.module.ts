import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ProdutoModule } from 'src/produto/produto.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => ProdutoModule),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtModule, AuthService],
})
export class AuthModule { }
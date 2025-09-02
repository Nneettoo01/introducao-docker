import { Module } from '@nestjs/common';
import { ProdutoModule } from './produto/produto.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProdutoModule, PrismaModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

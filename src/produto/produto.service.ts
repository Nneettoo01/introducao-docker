import { Prisma } from '.prisma/client/default';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Produtos } from '.prisma/client/default';


@Injectable()
export class ProdutoService {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.ProdutosCreateInput): Promise<Produtos> {
        return this.prisma.produtos.create({
            data,
        });
    }

    async findAll() {
        return this.prisma.produtos.findMany();
    }
}

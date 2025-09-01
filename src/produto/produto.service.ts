import { Prisma } from '.prisma/client/default';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Produtos } from '.prisma/client/default';


@Injectable()
export class ProdutoService {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.ProdutosCreateInput): Promise<Produtos> {
        return this.prisma.produtos.create({ data });
    }

    async findAll() {
        return this.prisma.produtos.findMany();
    }

    async findId(id: string) {
        return this.prisma.produtos.findUnique({
            where: { id },
        });
    }

    async update(id: string, data: Prisma.ProdutosUpdateInput): Promise<Produtos> {
        return this.prisma.produtos.update({
            where: { id },
            data,
        });
    }

    async delete(id: string): Promise<Produtos> {
        return this.prisma.produtos.delete({
            where: { id },
        });
    }
}

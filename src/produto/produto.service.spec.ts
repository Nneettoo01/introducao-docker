import { Test, TestingModule } from "@nestjs/testing"
import { ProdutoService } from "./produto.service"
import { PrismaService } from "../prisma/prisma.service"
import { Categoria } from "@prisma/client"

const mockPrisma = {
    produtos: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }
}

describe("ProdutoService", () => {
    let produtoService: ProdutoService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProdutoService,
                { provide: PrismaService, useValue: mockPrisma },
            ]
        }).compile()
        produtoService = module.get<ProdutoService>(ProdutoService)
    })

    it("Deve criar um produto", async () => {
        const produtoDto = { name: 'Monster', description: 'Sabor morango', price: 9.99, category: Categoria.BEBIDAS }
        mockPrisma.produtos.create.mockResolvedValue(produtoDto)

        const result = await produtoService.create(produtoDto as any)
        expect(result).toEqual(produtoDto)
        expect(mockPrisma.produtos.create).toHaveBeenCalledWith({ data: produtoDto })
    })

    it("Deve listar todos os produtos", async () => {
        const produtos = [{ name: 'Monster', description: 'Sabor morango', price: 9.99, category: Categoria.BEBIDAS }]
        mockPrisma.produtos.findMany.mockResolvedValue(produtos)

        expect(await produtoService.findAll()).toEqual(produtos)
    })

    it("Deve retornar um produto por ID", async () => {
        const produto = { id: "1", name: 'Monster', description: 'Sabor morango', price: 9.99, category: Categoria.BEBIDAS }
        mockPrisma.produtos.findUnique.mockResolvedValue(produto)

        expect(await produtoService.findId("1")).toEqual(produto)
    })

    it("Deve atualizar um produto por ID", async () => {
        const produtoExistente = { id: "1", name: 'Monster', description: 'Sabor morango', price: 9.99, category: Categoria.BEBIDAS }
        const produtoAtualizado = { id: "1", name: 'Monster', description: 'Sabor morango', price: 9.99, category: Categoria.BEBIDAS }

        mockPrisma.produtos.findUnique.mockResolvedValue(produtoExistente)
        mockPrisma.produtos.update.mockResolvedValue(produtoAtualizado)

        expect(await produtoService.update("1", { name: "Novo nome" })).toEqual(produtoAtualizado)
        expect(mockPrisma.produtos.update).toHaveBeenCalledWith({
            where: { id: "1" },
            data: { name: "Novo nome" }
        })
    })

    it("Deve remover um produto", async () => {
        const produtoRemoved = { id: "1" };
        mockPrisma.produtos.delete.mockResolvedValue(produtoRemoved);

        expect(await produtoService.delete("1")).toEqual(produtoRemoved);
    });
})
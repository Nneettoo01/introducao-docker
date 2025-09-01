import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoController } from './produto.controller';
import { ProdutoService } from './produto.service';
import { Categoria } from '@prisma/client';
import { mock } from 'node:test';


const mockProdutoService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findId: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

describe('UsersController', () => {
    let produtoController: ProdutoController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProdutoController],
            providers: [
                { provide: ProdutoService, useValue: mockProdutoService },
            ],
        }).compile();

        produtoController = module.get<ProdutoController>(ProdutoController);
    });

    it('Deve criar um produto', async () => {
        const dto = { name: 'Monster', description: 'Sabor morango', price: 9.99, category: Categoria.BEBIDAS };
        mockProdutoService.create.mockResolvedValue(dto);

        expect(await produtoController.createProduct(dto as any)).toEqual(dto);
        expect(mockProdutoService.create).toHaveBeenCalledWith(dto);
    });

    it('Deve listar todos os produtos', async () => {
        const listaDeProdutos = [{ name: 'Monster', description: 'Sabor morango', price: 9.99, category: Categoria.BEBIDAS }];
        mockProdutoService.findAll.mockResolvedValue(listaDeProdutos);

        expect(await produtoController.findAllProducts()).toEqual(listaDeProdutos);
    });

    it('Deve buscar um produto por ID', async () => {
        const produto = { id: '1', name: 'Monster', description: 'Sabor morango', price: 9.99, category: Categoria.BEBIDAS };
        mockProdutoService.findId.mockResolvedValue(produto);

        expect(await produtoController.findProductId('1')).toEqual(produto);
        expect(mockProdutoService.findId).toHaveBeenCalledWith("1");
    });

    it('Deve atualizar um produto', async () => {
        const produtoUpdated = { id: '1', name: 'Monster', description: 'Sabor morango', price: 9.99, category: Categoria.BEBIDAS };
        mockProdutoService.update.mockResolvedValue(produtoUpdated);

        expect(await produtoController.updateProduct('1', { name: 'Monster', description: 'Sabor morango', price: 9.99, category: Categoria.BEBIDAS })).toEqual(produtoUpdated);
    });

    it('deve remover', async () => {
        const produtoRemoved = { id: '1' };
        mockProdutoService.delete.mockResolvedValue(produtoRemoved);

        expect(await produtoController.deleteProduct('1')).toEqual(produtoRemoved);
    });
});
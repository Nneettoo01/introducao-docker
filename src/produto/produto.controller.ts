import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-product.dto';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { UpdateProdutoDto } from './dto/update-product.dto';
@Controller('product')
export class ProdutoController {

    constructor(
        private readonly produtoService: ProdutoService,
    ) { }

    @Post('create')
    @ApiOperation({ summary: 'Criar um novo produto' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Formulário para cadastrar o produto',
        schema: {
            type: 'object',
            required: ['name', 'description', 'price', 'category'],
            properties: {
                name: { type: 'string', example: 'Notebook' },
                description: { type: 'string', example: 'Computador de uso pessoal' },
                price: { type: 'number', example: 3000 },
                category: { type: 'string', enum: ['LIMPEZA', 'BEBIDAS', 'ELETRONICO', 'ROUPA', 'ALIMENTO'] },
            },
        },
    })
    createProduct(@Body() data: CreateProdutoDto) {
        return this.produtoService.create(data);
    }

    @ApiOperation({ summary: 'Listar todos os produtos' })
    @Get('all')
    findAllProducts() {
        return this.produtoService.findAll();
    }

    @ApiOperation({ summary: 'Buscar produto por ID' })
    @Get(':id')
    findProductId(@Param('id') id: number) {
        return this.produtoService.findId(id);
    }

    @ApiOperation({ summary: 'Atualizar produto por ID' })
    @Put(':id')
    updateProduct(@Param('id') id: number, @Body() data: UpdateProdutoDto) {
        return this.produtoService.update(id, data)
    }

    @ApiOperation({ summary: 'Deletar um produto por ID' })
    @Delete(':id')
    deleteProduct(@Param('id') id: number) {
        return this.produtoService.delete(id)
    }
}
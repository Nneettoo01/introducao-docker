import { Controller, Post, Body, Get } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-product.dto';
import { ApiOperation } from '@nestjs/swagger';
@Controller('product')
export class ProdutoController {

    constructor(
        private readonly produtoService: ProdutoService,
    ) { }

    @ApiOperation({ summary: 'Criar um novo produto' })
    @Post('create')
    createProduct(@Body() data: CreateProdutoDto) {
        return this.produtoService.create(data);
    }

    @ApiOperation({ summary: 'Listar todos os produtos' })
    @Get('all')
    findAllProducts() {
        return this.produtoService.findAll();
    }
}
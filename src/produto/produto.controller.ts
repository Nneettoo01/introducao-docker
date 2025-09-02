import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { AdminGuard } from 'src/auth/admin.guard';

@UseGuards(JwtAuthGuard)
@Controller('product')
export class ProdutoController {

    constructor(
        private readonly produtoService: ProdutoService,
    ) { }

    @UseGuards(AdminGuard)
    @Post('create')
    @ApiOperation({ summary: 'Criar um novo produto' })
    @ApiBearerAuth()
    createProduct(@Body() data: CreateProdutoDto) {
        return this.produtoService.create(data);
    }

    @Get('all')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Listar todos os produtos' })
    findAllProducts() {
        return this.produtoService.findAll();
    }

    @Get(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Buscar produto por ID' })
    findProductId(@Param('id') id: string) {
        return this.produtoService.findId(id);
    }


    @UseGuards(AdminGuard)
    @Put(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Atualizar produto por ID' })
    updateProduct(@Param('id') id: string, @Body() data: UpdateProdutoDto) {
        return this.produtoService.update(id, data)
    }


    @UseGuards(AdminGuard)
    @Delete(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Deletar um produto por ID' })
    deleteProduct(@Param('id') id: string) {
        return this.produtoService.delete(id)
    }
}
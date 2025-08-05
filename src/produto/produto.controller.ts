import { Controller, Post, Body } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-product.dto';
@Controller('product')
export class ProdutoController {

    constructor(
        private readonly produtoService: ProdutoService,
    ) { }

    @Post('create')
    createProduto(@Body() data: CreateProdutoDto) {
        return this.produtoService.create(data);
    }
}

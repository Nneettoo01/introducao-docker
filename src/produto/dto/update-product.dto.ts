import { PartialType } from "@nestjs/swagger";
import { CreateProdutoDto } from "./create-product.dto";

export class UpdateProdutoDto extends PartialType(CreateProdutoDto) { }
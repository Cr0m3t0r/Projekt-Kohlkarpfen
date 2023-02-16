import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    OnApplicationBootstrap,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Product } from './model/Product';
import { ProductDto } from './dto/ProductDto';
import { ProductService } from './product.service';
import {MessageResultDto} from "./dto/MessageResultDto";
import {GetProductDto} from "./dto/GetProductDto";

@Controller('product')
export class ProductController implements OnApplicationBootstrap {
    constructor(
        private readonly productService: ProductService,
        private readonly entityManager: EntityManager,
    ) {}

    async onApplicationBootstrap(): Promise<void> {
        const productCount = await this.entityManager.getRepository(Product).count();
        if (productCount === 0) {
            const demoProducts: Product[] = [
                Product.create('Product 1', 100.0, 'Product 1 description', 10, 'Trader 1'),
                Product.create('Product 2', 200.0, 'Product 2 description', 20, 'Trader 2'),
                Product.create('Product 3', 300.0, 'Product 3 description', 30, 'Trader 3'),
            ];
            await this.entityManager.getRepository(Product).save(demoProducts);
        }
    }

    @Get('/productlist')
    async getAll(): Promise<GetProductDto>{
        const result = await this.productService.findAll();
        return result;
    }

    @Get('/productByTrader')
    async getproductByTrader(@Body() data:{id:string}):Promise<GetProductDto>{
        const result = await this.productService.findProductsByTrader(data.id);
        return result
    }

    @Get('/product')
    async getOne(@Body() data:{id:string} ): Promise<Product> {
        const product = await this.productService.findOne(data.id);
        return product;
    }

    @Post('/create')
    async create(@Body() productDto: ProductDto): Promise<MessageResultDto> {
        const result = await this.productService.create(productDto);
        return result;
    }

    @Put('/update/?id')
    async update(@Param('id') id: string, @Body() productDto: ProductDto): Promise<ProductDto> {
        const product = await this.productService.update(id, productDto);
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return product;
    }

    @Delete('/delete')
    async delete(@Body() body:{id: string}): Promise<MessageResultDto> {
        const result = await this.productService.remove(body.id);
        return result
    }
}

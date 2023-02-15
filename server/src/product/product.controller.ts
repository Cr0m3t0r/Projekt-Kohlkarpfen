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

    @Get('productlist')
    async getAll(): Promise<ProductDto[]> {
        const products = await this.productService.findAll();
        return products.map((product) => new ProductDto(product.name, product.price, product.description, product.amount, product.trader));
    }

    @Get('/:id')
    async getOne(@Param('id') id: string): Promise<ProductDto> {
        const product = await this.productService.findOne(id);
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return new ProductDto(product.name, product.price, product.description, product.amount, product.trader);
    }

    @Post('create')
    async create(@Body() productDto: ProductDto): Promise<ProductDto> {
        const product = await this.productService.create(productDto);
        return new ProductDto(product.name, product.price, product.description, product.amount, product.trader);
    }

    @Put('/update/:id')
    async update(@Param('id') id: string, @Body() productDto: ProductDto): Promise<ProductDto> {
        const product = await this.productService.update(id, productDto);
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return new ProductDto(product.name, product.price, product.description, product.amount, product.trader);
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id: string): Promise<void> {
        const result = await this.productService.remove(id);
        if (result != null) {
            throw new NotFoundException('Product not found');
        }
    }
}

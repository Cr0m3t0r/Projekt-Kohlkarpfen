import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { Product } from './model/Product';
import { PostProductDto } from './dto/PostProductDto';
import { UpdateProductDto } from './dto/UpdateProductDto';

@Injectable()
export class ProductService {
    private readonly productRepository: Repository<Product>;

    constructor(private entityManager: EntityManager) {
        this.productRepository = entityManager.getRepository(Product);
    }

    async create(createProductDto: PostProductDto): Promise<Product> {
        const { name, price, description, amount, trader } = createProductDto;
        const product = Product.create(name, price, description, amount, trader);
        return this.productRepository.save(product);
    }

    async findAll(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async findOne(id: string): Promise<Product | null> {
        const result = this.productRepository.findOneBy({id:id});
        if (!result) {
            throw new Error(`Product with id ${id} not found.`);
        }
        return result
    }

    async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
        const product = await this.findOne(id);
        if (!product) {
            throw new Error(`Product with id ${id} not found.`);
        }
        const { name, price, description, amount, trader } = updateProductDto;
        product.name = name ?? product.name;
        product.price = price ?? product.price;
        product.description = description ?? product.description;
        product.amount = amount ?? product.amount;
        product.trader = trader ?? product.trader;
        return this.productRepository.save(product);
    }

    async remove(id: string): Promise<void> {
        const product = await this.findOne(id);
        if (!product) {
            throw new Error(`Product with id ${id} not found.`);
        }
        await this.productRepository.delete(product.id);
    }
}

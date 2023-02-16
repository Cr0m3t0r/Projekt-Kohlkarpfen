import {Injectable, NotFoundException} from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { Product } from './model/Product';
import { PostProductDto } from './dto/PostProductDto';
import { UpdateProductDto } from './dto/UpdateProductDto';
import {MessageResultDto} from "../product/dto/MessageResultDto";
import {GetProductDto} from "./dto/GetProductDto";

@Injectable()
export class ProductService {
    private readonly productRepository: Repository<Product>;

    constructor(private entityManager: EntityManager) {
        this.productRepository = entityManager.getRepository(Product);
    }

    async create(createProductDto: PostProductDto): Promise<MessageResultDto> {
        const { name, price, description, amount, trader } = createProductDto;
        const product = Product.create(name, price, description, amount, trader);
        await this.productRepository.save(product);
        return new MessageResultDto(`${product.name} was added successfully.`);
    }

    async findAll(): Promise<GetProductDto> {
        const databaseEntries: Product[] =
            await this.productRepository.find();
        const product: Product[] = databaseEntries.map(
            (product: Product) => {
                return product
            }
        )
        return new GetProductDto(
            product.length + ' Produkte wurden gefunden',
            product
        )
    }

    async findProductsByTrader(id:string):Promise<GetProductDto>{
        const products: Product[] =
            await this.productRepository.find({
                where : {trader:id}
            });
        return new GetProductDto(
            products.length + ' Produkte wurden gefunden',
            products
        )
    }

    async findOne(id: string): Promise<Product> {
        const result = await this.productRepository.findOneBy({id:id});
        if (!result) {
            throw new NotFoundException(`Product with id ${id} not found.`);
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

    async remove(id: string): Promise<MessageResultDto> {
        const product = await this.findOne(id);
        if (!product) {
            throw new Error(`Product with id ${id} not found.`);
        }
        await this.productRepository.delete(product.id);
        return new MessageResultDto(`Product with id ${id} was deleted.`)
    }
}

import { Expose } from 'class-transformer';
import { IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { ProductDto } from './ProductDto';

export class GetProductDto {
    @Expose()
    @IsNotEmpty()
    message: string;

    @Expose()
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    products: ProductDto[];

    constructor(message: string, products: ProductDto[]) {
        this.message = message;
        this.products = products;
    }
}

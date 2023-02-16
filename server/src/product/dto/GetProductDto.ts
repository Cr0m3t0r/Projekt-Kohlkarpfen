import { Expose } from 'class-transformer';
import { IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import {Product} from "../model/Product";

export class GetProductDto {
    @Expose()
    @IsNotEmpty()
    message: string;

    @Expose()
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    products: Product[];

    constructor(message: string, products: Product[]) {
        this.message = message;
        this.products = products;
    }
}

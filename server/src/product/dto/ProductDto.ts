import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDto {
    @Expose()
    @IsNotEmpty()
    @IsString()
    name: string;

    @Expose()
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @Expose()
    @IsNotEmpty()
    @IsString()
    description: string;

    @Expose()
    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @Expose()
    @IsNotEmpty()
    @IsString()
    trader: string;


    constructor( name: string, price: number, description: string, amount: number, trader: string) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.amount = amount;
        this.trader = trader;
    }
}

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PostProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    @IsString()
    trader: string;

    constructor(name: string, price: number, description: string, amount: number, trader: string) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.amount = amount;
        this.trader = trader;
    }
}

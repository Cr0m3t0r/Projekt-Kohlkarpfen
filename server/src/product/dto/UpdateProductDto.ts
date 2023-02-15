import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsNumber()
    price?: number;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber()
    amount?: number;

    @IsOptional()
    @IsString()
    trader?: string;

    constructor(name: string, price: number, description: string, amount: number, trader: string) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.amount = amount;
        this.trader = trader;
    }
}

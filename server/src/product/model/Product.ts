import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    public name: string;

    @Column()
    public price: number;

    @Column()
    public description: string;

    @Column()
    public amount: number;

    @Column()
    public tags: number[];

    @Column()
    public pictures: number[];

    @Column()
    public trader: string;

    @Column()
    public createdAt: Date;

    public static create(
        name: string,
        price: number,
        description: string,
        amount: number,
        trader: string
    ): Product {
        const product = new Product();
        product.name = name;
        product.price = price;
        product.description = description;
        product.amount = amount;
        product.trader = trader;
        return product;
    }
}




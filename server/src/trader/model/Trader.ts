import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Trader {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    public fullname: string;

    @Column()
    password: string;

    @Column()
    public tradernumber: number;

    @Column()
    public cellphonenumber: number;

    @Column()
    public products: string;

    @Column()
    public createdAt: Date;

    public static create(fullname: string, password: string, tradernumber: number, cellphonenumber: number): Trader {
        const trader = new Trader();
        trader.fullname = fullname;
        trader.password = password;
        trader.tradernumber = tradernumber;
        trader.cellphonenumber = cellphonenumber;
        trader.createdAt = new Date();
        return trader;
    }
}




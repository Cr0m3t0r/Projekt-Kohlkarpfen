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
    email: string;

    @Column()
    public tradernumber: number;

    @Column()
    public cellphonenumber: number;

    @Column({nullable: true})
    public products: string;

    @Column()
    public createdAt: Date;

    public static create(fullname: string, password: string, email:string, tradernumber: number, cellphonenumber: number): Trader {
        const trader = new Trader();
        trader.fullname = fullname;
        trader.password = password;
        trader.email = email;
        trader.tradernumber = tradernumber;
        trader.cellphonenumber = cellphonenumber;
        trader.createdAt = new Date();
        return trader;
    }
}




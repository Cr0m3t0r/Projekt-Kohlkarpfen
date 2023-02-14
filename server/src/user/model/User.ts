import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    public fullname: string;

    @Column()
    password: string;

    @Column()
    public email: string;

    @Column()
    public cellphonenumber: number;

    @Column()
    public interestedproducts: string[];

    @Column()
    public favoredtrader: string[]

    @Column()
    public createdAt: Date;

    public static create(
        fullname: string,
        password: string,
        email: string,
        cellphonenumber: number
    ): User {
        const user = new User();
        user.fullname = fullname;
        user.password = password;
        user.email = email;
        user.cellphonenumber = cellphonenumber;
        user.createdAt = new Date();
        return user;
    }
}




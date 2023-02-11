import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    public username: string;

    @Column()
    password: string;

    @Column()
    public role: string;

    @Column()
    public createdAt: Date;

    public static create(username: string, password: string, role: string): Admin {
        const admin = new Admin();
        admin.username = username;
        admin.password = password;
        admin.role = role;
        admin.createdAt = new Date();
        return admin;
    }
}




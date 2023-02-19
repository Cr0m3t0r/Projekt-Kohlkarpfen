import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    public name: string;

    public static create(
        name: string
    ): Tag {
        const tag = new Tag();
        tag.name = name;
        return tag;
    }
}




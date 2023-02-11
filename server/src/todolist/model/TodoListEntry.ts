import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TodoListEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  public title: string;

  @Column()
  public done: boolean;

  @Column()
  public date: Date;

  public static create(title: string): TodoListEntry {
    const entry = new TodoListEntry();
    entry.title = title;
    entry.done = false;
    entry.date = new Date();
    return entry;
  }
}

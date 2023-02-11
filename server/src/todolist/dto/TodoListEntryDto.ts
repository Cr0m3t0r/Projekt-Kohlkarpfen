export class TodoListEntryDto {
  public id: number;

  public title: string;

  public done: boolean;

  public date: string;

  constructor(id: number, title: string, done: boolean, date: string) {
    this.id = id;
    this.title = title;
    this.done = done;
    this.date = date;
  }
}

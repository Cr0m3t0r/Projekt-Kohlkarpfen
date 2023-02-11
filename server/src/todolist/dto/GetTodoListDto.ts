import { TodoListEntryDto } from './TodoListEntryDto';
import { MessageResultDto } from './MessageResultDto';

export class GetTodoListDto extends MessageResultDto {
  public todoList: TodoListEntryDto[];

  constructor(message: string, todoList: TodoListEntryDto[]) {
    super(message);
    this.todoList = todoList;
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  OnApplicationBootstrap,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { GetTodoListDto } from './dto/GetTodoListDto';
import { TodoListEntryDto } from './dto/TodoListEntryDto';
import { PostTodoEntryBodyDto } from './dto/PostTodoEntryBodyDto';
import { EntityManager, Repository } from 'typeorm';
import { TodoListEntry } from './model/TodoListEntry';
import { MessageResultDto } from './dto/MessageResultDto';

@Controller()
export class TodolistController implements OnApplicationBootstrap {
  private readonly todoEntryRepository: Repository<TodoListEntry>;

  constructor(private entityManager: EntityManager) {
    this.todoEntryRepository = entityManager.getRepository(TodoListEntry);
  }

  async onApplicationBootstrap(): Promise<void> {
    const todoCount = await this.todoEntryRepository.count();
    if (todoCount == 0) {
      const demoTodos: TodoListEntry[] = [
        TodoListEntry.create('Milch'),
        TodoListEntry.create('Butter'),
        TodoListEntry.create('Brot'),
      ];
      await this.todoEntryRepository.save(demoTodos);
    }
  }

  @Get('todolist')
  async getAll(): Promise<GetTodoListDto> {
    const databaseEntries: TodoListEntry[] =
      await this.todoEntryRepository.find();
    const entriesDto: TodoListEntryDto[] = databaseEntries.map(
      (entry: TodoListEntry) => {
        return new TodoListEntryDto(
          entry.id,
          entry.title,
          entry.done,
          entry.date.toString(),
        );
      },
    );

    return new GetTodoListDto(
      entriesDto.length + ' ToDos wurden gefunden',
      entriesDto,
    );
  }

  @Post('entry')
  async postEntry(
    @Body() body: PostTodoEntryBodyDto,
  ): Promise<MessageResultDto> {
    const newTodoEntry = TodoListEntry.create(body.title);
    await this.todoEntryRepository.save(newTodoEntry);

    return new MessageResultDto(
      `${newTodoEntry.title} erfolgreich hinzugefügt`,
    );
  }

  @Put('done/:id')
  async putDone(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MessageResultDto> {
    const entry: TodoListEntry | null =
      await this.todoEntryRepository.findOneBy({
        id: id,
      });
    if (entry == null) {
      throw new NotFoundException();
    }
    entry.done = true;
    await this.todoEntryRepository.save(entry);

    return new MessageResultDto(`${entry.title} wurde als erledigt markiert.`);
  }

  @Put('undone/:id')
  async putUndone(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MessageResultDto> {
    const entry: TodoListEntry | null =
      await this.todoEntryRepository.findOneBy({
        id: id,
      });
    if (entry == null) {
      throw new NotFoundException();
    }
    entry.done = false;
    await this.todoEntryRepository.save(entry);

    return new MessageResultDto(
      `${entry.title} wurde als nicht-erledigt markiert.`,
    );
  }

  @Delete('entry/:id')
  async deleteEntry(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MessageResultDto> {
    const entry: TodoListEntry | null =
      await this.todoEntryRepository.findOneBy({
        id: id,
      });
    if (entry == null) {
      throw new NotFoundException();
    }
    await this.todoEntryRepository.delete(entry);

    return new MessageResultDto(`${entry.title} wurde gelöscht.`);
  }
}

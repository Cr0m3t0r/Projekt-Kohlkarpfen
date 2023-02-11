import { IsString, MinLength } from 'class-validator';

export class PostTodoEntryBodyDto {
  @IsString()
  @MinLength(1)
  public title: string;
}

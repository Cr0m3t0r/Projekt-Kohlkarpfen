import { Tag } from '../model/Tag';
import { MessageResultDto } from './MessageResultDto';

export class GetTagDto extends MessageResultDto {
    public todoList: Tag[];

    constructor(message: string, tag: Tag[]) {
        super(message);
        this.todoList = tag;
    }
}
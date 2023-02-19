import { UserDto } from './UserDto';
import { MessageResultDto } from './MessageResultDto';

export class GetUserDto extends MessageResultDto {
    public todoList: UserDto[];

    constructor(message: string, admin: UserDto[]) {
        super(message);
        this.todoList = admin;
    }
}
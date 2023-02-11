import { AdminDto } from './AdminDto';
import { MessageResultDto } from './MessageResultDto';

export class GetAdminDto extends MessageResultDto {
    public todoList: AdminDto[];

    constructor(message: string, admin: AdminDto[]) {
        super(message);
        this.todoList = admin;
    }
}

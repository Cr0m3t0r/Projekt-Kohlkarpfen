import {
    Body,
    Controller,
    Delete,
    Get,
    OnApplicationBootstrap,
    Post, Put,
    Query,
} from '@nestjs/common';
import { MessageResultDto } from './dto/MessageResultDto';
import {GetAdminDto} from "./dto/GetAdminDto";
import {AdminDto} from "./dto/AdminDto";
import {PostAdminDto} from "./dto/PostAdminDto";
import {AdminService} from "./admin.service";

@Controller('admin')
export class AdminController implements OnApplicationBootstrap {
    constructor(private readonly adminService: AdminService) {}


    async onApplicationBootstrap(): Promise<void> {

    }

    @Delete('/delete')
    async deleteAdmin(
        @Body() data: {id: string}): Promise<MessageResultDto> {
        const result = await this.adminService.delete(data.id);
        return result
    }

    @Get('/admin')
    async getAdmin(
        @Body() data: {id:string}
    ): Promise<AdminDto>{
        const admin = await this.adminService.findOneById( data.id );
        return new AdminDto(admin.id, admin.username, admin.role, admin.createdAt);
    }

    @Get('/adminlist')
    async getAll(): Promise<GetAdminDto> {
        const result = this.adminService.findAll()
        return result;
    }

    @Post('/create')
    async postEntry(
        @Body() body: PostAdminDto,
    ): Promise<MessageResultDto> {
        const result = this.adminService.create(body)
        return result
    }

    @Put('/role')
    async updateAdminRole(
        @Body() updateData: {id:string, role:string }
    ): Promise<MessageResultDto> {
        const result = this.adminService.updateAdminRole(updateData.id, updateData.role)
        return result
    }

}



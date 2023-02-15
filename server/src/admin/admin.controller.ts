import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    OnApplicationBootstrap,
    Post, Put,
    Query,
} from '@nestjs/common';
import { MessageResultDto } from './dto/MessageResultDto';
import { EntityManager, Repository } from 'typeorm';
import { Admin } from './model/Admin';
import {GetAdminDto} from "./dto/GetAdminDto";
import {AdminDto} from "./dto/AdminDto";
import {PostAdminDto} from "./dto/PostAdminDto";

@Controller('admin')
export class AdminController implements OnApplicationBootstrap {
    private readonly adminRepository: Repository<Admin>;

    constructor(private entityManager: EntityManager) {
        this.adminRepository = entityManager.getRepository(Admin);
    }

    async onApplicationBootstrap(): Promise<void> {
        const adminCount = await this.adminRepository.count();
        if (adminCount == 0) {
            const demoAdmins: Admin[] = [
                Admin.create('David','Password','Dummy'),
                Admin.create('Lukas', '123456', 'Tester'),
                Admin.create('Steven', 'Steven', 'Canonfooder'),
            ];
            await this.adminRepository.save(demoAdmins);
        }
    }

    @Delete('/delete/:id')
    async deleteEntry(
        @Query('id') id: string,): Promise<MessageResultDto> {
        const adminUser: Admin | null =
            await this.adminRepository.findOneBy({
                id: id,
            });
        if (adminUser == null) {
            throw new NotFoundException();
        }
        await this.adminRepository.delete(adminUser);

        return new MessageResultDto(`${adminUser.username} wurde gelöscht.`);
    }

    @Get('admin')
    async getAdmin(
        @Body() data: {id:string}
    ): Promise<AdminDto>{
        const admin = await this.adminRepository.findOneBy({ id: data.id });
        if (!admin) {
            throw new NotFoundException();
        }
        return new AdminDto(admin.id, admin.username, admin.role, admin.createdAt);
    }

    @Get('/adminlist')
    async getAll(): Promise<GetAdminDto> {
        const databaseEntries: Admin[] =
            await this.adminRepository.find();
        const adminDto: AdminDto[] = databaseEntries.map(
            (admin: Admin) => {
                return new AdminDto(
                    admin.id,
                    admin.username,
                    admin.role,
                    admin.createdAt
                );
            },
        );
        return new GetAdminDto(
            adminDto.length + ' Admins wurden gefunden',
            adminDto,
        );
    }

    @Post('/create')
    async postEntry(
        @Body() body: PostAdminDto,
    ): Promise<MessageResultDto> {
        const newAdmin = Admin.create(body.username, body.password, body.role);
        await this.adminRepository.save(newAdmin);

        return new MessageResultDto(
            `${newAdmin.username} erfolgreich hinzugefügt`,
        );
    }

    @Put('/role')
    async updateAdminRole(
        @Body() updateData: {role:string, id:string}
    ): Promise<MessageResultDto> {
        const admin = await this.adminRepository.findOneBy({ id: updateData.id });
        if (!admin) {
            throw new NotFoundException();
        }
        admin.role = updateData.role;
        await this.adminRepository.save(admin);
        return new MessageResultDto('Trader cell phone number updated successfully');
    }

}



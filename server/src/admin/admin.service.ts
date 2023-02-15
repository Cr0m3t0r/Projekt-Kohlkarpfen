import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './model/Admin';
import {MessageResultDto} from "./dto/MessageResultDto";
import {AdminDto} from "./dto/AdminDto";
import {GetAdminDto} from "./dto/GetAdminDto";
import {PostAdminDto} from "./dto/PostAdminDto";

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private adminRepository: Repository<Admin>,
    ) {}

    async findAll(): Promise<GetAdminDto> {
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

    async findOneById(id: string): Promise<Admin> {
        const admin = await this.adminRepository.findOneBy({id});
        if (!admin) {
            throw new NotFoundException(`Admin with id ${id} not found`);
        }
        return admin
    }

    async create(admin: PostAdminDto): Promise<MessageResultDto> {
        const newAdmin = Admin.create(admin.username, admin.password, admin.role)
        await this.adminRepository.save(newAdmin);
        return new MessageResultDto(newAdmin.username + " was successfully created.")
    }

    async updateAdminRole(id: string, role: string): Promise<MessageResultDto> {
        const admin = await this.findOneById( id );
        if (!admin) {
            throw new NotFoundException();
        }
        admin.role = role;
        await this.adminRepository.save(admin);
        return new MessageResultDto('Admin role was updated successfully');
    }

    async delete(id: string): Promise<MessageResultDto> {
        await this.adminRepository.delete(id);
        return new MessageResultDto("Admin was deleted.")
    }
}

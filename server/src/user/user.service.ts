import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './model/User';
import {PostUserDto} from "./dto/PostUserDto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(userData: Partial<User>): Promise<User> {
        const newUser = this.userRepository.create(userData);
        return await this.userRepository.save(newUser);
    }

    async findOneByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOneBy({ email });
    }

    async findOneById(id: string): Promise<User | null> {
        return await this.userRepository.findOneBy({ id });
    }

    async updateCellphoneNumber(
        id: string,
        cellphonenumber: number,
    ): Promise<User> {
        const user = await this.findOneById(id);
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        user.cellphonenumber = cellphonenumber;
        return await this.userRepository.save(user);
    }

    async updatePassword(id: string, password: string): Promise<User> {
        const user = await this.findOneById(id);
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        user.password = password;
        return await this.userRepository.save(user);
    }

    async remove(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }

    async registerUser(userDto :PostUserDto): Promise<User> {
        const user = User.create(userDto.fullname, userDto.password, userDto.email, userDto.cellphonenumber);
        return await this.userRepository.save(user);
    }

    async loginUser(email: string, password: string): Promise<User | null> {
        const user = await this.userRepository.findOneBy({ email, password });
        if (!user) {
            return null;
        }
        return user;
    }
}
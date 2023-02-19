import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './model/User';
import {PostUserDto} from "./dto/PostUserDto";
import {MessageResultDto} from "../admin/dto/MessageResultDto";
import {GetUserDto} from "./dto/GetUserDto";
import {UserDto} from "./dto/UserDto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(userData: User): Promise<User> {
        const newUser = this.userRepository.create(userData);
        return await this.userRepository.save(newUser);
    }

    async findOneByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOneBy({ email });
        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }
        return user
    }

    async findOneById(id: string): Promise<User> {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user
    }

    async getAll():Promise<GetUserDto> {
        const databaseEntries: User[] =
            await this.userRepository.find();
        const userDto: UserDto[] = databaseEntries.map(
            (user: User) => {
                return new UserDto(
                    user.id,
                    user.fullname,
                    user.email,
                    user.createdAt,
                    user.cellphonenumber,
                    user.interestedproducts,
                    user.favoredtrader
                )
            }
        )
        return new GetUserDto(
            userDto.length + 'User wurden gefunden',
            userDto
        )
    }


    async updateCellphoneNumber(
        id: string,
        cellphonenumber: number,
    ): Promise<MessageResultDto> {
        const user = await this.findOneById(id);
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        user.cellphonenumber = cellphonenumber;
        await this.userRepository.save(user);
        return new MessageResultDto( user.id + " Users cellphonenumber was updated.")
    }

    async updatePassword(id: string, password: string): Promise<MessageResultDto> {
        const user = await this.findOneById(id);
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        user.password = password;
        await this.userRepository.save(user);
        return new MessageResultDto(user.id + " Users Password was updated.")
    }

    async remove(id: string): Promise<MessageResultDto> {
        await this.userRepository.delete(id);
        return new MessageResultDto("User was deleted.")
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
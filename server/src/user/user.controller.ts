import { Body, Controller, Post } from '@nestjs/common';
import { User } from './model/User';
import { UserService } from './user.service';
import {PostUserDto} from "./dto/PostUserDto";
import {LoginUserDto} from "./dto/LoginUserDto"

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/register')
    async registerUser(@Body() body: PostUserDto): Promise<User> {
        const user = await this.userService.registerUser(body);
        return user;
    }

    @Post('/login')
    async loginUser(@Body() body: LoginUserDto): Promise<any> {
        const result = await this.userService.loginUser(body.email, body.password);
        return result;
    }
}
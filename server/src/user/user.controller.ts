import {Body, Controller, Delete, Get, Post, Put, UsePipes, ValidationPipe} from '@nestjs/common';
import { User } from './model/User';
import { UserService } from './user.service';
import {PostUserDto} from "./dto/PostUserDto";
import {LoginUserDto} from "./dto/LoginUserDto"
import {MessageResultDto} from "../admin/dto/MessageResultDto";
import {GetUserDto} from "./dto/GetUserDto";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/register')
    async registerUser(@Body() body: PostUserDto): Promise<User> {
        console.log(body)
        console.log(body.fullname)
        const user = await this.userService.registerUser(body);
        return user;
    }

    @Post('/login')
    async loginUser(@Body() body: LoginUserDto): Promise<any> {
        const result = await this.userService.loginUser(body.email, body.password);
        return result;
    }

    @Delete('/delete')
    async deleteUser(@Body() data:{id:string}):Promise<MessageResultDto>{
        const result = await this.userService.remove(data.id);
        return result;
    }

    @Get('/userlist')
    async getAllUser():Promise<GetUserDto>{
        const result = await this.userService.getAll();
        return result;
    }

    @Get('/')
    async getUserById(@Body() data:{id:string}):Promise<User>{
        const result = await this.userService.findOneById(data.id)
        return result;
    }

    @Get('/emailsearch')
    async getUserByEmail(@Body() data:{email:string}):Promise<User>{
        const result = await this.userService.findOneByEmail(data.email)
        return result;
    }

    @Put('/updateCellphonenumber')
    async updateCellphoneNumber(@Body() data:{id:string,cellphonenumber:number}):Promise<MessageResultDto>{
        const result = await this.userService.updateCellphoneNumber(data.id,data.cellphonenumber)
        return result
    }

    @Put('updatepassword')
    async updatePassword(@Body() data:{id:string,password:string}):Promise<MessageResultDto>{
        const result = await this.userService.updatePassword(data.id, data.password)
        return result
    }
}
import {Body, Controller, Delete, Get, Post, Put} from '@nestjs/common';
import {TagService} from './tag.service';
import {GetTagDto} from "./dto/GetTagDto";
import {MessageResultDto} from "./dto/MessageResultDto";


@Controller('tag')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @Get('/list')
    async getAll(): Promise<GetTagDto>{
        const result = await this.tagService.getAll()
        return result
    }

    @Post('/create')
    async createTag(@Body() body:{tag:string}):Promise<MessageResultDto>{
        const result = await this.tagService.create(body.tag)
        return result
    }

    @Delete('/delete')
    async deleteTag(@Body() body:{tag:string}):Promise<MessageResultDto>{
        const result = await this.tagService.delete(body.tag)
        return result
    }

    @Put('/update')
    async updateTag(@Body() body:{tag:string}):Promise<MessageResultDto>{
        const result = await this.tagService.update(body.tag)
        return result
    }

}
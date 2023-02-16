import { Controller} from '@nestjs/common';
import { Tag } from './model/Tag';
import {TagService} from './tag.service';


@Controller('tag')
export class TagController {
    constructor(private readonly tagService: TagService) {}

}
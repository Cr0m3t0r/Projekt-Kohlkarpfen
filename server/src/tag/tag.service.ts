import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Tag} from "./model/Tag";
import {GetTagDto} from "./dto/GetTagDto";
import {MessageResultDto} from "./dto/MessageResultDto";

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>,
    ) {}

    async getAll(): Promise<GetTagDto>{
        const tags : Tag[] = await this.tagRepository.find()
        return new GetTagDto(
            tags.length + ' Tags wurden gefunden.',
            tags
        )
    }

    async create(tag:string):Promise<MessageResultDto>{
        const newTag = Tag.create(tag)
        await this.tagRepository.save(newTag);
        return new MessageResultDto(`${Tag.name} was added successfully.`)
    }

    async delete(tag:string):Promise<MessageResultDto>{
        const oldTag = await this.tagRepository.findOneBy({name:tag})
        if (!oldTag) {
            throw new Error(`Product with id ${tag} not found.`);
        }
        await this.tagRepository.delete(oldTag);
        return new MessageResultDto(`Tag with name ${tag} was deleted.`)
    }

    async update(tag:string):Promise<MessageResultDto>{
        const oldTag = await this.tagRepository.findOneBy({name:tag})
        if (!oldTag) {
            throw new Error(`Product with id ${tag} not found.`);
        }
        oldTag.name = tag;
        return new MessageResultDto(`Tag with name ${tag} was updated.`)
    }
}
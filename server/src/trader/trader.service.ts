import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trader } from './model/Trader';
import {PostTraderDto} from "./dto/PostTraderDto";
import {MessageResultDto} from "../admin/dto/MessageResultDto";
import {GetTraderDto} from "./dto/GetTraderDto";
import {TraderDto} from "./dto/TraderDto";

@Injectable()
export class TraderService {
    constructor(
        @InjectRepository(Trader)
        private readonly traderRepository: Repository<Trader>,
    ) {}

    async create(traderData: PostTraderDto): Promise<MessageResultDto> {
        const newTrader = Trader.create(
            traderData.fullname,
            traderData.password,
            traderData.email,
            traderData.tradernumber,
            traderData.cellphonenumber
        );
        await this.traderRepository.save(newTrader);
        return new MessageResultDto(`${newTrader.fullname} was added successfully.`);
    }

    async findOneByTradernumber(tradernumber: number): Promise<Trader> {
        const trader = await this.traderRepository.findOneBy({ tradernumber });
        if (!trader) {
            throw new NotFoundException(`Trader with tradernumber ${tradernumber} not found`);
        }
        return trader
    }

    async findOneById(id: string): Promise<Trader> {
        const trader = await this.traderRepository.findOneBy({ id });
        if (!trader) {
            throw new NotFoundException(`Trader with id ${id} not found`);
        }
        return trader
    }

    async getAll():Promise<GetTraderDto> {
        const databaseEntries: Trader[] =
            await this.traderRepository.find();
        const traderDto: TraderDto[] = databaseEntries.map(
            (trader: Trader) => {
                return new TraderDto(
                    trader.id,
                    trader.fullname,
                    trader.email,
                    trader.tradernumber,
                    trader.cellphonenumber,
                    trader.products,
                    trader.createdAt
                )
            }
        )
        return new GetTraderDto(
            traderDto.length + ' Trader wurden gefunden',
            traderDto
        )
    }


    async updateCellphoneNumber(
        id: string,
        cellphonenumber: number,
    ): Promise<MessageResultDto> {
        const trader = await this.findOneById(id);
        if (!trader) {
            throw new NotFoundException(`Trader with id ${id} not found`);
        }
        trader.cellphonenumber = cellphonenumber;
        await this.traderRepository.save(trader);
        return new MessageResultDto( trader.id + " Traders cellphonenumber was updated.")
    }

    async updatePassword(id: string, password: string): Promise<MessageResultDto> {
        const trader = await this.findOneById(id);
        if (!trader) {
            throw new NotFoundException(`Trader with id ${id} not found`);
        }
        trader.password = password;
        await this.traderRepository.save(trader);
        return new MessageResultDto(trader.id + " Traders Password was updated.")
    }

    async remove(id: string): Promise<MessageResultDto> {
        const trader: Trader | null = await this.traderRepository.findOneById(
            id);
        if (!trader) {
            throw new NotFoundException();
        }
        await this.traderRepository.delete({id: trader.id});
        return new MessageResultDto("Trader was deleted.")
    }

    async loginTrader(email:string, password:string): Promise<Trader> {
        const trader = await this.traderRepository.findOneBy({ email, password });
        if (!trader) {
            throw new NotFoundException(`Trader with email ${email} not found`);
        }
        return trader;
    }
}
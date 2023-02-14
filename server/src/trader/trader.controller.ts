import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    OnApplicationBootstrap,
    Post,
    Put,
    Query
} from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { MessageResultDto } from './dto/MessageResultDto';
import { GetTraderDto } from './dto/GetTraderDto';
import { Trader } from './model/Trader';
import { TraderDto } from './dto/TraderDto';
import { PostTraderDto } from './dto/PostTraderDto';


@Controller()
export class TraderController implements OnApplicationBootstrap {
    private readonly traderRepository: Repository<Trader>;

    constructor(private entityManager: EntityManager) {
        this.traderRepository = entityManager.getRepository(Trader);
    }

    async onApplicationBootstrap(): Promise<void> {
        const traderCount = await this.traderRepository.count();
        if (traderCount === 0) {
            const demoTraders: Trader[] = [
                Trader.create('John Doe', 'password123', 1234, 1234567890 ),
                Trader.create('Jane Doe', 'password456', 5678, 1987654321 ),
        ];
            await this.traderRepository.save(demoTraders);
        }
    }

    @Delete('trader/:id')
    async deleteEntry(
        @Query('id') id: string): Promise<MessageResultDto> {
        const trader: Trader | null = await this.traderRepository.findOneById(
            id);
        if (!trader) {
            throw new NotFoundException();
        }
        await this.traderRepository.delete({id: trader.id});
        return new MessageResultDto(`${trader.fullname} was deleted.`);
    }

    @Get('traderlist')
    async getAll(): Promise<GetTraderDto> {
        const databaseEntries: Trader[] = await this.traderRepository.find();
        const traderDto: TraderDto[] = databaseEntries.map((trader: Trader) => {
            return new TraderDto(trader.id, trader.fullname, trader.tradernumber, trader.cellphonenumber, trader.products, trader.createdAt);
        });
        return new GetTraderDto(`${traderDto.length} traders found.`, traderDto);
    }

    @Post('trader')
    async postEntry(@Body() body: PostTraderDto): Promise<MessageResultDto> {
        const newTrader = Trader.create(body.fullname, body.password, body.tradernumber, body.cellphonenumber);
        await this.traderRepository.save(newTrader);
        return new MessageResultDto(`${newTrader.fullname} was added successfully.`);
    }
    @Put('trader/cellphonenumber')
    async updateTraderCellPhoneNumber(
        @Body() updateData: {cellphonenumber:number, id:string}
    ): Promise<MessageResultDto> {
        const trader = await this.traderRepository.findOneBy({ id: updateData.id });
        if (!trader) {
            throw new NotFoundException();
        }
        trader.cellphonenumber = updateData.cellphonenumber;
        await this.traderRepository.save(trader);
        return new MessageResultDto('Trader cell phone number updated successfully');
    }

    @Put('trader/:id/password')
    async updateTraderPassword(
        @Body() updateData: {password: string, id: string}
    ): Promise<MessageResultDto> {
        const trader = await this.traderRepository.findOneBy({ id: updateData.id });
        if (!trader) {
            throw new NotFoundException();
        }
        trader.password = updateData.password;
        await this.traderRepository.save(trader);
        return new MessageResultDto('Trader password updated successfully');
    }

}

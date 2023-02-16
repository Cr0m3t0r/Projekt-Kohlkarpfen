import {
    Body,
    Controller,
    Delete,
    Get,
    OnApplicationBootstrap,
    Post,
    Put,
    Query
} from '@nestjs/common';
import { MessageResultDto } from './dto/MessageResultDto';
import { GetTraderDto } from './dto/GetTraderDto';
import { Trader } from './model/Trader';
import { PostTraderDto } from './dto/PostTraderDto';
import {TraderService} from "./trader.service";
import {LoginTraderDto} from "./dto/LoginTraderDto";


@Controller('trader')
export class TraderController implements OnApplicationBootstrap {
    constructor(private readonly traderService: TraderService) {}

    async onApplicationBootstrap(): Promise<void> {
    }

    @Delete('/delete')
    async deleteEntry(
        @Body() id: string): Promise<MessageResultDto> {
        const result = await this.traderService.remove(id)
        return result;
    }

    @Get('/list')
    async getAll(): Promise<GetTraderDto> {
        const result = await this.traderService.getAll()
        return result;
    }

    @Post('/create')
    async postEntry(@Body() body: PostTraderDto): Promise<MessageResultDto> {
        const result = await this.traderService.create(body)
        return result
    }
    @Put('/cellphonenumber')
    async updateTraderCellPhoneNumber(
        @Body() updateData: {id:string, cellphonenumber:number}
    ): Promise<MessageResultDto> {
        const result = await this.traderService.updateCellphoneNumber(updateData.id, updateData.cellphonenumber)
        return result
    }

    @Put('/password')
    async updateTraderPassword(
        @Body() updateData: { id: string, password: string}
    ): Promise<MessageResultDto> {
        const result = await this.traderService.updatePassword(updateData.id, updateData.password)
        return result;
    }

    @Get('/searchtradernumber')
    async getTraderByTradernumber(
        @Body() data: {tradernumber:number}):Promise<Trader>{
        const result = await this.traderService.findOneByTradernumber(data.tradernumber);
        return result
    }

    @Post('/login')
    async loginUser(@Body() body: LoginTraderDto): Promise<Trader> {
        const result = await this.traderService.loginTrader(body.email, body.password);
        return result;
    }


}

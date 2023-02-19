import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TraderService } from './trader.service';
import { TraderController } from './trader.controller';
import { Trader } from './model/Trader';

@Module({
    imports: [TypeOrmModule.forFeature([Trader])],
    providers: [TraderService],
    controllers: [TraderController],
    exports: [TypeOrmModule]
})
export class TraderModule {}
import { Module } from '@nestjs/common';
import { MedaillesService } from './medailles.service';
import { MedaillesController } from './medailles.controller';

@Module({
    controllers: [MedaillesController],
    providers: [MedaillesService],
})
export class MedaillesModule {}
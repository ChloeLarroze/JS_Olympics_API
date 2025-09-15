import { Module } from '@nestjs/common';
import { AthleteController} from './athlete.controller';
import { AthleteService } from './athlete.service';

@Module({
    controllers: [BookController],
    providers: [BookService],
})
export class AthleteModule {}
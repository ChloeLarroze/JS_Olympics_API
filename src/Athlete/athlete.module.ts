import { Module } from '@nestjs/common';
import { AthleteController} from './athlete.controller';
import { AthleteService } from './athlete.service';
import {FavoriteService} from "./favorite.service";
import {FavoriteController} from "./favorite.controller";

@Module({
    controllers: [AthleteController,FavoriteController],
    providers: [AthleteService,FavoriteService],
})
export class AthleteModule {}
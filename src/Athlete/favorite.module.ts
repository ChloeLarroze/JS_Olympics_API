import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { AthleteService } from './athlete.service';

@Module({
    providers: [FavoriteService, AthleteService],
    controllers: [FavoriteController],
    exports: [FavoriteService],
})
export class FavoriteModule {}

import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { AthleteService } from './athlete.service';

@Module({
    providers: [FavoriteService],
    controllers: [FavoriteController],
    exports: [FavoriteService],
})
export class FavoriteModule {}

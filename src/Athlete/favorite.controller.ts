import { Controller, Post, Delete, Get, Param, Query } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { AthleteService } from './athlete.service';
import { Athlete } from './Athlete';

@Controller('favorites')
export class FavoriteController {
    constructor(
        private readonly favoriteService: FavoriteService,
        private readonly athleteService: AthleteService,
    ) {}

    @Post('add/:athleteId')
    addFavorite(@Param('athleteId') athleteId: string, @Query('user') userId: string) {
        const athleteIdNumber = Number(athleteId);
        const userIdNumber = Number(userId);
        const athlete = this.athleteService.getAthleteByCode(athleteIdNumber);

        this.favoriteService.addFavorite(userIdNumber, athleteIdNumber);
        return { message: `Athlete ${athleteIdNumber} added to favorites for user ${userIdNumber}` };
    }


    @Delete('remove/:athleteId')
    removeFavorite(@Param('athleteId') athleteId: string, @Query('user') userId: string) {
        const athleteIdNumber = Number(athleteId);
        const userIdNumber = Number(userId);

        this.favoriteService.removeFavorite(userIdNumber, athleteIdNumber);
        return { message: `Athlete ${athleteIdNumber} removed from favorites for user ${userIdNumber}` };
    }

    @Get()
    getFavorites(@Query('user') userId: string): Athlete[] {
        const userIdNumber = Number(userId); // 🔹 conversion
        console.log('UserId for getFavorites:', userIdNumber);
        return this.favoriteService.getFavorites(userIdNumber);
    }
}

import { Controller, Post, Delete, Get, Param, Query } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { Athlete } from './Athlete';

@Controller('favorites')
export class FavoriteController {
    constructor(private readonly favoriteService: FavoriteService) {}

    @Post(':athleteId')
    addFavorite(@Param('athleteId') athleteId: number, @Query('user') userId: number) {
        this.favoriteService.addFavorite(userId, athleteId);
        return { message: `Athlete ${athleteId} added to favorites for user ${userId}` };
    }

    @Delete(':athleteId')
    removeFavorite(@Param('athleteId') athleteId: number, @Query('user') userId: number) {
        this.favoriteService.removeFavorite(userId, athleteId);
        return { message: `Athlete ${athleteId} removed from favorites for user ${userId}` };
    }

    @Get()
    getFavorites(@Query('user') userId: number): Athlete[] {
        return this.favoriteService.getFavorites(userId);
    }
}

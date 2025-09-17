import { FavoriteService } from './favorite.service';
import { Athlete } from './Athlete';
export declare class FavoriteController {
    private readonly favoriteService;
    constructor(favoriteService: FavoriteService);
    addFavorite(athleteId: number, userId: number): {
        message: string;
    };
    removeFavorite(athleteId: number, userId: number): {
        message: string;
    };
    getFavorites(userId: number): Athlete[];
}

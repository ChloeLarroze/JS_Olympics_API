import { FavoriteService } from './favorite.service';
import { AthleteService } from './athlete.service';
import { Athlete } from './Athlete';
export declare class FavoriteController {
    private readonly favoriteService;
    private readonly athleteService;
    constructor(favoriteService: FavoriteService, athleteService: AthleteService);
    addFavorite(athleteId: string, userId: string): {
        message: string;
    };
    removeFavorite(athleteId: string, userId: string): {
        message: string;
    };
    getFavorites(userId: string): Athlete[];
}

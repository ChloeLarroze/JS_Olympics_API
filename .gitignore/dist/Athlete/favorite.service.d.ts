import { AthleteService } from './athlete.service';
import { Athlete } from './Athlete';
export declare class FavoriteService {
    private readonly athleteService;
    private favorites;
    constructor(athleteService: AthleteService);
    addFavorite(userId: number, athleteId: number): void;
    removeFavorite(userId: number, athleteId: number): void;
    getFavorites(userId: number): Athlete[];
    isFavorite(userId: number, athleteId: number): boolean;
}

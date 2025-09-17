import { Injectable } from '@nestjs/common';
import { AthleteService } from './athlete.service';
import { Athlete } from './Athlete';

@Injectable()
export class FavoriteService {
    private favorites: Map<number, number[]> = new Map();

    constructor(private readonly athleteService: AthleteService) {}

    addFavorite(userId: number, athleteId: number) {
        const favs = this.favorites.get(userId) || [];
        if (!favs.includes(athleteId)) {
            favs.push(athleteId);
            this.favorites.set(userId, favs);
        }
    }

    removeFavorite(userId: number, athleteId: number) {
        const favs = this.favorites.get(userId) || [];
        this.favorites.set(userId, favs.filter(id => id !== athleteId));
    }

    getFavorites(userId: number): Athlete[] {
        const favIds = this.favorites.get(userId) || [];
        return favIds
            .map(id => this.athleteService.getAthleteByCode(id))
            .filter((athlete): athlete is Athlete => !!athlete);
    }

    isFavorite(userId: number, athleteId: number): boolean {
        const favs = this.favorites.get(userId) || [];
        return favs.includes(athleteId);
    }
}

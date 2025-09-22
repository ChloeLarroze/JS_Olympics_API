import { Injectable } from '@nestjs/common';
import { AthleteService } from './athlete.service';
import { Athlete } from './Athlete';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class FavoriteService {
    private favorites: Map<number, number[]> = new Map();

    constructor(private readonly athleteService: AthleteService) {}

    addFavorite(userId: number, athleteId: number) {

        const athlete = this.athleteService.getAthleteByCode(athleteId);

        if (!athlete) {
            throw new NotFoundException(`coucou`);
        }
        const favs = this.favorites.get(userId) || [];
        if (!favs.includes(athleteId)) {
            favs.push(athleteId);
            this.favorites.set(userId, favs);
        }
        console.log('Favorites map:', this.favorites);
    }

    removeFavorite(userId: number, athleteId: number) {
        const favs = this.favorites.get(userId) || [];
        this.favorites.set(userId, favs.filter(id => id !== athleteId));
    }

    getFavorites(userId: number): Athlete[] {
        const favIds = this.favorites.get(userId) || [];
        return favIds
            .map(id => {
                try {
                    return this.athleteService.getAthleteByCode(id);
                } catch (e) {
                    console.warn(`⚠️ Athlète ${id} non trouvé`);
                    return null;
                }
            })
            .filter((athlete): athlete is Athlete => !!athlete);
    }


    isFavorite(userId: number, athleteId: number): boolean {
        const favs = this.favorites.get(userId) || [];
        return favs.includes(athleteId);
    }
}

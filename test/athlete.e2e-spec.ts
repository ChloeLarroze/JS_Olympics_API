import { Test, TestingModule } from '@nestjs/testing';
import { AthleteService} from "../src/Athlete/athlete.service";
import { Athlete } from '../src/Athlete/Athlete';
import {FavoriteService} from "../src/Athlete/favorite.service";
import {FavoriteModule} from "../src/Athlete/favorite.module";
import {AthleteModule} from "../src/Athlete/athlete.module";
import {AthleteController} from "../src/Athlete/athlete.controller";
import { Nationality } from '../src/Athlete/Athlete';


describe('AthleteService (e2e)', () => {
    let service: AthleteService;
    let favorite: FavoriteService;

    const mockAthlete1: Athlete = {
        code: 1,
        name: 'Usain Bolt',
        gender: 'male',
        nationality: {name:'Jamaica'},
        disciplines: ['sprint'],
        events: ['100m', '200m'],
        country: { code: 'JAM', name: 'Jamaica' },
        Physical_attributes: { height: 195, weights: 94 }, // vérifie la clé exacte
    };

    const mockAthlete2: Athlete = {
        code: 2,
        name: 'Michael Phelps',
        gender: 'male',
        nationality: { name: 'USA' },
        disciplines: ['swimming'],
        events: ['100m butterfly', '200m butterfly'],
        country: { code: 'USA', name: 'USA' },
        Physical_attributes: { height: 193, weights: 88 },
    };

    const userId = 123;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AthleteService,FavoriteService],
        }).compile();
        service = module.get<AthleteService>(AthleteService);
        favorite = module.get<FavoriteService>(FavoriteService);
        await service.onModuleInit();
    });

    it('Test 1 →  getAthleteByCode', () => {
        service.addAthlete(mockAthlete1);
        const athlete = service.getAthleteByCode(mockAthlete1.code);
        expect(athlete).toEqual(mockAthlete1);
    });

    it('Test 2 → getAllAthletes', () => {
        const all = service.getAllAthletes();
        expect(Array.isArray(all)).toBe(true);
        expect(all.length).toBeGreaterThan(1);
    });

    it('Test 3 → ajouter un favori', () => {
        service.addAthlete(mockAthlete1);
        service.addAthlete(mockAthlete2);
        favorite.addFavorite(userId, mockAthlete1.code);

        const favs = favorite.getFavorites(userId);
        expect(favs).toContainEqual(mockAthlete1);
        expect(favs.length).toBe(1);
    });

    it('Test 4 → ajouter plusieurs favoris', () => {
        service.addAthlete(mockAthlete1);
        service.addAthlete(mockAthlete2);
        favorite.addFavorite(userId, mockAthlete1.code);
        favorite.addFavorite(userId, mockAthlete2.code);

        const favs = favorite.getFavorites(userId);
        expect(favs.length).toBe(2);
        expect(favs).toContainEqual(mockAthlete1);
        expect(favs).toContainEqual(mockAthlete2);
    });

    it('Test 5 → retirer un favori', () => {
        service.addAthlete(mockAthlete1);
        service.addAthlete(mockAthlete2);
        favorite.addFavorite(userId, mockAthlete1.code);
        favorite.addFavorite(userId, mockAthlete2.code);

        favorite.removeFavorite(userId, mockAthlete1.code);

        const favs = favorite.getFavorites(userId);
        expect(favs.length).toBe(1);
        expect(favs).toContainEqual(mockAthlete2);
        expect(favs).not.toContainEqual(mockAthlete1);
    });

    it('Test 6 → vérifier si un athlète est en favori', () => {
        service.addAthlete(mockAthlete1);
        service.addAthlete(mockAthlete2);
        favorite.addFavorite(userId, mockAthlete1.code);

        expect(favorite.isFavorite(userId, mockAthlete1.code)).toBe(true);
        expect(favorite.isFavorite(userId, mockAthlete2.code)).toBe(false);
    });

    it('Test 7 → favori pour un utilisateur sans favoris', () => {
        const favs = favorite.getFavorites(999); // un userId qui n’existe pas
        expect(Array.isArray(favs)).toBe(true);
        expect(favs.length).toBe(0);
    });

});
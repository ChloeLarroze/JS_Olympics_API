import { Test, TestingModule } from '@nestjs/testing';
import { AthleteService} from "../src/Athlete/athlete.service";
import { Athlete } from '../src/Athlete/Athlete';
import {AthleteModule} from "../src/Athlete/athlete.module";
import {AthleteController} from "../src/Athlete/athlete.controller";
import { Nationality } from '../src/Athlete/Athlete';


describe('AthleteService (e2e)', () => {
    let service: AthleteService;

    const mockAthlete: Athlete = {
        code: 1,
        name: 'Usain Bolt',
        gender: 'male',
        nationality: {name:'Jamaica'},
        disciplines: ['sprint'],
        events: ['100m', '200m'],
        country: { code: 'JAM', name: 'Jamaica' },
        Physical_attributes: { height: 195, weights: 94 }, // vérifie la clé exacte
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AthleteService],
        }).compile();
        service = module.get<AthleteService>(AthleteService);
        await service.onModuleInit();
    });

    it('Test 1 →  getAthleteByCode', () => {
        service.addAthlete(mockAthlete);
        const athlete = service.getAthleteByCode(mockAthlete.code);
        expect(athlete).toEqual(mockAthlete);
    });
    it('Test 2 → getAllAthletes', () => {
        const all = service.getAllAthletes();
        expect(Array.isArray(all)).toBe(true);
        expect(all.length).toBeGreaterThan(1);
    });

});
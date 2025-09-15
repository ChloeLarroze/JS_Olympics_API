import { Test, TestingModule } from '@nestjs/testing';
import { AthleteService} from "../src/Athlete/athlete.service";
import { Athlete } from '../src/Athlete/Athlete';

describe('AthleteService (e2e)', () => {
    let service: AthleteService;

    const mockAthlete: Athlete = {
        code: 1,
        name: 'Usain Bolt',
        gender: 'male',
        nationality: Nationality.JAM, // adapte selon ton enum
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
    });

    it('Test 1 → addAthlete and getAthleteByCode', () => {
        service.addAthlete(mockAthlete);
        const athlete = service.getAthleteByCode(mockAthlete.code);
        expect(athlete).toEqual(mockAthlete);
    });

    it('Test 2 → getAllAthletes', () => {
        service.addAthlete(mockAthlete);
        const all = service.getAllAthletes();
        expect(all).toContainEqual(mockAthlete);
    });

    it('Test 3 → getAthletesByCountry', () => {
        const country: Country = { code: 'JAM', name: 'Jamaica' };
        service.addAthlete(mockAthlete);
        const athletes = service.getAthletesByCountry(country);
        expect(athletes).toContainEqual(mockAthlete);
    });

    it('Test 4 → search', () => {
        service.addAthlete(mockAthlete);
        const results = service.search('Usain');
        expect(results).toContainEqual(mockAthlete);
    });

    it('Test 5 → removeByCode', () => {
        service.addAthlete(mockAthlete);
        service.removeByCode(mockAthlete.code);
        expect(() => service.getAthleteByCode(mockAthlete.code)).toThrow();
    });
});
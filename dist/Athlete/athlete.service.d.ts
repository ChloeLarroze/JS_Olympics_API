import { OnModuleInit } from '@nestjs/common';
import { Athlete, Country } from './Athlete';
export declare class AthleteService implements OnModuleInit {
    private readonly storage;
    onModuleInit(): Promise<void>;
    private loadAthletesFromFile;
    addAthlete(athlete: Athlete): void;
    getAthleteByCode(code: number): Athlete;
    getAllAthletes(): Athlete[];
    getAthletesByCountry(country: Country): Athlete[];
    removeByCode(code: number): void;
    search(term: string): Athlete[];
}

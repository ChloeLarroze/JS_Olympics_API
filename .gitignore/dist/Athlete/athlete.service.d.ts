import { OnModuleInit } from '@nestjs/common';
import { Athlete } from './Athlete';
export declare class AthleteService implements OnModuleInit {
    private readonly storage;
    onModuleInit(): Promise<void>;
    private loadAthletesFromFile;
    addAthlete(athlete: Athlete): void;
    getAllAthletes(): Athlete[];
    getAthleteByCode(code: number): Athlete;
    search(term: string): Athlete[];
}

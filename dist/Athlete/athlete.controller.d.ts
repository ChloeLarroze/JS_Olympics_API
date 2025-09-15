import type { Athlete } from './Athlete';
import { AthleteService } from './athlete.service';
export declare class AthleteController {
    private readonly athleteService;
    constructor(athleteService: AthleteService);
    createAthlete(athlete: Athlete): Athlete;
    getAthletes(countryCode?: string): Athlete[];
    getAthlete(code: string): Athlete;
    deleteAthlete(code: string): void;
    searchAthletes({ term }: {
        term: string;
    }): Athlete[];
}

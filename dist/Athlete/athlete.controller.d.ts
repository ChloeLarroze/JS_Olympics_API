import type { Athlete } from './Athlete';
import { AthleteService } from './athlete.service';
export declare class AthleteController {
    private readonly athleteService;
    constructor(athleteService: AthleteService);
    getAthletes(): Athlete[];
    getAthlete(code: number): Athlete;
}

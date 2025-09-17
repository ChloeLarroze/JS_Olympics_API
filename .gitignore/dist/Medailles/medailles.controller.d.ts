import { MedaillesService } from './medailles.service';
import { Medaille, CountryMedalCount } from './Medaille';
export declare class MedaillesController {
    private readonly medaillesService;
    constructor(medaillesService: MedaillesService);
    getMedailles(): Promise<Medaille[]>;
    getMedalRankings(sortBy?: 'total' | 'gold' | 'silver' | 'bronze'): Promise<CountryMedalCount[]>;
    getMedailleById(id: string): Promise<Medaille>;
    createMedaille(medaille: Medaille): Promise<Medaille>;
    deleteMedaille(id: string): Promise<void>;
}

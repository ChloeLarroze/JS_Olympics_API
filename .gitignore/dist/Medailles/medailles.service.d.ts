import { Medaille, CountryMedalCount } from './Medaille';
import { OnModuleInit } from '@nestjs/common';
export declare class MedaillesService implements OnModuleInit {
    private medailles;
    onModuleInit(): Promise<void>;
    private loadMedaillesFromFile;
    MedaillefindAll(country?: string): Promise<Medaille[]>;
    MedaillefindOne(id: string): Promise<Medaille>;
    getMedalRankings(sortBy?: 'total' | 'gold' | 'silver' | 'bronze'): Promise<CountryMedalCount[]>;
    private normalizeMedalType;
    createMedaille(medaille: Medaille): Promise<Medaille>;
    deleteMedaille(id: string): Promise<void>;
}

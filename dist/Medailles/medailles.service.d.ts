import { Medaille } from './Medaille';
import { OnModuleInit } from '@nestjs/common';
export declare class MedaillesService implements OnModuleInit {
    private medailles;
    constructor();
    onModuleInit(): Promise<void>;
    private loadMedaillesFromFile;
    MedaillefindAll(country?: string): Promise<Medaille[]>;
    MedaillefindOne(id: string): Promise<Medaille>;
}

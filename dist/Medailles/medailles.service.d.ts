import { Medaille } from './Medaille';
import { OnModuleInit } from '@nestjs/common/interfaces/hooks/on-module-init.interface';
export declare class MedaillesService implements OnModuleInit {
    private medailles;
    constructor();
    onModuleInit(): Promise<void>;
    private loadMedaillesFromFile;
    MedaillefindAll(country?: string): Promise<Medaille[]>;
    MedaillefindOne(id: string): Promise<Medaille>;
}

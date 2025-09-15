import { MedaillesService } from './medailles.service';
import { Medaille } from './Medaille';
export declare class MedaillesController {
    private readonly medaillesService;
    constructor(medaillesService: MedaillesService);
    getMedailles(): Promise<Medaille[]>;
}

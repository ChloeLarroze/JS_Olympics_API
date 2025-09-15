import { Controller, Get } from '@nestjs/common';
import { MedaillesService } from './medailles.service';
import { Medaille } from './Medaille';

import { Body, Controller, Delete, Get, Param, Post, Query} from '@nestjs/common';


@Controller('medailles')
export class MedaillesController {

    constructor(private readonly medaillesService: MedaillesService) {}

    @Get()
    async getMedailles(): Promise<Medaille[]> {
        return this.medaillesService.MedaillefindAll();
    }

    //other queries //TO DO 
}
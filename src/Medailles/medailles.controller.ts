// src/Medailles/medailles.controller.ts

import { MedaillesService } from './medailles.service';
import { Medaille, CountryMedalCount} from './Medaille';
import { Body, Controller, Delete, Get, Param, Post, Query} from '@nestjs/common';

@Controller('medals')
export class MedaillesController {
    constructor(private readonly medaillesService: MedaillesService) {}

    //all medals
    @Get()
    async getMedailles(): Promise<Medaille[]> {
        return this.medaillesService.MedaillefindAll();
    }
    
     //returns countries ranked by total medals (gold, silver, bronze) -- GET /medals/rankings?sortBy=total|gold|silver|bronze
    @Get('rankings')
    async getMedalRankings(
        @Query('sortBy') sortBy: 'total' | 'gold' | 'silver' | 'bronze' = 'total'
    ): Promise<CountryMedalCount[]> {
        return this.medaillesService.getMedalRankings(sortBy);
    }

    //single medal by id (athlete code + index)
    @Get(':id')
    async getMedailleById(@Param('id') id: string): Promise<Medaille> {
        return this.medaillesService.MedaillefindOne(id);
    }

    //create a new medal
    @Post()
    async createMedaille(@Body() medaille: Medaille): Promise<Medaille> {
        return this.medaillesService.createMedaille(medaille);
    }
    
    //delete a medal by id
    @Delete(':id')
    async deleteMedaille(@Param('id') id: string): Promise<void> {
        return this.medaillesService.deleteMedaille(id);
    }
}
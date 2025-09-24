// src/Medailles/medailles.controller.ts

import { MedaillesService } from './medailles.service';
import { Medaille, CountryMedalCount} from './Medaille';
import { Body, Controller, Delete, Get, Param, Post, Query} from '@nestjs/common';
import {CreateMedalDto} from './dto/create-medal.dto' //dto

@Controller('medals')
export class MedaillesController {
    constructor(private readonly medaillesService: MedaillesService) {}

    //all medals
    @Get()
    async getMedailles(): Promise<Medaille[]> {
        return this.medaillesService.MedaillefindAll();
    }
    
     //returns countries ranked by total medals (gold, silver, bronze) -- 
     //Postman request example: http://localhost:3000/medals/rankings?sortBy=gold
    @Get('rankings')
    async getMedalRankings(
        @Query('sortBy') sortBy: 'total' | 'gold' | 'silver' | 'bronze' = 'total'
    ): Promise<CountryMedalCount[]> {
        return this.medaillesService.getMedalRankings(sortBy);
    }

    //single medal by id (athlete code)
    //postman request example: http://localhost:3000/medals/CTRMSPRTEAM3AUS01
    @Get(':id')
    async getMedailleById(@Param('id') id: string): Promise<Medaille> {
        return this.medaillesService.MedaillefindOne(id);
    }

    //create a new medal //FIX here, we'll use the DTO class instance rather than the medal regular body 
    @Post()
    async createMedaille(@Body() body: CreateMedalDto): Promise<Medaille> {
        return this.medaillesService.createMedaille(body);
    }
    
    //delete a medal by id
    //postman request example: http://localhost:3000/medals/CTRMSPRTEAM3AUS01
    @Delete(':id')
    async deleteMedaille(@Param('id') id: string): Promise<void> {
        return this.medaillesService.deleteMedaille(id);
    }

    
}
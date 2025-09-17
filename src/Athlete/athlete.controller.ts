import {Body,Controller,Delete,Get,HttpCode,Param,Post,Query} from '@nestjs/common';
import type { Athlete, Country } from './Athlete';
import { AthleteService } from './athlete.service';

@Controller('/athletes')
export class AthleteController {
    constructor(private readonly athleteService: AthleteService) {}

    @Get()
    getAthletes() {
        return this.athleteService.getAllAthletes();
    }

    @Get(':code')
    getAthlete(@Param('code') code: number): Athlete {
        return this.athleteService.getAthleteByCode(Number(code));
    }

    @Post('search')
    searchAthletes(@Body() { term }: { term: string }): Athlete[] {
        return this.athleteService.search(term);
    }

}
    /*@Post()
    createAthlete(@Body() athlete: Athlete): Athlete {
        this.athleteService.addAthlete(athlete);
        return this.athleteService.getAthleteByCode(athlete.code);
    }

    @Get()
    getAthletes(@Query('countryCode') countryCode?: string): Athlete[] {
        if (countryCode) {
            const country: Country = { code: countryCode, name: '' }; // ⚠️ à remplacer si tu veux gérer le `name`
            return this.athleteService.getAthletesByCountry(country);
        }
        return this.athleteService.getAllAthletes();
    }

    @Get(':code')
    getAthlete(@Param('code') code: string): Athlete {
        return this.athleteService.getAthleteByCode(Number(code));
    }

    @Delete(':code')
    deleteAthlete(@Param('code') code: string): void {
        this.athleteService.removeByCode(Number(code));
    }

    @Post('search')
    @HttpCode(200)
    searchAthletes(@Body() { term }: { term: string }): Athlete[] {
        return this.athleteService.search(term);
    }*/


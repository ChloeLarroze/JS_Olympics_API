import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateMedalDto {
    @IsString()
    @IsNotEmpty()
    athleteCode: string;

    @IsString()
    @IsNotEmpty()
    countryCode: string;

    @IsString()
    @IsNotEmpty()
    eventDiscipline: string;

    @IsString()
    @IsNotEmpty()
    medalType: string; // 'gold', 'silver', 'bronze'

    @IsDateString()
    @IsNotEmpty()
    dateAwarded: string; // ISO date string
}
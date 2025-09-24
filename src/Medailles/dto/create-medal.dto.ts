// create-medal.dto.ts
import { IsString, IsNumber, IsNotEmpty, ValidateNested, IsUrl, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

//interfaces DTOs
export class MedalDto {
    @IsString()
    @IsNotEmpty()
    type!: string;

    @IsNumber()
    code!: number;
}


export class AthleteDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    gender!: string;

    @IsString()
    @IsNotEmpty()
    code!: string;
}


export class EventDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    discipline!: string;

    @IsString()
    @IsNotEmpty()
    type!: string;

    @IsUrl()
    @IsNotEmpty()
    url!: string;
}

export class CountryDto {
    @IsString()
    @IsNotEmpty()
    code!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    long_name!: string;
}

//main dto 
export class CreateMedalDto {
    @ValidateNested()
    @Type(() => MedalDto)
    medal!: MedalDto;

    @IsDateString()
    @IsNotEmpty()
    date!: string;

    @ValidateNested()
    @Type(() => AthleteDto)
    athlete!: AthleteDto;

    @ValidateNested()
    @Type(() => EventDto)
    event!: EventDto;

    @ValidateNested()
    @Type(() => CountryDto)
    country!: CountryDto;
}

//export { MedalDto, AthleteDto, EventDto, CountryDto };//we won't need this one but just in case 
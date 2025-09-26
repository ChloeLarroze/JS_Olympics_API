export declare class MedalDto {
    type: string;
    code: number;
}
export declare class AthleteDto {
    name: string;
    gender: string;
    code: string;
}
export declare class EventDto {
    name: string;
    discipline: string;
    type: string;
    url: string;
}
export declare class CountryDto {
    code: string;
    name: string;
    long_name: string;
}
export declare class CreateMedalDto {
    medal: MedalDto;
    date: string;
    athlete: AthleteDto;
    event: EventDto;
    country: CountryDto;
}

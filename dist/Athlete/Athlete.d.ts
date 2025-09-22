export interface Country {
    code: string;
    name: string;
}
export interface Nationality {
    name: string;
}
export interface Physical_attributes {
    weights: number;
    height: number;
}
export interface Athlete {
    code: number;
    name: string;
    gender: string;
    nationality: Nationality;
    country: Country;
    disciplines: string[];
    events: string[];
    Physical_attributes: Physical_attributes;
}

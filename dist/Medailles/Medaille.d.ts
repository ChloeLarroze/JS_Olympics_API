export interface Medal {
    type: string;
    code: number;
}
export interface Athlete {
    name: string;
    gender: string;
    code: string;
}
export interface Event {
    name: string;
    discipline: string;
    type: string;
    url: string;
}
export interface Country {
    code: string;
    name: string;
    long_name: string;
}
export interface Medaille {
    medal: Medal;
    date: string;
    athlete: Athlete;
    event: Event;
    country: Country;
}

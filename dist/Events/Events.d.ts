export interface Sport {
    name: string;
    code: string;
    url: string;
}
export interface Location {
    venue: string;
    lat: number;
    lng: number;
}
export interface Event {
    event: string;
    tag: string;
    sport: Sport;
    discipline: string;
    event_type: string;
    url_event: string;
    locations: Location[];
}

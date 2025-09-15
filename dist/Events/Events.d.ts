export interface Sport {
    name: string;
    code: string;
    url: string;
}
export interface Event {
    event: string;
    tag: string;
    sport: Sport;
    discipline: string;
    event_type: string;
    url_event: string;
}

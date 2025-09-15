export interface Sport {
    name: string;
    code: string;
    url: string;
}

//big interface finale Event
export interface Event {
    event: string;
    tag: string;
    sport: Sport;
    discipline: string;
    event_type: string;
    url_event: string;
}

//exemple data for testing 
export const events: Event[] = [
    {
        event: "Men's Individual",
        tag: "archery",
        sport: {
            name: "Archery",
            code: "ARC",
            url: "https://olympics.com/en/paris-2024/sports/archery"
        },
        discipline: "Archery",
        event_type: "Individual",
        url_event: "/events/arc/men's-individual"
    },
    {
        event: "Women's Individual",
        tag: "archery",
        sport: {
            name: "Archery",
            code: "ARC",
            url: "https://olympics.com/en/paris-2024/sports/archery"
        },
        discipline: "Archery",
        event_type: "Individual",
        url_event: "/events/arc/women's-individual"
    }
];
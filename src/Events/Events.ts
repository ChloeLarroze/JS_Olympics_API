//.src/Events/Events.ts

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

//big interface finale Event
export interface Event {
    event: string;
    tag: string;
    sport: Sport;
    discipline: string;
    event_type: string;
    url_event: string;
    locations: Location[];
}

//exemple data for testing 
// export const events: Event[] = [
//     {
    //   "event": "Men's Individual",
    //   "tag": "archery",
    //   "sport": {
    //     "name": "Archery",
    //     "code": "ARC",
    //     "url": "https://olympics.com/en/paris-2024/sports/archery"
    //   },
    //   "discipline": "Archery",
    //   "event_type": "Individual",
    //   "url_event": "/events/arc/men's-individual",
    //   "locations": [
    //     {
    //       "venue": "Esplanade des Invalides",
    //       "lat": 48.8584337,
    //       "lng": 2.3138998
    //     }
    //   ]
    // }
// ];
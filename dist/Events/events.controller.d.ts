import { EventsService } from './events.service';
import { Event } from './Events';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    EventfindAll(country?: string): Promise<Event[]>;
    EventfindOne(id: string): Promise<Event>;
    createEvent(event: Event): Promise<Event>;
    deleteEvent(id: string): Promise<void>;
}

import { Event } from './Events';
import { OnModuleInit } from '@nestjs/common/interfaces/hooks/on-module-init.interface';
export declare class EventsService implements OnModuleInit {
    private eventsById;
    constructor();
    onModuleInit(): Promise<void>;
    private loadEventsFromFile;
    EventfindAll(country?: string): Promise<Event[]>;
    EventfindOne(id: string): Promise<Event>;
    createEvent(event: Event): Promise<Event>;
    deleteEvent(id: string): Promise<void>;
    favoriteEvent(id: string): Promise<Event>;
}

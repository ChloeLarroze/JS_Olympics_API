// src/Events/events.service.ts

import { Injectable } from '@nestjs/common';
import { Event } from './Events';
import { OnModuleInit } from '@nestjs/common/interfaces/hooks/on-module-init.interface';

//import { events } from './Events'; //example data for testing
import * as fs from 'fs';
import * as path from 'path';


//REMINDER
// export interface Event {
//     event: string;
//     tag: string;
//     sport: Sport;
//     discipline: string;
//     event_type: string;
//     url_event: string;
// // }

@Injectable()
export class EventsService implements OnModuleInit {
    private eventsById = new Map<string, Event>();

    constructor() {}

    // should wait for the file to be read before requests
    async  onModuleInit(): Promise<void> { 
        await this.loadEventsFromFile('./data/dataset_json/events.json');
    }    
    
    private async loadEventsFromFile(filePath: string): Promise<void> {
        const fullPath = path.resolve(filePath);
        const data = fs.readFileSync(fullPath, 'utf-8');
        const events: Event[] = JSON.parse(data); //obj table 

        events.forEach((event) => {
            this.eventsById.set(event.event, event); //use event name as id bc set(key, value)
        });
    }

    //all events, filtered by country 
    async EventfindAll(country?: string): Promise<Event[]> {
        // For now, ignore the country filter as events data does not include country information
        return Array.from(this.eventsById.values());
    }

    //returns a single event by its id (event name here :) )
    async EventfindOne(id: string): Promise<Event> {
        return this.eventsById.get(id);
    }


    //others functs ? TODO -> think abt it ... :( 
}   

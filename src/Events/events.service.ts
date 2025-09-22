import { Injectable } from '@nestjs/common';
import { Event } from './Events';
import { OnModuleInit } from '@nestjs/common';

//import { events } from './Events'; //example data for testing
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EventsService implements OnModuleInit {
    private eventsById = new Map<string, Event>();
    private favorites = new Set<string>(); //new set to store fav events 

    //constructor() {}

    // should wait for the file to be read before requests
    async onModuleInit(): Promise<void> { 
        await this.loadEventsFromFile('./data/dataset_json/events.json');
    }  
    
    //helpers for ID 
    private normalizeId(id: string): string {
        return id
            .toLowerCase()
            .replace(/\s+/g, '-')    // spaces → dashes
            .replace(/'/g, '');      // remove apostrophes
    }

    private idFromEvent(e: Event): string {
        return this.normalizeId(`${e.event}-${e.tag}`);
    }

    private async loadEventsFromFile(filePath: string): Promise<void> {
        try {
            const fullPath = path.resolve(filePath);
            console.log('Trying to load from path:', fullPath);
            
            // Check if file exists
            if (!fs.existsSync(fullPath)) {
                throw new Error(`File does not exist: ${fullPath}`);
            }
            
            const data = fs.readFileSync(fullPath, 'utf-8');
            console.log('Raw file data length:', data.length);
            console.log('First 200 characters:', data.substring(0, 200));
            
            const parsedData = JSON.parse(data);
            console.log('Parsed data type:', typeof parsedData);
            console.log('Is array?', Array.isArray(parsedData));
            
            // Handle the nested structure - events are under the "events" key
            let events: Event[] = [];
            if (Array.isArray(parsedData)) {
                events = parsedData;
            } else if (parsedData.events && Array.isArray(parsedData.events)) {
                events = parsedData.events; // FIX: Access the nested events array
            } else {
                events = [parsedData];
            }
            
            console.log('Total events to process:', events.length);
            if (events.length > 0) {
                console.log('First event structure:', JSON.stringify(events[0], null, 2));
            }
            
            events.forEach((event: Event, index: number) => {
                console.log(`Processing event ${index}: event="${event.event}", tag="${event.tag}"`);
                const id = this.idFromEvent(event);
                console.log(`Generated ID: "${id}"`);
                this.eventsById.set(id, event);
            });
            
            console.log('Final map size:', this.eventsById.size);
            console.log('Final map keys:', Array.from(this.eventsById.keys()));
            
        } catch (error) {
            console.error('Error loading events from file:', error);
            throw error;
        }
    }

    //all events, filtered by country 
    //postman request example: http://localhost:3000/events?country=USA
    async EventfindAll(country?: string): Promise<Event[]> {
        // For now, ignore the country filter as events data does not include country information
        return Array.from(this.eventsById.values());
    }

    //returns a single event by its id (event name here :) )
    //postman request eg : http://localhost:3000/events/Women's Individual-archery
    async EventfindOne(id: string): Promise<Event> {
        try {
            console.log(`Raw ID received: "${id}"`);
            const normalizedId = this.normalizeId(id);
            console.log(`Normalized ID: "${normalizedId}"`);
            console.log(`Available IDs: ${Array.from(this.eventsById.keys()).slice(0, 5).join(', ')}...`);
            
            const event = this.eventsById.get(normalizedId);
            if (!event) throw new Error(`Event with ID "${id}" not found`);
            return event;
        } catch (error) {
            console.error('Error in EventfindOne:', error);
            throw error;
        }
    }

    //add a new event 
    //postman request example: POST http://localhost:3000/events with body raw JSON
    async createEvent(event: Event): Promise<Event> {
        if (this.eventsById.has(this.idFromEvent(event))) { //if event already exists then error
            throw new Error('Event with this ID already exists');
        }
        this.eventsById.set(this.idFromEvent(event), event);
        return event;
    }

    //delete an event by its id 
    async deleteEvent(id: string): Promise<void> {
        const normalizedId = this.normalizeId(id); // FIX: normalize the ID
        if (!this.eventsById.has(normalizedId)) { // FIX: use normalized ID
            throw new Error('Event with this ID does not exist');
        }
        this.eventsById.delete(normalizedId); // FIX: use normalized ID
    }   

    //put a certain event as a favorite 
    //postman request example: http://localhost:3000/events/favorite/100m
    async favoriteEvent(id: string): Promise<Event> {
        try {
            console.log(`Raw ID received for favorite: "${id}"`);
            const normalizedId = this.normalizeId(id);
            console.log(`Normalized ID for favorite: "${normalizedId}"`);
            
            const event = this.eventsById.get(normalizedId); 
            if (!event) {
                throw new Error(`Event with ID "${id}" doesn't exist`);
            }

            this.favorites.add(normalizedId);
            console.log(`Successfully added to favorites: ${normalizedId}`);
            return event;
        } catch (error) {
            console.error('Error in favoriteEvent:', error);
            throw error;
        }
    }

    // Debug method to see all available IDs
    async getAllIds(): Promise<string[]> {
        return Array.from(this.eventsById.keys());
    }

    //others functs ? TODO -> think abt it ... :( 
}
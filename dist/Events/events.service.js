"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let EventsService = class EventsService {
    constructor() {
        this.eventsById = new Map();
        this.favorites = new Set();
    }
    async onModuleInit() {
        await this.loadEventsFromFile('./data/dataset_json/events.json');
    }
    normalizeId(id) {
        return id
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/'/g, '');
    }
    idFromEvent(e) {
        return this.normalizeId(`${e.event}-${e.tag}`);
    }
    async loadEventsFromFile(filePath) {
        try {
            const fullPath = path.resolve(filePath);
            console.log('Trying to load from path:', fullPath);
            if (!fs.existsSync(fullPath)) {
                throw new Error(`File does not exist: ${fullPath}`);
            }
            const data = fs.readFileSync(fullPath, 'utf-8');
            console.log('Raw file data length:', data.length);
            console.log('First 200 characters:', data.substring(0, 200));
            const parsedData = JSON.parse(data);
            console.log('Parsed data type:', typeof parsedData);
            console.log('Is array?', Array.isArray(parsedData));
            let events = [];
            if (Array.isArray(parsedData)) {
                events = parsedData;
            }
            else if (parsedData.events && Array.isArray(parsedData.events)) {
                events = parsedData.events;
            }
            else {
                events = [parsedData];
            }
            console.log('Total events to process:', events.length);
            if (events.length > 0) {
                console.log('First event structure:', JSON.stringify(events[0], null, 2));
            }
            events.forEach((event, index) => {
                console.log(`Processing event ${index}: event="${event.event}", tag="${event.tag}"`);
                const id = this.idFromEvent(event);
                console.log(`Generated ID: "${id}"`);
                this.eventsById.set(id, event);
            });
            console.log('Final map size:', this.eventsById.size);
            console.log('Final map keys:', Array.from(this.eventsById.keys()));
        }
        catch (error) {
            console.error('Error loading events from file:', error);
            throw error;
        }
    }
    async EventfindAll(country) {
        return Array.from(this.eventsById.values());
    }
    async EventfindOne(id) {
        try {
            console.log(`Raw ID received: "${id}"`);
            const normalizedId = this.normalizeId(id);
            console.log(`Normalized ID: "${normalizedId}"`);
            console.log(`Available IDs: ${Array.from(this.eventsById.keys()).slice(0, 5).join(', ')}...`);
            const event = this.eventsById.get(normalizedId);
            if (!event)
                throw new Error(`Event with ID "${id}" not found`);
            return event;
        }
        catch (error) {
            console.error('Error in EventfindOne:', error);
            throw error;
        }
    }
    async createEvent(event) {
        if (this.eventsById.has(this.idFromEvent(event))) {
            throw new Error('Event with this ID already exists');
        }
        this.eventsById.set(this.idFromEvent(event), event);
        return event;
    }
    async deleteEvent(id) {
        const normalizedId = this.normalizeId(id);
        if (!this.eventsById.has(normalizedId)) {
            throw new Error('Event with this ID does not exist');
        }
        this.eventsById.delete(normalizedId);
    }
    async favoriteEvent(id) {
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
        }
        catch (error) {
            console.error('Error in favoriteEvent:', error);
            throw error;
        }
    }
    async getAllIds() {
        return Array.from(this.eventsById.keys());
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)()
], EventsService);
//# sourceMappingURL=events.service.js.map
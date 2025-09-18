import type { INestApplication } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { EventsModule } from '../src/Events/events.module';
import { EventsService } from '../src/Events/events.service';

describe('Events API', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [EventsModule],
        })
        // Override the EventsService to avoid file loading issues in tests
        .overrideProvider(EventsService)
        .useValue({
            eventsById: new Map(),
            
            async EventfindAll(country?: string) {
                return Array.from(this.eventsById.values());
            },
            
            async EventfindOne(id: string) {
                const event = this.eventsById.get(id);
                if (!event) throw new Error('Event not found');
                return event;
            },
            
            async createEvent(event: any) {
                if (this.eventsById.has(event.event)) {
                    throw new Error('Event with this ID already exists');
                }
                this.eventsById.set(event.event, event);
                return event;
            },
            
            async deleteEvent(id: string) {
                if (!this.eventsById.has(id)) {
                    throw new Error('Event with this ID does not exist');
                }
                this.eventsById.delete(id);
            }
        })
        .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    afterEach(async () => {
        await app.close();
    });

    it('GET /events - should return empty array initially', async () => {
        const response = await request(app.getHttpServer())
            .get('/events')
            .expect(200);

        expect(response.body).toEqual([]);
    });

    it('POST /events', async () => {
        const newEvent = {
            event: "Men's Individual Test",
            tag: "archery",
            sport: {
                name: "Archery",
                code: "ARC",
                url: "https://olympics.com/en/paris-2024/sports/archery"
            },
            discipline: "Archery",
            event_type: "Individual",
            url_event: "/events/arc/men's-individual-test",
            locations: [
                {
                    venue: "Esplanade des Invalides",
                    lat: 48.8584337,
                    lng: 2.3138998
                }
            ]
        };

        const response = await request(app.getHttpServer())
            .post('/events')
            .send(newEvent)
            .expect(201);

        expect(response.body).toEqual(newEvent);
    });

    it('GET /events - should return created events', async () => {
        const newEvent = {
            event: "Test Event for List",
            tag: "swimming",
            sport: {
                name: "Swimming",
                code: "SWM",
                url: "https://olympics.com/en/paris-2024/sports/swimming"
            },
            discipline: "Swimming",
            event_type: "Individual",
            url_event: "/events/swm/test-event",
            locations: [
                {
                    venue: "Aquatics Centre",
                    lat: 48.8566,
                    lng: 2.3522
                }
            ]
        };

        // Create an event first
        await request(app.getHttpServer())
            .post('/events')
            .send(newEvent);

        // Then get all events
        const response = await request(app.getHttpServer())
            .get('/events')
            .expect(200);

        expect(response.body).toEqual(expect.any(Array));
        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toEqual(newEvent);
    });

    it('GET /events/:id', async () => {
        // First create an event
        const newEvent = {
            event: "Women's Individual Test",
            tag: "archery",
            sport: {
                name: "Archery",
                code: "ARC",
                url: "https://olympics.com/en/paris-2024/sports/archery"
            },
            discipline: "Archery",
            event_type: "Individual",
            url_event: "/events/arc/women's-individual-test",
            locations: [
                {
                    venue: "Esplanade des Invalides",
                    lat: 48.8584337,
                    lng: 2.3138998
                }
            ]
        };

        await request(app.getHttpServer())
            .post('/events')
            .send(newEvent);

        // Then retrieve it by ID (using the event name as ID)
        const response = await request(app.getHttpServer())
            .get(`/events/${encodeURIComponent("Women's Individual Test")}`)
            .expect(200);

        expect(response.body).toEqual(newEvent);
    });

    it('GET /events by country (parameter ignored for now)', async () => {
        // Create a test event first
        const newEvent = {
            event: "Test Event for Country Filter",
            tag: "swimming",
            sport: {
                name: "Swimming",
                code: "SWM",
                url: "https://olympics.com/en/paris-2024/sports/swimming"
            },
            discipline: "Swimming",
            event_type: "Individual",
            url_event: "/events/swm/test-event",
            locations: [
                {
                    venue: "Aquatics Centre",
                    lat: 48.8566,
                    lng: 2.3522
                }
            ]
        };

        await request(app.getHttpServer())
            .post('/events')
            .send(newEvent);

        // Test with country query parameter (should return all events for now)
        const response = await request(app.getHttpServer())
            .get('/events')
            .query({ country: 'France' })
            .expect(200);

        expect(response.body).toEqual(expect.any(Array));
        // Should include our test event since country filter is ignored
        expect(response.body.some((event: any) => event.event === "Test Event for Country Filter")).toBe(true);
    });

    it('DELETE /events/:id', async () => {
        // First create an event
        const newEvent = {
            event: "Event to Delete",
            tag: "athletics",
            sport: {
                name: "Athletics",
                code: "ATH",
                url: "https://olympics.com/en/paris-2024/sports/athletics"
            },
            discipline: "Athletics",
            event_type: "Individual",
            url_event: "/events/ath/event-to-delete",
            locations: [
                {
                    venue: "Stade de France",
                    lat: 48.9244,
                    lng: 2.3601
                }
            ]
        };

        await request(app.getHttpServer())
            .post('/events')
            .send(newEvent);

        // Delete the event
        await request(app.getHttpServer())
            .delete(`/events/${encodeURIComponent("Event to Delete")}`)
            .expect(200);

        // Verify it's deleted by trying to get it (should return error)
        await request(app.getHttpServer())
            .get(`/events/${encodeURIComponent("Event to Delete")}`)
            .expect(500); // Your service throws an Error which becomes 500
    });

    it('GET /events/:id - non-existent event', async () => {
        await request(app.getHttpServer())
            .get('/events/non-existent-event')
            .expect(500); // Your service throws an Error which becomes 500
    });

    it('POST /events - duplicate event', async () => {
        const newEvent = {
            event: "Duplicate Test Event",
            tag: "cycling",
            sport: {
                name: "Cycling",
                code: "CYC",
                url: "https://olympics.com/en/paris-2024/sports/cycling"
            },
            discipline: "Cycling",
            event_type: "Individual",
            url_event: "/events/cyc/duplicate-test",
            locations: [
                {
                    venue: "Velodrome",
                    lat: 48.8566,
                    lng: 2.3522
                }
            ]
        };

        // Create the event first time - should succeed
        await request(app.getHttpServer())
            .post('/events')
            .send(newEvent)
            .expect(201);

        // Try to create the same event again - should fail
        await request(app.getHttpServer())
            .post('/events')
            .send(newEvent)
            .expect(500); // Your service throws an Error which becomes 500
    });

    it('DELETE /events/:id - non-existent event', async () => {
        await request(app.getHttpServer())
            .delete('/events/non-existent-event')
            .expect(500); // Your service throws an Error which becomes 500
    });
});
import type { INestApplication } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import type supertest from 'supertest';
import { EventsModule } from '../src/events.module';

describe('Events API', () => {
    let app: INestApplication;
    let httpRequester: supertest.Agent;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [EventsModule],
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();

        httpRequester = request(app.getHttpServer());
    });

    it('GET /events', async () => {
        const response = await httpRequester.get('/events').expect(200);

        expect(response.body).toEqual(expect.any(Array));
    });

    it('POST /events', async () => {
        const response = await httpRequester
            .post('/events')
            .send({
                id: '1',
                name: 'Conference',
                date: '2024-06-01',
                location: 'Paris',
            })
            .expect(201);

        expect(response.body).toEqual({
            id: '1',
            name: 'Conference',
            date: '2024-06-01',
            location: 'Paris',
        });
    });

    it('GET /events/:id', async () => {
        await httpRequester.post('/events').send({
            id: '1',
            name: 'Conference',
            date: '2024-06-01',
            location: 'Paris',
        });

        const response = await httpRequester
            .get('/events/1')
            .expect(200);

        expect(response.body).toEqual({
            id: '1',
            name: 'Conference',
            date: '2024-06-01',
            location: 'Paris',
        });
    });

    it('GET /events by location', async () => {
        await httpRequester.post('/events').send({
            id: '1',
            name: 'Conference',
            date: '2024-06-01',
            location: 'Paris',
        });
        await httpRequester.post('/events').send({
            id: '2',
            name: 'Workshop',
            date: '2024-07-01',
            location: 'Paris',
        });
        await httpRequester.post('/events').send({
            id: '3',
            name: 'Meetup',
            date: '2024-08-01',
            location: 'London',
        });

        const response = await httpRequester
            .get('/events')
            .query({ location: 'Paris' })
            .expect(200);

        expect(response.body).toEqual([
            {
                id: '1',
                name: 'Conference',
                date: '2024-06-01',
                location: 'Paris',
            },
            {
                id: '2',
                name: 'Workshop',
                date: '2024-07-01',
                location: 'Paris',
            },
        ]);
    });

    it('DELETE /events/:id', async () => {
        await httpRequester.post('/events').send({
            id: '1',
            name: 'Conference',
            date: '2024-06-01',
            location: 'Paris',
        });

        await httpRequester.delete('/events/1').expect(200);

        const response = await httpRequester.get('/events');

        expect(response.body).toEqual([]);
    });
});
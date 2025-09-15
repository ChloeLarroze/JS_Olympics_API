import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AthleteModule } from '../src/athlete.module';
import { Athlete } from '../src/Athlete';

describe('AthleteController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AthleteModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    const mockAthlete: Athlete = {
        code: 1,
        name: 'Usain Bolt',
        country: { code: 'JAM', name: 'Jamaica' },
    };

    it('POST /athletes → create athlete', async () => {
        const response = await request(app.getHttpServer())
            .post('/athletes')
            .send(mockAthlete)
            .expect(201);

        expect(response.body).toMatchObject(mockAthlete);
    });

    it('GET /athletes → return all athletes', async () => {
        const response = await request(app.getHttpServer())
            .get('/athletes')
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('GET /athletes/:code → return one athlete', async () => {
        const response = await request(app.getHttpServer())
            .get(`/athletes/${mockAthlete.code}`)
            .expect(200);

        expect(response.body).toMatchObject(mockAthlete);
    });

    it('POST /athletes/search → search athletes by name', async () => {
        const response = await request(app.getHttpServer())
            .post('/athletes/search')
            .send({ term: 'Usain' })
            .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].name).toContain('Usain');
    });

    it('DELETE /athletes/:code → remove athlete', async () => {
        await request(app.getHttpServer())
            .delete(`/athletes/${mockAthlete.code}`)
            .expect(200);

        // Vérifie que l'athlète n'existe plus
        await request(app.getHttpServer())
            .get(`/athletes/${mockAthlete.code}`)
            .expect(500); // erreur car supprimé
    });
});

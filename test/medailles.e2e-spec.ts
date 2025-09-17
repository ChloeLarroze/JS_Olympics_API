import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { MedaillesModule } from '../src/Medailles/medailles.module';
import { CountryMedalCount } from '../src/Medailles/Medaille';

describe('MedaillesController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MedaillesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/medals (GET)', () => {
    it('should return all medals data', () => {
      return request(app.getHttpServer())
        .get('/medals')
        .expect(200)
        .expect((res: any) => {
          expect(Array.isArray(res.body)).toBe(true);
          if (res.body.length > 0) {
            expect(res.body[0]).toHaveProperty('medal');
            expect(res.body[0]).toHaveProperty('date');
            expect(res.body[0]).toHaveProperty('athlete');
            expect(res.body[0]).toHaveProperty('event');
            expect(res.body[0]).toHaveProperty('country');
          }
        });
    });
  });

  describe('/medals/rankings (GET)', () => {
    it('should return medal rankings sorted by total medals (default)', () => {
      return request(app.getHttpServer())
        .get('/medals/rankings')
        .expect(200)
        .expect((res: any) => {
          expect(Array.isArray(res.body)).toBe(true);
          
          const rankings: CountryMedalCount[] = res.body;
          
          // Check structure of each ranking entry
          if (rankings.length > 0) {
            const firstRanking = rankings[0];
            expect(firstRanking).toHaveProperty('country');
            expect(firstRanking).toHaveProperty('medals');
            expect(firstRanking).toHaveProperty('athletes');
            expect(firstRanking).toHaveProperty('topDisciplines');
            expect(firstRanking).toHaveProperty('firstMedalDate');
            expect(firstRanking).toHaveProperty('lastMedalDate');

            // Check country structure
            expect(firstRanking.country).toHaveProperty('code');
            expect(firstRanking.country).toHaveProperty('name');
            expect(firstRanking.country).toHaveProperty('long_name');

            // Check medals structure
            expect(firstRanking.medals).toHaveProperty('gold');
            expect(firstRanking.medals).toHaveProperty('silver');
            expect(firstRanking.medals).toHaveProperty('bronze');
            expect(firstRanking.medals).toHaveProperty('total');

            // Check athletes structure
            expect(firstRanking.athletes).toHaveProperty('total');
            expect(firstRanking.athletes).toHaveProperty('male');
            expect(firstRanking.athletes).toHaveProperty('female');

            // Check top disciplines structure
            expect(Array.isArray(firstRanking.topDisciplines)).toBe(true);
            if (firstRanking.topDisciplines.length > 0) {
              expect(firstRanking.topDisciplines[0]).toHaveProperty('discipline');
              expect(firstRanking.topDisciplines[0]).toHaveProperty('count');
            }
          }

          // Check sorting by total medals (descending)
          if (rankings.length > 1) {
            for (let i = 0; i < rankings.length - 1; i++) {
              const current = rankings[i].medals.total;
              const next = rankings[i + 1].medals.total;
              expect(current).toBeGreaterThanOrEqual(next);
            }
          }
        });
    });

    it('should return medal rankings sorted by gold medals', () => {
      return request(app.getHttpServer())
        .get('/medals/rankings?sortBy=gold')
        .expect(200)
        .expect((res: any) => {
          const rankings: CountryMedalCount[] = res.body;
          
          // Check sorting by gold medals (descending)
          if (rankings.length > 1) {
            for (let i = 0; i < rankings.length - 1; i++) {
              const current = rankings[i].medals.gold;
              const next = rankings[i + 1].medals.gold;
              expect(current).toBeGreaterThanOrEqual(next);
            }
          }
        });
    });

    it('should return medal rankings sorted by silver medals', () => {
      return request(app.getHttpServer())
        .get('/medals/rankings?sortBy=silver')
        .expect(200)
        .expect((res: any) => {
          const rankings: CountryMedalCount[] = res.body;
          
          // Check sorting by silver medals (descending)
          if (rankings.length > 1) {
            for (let i = 0; i < rankings.length - 1; i++) {
              const current = rankings[i].medals.silver;
              const next = rankings[i + 1].medals.silver;
              expect(current).toBeGreaterThanOrEqual(next);
            }
          }
        });
    });

    it('should return medal rankings sorted by bronze medals', () => {
      return request(app.getHttpServer())
        .get('/medals/rankings?sortBy=bronze')
        .expect(200)
        .expect((res: any) => {
          const rankings: CountryMedalCount[] = res.body;
          
          // Check sorting by bronze medals (descending)
          if (rankings.length > 1) {
            for (let i = 0; i < rankings.length - 1; i++) {
              const current = rankings[i].medals.bronze;
              const next = rankings[i + 1].medals.bronze;
              expect(current).toBeGreaterThanOrEqual(next);
            }
          }
        });
    });
  });

  describe('Integration tests', () => {
    it('should validate rankings data structure and sorting', async () => {
      // Get rankings
      const rankingsResponse = await request(app.getHttpServer())
        .get('/medals/rankings')
        .expect(200);
      
      const rankings: CountryMedalCount[] = rankingsResponse.body;
      
      if (rankings.length > 1) {
        // Verify sorting is correct (total medals descending)
        for (let i = 0; i < rankings.length - 1; i++) {
          const current = rankings[i].medals.total;
          const next = rankings[i + 1].medals.total;
          expect(current).toBeGreaterThanOrEqual(next);
        }
        
        // Verify data consistency within each ranking
        rankings.forEach(country => {
          const calculatedTotal = country.medals.gold + country.medals.silver + country.medals.bronze;
          expect(country.medals.total).toBe(calculatedTotal);
          
          const calculatedGenderTotal = country.athletes.male + country.athletes.female;
          expect(country.athletes.total).toBe(calculatedGenderTotal);
        });
      }
    });

    it('should validate date formats in rankings', () => {
      return request(app.getHttpServer())
        .get('/medals/rankings')
        .expect(200)
        .expect((res: any) => {
          const rankings: CountryMedalCount[] = res.body;
          
          // Check date format (YYYY-MM-DD) for all countries
          const datePattern = /^\d{4}-\d{2}-\d{2}$/;
          rankings.forEach(country => {
            if (country.firstMedalDate) {
              expect(country.firstMedalDate).toMatch(datePattern);
            }
            if (country.lastMedalDate) {
              expect(country.lastMedalDate).toMatch(datePattern);
            }
            
            // Check logical date order
            if (country.firstMedalDate && country.lastMedalDate) {
              expect(new Date(country.firstMedalDate).getTime()).toBeLessThanOrEqual(
                new Date(country.lastMedalDate).getTime()
              );
            }
          });
        });
    });
  });
});
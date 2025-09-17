/*it('Test 1 bis → addAthlete ', () => {
     service.addAthlete(mockAthlete);
     const athlete = service.getAthleteByCode(mockAthlete.code);
     expect(athlete).toEqual(mockAthlete);
 });

 it('Test 2 → getAllAthletes', () => {
     service.addAthlete(mockAthlete);
     const all = service.getAllAthletes();
     expect(all).toContainEqual(mockAthlete);
 });

 it('Test 3 → getAthletesByCountry', () => {
     const country: Country = { code: 'JAM', name: 'Jamaica' };
     service.addAthlete(mockAthlete);
     const athletes = service.getAthletesByCountry(country);
     expect(athletes).toContainEqual(mockAthlete);
 });

 it('Test 4 → search', () => {
     service.addAthlete(mockAthlete);
     const results = service.search('Usain');
     expect(results).toContainEqual(mockAthlete);
 });

 it('Test 5 → removeByCode', () => {
     service.addAthlete(mockAthlete);
     service.removeByCode(mockAthlete.code);
     expect(() => service.getAthleteByCode(mockAthlete.code)).toThrow();
 });*/
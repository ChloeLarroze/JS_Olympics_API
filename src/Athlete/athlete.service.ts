import { readFile } from 'node:fs/promises';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Athlete, Country } from './Athlete';

@Injectable()
export class AthleteService implements OnModuleInit {
    private readonly storage: Map<number, Athlete> = new Map();

    async onModuleInit() {
        await Promise.all([this.loadAthletesFromFile()]);
    }

    private async loadAthletesFromFile() {
        const data = await readFile('data/dataset_json/athletes.json', 'utf8');
        // nettoyer les NaN
        const safeJson = data.replace(/\bNaN\b/g, 'null');
        const parsed = JSON.parse(safeJson);
        // si le JSON est sous la forme { athletes: [...] }
        const athletes = Array.isArray(parsed) ? parsed : parsed.athletes;
        if (!Array.isArray(athletes)) {
            throw new Error('Invalid JSON format: expected an array of athletes');
        }
        athletes.forEach((athlete) => this.addAthlete(athlete));
    }

    addAthlete(athlete: Athlete) {
    this.storage.set(athlete.code, athlete);
    }

    getAllAthletes(): Athlete[] {
        return Array.from(this.storage.values()).sort((a, b) =>
            a.name.localeCompare(b.name),
        );
    }

    getAthleteByCode(code: number): Athlete {
        const athlete = this.storage.get(code);

        if (!athlete) {
            throw new Error(`Athlete with code ${code} not found`);
        }
        return athlete;
    }

    search(term: string) {
        return Array.from(this.storage.values())
            .filter((athlete) => athlete.name.includes(term))
            .sort((a, b) => a.name.localeCompare(b.name));
    }

}



/*
getAthleteByCode(code: number): Athlete {
const athlete = this.storage.get(code);

if (!athlete) {
throw new Error(`Athlete with code ${code} not found`);
}
return athlete;
}

getAllAthletes(): Athlete[] {
return Array.from(this.storage.values()).sort((a, b) =>
a.name.localeCompare(b.name),
);
}

getAthletesByCountry(country: Country): Athlete[] {
return this.getAllAthletes()
.filter((athlete) => athlete.country.code === country.code)
.sort((a, b) => a.country.name.localeCompare(b.country.name));
}

removeByCode(code: number) {
this.storage.delete(code);
}

search(term: string) {
return Array.from(this.storage.values())
.filter((athlete) => athlete.name.includes(term))
.sort((a, b) => a.name.localeCompare(b.name));
}*/


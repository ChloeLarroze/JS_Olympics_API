import { readFile,Promise } from 'node:fs/promises';
import { Injectable, OnModuleInit } from '@nestjs/common';
import {Athlete, Country} from "./Athlete";
import { firstValueFrom, map, tap } from 'rxjs';

@Injectable()
export class AthleteService implements OnModuleInit {

    private readonly storage: Map<string, Athlete> = new Map();

    async onModuleInit() {
        await Promise.all([this.loadAthletesFromFile()]);
    }

    private async loadAthletesFromFile() {
        const data = await readFile('data/dataset_json/athletes.json', 'utf8');
        const athletes = JSON.parse(data.toString()) as Athlete[];
        athletes.forEach((athlete) => this.addAthlete(athlete));
    }


    addAthlete(athlete: Athlete) {
        this.storage.set(athlete);
    }

    getAthletofcode(code: number): Athlete {
        const athlete = this.storage.get(code);

        if (!athlete) {
            throw new Error(`Book with ISBN ${code} not found`);
        }
        return athlete;
    }

    getAllAthlete(): Athlete[] {
        return Array.from(this.storage.values()).sort((a, b) =>
            a.title.localeCompare(b.name),
        );
    }

    getAthleteOfcodecountry(country: Country): Athlete[] {
        return this.getAllAthlete()
            .filter((athlete) => athlete.country.code === country.code)
            .sort((a, b) => a.country.name.localeCompare(b.country.name));
    }

    remove(code: number ) {
        this.storage.delete(code);
    }

    search(term: string) {
        return Array.from(this.storage.values())
            .filter((athlete) => athlete.name.includes(term) || athlete.name.includes(term))
            .sort((a, b) => a.name.localeCompare(b.name));
    }
}

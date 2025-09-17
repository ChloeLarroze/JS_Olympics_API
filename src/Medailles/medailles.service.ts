//src/Medailles/medailles.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { Medaille, CountryMedalCount } from './Medaille';
import { OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MedaillesService implements OnModuleInit {
    private medailles = new Map<string, Medaille>();

    async onModuleInit(): Promise<void> { 
        await this.loadMedaillesFromFile('./data/dataset_json/medals.json');
    }

    private async loadMedaillesFromFile(filePath: string): Promise<void> {
        const fullPath = path.resolve(filePath);
        const data = fs.readFileSync(fullPath, 'utf-8');
        const parsedData = JSON.parse(data);

        console.log('Type of parsed data:', typeof parsedData);
        console.log('Keys of parsed data:', Object.keys(parsedData));

        const medailles: Medaille[] = parsedData.medals;

        if (!Array.isArray(medailles)) {
            throw new Error("The expected medals array was not found in the JSON file.");
        }

        medailles.forEach((medaille, index) => {
            this.medailles.set(`${medaille.athlete.code}-${index}`, medaille);
        });
    }

    async MedaillefindAll(country?: string): Promise<Medaille[]> {
        if (country) {
            return Array.from(this.medailles.values()).filter(
                (medaille) => medaille.country.code === country
            );
        }
        return Array.from(this.medailles.values());
    }

    async MedaillefindOne(id: string): Promise<Medaille> {
        const medaille = this.medailles.get(id);
        if (!medaille) throw new NotFoundException('Medaille not found');
        return medaille;
    }

    async getMedalRankings(sortBy: 'total' | 'gold' | 'silver' | 'bronze' = 'total'): Promise<CountryMedalCount[]> {
        const allMedailles = Array.from(this.medailles.values());
        const countryStats = new Map<string, CountryMedalCount>();

        allMedailles.forEach((medaille) => {
            const countryCode = medaille.country.code;
            
            if (!countryStats.has(countryCode)) {
                countryStats.set(countryCode, {
                    country: medaille.country,
                    medals: { gold: 0, silver: 0, bronze: 0, total: 0 },
                    athletes: { total: 0, male: 0, female: 0 },
                    topDisciplines: [],
                    firstMedalDate: medaille.date,
                    lastMedalDate: medaille.date,
                });
            }

            const stats = countryStats.get(countryCode)!;
            
            const medalType = this.normalizeMedalType(medaille.medal.type);
            stats.medals[medalType]++;
            stats.medals.total++;

            if (medaille.date < stats.firstMedalDate!) {
                stats.firstMedalDate = medaille.date;
            }
            if (medaille.date > stats.lastMedalDate!) {
                stats.lastMedalDate = medaille.date;
            }
        });

        countryStats.forEach((stats, countryCode) => {
            const countryMedailles = allMedailles.filter(m => m.country.code === countryCode);
            
            const uniqueAthletes = new Map<string, { name: string; gender: string }>();
            countryMedailles.forEach(medaille => {
                if (!uniqueAthletes.has(medaille.athlete.code)) {
                    uniqueAthletes.set(medaille.athlete.code, {
                        name: medaille.athlete.name,
                        gender: medaille.athlete.gender
                    });
                }
            });

            // FIX: Only count athletes with M or F gender for the total
            const validGenderedAthletes = Array.from(uniqueAthletes.values()).filter(a => 
                a.gender === 'M' || a.gender === 'F'
            );

            stats.athletes.total = validGenderedAthletes.length;
            stats.athletes.male = validGenderedAthletes.filter(a => a.gender === 'M').length;
            stats.athletes.female = validGenderedAthletes.filter(a => a.gender === 'F').length;

            const disciplineCount = new Map<string, number>();
            countryMedailles.forEach(medaille => {
                const discipline = medaille.event.discipline;
                disciplineCount.set(discipline, (disciplineCount.get(discipline) || 0) + 1);
            });
            stats.topDisciplines = Array.from(disciplineCount.entries())
                .map(([discipline, count]) => ({ discipline, count }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 5);
        });

        const rankings = Array.from(countryStats.values());
        
        return rankings.sort((a, b) => {
            switch (sortBy) {
                case 'gold':
                    return b.medals.gold - a.medals.gold;
                case 'silver':
                    return b.medals.silver - a.medals.silver;
                case 'bronze':
                    return b.medals.bronze - a.medals.bronze;
                default:
                    if (b.medals.total !== a.medals.total) {
                        return b.medals.total - a.medals.total;
                    }
                    if (b.medals.gold !== a.medals.gold) {
                        return b.medals.gold - a.medals.gold;
                    }
                    return b.medals.silver - a.medals.silver;
            }
        });
    }

    private normalizeMedalType(medalType: string): 'gold' | 'silver' | 'bronze' {
        const type = medalType.toLowerCase();
        if (type.includes('gold')) return 'gold';
        if (type.includes('silver')) return 'silver';
        if (type.includes('bronze')) return 'bronze';
        throw new Error(`Unknown medal type: ${medalType}`);
    }

    //create a new medal
    async createMedaille(medaille: Medaille): Promise<Medaille> {
        const index = Array.from(this.medailles.values()).filter(m => m.athlete.code === medaille.athlete.code).length;
        const id = `${medaille.athlete.code}-${index}`;
        this.medailles.set(id, medaille);
        return medaille;
    }

    //delete a medal by id
    async deleteMedaille(id: string): Promise<void> {
        if (!this.medailles.has(id)) throw new NotFoundException('Medaille not found');
        this.medailles.delete(id);
    }
}
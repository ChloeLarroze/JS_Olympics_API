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
            this.medailles.set(`${medaille.athlete.code}`, medaille); //${medaille.athlete.code}-${index}`
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

    //returns a single medal by its id (aka the athlete code) eg: CTRMSPRTEAM3AUS01 
    async MedaillefindOne(id: string): Promise<Medaille> {
        const medaille = this.medailles.get(id);
        if (!medaille) throw new NotFoundException('Medaille not found');
        return medaille;
    }

    //returns countries ranked by total medals (gold, silver, bronze)
    async getMedalRankings(sortBy: 'total' | 'gold' | 'silver' | 'bronze' = 'total'): Promise<CountryMedalCount[]> {
        const allMedailles = Array.from(this.medailles.values());
        const countryStats = new Map<string, CountryMedalCount>(); // key: country code

        allMedailles.forEach((medaille) => {
            const countryCode = medaille.country.code;
            
            if (!countryStats.has(countryCode)) {
                countryStats.set(countryCode, {
                    country: medaille.country,
                    //init 
                    medals: { gold: 0, silver: 0, bronze: 0, total: 0 },
                    athletes: { total: 0, male: 0, female: 0 },
                    topDisciplines: [],
                    firstMedalDate: medaille.date,
                    lastMedalDate: medaille.date,
                });
            }

            //stats for current cntry
            const stats = countryStats.get(countryCode)!;
            
            const medalType = this.normalizeMedalType(medaille.medal.type);//fix type 
            stats.medals[medalType]++; //increment gold/silver/bronze
            stats.medals.total++; //increment total medals

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

            // FIX:only count athletes with M or W gender for the total (not that i have anything against non-binary athletes,
            //  but there are mixed teams marked as 'X' which skews the stats) :/
            const validGenderedAthletes = Array.from(uniqueAthletes.values()).filter(a => 
                a.gender === 'M' || a.gender === 'W'  //fix : english dataset dummy so not F but W
            );

            stats.athletes.total = validGenderedAthletes.length;
            stats.athletes.male = validGenderedAthletes.filter(a => a.gender === 'M').length;
            stats.athletes.female = validGenderedAthletes.filter(a => a.gender === 'W').length;
            //stats.athletes.team = validGenderedAthletes.filter(a => a.gender === 'X').length; we'll ignore it cause i'm too lazy to add it 

            //top disciplines
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

        //sort countries based on criteria 
        const rankings = Array.from(countryStats.values());
        
        //sorting logic here
        return rankings.sort((a, b) => {
            switch (sortBy) {
                case 'gold':
                    return b.medals.gold - a.medals.gold; //descending
                case 'silver':
                    return b.medals.silver - a.medals.silver; //same
                case 'bronze':
                    return b.medals.bronze - a.medals.bronze;
                default:
                    if (b.medals.total !== a.medals.total) { //if total different, we sort by total
                        return b.medals.total - a.medals.total;
                    }
                    if (b.medals.gold !== a.medals.gold) {
                        return b.medals.gold - a.medals.gold;
                    }
                    return b.medals.silver - a.medals.silver;
            }
        });
    }

    //normalize medal type strings to 'gold', 'silver', or 'bronze' so we can count them properly
    private normalizeMedalType(medalType: string): 'gold' | 'silver' | 'bronze' {
        const type = medalType.toLowerCase();
        if (type.includes('gold')) return 'gold';
        if (type.includes('silver')) return 'silver';
        if (type.includes('bronze')) return 'bronze';
        throw new Error(`Unknown medal type: ${medalType}`); //should not happen hopefully believe crois en ton dataset 
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

import { Injectable } from '@nestjs/common';
import { Medaille } from './Medaille';
import { OnModuleInit } from '@nestjs/common';


//import { events } from './Events'; //example data for testing
import * as fs from 'fs';
import * as path from 'path';


@Injectable()
export class MedaillesService implements OnModuleInit {
    private medailles = new Map<string, Medaille>();

    constructor() {}

    // should wait for the file to be read before requests
    async  onModuleInit(): Promise<void> { 
        await this.loadMedaillesFromFile('./data/dataset_json/medailles.json');
    }

    private async loadMedaillesFromFile(filePath: string): Promise<void> {
        const fullPath = path.resolve(filePath);
        const data = fs.readFileSync(fullPath, 'utf-8');
        const medailles: Medaille[] = JSON.parse(data); //obj table 

        medailles.forEach((medaille, index) => {
            this.medailles.set(`${medaille.athlete.code}-${index}`, medaille); //use athlete code + index as id bc set(key, value)
        });
    }

    //all medailles, filtered by country 
    async MedaillefindAll(country?: string): Promise<Medaille[]> {
        if (country) {
            return Array.from(this.medailles.values()).filter(
                (medaille) => medaille.country.code === country
            );
        }
        return Array.from(this.medailles.values());
    }

    //returns a single medaille by its id (athlete code + index here )
    async MedaillefindOne(id: string): Promise<Medaille> {
        const medaille = this.medailles.get(id);
        if (!medaille) throw new Error('Medaille not found'); //case where medaille is undefined
        return medaille;
    }

}
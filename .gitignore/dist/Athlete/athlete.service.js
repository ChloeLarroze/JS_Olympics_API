"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AthleteService = void 0;
const promises_1 = require("node:fs/promises");
const common_1 = require("@nestjs/common");
let AthleteService = class AthleteService {
    constructor() {
        this.storage = new Map();
    }
    async onModuleInit() {
        await Promise.all([this.loadAthletesFromFile()]);
    }
    async loadAthletesFromFile() {
        const data = await (0, promises_1.readFile)('data/dataset_json/athletes.json', 'utf8');
        const safeJson = data.replace(/\bNaN\b/g, 'null');
        const parsed = JSON.parse(safeJson);
        const athletes = Array.isArray(parsed) ? parsed : parsed.athletes;
        if (!Array.isArray(athletes)) {
            throw new Error('Invalid JSON format: expected an array of athletes');
        }
        athletes.forEach((athlete) => this.addAthlete(athlete));
    }
    addAthlete(athlete) {
        this.storage.set(athlete.code, athlete);
    }
    getAllAthletes() {
        return Array.from(this.storage.values()).sort((a, b) => a.name.localeCompare(b.name));
    }
    getAthleteByCode(code) {
        const athlete = this.storage.get(code);
        if (!athlete) {
            throw new Error(`Athlete with code ${code} not found`);
        }
        return athlete;
    }
    search(term) {
        return Array.from(this.storage.values())
            .filter((athlete) => athlete.name.includes(term))
            .sort((a, b) => a.name.localeCompare(b.name));
    }
};
exports.AthleteService = AthleteService;
exports.AthleteService = AthleteService = __decorate([
    (0, common_1.Injectable)()
], AthleteService);
//# sourceMappingURL=athlete.service.js.map
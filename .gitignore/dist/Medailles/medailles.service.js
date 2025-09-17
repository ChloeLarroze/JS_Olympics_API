"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedaillesService = void 0;
const common_1 = require("@nestjs/common");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let MedaillesService = class MedaillesService {
    constructor() {
        this.medailles = new Map();
    }
    async onModuleInit() {
        await this.loadMedaillesFromFile('./data/dataset_json/medals.json');
    }
    async loadMedaillesFromFile(filePath) {
        const fullPath = path.resolve(filePath);
        const data = fs.readFileSync(fullPath, 'utf-8');
        const parsedData = JSON.parse(data);
        console.log('Type of parsed data:', typeof parsedData);
        console.log('Keys of parsed data:', Object.keys(parsedData));
        const medailles = parsedData.medals;
        if (!Array.isArray(medailles)) {
            throw new Error("The expected medals array was not found in the JSON file.");
        }
        medailles.forEach((medaille, index) => {
            this.medailles.set(`${medaille.athlete.code}-${index}`, medaille);
        });
    }
    async MedaillefindAll(country) {
        if (country) {
            return Array.from(this.medailles.values()).filter((medaille) => medaille.country.code === country);
        }
        return Array.from(this.medailles.values());
    }
    async MedaillefindOne(id) {
        const medaille = this.medailles.get(id);
        if (!medaille)
            throw new common_1.NotFoundException('Medaille not found');
        return medaille;
    }
    async getMedalRankings(sortBy = 'total') {
        const allMedailles = Array.from(this.medailles.values());
        const countryStats = new Map();
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
            const stats = countryStats.get(countryCode);
            const medalType = this.normalizeMedalType(medaille.medal.type);
            stats.medals[medalType]++;
            stats.medals.total++;
            if (medaille.date < stats.firstMedalDate) {
                stats.firstMedalDate = medaille.date;
            }
            if (medaille.date > stats.lastMedalDate) {
                stats.lastMedalDate = medaille.date;
            }
        });
        countryStats.forEach((stats, countryCode) => {
            const countryMedailles = allMedailles.filter(m => m.country.code === countryCode);
            const uniqueAthletes = new Map();
            countryMedailles.forEach(medaille => {
                if (!uniqueAthletes.has(medaille.athlete.code)) {
                    uniqueAthletes.set(medaille.athlete.code, {
                        name: medaille.athlete.name,
                        gender: medaille.athlete.gender
                    });
                }
            });
            const validGenderedAthletes = Array.from(uniqueAthletes.values()).filter(a => a.gender === 'M' || a.gender === 'F');
            stats.athletes.total = validGenderedAthletes.length;
            stats.athletes.male = validGenderedAthletes.filter(a => a.gender === 'M').length;
            stats.athletes.female = validGenderedAthletes.filter(a => a.gender === 'F').length;
            const disciplineCount = new Map();
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
    normalizeMedalType(medalType) {
        const type = medalType.toLowerCase();
        if (type.includes('gold'))
            return 'gold';
        if (type.includes('silver'))
            return 'silver';
        if (type.includes('bronze'))
            return 'bronze';
        throw new Error(`Unknown medal type: ${medalType}`);
    }
    async createMedaille(medaille) {
        const index = Array.from(this.medailles.values()).filter(m => m.athlete.code === medaille.athlete.code).length;
        const id = `${medaille.athlete.code}-${index}`;
        this.medailles.set(id, medaille);
        return medaille;
    }
    async deleteMedaille(id) {
        if (!this.medailles.has(id))
            throw new common_1.NotFoundException('Medaille not found');
        this.medailles.delete(id);
    }
};
exports.MedaillesService = MedaillesService;
exports.MedaillesService = MedaillesService = __decorate([
    (0, common_1.Injectable)()
], MedaillesService);
//# sourceMappingURL=medailles.service.js.map
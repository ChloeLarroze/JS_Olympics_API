"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteService = void 0;
const common_1 = require("@nestjs/common");
const athlete_service_1 = require("./athlete.service");
let FavoriteService = class FavoriteService {
    constructor(athleteService) {
        this.athleteService = athleteService;
        this.favorites = new Map();
    }
    addFavorite(userId, athleteId) {
        const favs = this.favorites.get(userId) || [];
        if (!favs.includes(athleteId)) {
            favs.push(athleteId);
            this.favorites.set(userId, favs);
        }
    }
    removeFavorite(userId, athleteId) {
        const favs = this.favorites.get(userId) || [];
        this.favorites.set(userId, favs.filter(id => id !== athleteId));
    }
    getFavorites(userId) {
        const favIds = this.favorites.get(userId) || [];
        return favIds
            .map(id => this.athleteService.getAthleteByCode(id))
            .filter((athlete) => !!athlete);
    }
    isFavorite(userId, athleteId) {
        const favs = this.favorites.get(userId) || [];
        return favs.includes(athleteId);
    }
};
exports.FavoriteService = FavoriteService;
exports.FavoriteService = FavoriteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [athlete_service_1.AthleteService])
], FavoriteService);
//# sourceMappingURL=favorite.service.js.map
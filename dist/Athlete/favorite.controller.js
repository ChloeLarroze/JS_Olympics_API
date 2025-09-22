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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteController = void 0;
const common_1 = require("@nestjs/common");
const favorite_service_1 = require("./favorite.service");
const athlete_service_1 = require("./athlete.service");
let FavoriteController = class FavoriteController {
    constructor(favoriteService, athleteService) {
        this.favoriteService = favoriteService;
        this.athleteService = athleteService;
    }
    addFavorite(athleteId, userId) {
        const athleteIdNumber = Number(athleteId);
        const userIdNumber = Number(userId);
        const athlete = this.athleteService.getAthleteByCode(athleteIdNumber);
        this.favoriteService.addFavorite(userIdNumber, athleteIdNumber);
        return { message: `Athlete ${athleteIdNumber} added to favorites for user ${userIdNumber}` };
    }
    removeFavorite(athleteId, userId) {
        const athleteIdNumber = Number(athleteId);
        const userIdNumber = Number(userId);
        this.favoriteService.removeFavorite(userIdNumber, athleteIdNumber);
        return { message: `Athlete ${athleteIdNumber} removed from favorites for user ${userIdNumber}` };
    }
    getFavorites(userId) {
        const userIdNumber = Number(userId);
        console.log('UserId for getFavorites:', userIdNumber);
        return this.favoriteService.getFavorites(userIdNumber);
    }
};
exports.FavoriteController = FavoriteController;
__decorate([
    (0, common_1.Post)('add/:athleteId'),
    __param(0, (0, common_1.Param)('athleteId')),
    __param(1, (0, common_1.Query)('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], FavoriteController.prototype, "addFavorite", null);
__decorate([
    (0, common_1.Delete)('remove/:athleteId'),
    __param(0, (0, common_1.Param)('athleteId')),
    __param(1, (0, common_1.Query)('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], FavoriteController.prototype, "removeFavorite", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Array)
], FavoriteController.prototype, "getFavorites", null);
exports.FavoriteController = FavoriteController = __decorate([
    (0, common_1.Controller)('favorites'),
    __metadata("design:paramtypes", [favorite_service_1.FavoriteService,
        athlete_service_1.AthleteService])
], FavoriteController);
//# sourceMappingURL=favorite.controller.js.map
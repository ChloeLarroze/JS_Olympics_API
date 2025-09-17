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
let FavoriteController = class FavoriteController {
    constructor(favoriteService) {
        this.favoriteService = favoriteService;
    }
    addFavorite(athleteId, userId) {
        this.favoriteService.addFavorite(userId, athleteId);
        return { message: `Athlete ${athleteId} added to favorites for user ${userId}` };
    }
    removeFavorite(athleteId, userId) {
        this.favoriteService.removeFavorite(userId, athleteId);
        return { message: `Athlete ${athleteId} removed from favorites for user ${userId}` };
    }
    getFavorites(userId) {
        return this.favoriteService.getFavorites(userId);
    }
};
exports.FavoriteController = FavoriteController;
__decorate([
    (0, common_1.Post)(':athleteId'),
    __param(0, (0, common_1.Param)('athleteId')),
    __param(1, (0, common_1.Query)('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], FavoriteController.prototype, "addFavorite", null);
__decorate([
    (0, common_1.Delete)(':athleteId'),
    __param(0, (0, common_1.Param)('athleteId')),
    __param(1, (0, common_1.Query)('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], FavoriteController.prototype, "removeFavorite", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Array)
], FavoriteController.prototype, "getFavorites", null);
exports.FavoriteController = FavoriteController = __decorate([
    (0, common_1.Controller)('favorites'),
    __metadata("design:paramtypes", [favorite_service_1.FavoriteService])
], FavoriteController);
//# sourceMappingURL=favorite.controller.js.map
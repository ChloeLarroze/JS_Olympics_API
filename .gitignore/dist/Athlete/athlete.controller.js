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
exports.AthleteController = void 0;
const common_1 = require("@nestjs/common");
const athlete_service_1 = require("./athlete.service");
let AthleteController = class AthleteController {
    constructor(athleteService) {
        this.athleteService = athleteService;
    }
    getAthletes() {
        return this.athleteService.getAllAthletes();
    }
    getAthlete(code) {
        return this.athleteService.getAthleteByCode(Number(code));
    }
    searchAthletes({ term }) {
        return this.athleteService.search(term);
    }
};
exports.AthleteController = AthleteController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AthleteController.prototype, "getAthletes", null);
__decorate([
    (0, common_1.Get)(':code'),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], AthleteController.prototype, "getAthlete", null);
__decorate([
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Array)
], AthleteController.prototype, "searchAthletes", null);
exports.AthleteController = AthleteController = __decorate([
    (0, common_1.Controller)('/athletes'),
    __metadata("design:paramtypes", [athlete_service_1.AthleteService])
], AthleteController);
//# sourceMappingURL=athlete.controller.js.map
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
exports.MedaillesController = void 0;
const medailles_service_1 = require("./medailles.service");
const common_1 = require("@nestjs/common");
let MedaillesController = class MedaillesController {
    constructor(medaillesService) {
        this.medaillesService = medaillesService;
    }
    async getMedailles() {
        return this.medaillesService.MedaillefindAll();
    }
    async getMedalRankings(sortBy = 'total') {
        return this.medaillesService.getMedalRankings(sortBy);
    }
    async getMedailleById(id) {
        return this.medaillesService.MedaillefindOne(id);
    }
    async createMedaille(medaille) {
        return this.medaillesService.createMedaille(medaille);
    }
    async deleteMedaille(id) {
        return this.medaillesService.deleteMedaille(id);
    }
};
exports.MedaillesController = MedaillesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MedaillesController.prototype, "getMedailles", null);
__decorate([
    (0, common_1.Get)('rankings'),
    __param(0, (0, common_1.Query)('sortBy')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MedaillesController.prototype, "getMedalRankings", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MedaillesController.prototype, "getMedailleById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MedaillesController.prototype, "createMedaille", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MedaillesController.prototype, "deleteMedaille", null);
exports.MedaillesController = MedaillesController = __decorate([
    (0, common_1.Controller)('medals'),
    __metadata("design:paramtypes", [medailles_service_1.MedaillesService])
], MedaillesController);
//# sourceMappingURL=medailles.controller.js.map
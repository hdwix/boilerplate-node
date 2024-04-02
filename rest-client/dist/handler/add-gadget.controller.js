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
exports.GadgetController = void 0;
const common_1 = require("@nestjs/common");
const gadget_service_1 = require("../modules/gadget/gadget.service");
let GadgetController = class GadgetController {
    constructor(gadgetService) {
        this.gadgetService = gadgetService;
    }
    async createObject(body) {
        try {
            const baseUrl = 'https://api.restful-api.dev/objects';
            const createdObject = await this.gadgetService.makeHttpPostRequest(baseUrl, body);
            return createdObject;
        }
        catch (error) {
            console.error('Error creating object:', error);
            throw error;
        }
    }
};
exports.GadgetController = GadgetController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GadgetController.prototype, "createObject", null);
exports.GadgetController = GadgetController = __decorate([
    (0, common_1.Controller)('gadget'),
    __metadata("design:paramtypes", [gadget_service_1.GadgetService])
], GadgetController);
//# sourceMappingURL=add-gadget.controller.js.map
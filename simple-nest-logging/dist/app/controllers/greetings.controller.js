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
exports.GreetingsController = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../constants");
const greetings_service_1 = require("../../domain/services/greetings.service");
const logger_service_1 = require("../../infrastructure/logging/logger.service");
let GreetingsController = class GreetingsController {
    constructor(service, loggingService) {
        this.service = service;
        this.loggingService = loggingService;
    }
    greeting(name) {
        console.log((0, constants_1.traceId)());
        this.loggingService.log(`greeting | Greetings, ${name}`, (0, constants_1.traceId)());
        return this.service.doGreeting(name, constants_1.traceId);
    }
};
exports.GreetingsController = GreetingsController;
__decorate([
    (0, common_1.Get)('/:name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], GreetingsController.prototype, "greeting", null);
exports.GreetingsController = GreetingsController = __decorate([
    (0, common_1.Controller)('/greeting'),
    __metadata("design:paramtypes", [greetings_service_1.GreetingsService,
        logger_service_1.LoggingService])
], GreetingsController);
//# sourceMappingURL=greetings.controller.js.map
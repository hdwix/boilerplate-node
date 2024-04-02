"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GadgetModule = void 0;
const common_1 = require("@nestjs/common");
const gadget_service_1 = require("./gadget.service");
const get_All_gadget_controller_1 = require("../../handler/get-All-gadget.controller");
let GadgetModule = class GadgetModule {
};
exports.GadgetModule = GadgetModule;
exports.GadgetModule = GadgetModule = __decorate([
    (0, common_1.Module)({
        controllers: [get_All_gadget_controller_1.GadgetController],
        providers: [gadget_service_1.GadgetService],
    })
], GadgetModule);
//# sourceMappingURL=gadget.module.js.map
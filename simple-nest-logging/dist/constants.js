"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traceId = exports.APP_PORT = exports.APP_NAME = void 0;
const dotenv = require("dotenv");
dotenv.config();
exports.APP_NAME = process.env.APP_NAME || 'simple-nest-logging';
exports.APP_PORT = process.env.PORT || 3000;
exports.traceId = require('uuid').v4;
//# sourceMappingURL=constants.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./infrastructure/OpenTelementary/Open-Telementary.setup");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logger = new common_1.Logger('Bootstrap');
    await app.listen(3000);
    logger.log('Application is running on: http://localhost:3000');
}
bootstrap();
//# sourceMappingURL=main.js.map
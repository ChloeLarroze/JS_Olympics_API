"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
    }));
    await app.listen(PORT);
    console.log(`Server running on http://localhost:${PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map
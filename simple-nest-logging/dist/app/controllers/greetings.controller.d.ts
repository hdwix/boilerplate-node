import { GreetingsService } from 'src/domain/services/greetings.service';
import { LoggingService } from 'src/infrastructure/logging/logger.service';
export declare class GreetingsController {
    private readonly service;
    private readonly loggingService;
    constructor(service: GreetingsService, loggingService: LoggingService);
    greeting(name: string): any;
}

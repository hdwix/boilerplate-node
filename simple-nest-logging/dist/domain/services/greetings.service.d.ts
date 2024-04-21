import { LoggingService } from 'src/infrastructure/logging/logger.service';
export declare class GreetingsService {
    private readonly loggingService;
    constructor(loggingService: LoggingService);
    doGreeting(name: string, traceId: any): any;
}

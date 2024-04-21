import { Injectable } from '@nestjs/common';
import { traceId } from 'src/constants';
import { LoggingService } from 'src/infrastructure/logging/logger.service';

@Injectable()
export class GreetingsService {
  constructor(private readonly loggingService: LoggingService) {}

  doGreeting(name: string, traceId: any): any {
    this.loggingService.log(`doGreeting | Greeting, ${name}!`, traceId());

    return {
      data: `Greetings, ${name}`,
      meta: {
        code: 200,
        message: 'Succes',
      },
    };
  }
}

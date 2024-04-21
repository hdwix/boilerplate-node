import { Injectable } from '@nestjs/common';
import { trace } from 'console';
import { GreetingDto } from 'src/app/dtos/greeting.dto';
import { LoggingService } from 'src/infrastructure/logging/logger.service';

@Injectable()
export class GreetingsService {
  constructor(private readonly loggingService: LoggingService) {}

  doGreeting(name: string, traceId: any): GreetingDto {
    this.loggingService.log(`doGreeting | Greeting, ${name}!`, traceId);

    return {
      data: `Greetings, ${name}`,
      meta: {
        code: 200,
        message: 'Succes',
      },
    };
  }
}

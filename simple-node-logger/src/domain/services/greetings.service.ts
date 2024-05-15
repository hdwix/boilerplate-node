import { Injectable, Scope } from '@nestjs/common';
import { GreetingDto } from '../../app/dtos/greeting.dto';
import { LoggingService } from '../../infrastructure/logging/logger.service';
import { ContextService } from 'src/infrastructure/context/context.service';

@Injectable({ scope: Scope.REQUEST })
export class GreetingsService {
  constructor(
    private readonly loggingService: LoggingService,
    private readonly requestContext: ContextService
  ) {}

  doGreeting(name: string): GreetingDto {
    const traceId = this.requestContext.traceId; // Same traceId as in the controller
    this.loggingService.log(
      `${__filename} | doGreeting | ${traceId} | Greeting, ${name}!`,
    );

    return {
      data: `Greetings, ${name}`,
      meta: {
        code: 200,
        message: 'Success',
      },
    };
  }
}

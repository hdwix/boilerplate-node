import { Controller, Get, Param } from '@nestjs/common';
import { generateTraceId } from '../../constants';
import { GreetingsService } from '../../domain/services/greetings.service';
import { LoggingService } from '../../infrastructure/logging/logger.service';
import { GreetingDto } from '../dtos/greeting.dto';
import { ContextService } from 'src/infrastructure/context/context.service';

@Controller('/greeting')
export class GreetingsController {
  constructor(
    private readonly service: GreetingsService,
    private readonly loggingService: LoggingService,
    private readonly requestContext: ContextService
  ) {}

  @Get('/:name')
  greeting(@Param('name') name: string): GreetingDto {
    const traceId = this.requestContext.traceId; // Gets the traceId from the request context
    this.loggingService.log(
      `${__filename} | greeting | ${traceId} | Greeting, ${name}!`,
    );

    return this.service.doGreeting(name);
  }
}


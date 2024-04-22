import { Controller, Get, Param } from '@nestjs/common';
import { generateTraceId } from '../../constants';
import { GreetingsService } from '../../domain/services/greetings.service';
import { LoggingService } from '../../infrastructure/logging/logger.service';
import { GreetingDto } from '../dtos/greeting.dto';

@Controller('/greeting')
export class GreetingsController {
  currentPath = 'simple-nest-logging/src/app/controller/greetings.controller';
  constructor(
    private readonly service: GreetingsService,
    private readonly loggingService: LoggingService,
  ) {}

  @Get('/:name')
  greeting(@Param('name') name: string): GreetingDto {
    const traceId = generateTraceId();
    this.loggingService.log(
      `${this.currentPath} | greeting | ${traceId} | Greeting, ${name}!`,
    );

    return this.service.doGreeting(name, traceId);
  }
}

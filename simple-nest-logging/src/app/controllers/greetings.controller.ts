import { Controller, Get, Param } from '@nestjs/common';
import { traceId } from 'src/constants';
import { GreetingsService } from 'src/domain/services/greetings.service';
import { LoggingService } from 'src/infrastructure/logging/logger.service';

@Controller('/greeting')
export class GreetingsController {
  constructor(
    private readonly service: GreetingsService,
    private readonly loggingService: LoggingService,
  ) {}

  @Get('/:name')
  greeting(@Param('name') name: string): any {
    console.log(traceId());
    this.loggingService.log(`greeting | Greetings, ${name}`, traceId());
    return this.service.doGreeting(name, traceId);
  }
}

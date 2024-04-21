import { Controller, Get, Param } from '@nestjs/common';
import { traceId } from 'src/constants';
import { GreetingsService } from 'src/domain/services/greetings.service';
import { LoggingService } from 'src/infrastructure/logging/logger.service';
import { GreetingDto } from '../dtos/greeting.dto';

@Controller('/greeting')
export class GreetingsController {
  constructor(
    private readonly service: GreetingsService,
    private readonly loggingService: LoggingService,
  ) {}

  @Get('/:name')
  greeting(@Param('name') name: string): GreetingDto {
    const trace = traceId();
    this.loggingService.log(`greeting | Greetings, ${name}`, trace);

    return this.service.doGreeting(name, trace);
  }
}

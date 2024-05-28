import { Controller, Get } from '@nestjs/common';
import { trace } from '@opentelemetry/api';
import { AppService } from '../../domain/service/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const tracer = trace.getTracer('default');
    const span = tracer.startSpan('AppController.getHello');
    try {
      return this.appService.getHello();
    } finally {
      span.end();
    }
  }
}

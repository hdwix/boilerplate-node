// src/app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { trace } from '@opentelemetry/api';
import { AppService } from '../../domain/service/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    const tracer = trace.getTracer('default');
    const span = tracer.startSpan('AppController.getHello');
    span.setAttribute('service.name', 'AppController.getHello');
    span.setAttribute('service.version', '1.0.0');
    try {
      return this.appService.getHello();
    } finally {
      span.end();
    }
  }
}

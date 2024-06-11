// src/app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { trace } from '@opentelemetry/api';
import { AppService } from '../../domain/service/app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private configService: ConfigService
  ) {}


  @Get('/hello')
  getHello(): string {
    const tracer = trace.getTracer('default');
    const span = tracer.startSpan('AppController.getHello');
    span.setAttribute('service.name', 'AppController.getHello');
    span.setAttribute('service.version', '1.0.0');
    span.setAttribute('environment', `${this.configService.get<string>('APP_ENV')}`);
    try {
      return this.appService.getHello();
    } finally {
      span.end();
    }
  }
}

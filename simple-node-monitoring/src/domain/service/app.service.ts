import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { trace } from '@opentelemetry/api';

@Injectable()
export class AppService {

  constructor(private configService: ConfigService) {}

  getHello(): string {
    const tracer = trace.getTracer('default');
    const span = tracer.startSpan('AppService.getHello');
    span.setAttribute('service.name', 'AppService.getHello');
    span.setAttribute('service.version', '1.0.0');
    span.setAttribute('environment', `${this.configService.get<string>('APP_ENV')}`);
    try {
      return 'Hello World!';
    } finally {
      span.end();
    }
  }
}

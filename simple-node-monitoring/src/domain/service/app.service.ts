import { Injectable } from '@nestjs/common';
import { trace } from '@opentelemetry/api';

@Injectable()
export class AppService {
  getHello(): string {
    const tracer = trace.getTracer('default');
    const span = tracer.startSpan('AppService.getHello');
    span.setAttribute('service.name', 'AppService.getHello');
    span.setAttribute('service.version', '1.0.0');
    try {
      // Business logic here
      return 'Hello World!';
    } finally {
      span.end();
    }
  }
}

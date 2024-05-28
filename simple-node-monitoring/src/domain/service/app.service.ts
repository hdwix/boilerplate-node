import { Injectable } from '@nestjs/common';
import { trace } from '@opentelemetry/api';

@Injectable()
export class AppService {
  getHello(): string {
    const tracer = trace.getTracer('default');
    const span = tracer.startSpan('AppService.getHello');
    try {
      // Business logic here
      return 'Hello World!';
    } finally {
      span.end();
    }
  }
}

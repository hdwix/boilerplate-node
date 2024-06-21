import { Injectable } from '@nestjs/common';
import { Counter, Gauge, collectDefaultMetrics, register } from 'prom-client';

@Injectable()
export class MetricsService {
  private readonly requestCounter: Counter<string>;
  private readonly responseTimeGauge: Gauge<string>;
  private readonly nodeVersionGauge: Gauge<string>;

  constructor() {
    collectDefaultMetrics();

    // Define and register request counter
    this.requestCounter = new Counter({
      name: 'requests_total',
      help: 'Total number of requests',
    });
    register.registerMetric(this.requestCounter);

    // Define and register response time gauge
    this.responseTimeGauge = new Gauge({
      name: 'response_time_seconds',
      help: 'Response time in seconds',
    });
    register.registerMetric(this.responseTimeGauge);
  }

  incrementRequestCounter() {
    this.requestCounter.inc();
  }

  setResponseTime(value: number) {
    this.responseTimeGauge.set(value);
  }
}

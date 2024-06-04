// src/opentelemetry.spec.ts
import { NodeSDK } from '@opentelemetry/sdk-node';
import { trace, context } from '@opentelemetry/api';
import { Resource } from '@opentelemetry/resources';

// Mock the ZipkinExporter
jest.mock('@opentelemetry/exporter-zipkin', () => {
  return {
    ZipkinExporter: jest.fn().mockImplementation(() => ({
      export: jest.fn(),
      shutdown: jest.fn(),
    })),
  };
});

const { ZipkinExporter } = require('@opentelemetry/exporter-zipkin');

describe('OpenTelemetry Setup', () => {
  let sdk: NodeSDK;

  beforeAll(() => {
    const zipkinExporter = new ZipkinExporter({
      url: 'http://localhost:9411/api/v2/spans',
    });

    sdk = new NodeSDK({
      resource: new Resource({
        'service.name': 'nestjs-monitoring-app',
        'service.version': '1.0.0',
      }),
      traceExporter: zipkinExporter,
      instrumentations: [],
    });

    sdk.start();
  });

  //   afterAll(async () => {
  //     await sdk.shutdown();
  //   }, 10000); // Increase timeout to 10 seconds

  it('should initialize tracing', () => {
    const tracer = trace.getTracer('default');
    expect(tracer).toBeDefined();
  });

  it('should create spans with correct attributes', () => {
    const tracer = trace.getTracer('default');
    const span = tracer.startSpan('test-span', undefined, context.active());
    span.setAttribute('service.version', '1.0.0');

    const spanContext = span.spanContext();
    expect(spanContext.traceId).toBeDefined();
    expect(spanContext.spanId).toBeDefined();

    span.end();

    expect(span.isRecording()).toBe(false);
  });
});

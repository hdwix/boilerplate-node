import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { Resource } from '@opentelemetry/resources';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import {
  envDetectorSync,
  hostDetectorSync,
  processDetectorSync,
  DetectorSync,
  ResourceDetectionConfig,
} from '@opentelemetry/resources';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import * as grpc from '@grpc/grpc-js';

function awaitAttributes(detector: DetectorSync): DetectorSync {
  return {
    detect(config?: ResourceDetectionConfig): Resource {
      const resource = detector.detect(config);
      if (resource.waitForAsyncAttributes) {
        resource.waitForAsyncAttributes().catch(console.error);
      }
      return resource;
    },
  };
}

const otlpExporter = new OTLPTraceExporter({
  url: 'grpc://103.127.137.201:30001',
  // http://otel.shadrachjabonir.my.id/
  credentials: grpc.credentials.createInsecure(), // Disable TLS
});

const sdk = new NodeSDK({
  resource: new Resource({
    'service.name': 'simple-nest-monitoring',
    'service.version': '1.0.0',
  }),
  traceExporter: otlpExporter,
  instrumentations: [getNodeAutoInstrumentations(), new NestInstrumentation()],
  resourceDetectors: [
    awaitAttributes(envDetectorSync),
    awaitAttributes(processDetectorSync),
    awaitAttributes(hostDetectorSync),
  ],
});

sdk.start();
console.log('Tracing initialized');

process.on('SIGTERM', async () => {
  try {
    await sdk.shutdown();
    console.log('Tracing terminated');
  } catch (error) {
    console.log('Error terminating tracing', error);
  } finally {
    process.exit(0);
  }
});

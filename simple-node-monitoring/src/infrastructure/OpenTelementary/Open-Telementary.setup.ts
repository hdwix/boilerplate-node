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
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';

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

async function setupOpenTelemetry() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const otelAddress = configService.get<string>('OTEL_ADDRESS');

  const otlpExporter = new OTLPTraceExporter({
    url: otelAddress,
    credentials: grpc.credentials.createInsecure(), // Disable TLS
  });

  const sdk = new NodeSDK({
    resource: new Resource({
      'service.name': 'simple-nest-monitoring',
      'service.version': '1.0.0',
    }),
    traceExporter: otlpExporter,
    instrumentations: [
      getNodeAutoInstrumentations({
        // Exclude fs instrumentation
        '@opentelemetry/instrumentation-fs': {
          enabled: false
        }
      }),
      new NestInstrumentation()
    ],
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

}

setupOpenTelemetry();


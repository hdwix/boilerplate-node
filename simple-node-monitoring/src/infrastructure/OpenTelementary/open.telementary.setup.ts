import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
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

@Injectable()
export class OpenTelemetryService implements OnModuleInit, OnModuleDestroy {
  private sdk: NodeSDK;

  constructor(private readonly configService: ConfigService) {}

  private awaitAttributes(detector: DetectorSync): DetectorSync {
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

  async onModuleInit() {
    const otelAddress = this.configService.get<string>('OTEL_ADDRESS');

    const otlpExporter = new OTLPTraceExporter({
      url: otelAddress,
      credentials: grpc.credentials.createInsecure(),
    });

    this.sdk = new NodeSDK({
      resource: new Resource({
        'service.name': 'simple-node-monitoring',
        'service.version': '1.0.0',
      }),
      traceExporter: otlpExporter,
      instrumentations: [
        getNodeAutoInstrumentations({
          '@opentelemetry/instrumentation-fs': {
            enabled: false,
          },
        }),
        new NestInstrumentation(),
      ],
      resourceDetectors: [
        this.awaitAttributes(envDetectorSync),
        this.awaitAttributes(processDetectorSync),
        this.awaitAttributes(hostDetectorSync),
      ],
    });

    await this.sdk.start();
    console.log('Tracing initialized');

    process.on('SIGTERM', async () => {
      try {
        await this.sdk.shutdown();
        console.log('Tracing terminated');
      } catch (error) {
        console.log('Error terminating tracing', error);
      } finally {
        process.exit(0);
      }
    });
  }

  async onModuleDestroy() {
    if (this.sdk) {
      await this.sdk.shutdown();
      console.log('Tracing terminated');
    }
  }
}

import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';
import { Resource } from '@opentelemetry/resources';
import { envDetectorSync, hostDetectorSync, processDetectorSync, DetectorSync, ResourceDetectionConfig } from '@opentelemetry/resources';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';

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

const zipkinExporter = new ZipkinExporter({
  url: 'http://localhost:9411/api/v2/spans',
});

const sdk = new NodeSDK({
  resource: new Resource({
    'service.name': 'nestjs-monitoring-app',
  }),
  traceExporter: zipkinExporter,
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

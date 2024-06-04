"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_node_1 = require("@opentelemetry/sdk-node");
const auto_instrumentations_node_1 = require("@opentelemetry/auto-instrumentations-node");
const exporter_zipkin_1 = require("@opentelemetry/exporter-zipkin");
const resources_1 = require("@opentelemetry/resources");
const resources_2 = require("@opentelemetry/resources");
const instrumentation_nestjs_core_1 = require("@opentelemetry/instrumentation-nestjs-core");
function awaitAttributes(detector) {
    return {
        detect(config) {
            const resource = detector.detect(config);
            if (resource.waitForAsyncAttributes) {
                resource.waitForAsyncAttributes().catch(console.error);
            }
            return resource;
        },
    };
}
const zipkinExporter = new exporter_zipkin_1.ZipkinExporter({
    url: 'http://localhost:9411/api/v2/spans',
});
const sdk = new sdk_node_1.NodeSDK({
    resource: new resources_1.Resource({
        'service.name': 'nestjs-monitoring-app',
        'service.version': '1.0.0',
    }),
    traceExporter: zipkinExporter,
    instrumentations: [(0, auto_instrumentations_node_1.getNodeAutoInstrumentations)(), new instrumentation_nestjs_core_1.NestInstrumentation()],
    resourceDetectors: [
        awaitAttributes(resources_2.envDetectorSync),
        awaitAttributes(resources_2.processDetectorSync),
        awaitAttributes(resources_2.hostDetectorSync),
    ],
});
sdk.start();
console.log('Tracing initialized');
process.on('SIGTERM', async () => {
    try {
        await sdk.shutdown();
        console.log('Tracing terminated');
    }
    catch (error) {
        console.log('Error terminating tracing', error);
    }
    finally {
        process.exit(0);
    }
});
//# sourceMappingURL=Open-Telementary.setup.js.map
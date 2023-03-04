import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { WebTracerProvider, BatchSpanProcessor } from '@opentelemetry/sdk-trace-web';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { trace } from '@opentelemetry/api';

// For sending traces for all http requests
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';

export const initOpenTelemetry = () => {
  const exporter = new OTLPTraceExporter({
    url: "http://localhost:4318/v1/traces" || "https://api.honeycomb.io",
    headers: {
      'x-honeycomb-team': `${process.env.REACT_APP_HONEYCOMB_COLLECTOR_API_KEY}`
    }
  });

  const provider = new WebTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: 'cruddur',
    }),
  });

  provider.addSpanProcessor(new BatchSpanProcessor(exporter));
  provider.register({
    contextManager: new ZoneContextManager()
  });

  registerInstrumentations({
    instrumentations: [
      new XMLHttpRequestInstrumentation({
        propagateTraceHeaderCorsUrls: [
          new RegExp(`${process.env.REACT_APP_BACKEND_URL}`, 'g')
        ]
      }),
      new FetchInstrumentation({
        propagateTraceHeaderCorsUrls: [
          new RegExp(`${process.env.REACT_APP_BACKEND_URL}`, 'g')
        ]
      }),
      new DocumentLoadInstrumentation(),
    ],
  });
};


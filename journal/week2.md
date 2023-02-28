# Week 2 — Distributed Tracing
Distributed tracing is a technique used in distributed systems to track and monitor the flow of requests as they move through multiple services or components. The goal of distributed tracing is to provide insight into how requests propagate through a complex system and identify any issues that may arise.

In distributed tracing, each request is assigned a unique identifier that is propagated through the system as the request flows through different components. Each component that handles the request generates tracing data, which is sent to a centralized tracing system. The tracing system aggregates this data and provides a visualization of the request flow, including metrics such as response time, latency, and error rates.

Distributed tracing can be used to identify performance bottlenecks, debug errors, and optimize system performance. It is particularly useful in microservices architectures, where a single request can be handled by multiple services. By tracing the flow of requests through these services, developers can gain a better understanding of how the system is functioning as a whole.

Some popular distributed tracing tools and frameworks include Jaeger, Zipkin, and OpenTelemetry. These tools provide APIs and libraries that can be integrated into applications to automatically generate tracing data, as well as web-based user interfaces for analyzing and visualizing the data.

# System Observability
Observability is the ability to understand the internal state of a system by collecting and analyzing data from its components. In other words, it's the ability to see what's happening inside a system without necessarily knowing how it works.

In the context of systems, observability refers to the ability to monitor and analyze the behavior and performance of a system, as well as its internal state, through the collection and analysis of data. This includes metrics, logs, traces, and other data sources that provide insights into the system's behavior and performance.

Observability is a key characteristic of modern distributed systems, where multiple components and services interact with each other in complex ways. It enables developers and operators to diagnose and troubleshoot issues, identify performance bottlenecks, and optimize system performance.

Observability is achieved through the use of various tools and technologies, including monitoring and alerting systems, log aggregation and analysis tools, and distributed tracing frameworks. These tools provide real-time visibility into the behavior and performance of a system, allowing developers and operators to quickly identify and address issues before they impact users.

Overall, observability is an important aspect of system design and operation, as it enables organizations to build and maintain reliable, scalable, and performant systems.

# Tracing Systems and the use cases
Traces are a way of tracking the flow of requests through a distributed system. A trace is essentially a record of the interactions between the different components of the system as the request is processed. It includes information about the timing and duration of each interaction, as well as any errors or exceptions that occurred along the way.

Traces work by assigning a unique identifier to each request as it enters the system. This identifier is then propagated through the system as the request flows through different components, such as microservices or APIs. Each component generates a trace record that includes information about the processing of the request, such as the time it took to process, any errors that occurred, and any external resources that were accessed.

As the request flows through the system, the trace records are sent to a centralized tracing system that aggregates them into a single trace view. This view provides a comprehensive picture of the flow of the request through the system, allowing developers to see how each component contributed to the overall processing time and identify any bottlenecks or issues.

Traces are typically used in conjunction with other monitoring and observability tools, such as logs and metrics, to provide a complete picture of the system's behavior and performance. They are particularly useful in distributed systems, where requests may be processed by multiple components, as they allow developers to quickly identify and diagnose issues that may arise due to the complex interactions between different components.

# Honeycomb.io
Honeycomb.io is a cloud-based observability platform that provides developers and operators with real-time insights into the behavior and performance of their distributed systems. The platform uses a unique event-based data model that allows users to ask complex questions of their data and quickly identify issues or opportunities for optimization. Honeycomb.io supports a wide range of data sources, including logs, metrics, and traces, and provides powerful visualization and analysis tools for exploring and understanding this data. The platform also includes features for alerting, collaboration, and integration with other tools and services in the DevOps toolchain. Overall, Honeycomb.io is a powerful tool for building and maintaining reliable, performant, and scalable systems in complex and dynamic environments

# Honeycomb.io setting environment variables for Gitpod for start up
this need to run in the cli on opening vs code from gitpod
```
export HONEYCOMB_API_KEY=<"API KEY">
gp env HONEYCOMB_API_KEY=<"API KEY">
```
to check if the environment variables have been set enter the follwing command into your cli
```
env | grep HONEY
```
# Configuring OTEL In Docker Compose
OpenTelemetry (OTel) is an open source observability framework that provides IT teams with standardized protocols and tools for collecting and routing telemetry data.
that will send honeycomb.io
The OTEL_SERVICE_NAME specifies that the service is a backend implemented in Flask, OTEL_EXPORTER_OTLP_ENDPOINT specifies the endpoint of the Honeycomb.io OTLP exporter, and OTEL_EXPORTER_OTLP_HEADERS specifies the API key to be used when sending telemetry data to Honeycomb.io.

Add the following to the docker compose file
```
OTEL_SERVICE_NAME: "backend-flask"
OTEL_EXPORTER_OTLP_ENDPOINT: "https://api.honeycomb.io"
OTEL_EXPORTER_OTLP_HEADERS: "x-honeycomb-team=${HONEYCOMB_API_KEY}"
```

# Python packages that enable OpenTelemetry tracing and monitoring functionality in a Flask-based backend application added in requirement.txt file
```
opentelemetry-api 
opentelemetry-sdk 
opentelemetry-exporter-otlp-proto-http 
opentelemetry-instrumentation-flask 
opentelemetry-instrumentation-requests
```
explaination:
opentelemetry-api provides the OpenTelemetry API which allows for instrumentation of various parts of the application and creation of traces and spans.
opentelemetry-sdk provides the OpenTelemetry SDK which provides functionality to export telemetry data to various backends like Honeycomb.io or Jaeger.
opentelemetry-exporter-otlp-proto-http is a package that provides the exporter for OTLP-HTTP protocol to send telemetry data to backend service.
opentelemetry-instrumentation-flask provides instrumentation for Flask web framework to automatically generate traces and spans for requests.
opentelemetry-instrumentation-requests provides instrumentation for the Python requests library, allowing for automatic tracing of HTTP requests made by the application.

By adding these packages to the requirements.txt file in the Python backend folder, you ensure that these packages are installed when deploying the application, and the backend application will have the necessary instrumentation to generate and export telemetry data to a tracing and monitoring backend service like Honeycomb.io

# Installing the Dependencies from the requirements.txt file
cd into backend-flask and run the command
```
pip install -r requirements.txt
```
# Initializes OpenTelemetry tracing and monitoring functionality for the flask-based backend application
Importing required modules from the opentelemetry package for tracing and instrumentation.
Initializing a TracerProvider and a BatchSpanProcessor for the OTLP exporter to export the telemetry data to Honeycomb.
Adding the BatchSpanProcessor to the TracerProvider.
Initializing FlaskInstrumentor and RequestsInstrumentor to automatically instrument the Flask application and the requests library respectively.
Creating a Flask app object and instrumenting it using FlaskInstrumentor.
Adding this code to the app.py file in the backend Flask app enables tracing and monitoring of the application and exporting the telemetry data to the specified OTLP exporter in this case honeycomb.io. This enables observability of the application's behavior and performance, which can help identify issues and optimize the application for better performance and reliability. Additionally, automatic instrumentation with Flask and requests library ensures that all requests and dependencies are automatically instrumented without any manual effort, which helps reduce the time and effort required for instrumentation

add to app.py
```
#---after the import statements for services---
# Honeycomb ---------
from opentelemetry import trace
from opentelemetry.instrumentation.flask import FlaskInstrumentor
from opentelemetry.instrumentation.requests import RequestsInstrumentor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.sdk.trace.export import ConsoleSpanExporter, SimpleSpanProcessor

# Initialize tracing and an exporter that can send data to Honeycomb
provider = TracerProvider()
processor = BatchSpanProcessor(OTLPSpanExporter())
provider.add_span_processor(processor)

# Show this in the logs within the backend-flask app (STDOUT)
simple_processor = SimpleSpanProcessor(ConsoleSpanExporter())

trace.set_tracer_provider(provider)
tracer = trace.get_tracer(__name__)

app = Flask(__name__)

# HoneyComb ---------
# Initialize automatic instrumentation with Flask
FlaskInstrumentor().instrument_app(app)
RequestsInstrumentor().instrument()

#---before the frontend = os.getenv('FRONTEND_URL') ---
```
# Gitpod file update to open ports
```
ports:
  - name: frontend
    port: 3000
    onOpen: open-browser
    visibility: public
  - name: backend
    port: 4567
    visibility: public
  - name: xray-daemon
    port: 2000
    visibility: public
```

# Backend Flask --> home_activity.py
In the backend home_activity.py file i have added from opentelemetry import trace statement - imports the trace module from the opentelemetry package. This module provides an API for creating, managing, and exporting traces and spans for distributed tracing, The trace.get_tracer("home.activities") statement creates a new Tracer object with the name "home.activities". A Tracer is a component in the OpenTelemetry library that is responsible for generating and managing spans, which are the basic units of work in a trace. The get_tracer function is used to retrieve a Tracer instance with the specified name. By providing a name to the Tracer instance, you can organize and group spans by their purpose or function, making it easier to identify and analyze different parts of a trace. Once a Tracer instance is created, you can use it to start and stop spans, add attributes and events to spans, and export the trace data to a tracing backend.

1. with tracer.start_as_current_span("home-activites-mock-data"): statement starts a new span with the name "home-activites-mock-data" and sets it as the active span.
2. tracer object used here is an instance of the Tracer class from the OpenTelemetry library.
3. tart_as_current_span() method creates a new Span instance as the active span for the duration of the with block.
4. trace.get_current_span() method retrieves the active span created in the previous line and assigns it to the span variable.
5. code sets another attribute on the span with the key "app.result_length", which is the length of the results object
6.  code demonstrates how OpenTelemetry can be used to trace and monitor a specific operation within an application by creating and updating spans with attributes and events
```
from opentelemetry import trace

tracer = trace.get_tracer("home.activities")

class HomeActivities:
  def run():
    with tracer.start_as_current_span("home-activites-mock-data"):
      span = trace.get_current_span()
      now = datetime.now(timezone.utc).astimezone()
      span.set_attribute("app.now", now.isoformat())
      results = [{
      --------------
      }]
       span.set_attribute("app.result_length", len(results))
      return results
```

# Observability and centralized tracing for security and speed in AWS cloud
Observability and centralized tracing are crucial components of modern cloud architectures, particularly in AWS, as they can help enhance security and speed.

Observability involves collecting and analyzing data from various components of an application, infrastructure, and network. This data can be used to identify and troubleshoot issues, monitor performance, and gain insights into user behavior.

Centralized tracing involves collecting and analyzing data related to individual transactions across multiple services and systems. This can help identify and troubleshoot issues, optimize performance, and gain insights into user behavior.

Together, observability and centralized tracing provide a holistic view of the entire system, enabling quick identification and remediation of issues.

In terms of security, observability and centralized tracing can help detect and prevent security breaches. By monitoring all aspects of an application and infrastructure, observability can help identify abnormal behavior and potential threats. Centralized tracing can help track transactions across multiple systems and identify potential security issues, such as unauthorized access or data leakage.

In terms of speed, observability and centralized tracing can help optimize performance and reduce downtime. By identifying and troubleshooting issues quickly, engineers can make adjustments and improvements to the system, leading to faster response times and better overall performance. Centralized tracing can help identify bottlenecks and areas of inefficiency, enabling engineers to optimize and improve the system.

In AWS, observability and centralized tracing can be achieved through various tools and services, such as Amazon CloudWatch, AWS X-Ray, and AWS App Mesh. These tools provide real-time monitoring and analysis of various components of an application and infrastructure, enabling engineers to quickly identify and remediate issues, optimize performance, and gain insights into user behavior.

# Three Pillars of Observability

1. Logs: Logs are records of events or actions that occur within a system. They can include application events, system events, and user actions. Collecting and analyzing logs is important for identifying issues, troubleshooting problems, and gaining insights into user behavior.

2. Metrics: Metrics are quantitative measures of system performance, such as CPU usage, memory usage, and network traffic. Collecting and analyzing metrics is important for monitoring system performance, identifying bottlenecks, and optimizing performance.

3. Traces: Traces are records of the path a transaction takes through a system, including all the services and components involved. Collecting and analyzing traces is important for understanding how a system is performing as a whole, identifying issues, and optimizing performance.

focusing on these three pillars of observability, engineers can gain a full architectural view of their systems, and quickly identify and resolve issues. This helps ensure that systems are secure, reliable, and performant. In AWS, observability can be achieved through various tools and services, such as Amazon CloudWatch, AWS X-Ray, and AWS App Mesh. These tools provide real-time monitoring and analysis of logs, metrics, and traces.

# Observability Instrumentation 
observability instrumentation involves configuring various tools and services to collect and analyze data related to system performance, user behavior, and application behavior. This can include configuring logs, metrics, and traces to be collected and analyzed in real-time. observability instrumentation is crucial for maintaining the security and speed of cloud architectures in AWS. By collecting and analyzing data related to system performance, user behavior, and application behavior, Devops engineers can identify and resolve issues, optimize performance, and gain insights into user behavior. In AWS, this can be achieved through various tools and services, such as Amazon CloudWatch, AWS X-Ray, and AWS App Mesh.

# Building Security Metric logs For Tracing
Building security metric logs for tracing involves collecting and analyzing data related to security events and incidents in order to quickly identify and respond to security threats. Here are some key points to consider

# Security For Central Observability Platforms
security for central observability is crucial for maintaining the security and speed of cloud architectures. By implementing access controls, encryption, monitoring and alerts, auditing and compliance mechanisms, and incident response plans, you can ensure that your central observability platform is secure and can quickly respond to security threats.

# Event-Driven Architecture AWS Services
Event-driven architecture (EDA) is an approach to software design where software components are triggered by events that occur in real-time. In AWS, EDA can be implemented using various services and tools to build highly scalable and responsive systems. Here are some key AWS services that can be used for EDA, Amazon S3 Event Notifications,AWS Lambda,Amazon EventBridge,Amazon Simple Notification Service (SNS).

# Event-Driven Security
Event-driven security with AWS services provides a flexible and scalable approach to building responsive and effective security systems. By leveraging services such as CloudTrail, GuardDuty, Macie, Lambda, and SNS, organizations can detect and respond to security threats quickly and effectively. This approach can improve security posture, reduce the impact of security incidents, and enhance overall security resilience.

# AWS X-RAY --> service provided by Amazon Web Services (AWS)
this service from aws enables developers to analyze and debug distributed applications, such as those built using microservices architecture. It provides end-to-end tracing of requests as they flow through the various components of an application, allowing developers to identify performance bottlenecks and errors.

To use X-Ray, developers need to instrument their application code by adding an X-Ray SDK to their codebase. The SDK captures metadata about incoming requests, such as the service that is handling the request, the endpoint that was called, and any downstream services that were called. This data is then sent to the X-Ray service, where it is processed and displayed in a visualization tool.

The visualization tool shows a map of all the services that were involved in handling a request, along with timing information for each service. This allows developers to see where time is being spent in their application and identify areas where performance can be improved. Additionally, X-Ray can be used to identify errors and exceptions that occur during request processing, helping developers to debug their code more easily.

Overall, AWS X-Ray is a powerful tool for analyzing and debugging distributed applications, and it can be particularly useful for applications that are built using microservices architecture.

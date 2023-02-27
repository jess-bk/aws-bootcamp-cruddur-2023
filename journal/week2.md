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

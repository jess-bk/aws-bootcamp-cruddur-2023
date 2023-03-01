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

# Installing AWS X-RAY SDK --> backend-flask --> requirements.txt
cd into backend-flask and add this to the file(installing dependencies)
```
aws-xray-sdk
```
then run
```
pip install -r requirements.txt
```

# Adding the AWS X-RAY to entry point for running the application --> backend-flask --> app.py
importing the modules from aws-sdk for x-ray
```
# X-RAY ----------
from aws_xray_sdk.core import xray_recorder
from aws_xray_sdk.ext.flask.middleware import XRayMiddleware
```

# AWS X-Ray SDK to enable tracing of requests in a backend-flask application --> backend-flask --> app.py
The first line, xray_url = os.getenv("AWS_XRAY_URL"), retrieves the X-Ray daemon's URL from an environment variable called AWS_XRAY_URL.
The second line, xray_recorder.configure(service='backend-flask', dynamic_naming=xray_url), configures the X-Ray SDK with the retrieved X-Ray daemon URL and sets the name of the service to "backend-flask".
```
xray_url = os.getenv("AWS_XRAY_URL")
xray_recorder.configure(service='backend-flask', dynamic_naming=xray_url)
```

# Adding X-Ray middleware --> backend-flask --> app.py
XRayMiddleware class is responsible for intercepting incoming requests and outgoing responses to trace the flow of data through the application. The XRayMiddleware accepts two arguments, the app object which is the Flask application instance  and the xray_recorder object, which is an instance of the AWSXRayRecorder class from the aws_xray_sdk module.
```
# X-RAY ----------
XRayMiddleware(app, xray_recorder)
```

# Setting up AWS X-Ray resources --> backend-flask --> aws/json/xray.json
The contents of the xray.json file define a sampling rule for AWS X-Ray. Sampling rules determine the percentage of requests that are traced in an application. The rule defined in this file specifies that 10% of requests should be traced for a service named "Cruddur". The other fields in the rule define the criteria for which requests should be sampled, including the Host, HTTPMethod, and URLPath. The ReservoirSize field specifies the number of requests that should be traced before the sampling rate is applied.

Once this JSON file has been added to the X-Ray resources, it can be used to configure the X-Ray sampling rules for the application. This allows developers to control the amount of tracing data that is collected based on specific criteria, such as the service name or request method. By adjusting the sampling rate and criteria, developers can optimize the amount of tracing data collected to balance the need for detailed analysis with the performance impact of tracing.

```
{
  "SamplingRule": {
      "RuleName": "Cruddur",
      "ResourceARN": "*",
      "Priority": 9000,
      "FixedRate": 0.1,
      "ReservoirSize": 5,
      "ServiceName": "backend-flask",
      "ServiceType": "*",
      "Host": "*",
      "HTTPMethod": "*",
      "URLPath": "*",
      "Version": 1
  }
}
```

# Configuring AWS X-Ray to create a group for the "Cruddur" service and filtering traces by the "backend-flask" service --> backend-flask --> cli
1. The first line defines a Flask address that includes the Gitpod workspace ID and cluster host. This address is used to set up the Flask application and connect it to AWS X-Ray.
2. The second line uses the AWS CLI aws xray create-group command to create an X-Ray group with the name "Cruddur". The --filter-expression parameter specifies a filter expression that is used to include only traces for the "backend-flask" service in the group. This means that any traces generated by the Flask application will be included in the "Cruddur" group.
```
 --- FLASK_ADDRESS="https://4567-${GITPOD_WORKSPACE_ID}.${GITPOD_WORKSPACE_CLUSTER_HOST}" --- not used
```
```
aws xray create-group \
   --group-name "Cruddur" \
   --filter-expression "service(\"backend-flask\")"
```

Updated Command to Configuring AWS X-Ray to create a group for the "Cruddur" service and filtering traces by the "backend-flask" service --> backend-flask --> cli
```
aws xray create-group --group-name "Cruddur" --filter-expression "service(\"backend-flask\")" --region us-east-1
```
```
aws logs create-log-group --log-group-name "Cruddur" --region us-east-1
```
```
aws xray create-sampling-rule --cli-input-json file://aws/json/xray.json --region us-east-1
```

# Commands for aws xray
```
aws xray get-groups
aws xray delete-group --group-name Cruddur
aws xray update-sampling-rule --cli-input-json file://aws/json/xray.json --region us-east-1
aws xray create-sampling-rule --cli-input-json file://aws/json/xray.json --region us-east-1
aws logs create-log-group
aws xray get-sampling-rules
aws xray delete-sampling-rule --rule-arn <rule-arn>
aws logs describe-log-groups
```

# Create a sampling rule for AWS X-Ray --> backend-flask --> cli
The --cli-input-json parameter specifies that the JSON file at aws/json/xray.json should be used as input for the create-sampling-rule command. The contents of the xray.json file define the sampling rule, which specifies the criteria for which requests should be traced and the percentage of requests that should be sampled
```
aws xray create-sampling-rule --cli-input-json file://aws/json/xray.json
```

# Creating Docker container for the AWS X-Ray daemon --> docker-compose.yml
By implementing a Docker container for the X-Ray daemon, you can easily deploy and manage the daemon as part of their application infrastructure. The containerization also helps to ensure consistency and reliability of the X-Ray daemon across different environments
```
xray-daemon:
  image: "amazon/aws-xray-daemon"
  environment:
    AWS_ACCESS_KEY_ID: "${AWS_ACCESS_KEY_ID}"
    AWS_SECRET_ACCESS_KEY: "${AWS_SECRET_ACCESS_KEY}"
    AWS_REGION: "us-east-1"
  command:
    - "xray -o -b xray-daemon:2000"
  ports:
    - 2000:2000/udp
```
The environment parameter sets environment variables for the container, including the AWS access key ID, AWS secret access key, and AWS region. These environment variables are used by the X-Ray daemon to connect to AWS and send trace data.

The command parameter specifies the command to run when the container starts. In this case, the command is xray -o -b xray-daemon:2000, which starts the X-Ray daemon and sets the daemon to output to the UDP port 2000.

Finally, the ports parameter maps the container's UDP port 2000 to the host's UDP port 2000. This allows the X-Ray daemon to receive trace data from the Flask application and send it to AWS X-Ray for analysis.

# Adding backend-flask environement variables AWS-X-RAY and AWS-DAEMON-ADDRESS --> Docker-Compose file
```
AWS_XRAY_URL: "*4567-${GITPOD_WORKSPACE_ID}.${GITPOD_WORKSPACE_CLUSTER_HOST}*"
AWS_XRAY_DAEMON_ADDRESS: "xray-daemon:2000"
# run docker-compose up
```
The AWS_XRAY_URL variable specifies the URL pattern that should be used for X-Ray tracing. The pattern includes the Gitpod workspace ID and cluster host, and is used to filter the trace data to be included in the "Cruddur" group that was previously created. By using a URL pattern for X-Ray tracing, user/developers can more easily track and analyze requests across different components of their system.

The AWS_XRAY_DAEMON_ADDRESS variable specifies the address of the X-Ray daemon container that is running as part of the application infrastructure. This allows the backend-flask application to send trace data to the X-Ray daemon, which then forwards the data to AWS X-Ray for analysis

# Adding import statement AWS X-Ray SDK --> backend-flask --> user_activities.py
```
from datetime import datetime, timedelta, timezone
from aws_xray_sdk.core import xray_recorder
class UserActivities:
  def run(user_handle):
    # xray ---
    segment = xray_recorder.begin_segment('user_activities')

    model = {
      'errors': None,
      'data': None
    }

    now = datetime.now(timezone.utc).astimezone()
    
    if user_handle == None or len(user_handle) < 1:
      model['errors'] = ['blank_user_handle']
    else:
      now = datetime.now()
      results = [{
        'uuid': '248959df-3079-4947-b847-9e0892d1bab4',
        'handle':  'Andrew Brown',
        'message': 'Cloud is fun!',
        'created_at': (now - timedelta(days=1)).isoformat(),
        'expires_at': (now + timedelta(days=31)).isoformat()
      }]
      model['data'] = results

    subsegment = xray_recorder.begin_subsegment('mock-data')
    # xray ---
    dict = {
      "now": now.isoformat(),
      "results-size": len(model['data'])
    }
    subsegment.put_metadata('key', dict, 'namespace')

    return model
```
This import statement enables the use of the AWS X-Ray SDK in the backend-flask application. The xray_recorder object provides a set of methods that can be used to capture and record tracing data, such as segments and subsegments, metadata, and sampling rules.

With the AWS X-Ray SDK, developers can gain visibility into the performance of their applications and identify issues such as latency, errors, and bottlenecks. This can help to improve application performance and optimize user experience

# Watchtower
Watchtower is a logging library for Python applications that allows you to easily send logs to AWS CloudWatch. The library provides a handler that you can use to log events in your Python code, and then send those logs to CloudWatch for storage, analysis, and visualization.

1. installing watchtower in project
backend-flask --> requirements.txt add towerwatch to file
```
watchtower
```

2. cd into the backend-flask app
run in cli
```
pip install -r requirements.txt
```

3. import the the installed packages
```
import watchtower
import logging
from time import strftime
```
these imports enable you to create log messages in your Python code using the logging module, and send those messages to CloudWatch using the watchtower module. The strftime function can be used to add timestamps to your log messages for easier analysis.

4. configuring towerwatch logger to use cloudwatch in app.py
```
# Configuring Logger to Use CloudWatch
# LOGGER = logging.getLogger(__name__)
# LOGGER.setLevel(logging.DEBUG)
# console_handler = logging.StreamHandler()
# cw_handler = watchtower.CloudWatchLogHandler(log_group='cruddur')
# LOGGER.addHandler(console_handler)
# LOGGER.addHandler(cw_handler)
# LOGGER.info("test log")
```
This will configure the logger to use CloudWatch by creating a watchtower.CloudWatchLogHandler and adding it to the logger's handlers. This means that any log messages generated by your application will be sent to CloudWatch for storage and analysis. The LOGGER.info("some message") line is an example of a log message that will be sent to CloudWatch when it is executed

5. Logging error on request a function to be executed after each request to the backend-flask application.
add this to app.py
```
@app.after_request
def after_request(response):
    timestamp = strftime('[%Y-%b-%d %H:%M]')
    LOGGER.error('%s %s %s %s %s %s', timestamp, request.remote_addr, request.method, request.scheme, request.full_path, response.status)
    return response
```
@app.after_request: This is a decorator that is used to register the function that follows it to be executed after each request to the Flask application. The app variable refers to an instance of the Flask application.

def after_request(response): This defines a function called after_request that takes a single argument, response, which represents the response object that will be sent back to the client.

timestamp = strftime('[%Y-%b-%d %H:%M]'): This line creates a timestamp string in a specific format using the strftime function from the time module. The timestamp will be included in the log message that is generated.

LOGGER.error('%s %s %s %s %s %s', timestamp, request.remote_addr, request.method, request.scheme, request.full_path, response.status): This line generates a log message using the LOGGER object. The log message includes the timestamp string, the IP address of the client (request.remote_addr), the HTTP method used (request.method), the URL scheme (request.scheme), the full request path (request.full_path), and the response status code (response.status). The log level used is ERROR, which means that this message will be logged if an error occurs during the request.

return response: This line returns the response object, which will be sent back to the client.

6. Add towerwatch logger to the route for logging messages in app.py
```
@app.route("/api/activities/home", methods=['GET'])
def data_home():
  data = HomeActivities.run(logger=LOGGER)
  return data, 200
```
Pass the LOGGER object to the HomeActivities.run() method as an argument. This allows the HomeActivities class to use the logger to write log messages during its execution

7. Adding custom logging to home_activities.py in the backend-flask
```
def run(logger):
  logger.info("HomeActivities")
```
Configured the logger to send log messages to AWS CloudWatch using the watchtower module, this message will be sent to CloudWatch.This can be useful for debugging, troubleshooting, and performance monitoring. By logging messages at different levels (such as INFO, DEBUG, WARNING, and ERROR)

8.  Set the Env variables for your backend-flask app in docker-compose.yml for watchtower
```
AWS_DEFAULT_REGION: "${AWS_DEFAULT_REGION}"
AWS_ACCESS_KEY_ID: "${AWS_ACCESS_KEY_ID}"
AWS_SECRET_ACCESS_KEY: "${AWS_SECRET_ACCESS_KEY}"
```

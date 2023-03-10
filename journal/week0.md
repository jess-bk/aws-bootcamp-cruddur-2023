# Week 0 — Billing and Architecture

# Folowing is the link to my System Architecture Conceptual Diagram, i have also updated the journal with a png file that has the diagram

# Appliction Software used
1. Amazon Cognito: It's a service that provides user authentication and authorization for your application. It allows users to sign up, sign in, and manage their account credentials securely.

2. Nginx: It's a high-performance web server that can also act as a reverse proxy, load balancer, and HTTP cache. In your system, it acts as a load balancer that distributes incoming requests to the Flask API and React.js front-end.

3. React.js front-end: It's a JavaScript library for building user interfaces. It's used for building the client-side of your application, which includes the user interface, logic, and data handling.

4. Flask API back-end: Flask is a lightweight Python web framework for building web applications. In your system, it provides the application programming interface (API) for handling the business logic and data handling on the server-side.

5. Amazon API Gateway: It's a fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs at any scale. It acts as a gateway between the front-end and the Flask API.

6. Amazon S3 Bucket and DynamoDB: Amazon S3 is a scalable object storage service, and DynamoDB is a fully managed NoSQL database service. They both act as the data storage for your application.

7. Redis and Apache Zookeeper: Redis is an in-memory data structure store that can be used as a database, cache, and message broker. In your system, it's used as a cache for the user timeline. Apache Zookeeper is a centralized service for maintaining configuration information, naming, providing distributed synchronization, and group services. It's used in your system to manage the Redis cluster.

8. Amazon Elastic Search: It's a managed search and analytics engine that provides real-time insights into your data. In your system, it's used for full-text search functionality.

9. AWS Glue: It's a fully managed extract, transform, and load (ETL) service that makes it easy to move data between data stores. In your system, it's used for ETL jobs to transform data from DynamoDB and write it to Amazon Elastic Search.

10. DynamoDB: It's a fully managed NoSQL database service that provides fast and predictable performance with seamless scalability.

11. Amazon Kinesis: It's a platform for streaming data on AWS. In your system, it's used for real-time data ingestion and processing.

# Link to Diagram
1. https://lucid.app/lucidchart/80205cea-a148-417a-a783-564ed91d936c/edit?viewport_loc=84%2C-220%2C1993%2C821%2C0_0&invitationId=inv_2df8bca3-47af-4579-8130-ede019d13904 --> this link is updated to the new one below but the first architectural diageam is in the journal.
![image architectural diagram](assets/week1-aws-images/Cruddur%20-%20Conceptual%20Diagram%20(1).png)


# Updated Diagram 
https://lucid.app/lucidchart/80205cea-a148-417a-a783-564ed91d936c/edit?invitationId=inv_2df8bca3-47af-4579-8130-ede019d13904
![image architectural diagram](assets/week1-aws-images/Cruddur%20-%20Conceptual%20Diagram%20(2)%20updated.png)

# Created third Architectural Diagram like Andrews
https://lucid.app/lucidchart/deb47ba2-2d64-4389-b355-7a1411ec62a3/edit?viewport_loc=-293%2C49%2C1993%2C821%2C0_0&invitationId=inv_74d19ea9-70a9-416d-8a59-713547c556b8
![image architectural diagram](assets/week1-aws-images/CruddurArchitectDesignFromBootcamp.png)

# Billing AWS Console
1. created a budget and billing alarm with AWS Console.
2. created a Group and allocated a user to the group with Admin Access.
3. generated AWS Credentials for user

# AWS CLI
1. configured and installed AWS in vs code
2. created a budget and billing alarm with AWS CLI.

# GITPOD
1. connected to gitub and vs code

# GITHUB
1. connnected to gitpod, created repo

# AWS CONSOLE
1. AWS console created budget, limits on spend and notification(ASHISH and Andrew youtube videos)
2. Created IAM user and deleted
3. created IAM user again
4. AWS CloudShell alternative from using vs code cli

# AWS CLI PROMPTS
1. aws --cli-auto-prompts --> auto complete
2. aws sts get-caller-identity --> current user identity (ARN: amazon resource name, unique way of showing aws resource identity, username, type of user)
3. aws account get-contact-information --> users Contact Information
4. curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" --> enter in cli to install aws zip file in workspace.
5. unzip awscliv2.zip --> cli to unzip file
6. sudo ./aws/install --> install the unzip file
7. ls -la --> list files in row
8. env | grep AWS_ACCESS_KEY_ID ---> access key (same for AWS_SECRET_KEY, AWS_DEFAULT_REGION)
9. env | grep AWS_ --> GET ALL THE AWS CREDENTIALS (AS ABOVE)
10. AWS_ACCESS_KEY_ID="", AWS_SECRET_ACCESS_KEY,"" AWS_DEFAULT_REGION="", --> paste in the values and enter into cli, this will set the credentials
11. env | grep AWS_ --> confirm credentials are set.
12. gitpod yaml.file--> saving the environment and install on launching vs code via gitpod: 
  tasks:
  - name: aws-cli
    env:
      AWS_CLI_AUTO_PROMPT: on-partial
    init: |
      cd /workspace
      curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
      unzip awscliv2.zip
      sudo ./aws/install
      cd $THEIA_WORKSPACE_ROOT 
13. gp | env AWS_ACCESS_KEY_ID="" --> this will save the environment variables into gitpod so on everyload credentails are loaded for current user
14. copy and paste the json files created inside the aws folder to create the alarms, budget and notifications.
15. SNS notifications need confirming to activate depending how you set them. (email, text)
16. EventBridge hookup to the dashboard for SNS notifications 



# VS CODE
created 3 json files
1. alarm-config
2. budget-notifications-subscribers
3. budget-json
these josn file were used to create the an alarm for going over the budget set in AWS by the CLI

# Dev Ops - Solution Architect
1. Business Application Layer, USER-INTERFACE, BUSINESS-LOGIC, DATA-ACCESS, these three need to be micro services and the logic needs to be separate, more resilent if one brakes down, it does not effect the other one, The Traditional Iron Triangle, Scope(feature and functionality), Time(schedule), Cost(budget, resources) and these three will determine the quality of service.

2. Good Architecture, Meets requirements and must achieve, these can be technical or business oriented, 
REQUIRMENTS MUST BE MEASURABLE:
.verifiable
.monitorable
.traceable
.feasible 

WAYS OF BEING MEASURABLE: 
.meets the ISO standard
.99.9% uptime, scaling, no crashing.
.User can do specific tasks, CRUD Operations, manage account.

ADDRESS'S: TYPE RISK, ASSUMPTION AND CONSTRANTS
.Risk can prevent the project from being successful
1. Single point of failure (SPoFs)
2. User Commitment
3. Late Delivery
4. This is all linked to the Tradationl Iron Triangle

ASSUMPTIONS ARE THINGS THAT ARE HELD TO BE TRUE AS A DESIGN PRESPECTIVE
1. Sufficient network bandwidth
2. StakeHolders will be available to make decisions
3. Budget is approved

CONSTRAINTS ARE POLICY OR TECHNICAL LIMITATIONS FOR THE PROJECT
1. Time
2. Budget
3. Vendor Selection

# From RAC(RISK, ASSUMPTIONS, CONTRAINTS) THEN YOU CREATE THE DESIGNS:
1. Conceptual Design --> High Level Design
2. Logical Design --> Zoom in Logical Design
3. Physical Design

Conceptual Design: 
Easy to understand for the client
1. Created by business stakeholders and architects
2. Orginaize and define concepts and rules
2. Lucid Charts, draw io, aka --> Napkin Design 

Logical Design
1. Defines how the system should be implemented
2. Environment without actual names or sizes
3. Example: undeployed CFT

Physical Design
1. Representation of the actual thing that is being built
2. IP Addresses, EC2 instances

# TOGAF (The Open Group Architecture Framework) is a widely used framework for developing enterprise architecture. 

The Open Group Architecture Framework (TOGAF) is a popular and widely adopted enterprise architecture framework. It provides a comprehensive approach for designing, planning, implementing, and managing enterprise architecture.

TOGAF is structured around four key components: the Architecture Development Method (ADM), the Enterprise Continuum, the Architecture Content Framework, and the Architecture Capability Framework.

The ADM is a step-by-step process for developing and managing enterprise architecture. It includes nine phases that cover the entire architecture development lifecycle, from defining the scope of the architecture to managing the architecture throughout its lifecycle.

The Enterprise Continuum provides a framework for organizing and classifying architecture artifacts and is divided into four levels: the Architecture Landscape, the Solutions Landscape, the Industry Landscape, and the Enterprise Landscape.

The Architecture Content Framework provides a standard for creating and organizing architecture artifacts, which are divided into four categories: the Business Architecture, the Data Architecture, the Application Architecture, and the Technology Architecture.

The Architecture Capability Framework provides guidance on establishing and maintaining an enterprise architecture function, including defining roles and responsibilities, establishing governance, and ensuring the architecture is aligned with the overall business strategy.

Overall, TOGAF provides a flexible and scalable framework for organizations to develop and manage their enterprise architecture in a structured and organized manner, improving alignment between business strategy and IT

# TOGAF KEY FACTORS
1. Architecture vision: This is a high-level view of what the organization wants to achieve through its architecture. It should be aligned with the organization's goals and objectives.

2. Architecture content framework: This is a set of tools and templates that define the content of the architecture. It includes the models, diagrams, and other artifacts that are used to describe the architecture.

3. Architecture development method: This is a step-by-step process for developing the architecture. It includes the phases of architecture development, the deliverables that are produced at each phase, and the activities that are performed in each phase.

4. Architecture governance: This is the process of ensuring that the architecture is aligned with the organization's goals and objectives, and that it is being developed and maintained in a consistent and effective manner.

5. Architecture capability framework: This is a set of tools and techniques that enable the organization to develop and manage its architecture capability. It includes the roles and responsibilities of the architecture team, the skills and competencies required, and the training and development programs needed.

6. Enterprise architecture maturity assessment: This is a process for evaluating the maturity of the organization's architecture capability. It involves assessing the organization's performance in key areas such as governance, process, methodology, and tools.

7. Architecture metrics and measurement: This is the process of defining and using metrics to measure the effectiveness of the architecture in achieving the organization's goals and objectives.

8. Architecture principles: These are the fundamental rules and guidelines that govern the development and use of the architecture. They should be aligned with the organization's goals and objectives, and should be communicated to all stakeholders.

9. Architecture views and viewpoints: These are the different perspectives on the architecture that are required by different stakeholders. They include the business, data, application, and technology viewpoints, among others.

10. Architecture artifacts: These are the documents and other artifacts that describe the architecture. They include the architecture vision, the architecture content framework, the architecture development method, and the architecture governance framework.

# AWS PROVIDES A TOOL IN CONSOLE THAT ALLOWS TO ACHIEVE THE TOGAF STRATEGIES, THIS ALLOWS TO ASK LIST OF QUESTION TO THE CLIENT OR WITH PEOPLE ON THE TEAM SO THAT YOU CAN UNDERSTAND FROM THE 6 PILLARS PERSPECTIVE.

Uses the AWS Well-Architected Framework to review your workloads against current AWS best practises

1. Workload = collection of resources and code that makes up a cloud application
2. Asks the right questions(TOGAF APPROACH) to highlight blindspots
2. Naturally falls into the R/R/A/C buckets
3. Powerful tool in the architects toolbelt
4. Contribution from eveyone

THE 6 PILLARS:
1. Operational Excellence
2. Security
3. Reliability 
4. Performance Efficiency
5. Cost Optimization
6. Sustainability

# C4 MODEL FOR VISUALISING SOFTWARE ARCHITECTURE

The C4 model is a lightweight, visual approach to software architecture. It provides a way to create and communicate software architecture diagrams that are easy to understand and focus on the important aspects of the system. It was created by Simon Brown, and it provides a way to think about software architecture in four levels of detail: Context, Containers, Components, and Code.

1. The first level, Context, is the highest level and focuses on the external factors that affect the system. This includes things like the users, external systems, and regulatory requirements. The goal is to create a simple, high-level diagram that communicates the key concepts to non-technical stakeholders.

2. The second level, Containers, focuses on the high-level software components that make up the system. This could include web servers, application servers, databases, and so on. The goal is to show how these components interact with each other to form the system, and to create a shared understanding of the system's high-level architecture.

3. The third level, Components, provides a more detailed view of the software components that make up the containers. This could include modules, libraries, or other code-level artifacts. The goal is to show how these components fit together within the containers, and to identify any potential issues or dependencies.

3. The fourth level, Code, is the lowest level and focuses on the actual code that implements the system. This could include classes, methods, or other code-level constructs. The goal is to provide a detailed view of how the code works, and to identify any potential issues or areas for improvement.

The C4 model provides a way to communicate software architecture in a clear, concise way. By focusing on the key concepts at each level, it helps to create a shared understanding of the system, and makes it easier to identify potential issues and areas for improvement. It is particularly useful for agile development teams, who need to be able to quickly communicate and understand the software architecture in order to make rapid, informed decisions.

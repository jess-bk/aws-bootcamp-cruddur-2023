# Week 6 — Deploying Containers

# RDS Connecetion

Test RDS Connection:
Created a new file inside the aws-bootcamp-cruddur-2023/backend-flask/bin/db directory named test. The purpose of this file is to test the connection to the RDS (Relational Database Service) instance on AWS. The psycopg library is used to establish a connection to the database using the psycopg.connect() method. The os.getenv("CONNECTION_URL") statement retrieves the value of the CONNECTION_URL environment variable, which is set to the connection string of the RDS instance. The code then tries to establish a connection to the database and prints a message indicating whether the connection was successful or not.

Health Check:
created a new file inside the aws-bootcamp-cruddur-2023/backend-flask/bin/flask directory named health-check. The purpose of this file is to perform a health check on the Flask server that's running on localhost:4567. The urllib.request.urlopen() method is used to send a GET request to the /api/health-check endpoint of the Flask server. If the response code is 200, it means that the Flask server is running and the script exits with a success status code. Otherwise, the script exits with a failure status code.

Flask Route:
updated the backend-flask/app.py file with a new Flask route for the /api/health-check endpoint. The @app.route() decorator is used to define the route, and the health_check() function returns a JSON response indicating that the health check was successful.

CloudWatch Log Group:
used the AWS CLI to create a new CloudWatch log group named cruddur. The aws logs create-log-group command is used to create the log group, and the aws logs put-retention-policy command is used to set the retention policy for the log group to 1 day.

ECS Cluster:
used the AWS CLI to create a new ECS (Elastic Container Service) cluster named cruddur. The aws ecs create-cluster command is used to create the cluster, and the --service-connect-defaults option is used to set the default namespace for the cluster.

ECR Repository:
used the AWS CLI to create a new ECR (Elastic Container Registry) repository named cruddur-python with a mutable image tag. The aws ecr create-repository command is used to create the repository.

ECR Login:
used the AWS CLI to log in to the ECR registry. The aws ecr get-login-password command is used to retrieve an authentication token, which is then used to log in to the registry using the docker login command.

ECR URL:
set the ECR_PYTHON_URL environment variable to the URL of the ECR repository that you created earlier. This URL is used to tag and push the Docker image to the ECR registry.

Docker Pull:
used the docker pull command to pull the python:3.10-slim-buster image from Docker Hub. This is the base image that you will be using to build your Docker container.

Docker Tag:
used the docker tag command to tag the python:3.10-slim-buster image with the URL of the ECR repository that you created earlier, and with a tag of 3.10-slim-buster. This is done so that you can push

The policies i have created will allow your application to perform the necessary actions on AWS services like DynamoDB, ECS, ECR, and Cognito.

I updated the Dockerfile to use a custom image from your AWS account's Elastic Container Registry (ECR). This is a good practice since it ensures that your application is using a consistent environment and dependencies.

I created two JSON policies that you'll attach to the appropriate IAM roles later. The first policy, cruddur-messages-stream-policy.json, allows your application to put, delete, and query items in the cruddur-messages table in DynamoDB, as well as access the message-group-sk-index index. The second policy, service-execution-policy.json, grants the necessary permissions to create and manage ECS services, ECR repositories, and Cognito user pools.

#  IAM execution role, attach a policy to it, and create a policy document. Here is a breakdown of each command:

aws iam create-role: This command creates an IAM role with the specified name (CruddurServiceExecutionRole) and an assume role policy document that allows ECS tasks to assume the role. The assume role policy document is written as a JSON string in the command.

aws iam put-role-policy: This command attaches a policy (CruddurServiceExecutionPolicy) to the IAM role created in the previous step. The policy document is written as a JSON string in the command.

aws iam attach-role-policy: This command attaches a policy to the IAM role by providing the policy ARN instead of the policy document.

Create a policy: This code block is a policy document that includes permissions for various AWS services such as ECS, ECR, Cognito, and DynamoDB.

# Creating a Task Role in AWS IAM

which defines the permissions for the tasks running on an ECS cluster. The aws iam create-role command creates the role, while aws iam put-role-policy attaches a policy to the role. Finally, aws iam attach-role-policy attaches additional policies to the role.

In this case, the first command creates a role called CruddurTaskRole with a trust policy that allows ECS tasks to assume the role. The aws iam put-role-policy command attaches a policy called SSMAccessPolicy to the role, which grants permission to create and open SSM control and data channels. The next two aws iam attach-role-policy commands attach the CloudWatchFullAccess and AWSXRayDaemonWriteAccess policies to the CruddurTaskRole, which grant permission to write logs to CloudWatch and send tracing data to X-Ray, respectively.

# Created a JSON file called "backend-flask.json"
in the "task-definitions" folder under your AWS bootcamp project directory. The contents of this file define the task definition for your Fargate service.

The "family" field is the name of your task definition family. It should be unique within your AWS account. The "executionRoleArn" and "taskRoleArn" fields specify the roles that the service and tasks should use. The "networkMode" field specifies the networking mode for your task. "awsvpc" means that your tasks will have an Amazon VPC elastic network interface (ENI) attached.

The "cpu" and "memory" fields specify the amount of CPU and memory resources that each task should be allocated.

The "requiresCompatibilities" field specifies the Fargate launch type. In this case, it is set to "FARGATE".

The "containerDefinitions" field contains an array of container definitions. Each object in the array represents a container that will be run as part of your task.

In your case, you have two container definitions: one for the X-Ray daemon and one for your Flask backend application. The "name" field for each container definition is used to identify the container within the task.

The "image" field specifies the Docker image that should be used for the container. The "essential" field specifies whether the task should continue to run if this container fails or stops.

The "healthCheck" field specifies the command that will be used to check the health of the container, as well as the interval, timeout, retries, and start period for the health check.

The "portMappings" field specifies the ports that should be exposed for each container. The "logConfiguration" field specifies the logging driver and options for each container.

The "environment" field specifies any environment variables that should be passed to each container. The "secrets" field specifies any secrets that should be passed to each container.

JSON file called "xray.json" in the "json" folder under your AWS bootcamp project directory. This file defines a sampling rule for X-Ray.

# Sessions Manager
connect to a container running in an AWS ECS cluster using the AWS Systems Manager Session Manage
The "session-manager-plugin" is a command-line tool used to start a session with an instance or container in AWS using AWS Systems Manager.

The "aws ecs execute-command" command is used to execute a command on a running container in an ECS task. In this case, the command is "/bin/bash", which will start a Bash shell session within the container.

Before running the command to start the Session Manager, you should make sure that you are inside the "backend" directory of your application, where the "health-check" script is located.

Once you have started the Session Manager and are inside the container's shell, you can run the "./bin/flask/health-check" command to run the health check script.

# Session Manager on Gitpod and Github Codespaces
I installed the Session Manager plugin in Gitpod and Github Codespaces.
This will allow you to connect to the running container in the ECS cluster using the AWS CLI.

# service-backend-flask.json

The configuration file contains several parameters that define the desired state of a service called "backend-flask" that will be deployed using AWS Fargate, which is a serverless compute engine for containers.

The "cluster" parameter specifies the name of the ECS cluster where the service will be deployed, "launchType" specifies that Fargate should be used to run the containers, and "desiredCount" specifies the number of tasks that should be running in the service.

The "loadBalancers" parameter specifies the load balancer configuration for the service, including the target group ARN, container name, and container port.

The "networkConfiguration" parameter specifies the network configuration for the service, including the VPC subnet IDs and security group IDs that should be used.

The "propagateTags" parameter specifies that any tags applied to the service should be propagated to its tasks.

Finally, the "serviceConnectConfiguration" parameter specifies the service discovery configuration for the service, including the port name, discovery name, and client aliases.

# VPC Defaults
deploying the Flask backend service in ECS.

variable DEFAULT_VPC_ID with the value of the default VPC ID in the AWS account using the aws ec2 describe-vpcs command with a filter that specifies to return only the VPC that is marked as the default.

variable DEFAULT_SUBNET_IDS with the value of comma-separated subnet IDs in the default VPC. The command uses aws ec2 describe-subnets with a filter that specifies to return only the subnets that belong to the default VPC.

create an ECS service for the Flask backend using the aws ecs create-service command and passing in a JSON file with the configuration. The JSON file contains details such as the task definition to use, the number of desired tasks, the launch type, and the network configuration. The network configuration specifies the VPC, subnets, and security group to use for the service.

# Created a bash script to execute the AWS ECS execute-command to connect to the backend-flask container

The script takes a TASK ID argument and checks if it is supplied or not. If it is not supplied, it exits with an error message. Then it sets the TASK_ID and CONTAINER_NAME variables and uses the AWS CLI to execute the ECS execute-command with the required parameters.

# Configure security group inbound rules for crud-srv-sg:
added an inbound rule to the security group 'crud-srv-sg' to allow access to port 4567 from anywhere.

# Get the ip4 public address and open in the browser:
retrieved the IPv4 public address of your EC2 instance and opened it in the browser. Then you have added the endpoint ':4567/api/health-check' to check the health of the Flask backend.

# Configure RDS instance security group inbound rules:
added an inbound rule to the default security group of your RDS instance to allow access to port 5432 from the 'crud-srv-sg' security group. You have also added a description 'backend-flask' to the rule.

now run ./bin/db/test:
run the './bin/db/test' script, which tests the database connection. If it fails, you need to change the 'connection_url' variable in the script to the production database connection URL.

# Get the IPv4 public address and open in the browser:
You have retrieved the IPv4 public address of your EC2 instance and opened it in the browser. Then you have added the endpoint ':4567/api/activities/home' to access the activities homepage of the Flask application.


# setting up an Application Load Balancer (ALB) in AWS to distribute traffic across multiple instances of the Flask and React applications.

creating the ALB in AWS. The name is set to "cruddur-alb" and it is mapped to all the subnets. A new security group named "cruddur-alb-sg" is created with inbound rules to allow access to HTTP (port 80), HTTPS (port 443), custom TCP (port 4567), and custom TCP (port 3000).

updating the inbound rules of the "crud-srv-sg" security group to allow access to the ALB. A new inbound rule is created to allow custom TCP traffic on port 4567 and the source is set to the "cruddur-alb-sg" security group.

adding the "cruddur-alb-sg" security group to the ALB and removing the default security group.

creating a new target group named "cruddur-backend-flask-tg" and setting it up to use IP addresses with HTTP protocol and connect on port 4567. The VPC is set to default and a health check is added for "/api/health-check".

adding the new target group to the ALB listener and routing HTTP traffic on port 4567 to the "cruddur-backend-flask-tg" target group.

creating a new target group named "cruddur-frontend-react-js-tg" and setting it up to use IP addresses with HTTP protocol and connect on port 3000.

adding the new target group to the ALB listener and routing HTTP traffic on port 3000 to the "cruddur-frontend-react-js-tg" target group.

THIS completes the process of creating the load balancer in AWS.

# service-backend-flask.json is created inside the aws-bootcamp-cruddur-2023/aws/json directory. 
This JSON file defines the configuration for creating an ECS service for the backend Flask application.

The configuration includes details such as the cluster name, launch type, desired count of tasks, load balancer details, network configuration, service name, task definition, and service discovery configuration.

the aws ecs create-service command is run with the input JSON file specified using the --cli-input-json flag to create the ECS service for the backend Flask application based on the configuration defined in service-backend-flask.json.

the ECS cluster is checked in the ECS dashboard to ensure that the service for the backend Flask application has been successfully created and is running.

Finally, the DNS name of the load balancer is copied and pasted into a web browser along with the endpoint :4567/api/health-check to confirm that the backend Flask application is working as expected through the load balancer.

# AWS ECS task definition and service for a frontend-react-js application.

created the task definition in JSON format, which specifies how the Docker container(s) will run in the ECS cluster. Here's an explanation of the fields in this JSON:

family: The name of the task definition.
executionRoleArn: The ARN of the IAM role that allows ECS to execute the task.
taskRoleArn: The ARN of the IAM role that allows the container to access other AWS resources.
networkMode: The network mode to use for the task. In this case, it's awsvpc, which allows for better network performance and security.
cpu: The amount of CPU units to allocate to the container.
memory: The amount of memory to allocate to the container.
requiresCompatibilities: The compatibility requirements for the task. In this case, it requires Fargate.
containerDefinitions: An array of container definitions for the task. In this case, there are two containers defined - one for AWS X-Ray daemon and the other for the frontend-react-js application. The container definitions include details such as the container image, essentiality, port mappings, and log configurations.
Step 41 is creating the service in JSON format, which defines how many tasks should be running, how to route traffic to them, and how to discover them using AWS App Mesh or AWS Cloud Map. Here's an explanation of the fields in this JSON:

cluster: The name of the ECS cluster where the service will be deployed.
launchType: The launch type to use for the service. In this case, it's Fargate.
desiredCount: The number of tasks that should be running for the service.
enableECSManagedTags: Indicates whether to enable Amazon ECS managed tags for the service.
enableExecuteCommand: Indicates whether to enable AWS Systems Manager Session Manager for the service.
loadBalancers: An array of load balancers to use for routing traffic to the tasks. In this case, there's only one target group defined.
networkConfiguration: The network configuration to use for the service. In this case, it's using awsvpc configuration.
propagateTags: Specifies how to propagate tags from the task to the service.
serviceName: The name of the service.
taskDefinition: The name or ARN of the task definition to use for the service.
serviceConnectConfiguration: The configuration for service discovery using AWS App Mesh or AWS Cloud Map. In this case, it's enabled and configured to use the frontend-react-js container and port 3000.

The next step is to create a Dockerfile in the frontend-react-js directory. The Dockerfile is used to define the steps required to build a Docker image that can be used to deploy the ReactJS application.

The Dockerfile starts with a base image "node:16.18" which is used for building the application. It then sets several environment variables using the ARG and ENV commands. These environment variables are used to configure the ReactJS application at runtime.

The COPY command copies the entire current directory (.) to the /frontend-react-js directory within the Docker image. The WORKDIR command sets the working directory to /frontend-react-js, and the RUN command installs the npm packages required for the application. The second RUN command builds the ReactJS application.

The second part of the Dockerfile starts with a new base image "nginx:1.23.3-alpine" which is used to serve the ReactJS application. The COPY command copies the built application files from the first part of the Dockerfile to the appropriate location within the nginx server directory. The EXPOSE command indicates that the container listens on port 3000.

The next step is to add the build files to .gitignore so that they are not pushed to the repository. This is because the built files are generated by the development environment and should not be part of the source code.

The next step is to create an Nginx configuration file "nginx.conf" in the frontend-react-js directory. This file is used by the Nginx server to serve the ReactJS application. The file sets the worker processes and connections, HTTP MIME types, logging format and access, error pages, and server configurations.

# Bilding the Docker image for the React frontend, tagging and pushing it to the Amazon Elastic Container Registry (ECR).

building the Docker image using the Dockerfile and providing build arguments for the environment variables used by the React application. The --build-arg flag is used to provide values for the arguments. The command is run in the frontend directory.

creating a new ECR repository for the frontend React application.

setting the ECR URL as an environment variable to be used in subsequent commands.

logging into the ECR using the AWS CLI. This is done to authenticate the Docker client with the ECR.

tagging the Docker image with the ECR URL.

pushing the Docker image to the ECR.

# task definition and a service are created for the frontend React application.

The task definition defines how the containers should be launched and run, and the service is used to manage the tasks that are run on the ECS cluster.
the status of the deployed containers can be checked in the AWS console to ensure that they are healthy and running as expected.

# Updating alb outbound rules for load balancer
inbound rule for a security group with ID sg-<sg-rule>, which allows traffic on port 4567 using the TCP protocol. This rule is associated with the security group cruddur-alb-sg and has a description CRUDDUR_ALB_BACKEND. The rule references the security group with ID sgr-<sg-rule>.
  
inbound rule for the same security group cruddur-alb-sg, which allows traffic on port 3000 using the TCP protocol. The rule is associated with the same security group cruddur-alb-sg and has a description CRUDDUR_ALB_FRONTEN. The rule references the security group with ID sgr-<sg rule>.
  
# Configuring infrastructure to allow traffic to flow securely from a custom domain name to the frontend of your application
Copied the load balancer DNS hostname and added it to the endpoint :3000 in the browser. This allowed you to open up the frontend with data.

Created a custom domain with Route53. You added the domain name that you acquired earlier (jessbkcloudcampus.com) and created a public hosted zone.

Added all the name servers to your ionos domain name provider.

Created an AWS Certificate Manager (ACM) and requested a public certificate for the domain names jessbkcloudcampus.com and *.jessbkcloudcampus.com. You chose DNS as the validation method and used the default key algorithm. You created the certificate, which could take up to 1-2 hours.

Clicked on "Records" in Route53.

Updated the load balancer to handle the domain name. You clicked on "Actions" and edited the listener 4567. You added the protocol HTTPS on port 443, forwarded the target group cruddur-frontend-react-tg, added the recommended security policy, and added the newly created SSL certificate for jessbkcloudcampus.com. You also created a new listener with protocol HTTP on port 80 and redirected it to HTTPS port 443 with an itemized URL. The original host had a status code of 302-not found.

Created a new listener on port 80 for HTTP traffic and added a redirect rule to forward traffic to HTTPS on port 443. The rule is itemized and redirects with a 302 status code. This is done to ensure that all traffic to the site is encrypted and secure.

Added a rule to the cruddur-alb to forward traffic with a specific host header value (api.jessbkcloudcampus.com) to the cruddur-backend-flask-tg. This ensures that traffic to the backend is properly routed.

Updated Route53 to point to the load balancer by creating a record of type A-Routes with an alias pointing to the application load balancer in your region. This creates a simple routing record that directs traffic to the load balancer.

You have also created a record of type CNAME that aliases to the application load balancer in your region. This creates another routing record that directs traffic to the load balancer.

Finally, you have tested the setup by using the curl command to send a request to https://api.jessbkcloudcampus.com/api/health-check, which should return a response indicating that the API is running and healthy.

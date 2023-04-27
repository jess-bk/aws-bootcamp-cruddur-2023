# Week 10 — CloudFormation Part 1

**AWS CloudFormation** is a service that allows you to manage and automate your infrastructure and applications in AWS. With CloudFormation, you can define templates in either JSON or YAML format that describe the resources you want to create, configure, and manage. These resources can include AWS services like EC2 instances, S3 buckets, and RDS databases, as well as custom resources you create yourself.

**Using CloudFormation**, you can easily and efficiently provision and update your resources in a repeatable and automated manner. You can also track changes to your infrastructure over time, and roll back changes if needed. This makes it an ideal solution for managing complex and large-scale infrastructure and applications.

# Key features of CloudFormation

* **Infrastructure as Code (IaC)**: CloudFormation allows you to treat your infrastructure as code, enabling you to version control and manage it just like you would any other codebase. This makes it easy to collaborate with other team members and ensure consistency across your deployments.

* **Templates**: CloudFormation templates are used to describe your infrastructure as code. They are written in JSON or YAML, and define the resources and their configurations that you want to create and manage. Templates can be easily versioned, shared, and reused.

* **Automation**: With CloudFormation, you can automate the deployment and management of your infrastructure and applications. This means you can easily replicate your infrastructure in multiple environments, such as development, staging, and production, ensuring consistency and reducing human error.

* **Rollback**: If a deployment fails or produces unexpected results, CloudFormation makes it easy to roll back to a previous, known-good state. This can be done with a single click, and ensures that your infrastructure is always in a consistent state.

* **Integrations**: CloudFormation integrates with many other AWS services, including CloudTrail, CloudWatch, and AWS Config. This enables you to monitor and audit changes to your infrastructure, and ensure compliance with security and regulatory requirements.

* **Security**: CloudFormation can help you to improve the security of your AWS infrastructure by centralizing the configuration of your resources. This can make it easier to manage and audit your security settings.

* **Consistency**: CloudFormation templates can be used to create a repeatable and consistent deployment process for your AWS resources. This can help to ensure that your infrastructure is always up to date and that it meets your specific needs.

* **Reliability**: CloudFormation templates can be used to create highly reliable AWS infrastructure. This is because CloudFormation templates are idempotent, which means that they can be safely executed multiple times without causing any harm to your AWS resources.

# Cfn-lint and Cfn-guard with AWS CloudFormation Templates
**Cfn-lint** and **Cfn-guard** are two open-source tools that help developers and infrastructure engineers to validate and enforce best practices and standards when deploying AWS CloudFormation templates.

**Cfn-lint** is a command-line tool that checks CloudFormation templates for errors and best practices. It performs a static analysis of the template to identify any syntax errors, logical errors, or other issues that may cause the template to fail during deployment. It can be used to catch issues such as missing required properties, invalid data types, and unsupported resource types. By using Cfn-lint, developers can ensure that their CloudFormation templates are valid before deploying them, saving time and avoiding potential issues during the deployment process.

**Cfn-guard**, on the other hand, is a policy-as-code framework for CloudFormation templates. It allows you to define and enforce rules for your templates, ensuring that they meet the compliance and security requirements of your organization. Cfn-guard works by validating templates against a set of rules defined in a policy file, and it will fail templates that do not comply with the rules. This helps to ensure that your templates are secure and compliant with your organization's policies and best practices.

# Installing Cfn-lint and Cfn-guard in Project
Added configuration to gitpod.yml file to install on launching gitpod.

```
tasks:
  - name: cfn
    before: |
      pip install cfn-lint
      cargo install cfn-guard
```

*you will need to re-deploy gitpod to take effect alternatively install manually by running
```
pip install cfn-lint
cargo install cfn-guard
```

# Cloud Formation Implementation In Project

***CLOUDFORMATION FOR NETWORK LAYER***

**First** create a S3 Bucket <add a name that will store all the cloudformation artifacts> and leave the rest as default.
**Second** create a new folder in bin/cfn/networking and create a new file in the folder template.yaml.

*add the code to the template.yaml file.

```
AWSTemplateFormatVersion: 2010-09-09

Parameters:
  VpcCidrBlock:
    Type: String
    Default: 10.0.0.0/16
  Az1:
    Type: AWS::EC2::AvailabilityZone::Name
    Default: us-east-1
  SubnetCidrBlocks: 
    Description: "Comma-delimited list of CIDR blocks for our private public subnets"
    Type: CommaDelimitedList
    Default: >
      10.0.0.0/24, 
      10.0.4.0/24, 
      10.0.8.0/24, 
      10.0.12.0/24,
      10.0.16.0/24,
      10.0.20.0/24
  Az2:
    Type: AWS::EC2::AvailabilityZone::Name
    Default: us-east-1b
  Az3:
    Type: AWS::EC2::AvailabilityZone::Name
    Default: us-east-1d
Resources:
  VPC:
    # https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-vpc.html
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: !Ref VpcCidrBlock
      EnableDnsHostnames: true
      EnableDnsSupport: true
      InstanceTenancy: default
      Tags:
        - Key: Name
          Value: !Sub "${AWS::StackName}VPC"
  IGW:
    # https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-internetgateway.html
    Type: AWS::EC2::InternetGateway
    Properties:
      Tags:
        - Key: Name
          Value: !Sub "${AWS::StackName}IGW"
  AttachIGW:
    Type: AWS::EC2::VPCGatewayAttachment
    Properties:
      VpcId: !Ref VPC
      InternetGatewayId: !Ref IGW
  RouteTable:
    # https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-routetable.html
    Type: AWS::EC2::RouteTable
    Properties:
      VpcId: !Ref VPC
      Tags:
        - Key: Name
          Value: !Sub "${AWS::StackName}RT"
  RouteToIGW:
    # https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-route.html
    Type: AWS::EC2::Route
    DependsOn: AttachIGW
    Properties:
      RouteTableId: !Ref RouteTable
      GatewayId: !Ref IGW
      DestinationCidrBlock: 0.0.0.0/0
  SubnetPub1:
    # https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-subnet.html
    Type: AWS::EC2::Subnet
    Properties:
      AvailabilityZone: !Ref Az1
      CidrBlock: !Select [0, !Ref SubnetCidrBlocks]
      EnableDns64: false
      MapPublicIpOnLaunch: true #public subnet
      VpcId: !Ref VPC
      Tags:
        - Key: Name
          Value: !Sub "${AWS::StackName}SubnetPub1"
  SubnetPub2:
    # https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-subnet.html
    Type: AWS::EC2::Subnet
    Properties:
      AvailabilityZone: !Ref Az2
      CidrBlock: !Select [1, !Ref SubnetCidrBlocks]
      EnableDns64: false
      MapPublicIpOnLaunch: true #public subnet
      VpcId: !Ref VPC
      Tags:
        - Key: Name
          Value: !Sub "${AWS::StackName}SubnetPub2"
  SubnetPub3:
    # https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-subnet.html
    Type: AWS::EC2::Subnet
    Properties:
      AvailabilityZone: !Ref Az3
      CidrBlock: !Select [2, !Ref SubnetCidrBlocks]
      EnableDns64: false
      MapPublicIpOnLaunch: true #public subnet
      VpcId: !Ref VPC
      Tags:
        - Key: Name
          Value: !Sub "${AWS::StackName}SubnetPub3"
  SubnetPriv1:
    # https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-subnet.html
    Type: AWS::EC2::Subnet
    Properties:
      AvailabilityZone: !Ref Az1
      CidrBlock: !Select [3, !Ref SubnetCidrBlocks]
      EnableDns64: false
      MapPublicIpOnLaunch: false #public subnet
      VpcId: !Ref VPC
      Tags:
        - Key: Name
          Value: !Sub "${AWS::StackName}SubnetPriv1"
  SubnetPriv2:
    # https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-subnet.html
    Type: AWS::EC2::Subnet
    Properties:
      AvailabilityZone: !Ref Az2
      CidrBlock: !Select [4, !Ref SubnetCidrBlocks]
      EnableDns64: false
      MapPublicIpOnLaunch: false #public subnet
      VpcId: !Ref VPC
      Tags:
        - Key: Name
          Value: !Sub "${AWS::StackName}SubnetPriv2"
  SubnetPriv3:
    # https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-subnet.html
    Type: AWS::EC2::Subnet
    Properties:
      AvailabilityZone: !Ref Az3
      CidrBlock: !Select [5, !Ref SubnetCidrBlocks]
      EnableDns64: false
      MapPublicIpOnLaunch: false #public subnet
      VpcId: !Ref VPC
      Tags:
        - Key: Name
          Value: !Sub "${AWS::StackName}SubnetPriv3"
  SubnetPub1RTAssociation:
    Type: AWS::EC2::SubnetRouteTableAssociation
    Properties:
      SubnetId: !Ref SubnetPub1
      RouteTableId: !Ref RouteTable
  SubnetPub2RTAssociation:
    Type: AWS::EC2::SubnetRouteTableAssociation
    Properties:
      SubnetId: !Ref SubnetPub2
      RouteTableId: !Ref RouteTable
  SubnetPub3RTAssociation:
    Type: AWS::EC2::SubnetRouteTableAssociation
    Properties:
      SubnetId: !Ref SubnetPub3
      RouteTableId: !Ref RouteTable
  SubnetPriv1RTAssociation:
    Type: AWS::EC2::SubnetRouteTableAssociation
    Properties:
      SubnetId: !Ref SubnetPriv1
      RouteTableId: !Ref RouteTable
  SubnetPriv2RTAssociation:
    Type: AWS::EC2::SubnetRouteTableAssociation
    Properties:
      SubnetId: !Ref SubnetPriv2
      RouteTableId: !Ref RouteTable
  SubnetPriv3RTAssociation:
    Type: AWS::EC2::SubnetRouteTableAssociation
    Properties:
      SubnetId: !Ref SubnetPriv3
      RouteTableId: !Ref RouteTable
Outputs:
  VpcId:
    Value: !Ref VPC
    Export:
      Name: VpcId
  VpcCidrBlock:
    Value: !GetAtt VPC.CidrBlock
    Export:
      Name: VpcCidrBlock
  SubnetCidrBlocks:
    Value: !Join [",", !Ref SubnetCidrBlocks]
    Export:
      Name: SubnetCidrBlocks
  SubnetIds:
    Value: !Join 
      - ","
      - - !Ref SubnetPub1
        - !Ref SubnetPub2
        - !Ref SubnetPub3
        - !Ref SubnetPriv1
        - !Ref SubnetPriv2
        - !Ref SubnetPriv3
    Export:
      Name: SubnetIds
  AvailabilityZones:
    Value: !Join 
      - ","
      - - !Ref Az1
        - !Ref Az2
        - !Ref Az3
    Export:
      Name: AvailabilityZones
```

The template.yaml file creates a VPC with 3 public and 3 private subnets in 3 availability zones. The public subnets have public IP addresses and can be accessed from the internet, while the private subnets do not have public IP addresses and can only be accessed from within the VPC. The template also creates a route table and routes all traffic from the public subnets to the internet through the internet gateway.
 
***Resources created by the template***:

* VPC: A virtual private cloud (VPC) is a logically isolated section of the AWS cloud.
* Subnets: A subnet is a smaller range of IP addresses within a VPC.
* Internet gateway: An internet gateway is a network interface that allows traffic to flow between the VPC and the internet.
* Route table: A route table is a collection of routes that determine how traffic is routed within a VPC.
* Public subnets: Public subnets have public IP addresses and can be accessed from the internet.
* Private subnets: Private subnets do not have public IP addresses and can only be accessed from within the VPC.
  
***The template also exports the following values***:

* VpcId: The ID of the VPC.
* VpcCidrBlock: The CIDR block of the VPC.
* SubnetCidrBlocks: A list of the CIDR blocks for the public and private subnets.
* SubnetIds: A list of the IDs for the public and private subnets.
* AvailabilityZones: A list of the availability zones for the public and private subnets.
  
**This template can be used to create a VPC infrastructure that can be used to host a variety of applications.**

# Bash Script To Deploy The Networking Template
```
#! /usr/bin/env bash
set -e # stop the execution of the script if it fails

CYAN='\033[1;36m'
NO_COLOR='\033[0m'
LABEL="cloudformation networking deploy"
printf "${CYAN}==== ${LABEL}${NO_COLOR}\n"

CFN_PATH="/workspace/aws-bootcamp-cruddur-2023/aws/cfn/template.yaml"
CFN_PATH="/workspace/aws-bootcamp-cruddur-2023/aws/cfn/networking/template.yaml"
echo $CFN_PATH

cfn-lint $CFN_PATH

aws cloudformation deploy \
  --stack-name "my-cluster" \
  --s3-bucket "add the S3 Bucket name that was created earlier" \
  --stack-name "Cruddur" \
  --s3-bucket $CFN_BUCKET \
  --template-file "$CFN_PATH" \
  --no-execute-changeset \
  --capabilities CAPABILITY_NAMED_IA

```

# Creating and Saving Environment Variables for S3 Bucket
*created a Readme.md file for explanation
  
```
aws s3 mk s3://jessbk-cfn-artifacts
export CFN_BUCKET="jessbk-cfn-artifacts"
gp env CFN_BUCKET="jessbk-cfn-artifacts"
```

  
* Chmod the bash script and excute the command
```
# Grant access
chmod u+x bin/cfn/networking-deploy
  
# Execute the script
./bin/cfn/networking-deploy
```  

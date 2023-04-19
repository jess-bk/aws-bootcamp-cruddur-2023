# Week 8 — Serverless Image Processing
Implmentation of AWS CDK STACK in project
The first step is to create a directory to install the AWS CDK in the the project.
1. create a new folder in the root of app and name it thumbing-serverless-cdk and then cd into the folder and and run
```
npm install aws-cdk -g
```
2. initialize for a typescript project
```
cdk init app --language typescript
```
3. cdk bootstrap command is a part of the AWS Cloud Development Kit (CDK) which sets up the AWS CloudFormation stack that is needed for deploying your CDK application.
```
cdk bootstrap "aws://$AWS_ACCOUNT_ID/$AWS_DEFAULT_REGION"
```
The cdk bootstrap command with the specified parameter aws://$AWS_ACCOUNT_ID/$AWS_DEFAULT_REGION sets up a CloudFormation stack with the required resources to deploy your CDK app in the AWS account with the specified $AWS_ACCOUNT_ID and $AWS_DEFAULT_REGION. This is done by creating an S3 bucket, an IAM role, and a CloudFormation stack that are necessary to deploy your CDK app.

4. install all the dependencies for the app.
```
npm install dotenv
```

5. In the folder naivgate to lib folder and then open and add the following thumbing-serverless-cdk-stack.ts and add the code.
```
import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as iam from "aws-cdk-lib/aws-iam";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as s3n from "aws-cdk-lib/aws-s3-notifications";
import * as subscriptions from "aws-cdk-lib/aws-sns-subscriptions";
import * as sns from "aws-cdk-lib/aws-sns";
import { Construct } from "constructs";
import * as dotenv from "dotenv";

dotenv.config();

export class ThumbingServerlessCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const uploadsBucketName: string = process.env.UPLOADS_BUCKET_NAME as string;
    const assetsBucketName: string = process.env.ASSETS_BUCKET_NAME as string;
    const folderInput: string = process.env.THUMBING_S3_FOLDER_INPUT as string;
    const folderOutput: string = process.env
      .THUMBING_S3_FOLDER_OUTPUT as string;
    const webhookUrl: string = process.env.THUMBING_WEBHOOK_URL as string;
    const topicName: string = process.env.THUMBING_TOPIC_NAME as string;
    const functionPath: string = process.env.THUMBING_FUNCTION_PATH as string;
    console.log("uploadsBucketName");
    console.log("assetsBucketName", assetsBucketName);
    console.log("folderInput", folderInput);
    console.log("folderOutput", folderOutput);
    console.log("webhookUrl", webhookUrl);
    console.log("topicName", topicName);
    console.log("functionPath", functionPath);

    const uploadsBucket = this.createBucket(uploadsBucketName);
    const assetsBucket = this.importBucket(assetsBucketName);

    // create a lambda
    const lambda = this.createLambda(
      functionPath,
      uploadsBucketName,
      assetsBucketName,
      folderInput,
      folderOutput
    );

    // create topic and subscription
    const snsTopic = this.createSnsTopic(topicName);
    this.createSnsSubscription(snsTopic, webhookUrl);

    // add our s3 event notifications
    this.createS3NotifyToLambda(folderInput, lambda, uploadsBucket);
    this.createS3NotifyToSns(folderOutput, snsTopic, assetsBucket);

    // create policies
    const s3UploadsReadWritePolicy = this.createPolicyBucketAccess(
      uploadsBucket.bucketArn
    );
    const s3AssetsReadWritePolicy = this.createPolicyBucketAccess(
      assetsBucket.bucketArn
    );
    //const snsPublishPolicy = this.createPolicySnSPublish(snsTopic.topicArn)

    // attach policies for permissions
    lambda.addToRolePolicy(s3UploadsReadWritePolicy);
    lambda.addToRolePolicy(s3AssetsReadWritePolicy);
    //lambda.addToRolePolicy(snsPublishPolicy);
  }

  createBucket(bucketName: string): s3.IBucket {
    const bucket = new s3.Bucket(this, "UploadsBucket", {
      bucketName: bucketName,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    return bucket;
  }

  importBucket(bucketName: string): s3.IBucket {
    const bucket = s3.Bucket.fromBucketName(this, "AssetsBucket", bucketName);
    return bucket;
  }

  createLambda(
    functionPath: string,
    uploadsBucketName: string,
    assetsBucketName: string,
    folderInput: string,
    folderOutput: string
  ): lambda.IFunction {
    const lambdaFunction = new lambda.Function(this, "ThumbLambda", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset(functionPath),
      environment: {
        DEST_BUCKET_NAME: assetsBucketName,
        FOLDER_INPUT: folderInput,
        FOLDER_OUTPUT: folderOutput,
        PROCESS_WIDTH: "512",
        PROCESS_HEIGHT: "512",
      },
    });
    return lambdaFunction;
  }

  createS3NotifyToLambda(
    prefix: string,
    lambda: lambda.IFunction,
    bucket: s3.IBucket
  ): void {
    const destination = new s3n.LambdaDestination(lambda);
    bucket.addEventNotification(
      s3.EventType.OBJECT_CREATED_PUT,
      destination //,
      //{prefix: prefix} // folder to contain the original images
    );
  }

  createPolicyBucketAccess(bucketArn: string) {
    const s3ReadWritePolicy = new iam.PolicyStatement({
      actions: ["s3:GetObject", "s3:PutObject"],
      resources: [`${bucketArn}/*`],
    });
    return s3ReadWritePolicy;
  }

  createSnsTopic(topicName: string): sns.ITopic {
    const logicalName = "ThumbingTopic";
    const snsTopic = new sns.Topic(this, logicalName, {
      topicName: topicName,
    });
    return snsTopic;
  }

  createSnsSubscription(
    snsTopic: sns.ITopic,
    webhookUrl: string
  ): sns.Subscription {
    const snsSubscription = snsTopic.addSubscription(
      new subscriptions.UrlSubscription(webhookUrl)
    );
    return snsSubscription;
  }

  createS3NotifyToSns(
    prefix: string,
    snsTopic: sns.ITopic,
    bucket: s3.IBucket
  ): void {
    const destination = new s3n.SnsDestination(snsTopic);
    bucket.addEventNotification(s3.EventType.OBJECT_CREATED_PUT, destination, {
      prefix: prefix,
    });
  }

  /*
  createPolicySnSPublish(topicArn: string){
    const snsPublishPolicy = new iam.PolicyStatement({
      actions: [
        'sns:Publish',
      ],
      resources: [
        topicArn
      ]
    });
    return snsPublishPolicy;
  }
  */
}
```
6. The code is defining an AWS CDK (Cloud Development Kit) stack in TypeScript for a serverless application that handles the processing of uploaded images stored in S3 buckets, and notifying other services about the processed images. The stack consists of an S3 bucket to store uploads, a Lambda function to process images, an SNS topic to notify subscribers, and two S3 bucket event notifications to trigger Lambda function and SNS topic. The stack also includes AWS IAM policies to grant permissions for the Lambda function to access the S3 buckets and publish messages to the SNS topic.

* Import the required AWS CDK libraries and dependencies.
* Define a CDK stack class ThumbingServerlessCdkStack that extends the base cdk.Stack class.
* Define a constructor for the stack that takes scope, id, and props parameters.
* Use the dotenv package to load environment variables from a .env file.
* Define variables for the S3 bucket names, S3 folder names, SNS topic name, and Lambda function code path, and log their values to the console.
* Create an S3 bucket using the createBucket method, passing in the uploadsBucketName variable.
* Import an existing S3 bucket using the importBucket method, passing in the assetsBucketName variable.
* Create a Lambda function using the createLambda method, passing in the function path, bucket names, and folder names.
* Create an SNS topic using the createSnsTopic method, passing in the topicName variable.
* Create an SNS subscription using the createSnsSubscription method, passing in the topic and a webhook URL.
* Create two S3 bucket event notifications using the createS3NotifyToLambda and createS3NotifyToSns methods, passing in the Lambda function, SNS topic, and bucket names and folder names.
* Create IAM policies using the createPolicyBucketAccess method, passing in the bucket ARN.
* Attach the policies to the Lambda function using the addToRolePolicy method.

7. Set the environment varibales, create a .env.file and create a .env.example.env
```
UPLOADS_BUCKET_NAME="cruddur-uploaded-avatars-jessbkcloudcampus"
ASSETS_BUCKET_NAME="assets.jessbkcloudcampus.com"
THUMBING_S3_FOLDER_OUTPUT="avatars/processed"
THUMBING_WEBHOOK_URL="https://api.jessbkcloudcampus.com/webhooks/avatar"
THUMBING_TOPIC_NAME="cruddur-assets"
THUMBING_FUNCTION_PATH="/workspace/aws-bootcamp-cruddur-2023/aws/lambdas/process-images"
```

What the lambda function is doing:
* const process = require("process");: This line imports the built-in Node.js process module, which provides information about the current Node.js process.
*const {getClient, getOriginalImage, processImage, uploadProcessedImage} = require("./s3-image-processing.js");: This line imports four functions (getClient, getOriginalImage, processImage, and uploadProcessedImage) from a local module called s3-image-processing.js. These functions are used to download, process, and upload images in S3.
* const path = require("path");: This line imports the built-in Node.js path module, which provides utilities for working with file and directory paths.
* const bucketName = process.env.DEST_BUCKET_NAME;: This line retrieves the destination bucket name from an environment variable called DEST_BUCKET_NAME.
* const folderInput = process.env.FOLDER_INPUT;: This line retrieves the input folder name from an environment variable called FOLDER_INPUT.
* const folderOutput = process.env.FOLDER_OUTPUT;: This line retrieves the output folder name from an environment variable called FOLDER_OUTPUT.
* const width = parseInt(process.env.PROCESS_WIDTH);: This line retrieves the desired image width from an environment variable called PROCESS_WIDTH, and converts it from a string to a number using parseInt().
* const height = parseInt(process.env.PROCESS_HEIGHT);: This line retrieves the desired image height from an environment variable called PROCESS_HEIGHT, and converts it from a string to a number using parseInt().
* client = getClient();: This line calls the getClient() function (which was imported from s3-image-processing.js) to create a new S3 client object.
* exports.handler = async (event) => {: This line exports a function called handler, which is the entry point for the Lambda function. The async keyword indicates that this function uses async/await syntax.
* const srcBucket = event.Records[0].s3.bucket.name;: This line extracts the source S3 bucket name from the event object passed to the Lambda function.
* const srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));: This line extracts the source S3 object key from the event object passed to the Lambda function, and decodes any URL encoding.
* const dstBucket = bucketName;: This line sets the destination S3 bucket name to the value retrieved from the DEST_BUCKET_NAME environment variable.
* filename = path.parse(srcKey).name;: This line uses the path.parse() function to extract the file name (without extension) from the source S3 object key.
* const dstKey = ${folderOutput}/${filename}.jpg;: This line constructs the destination S3 object key by concatenating the output folder name, the file name (without extension), and the .jpg extension.
* const originalImage = await getOriginalImage(client, srcBucket, srcKey);: This line calls the getOriginalImage() function (which was imported from s3-image-processing.js) to download the original image from S3.
* const processedImage = await processImage(originalImage, width, height);: This line calls the processImage() function (which was imported from s3-image-processing.js) to resize the original image to the desired dimensions.
* await uploadProcessedImage(client, dstBucket, dstKey, processedImage); calls the uploadProcessedImage function defined in the ./s3-image-processing.js module with the client object, dstBucket, dstKey, and processedImage as arguments. This function uploads the processed image to the destination S3 bucket specified by bucketName in the environment variables.

8. create a file inside aws-bootcamp-cruddur-2023/aws/lambdas/process-images --> name s3-image-processing.js
```
const sharp = require("sharp");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");

function getClient() {
  const client = new S3Client();
  return client;
}

async function getOriginalImage(client, srcBucket, srcKey) {
  console.log("get==");
  const params = {
    Bucket: srcBucket,
    Key: srcKey,
  };
  console.log("params", params);
  const command = new GetObjectCommand(params);
  const response = await client.send(command);

  const chunks = [];
  for await (const chunk of response.Body) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);
  return buffer;
}

async function processImage(image, width, height) {
  const processedImage = await sharp(image)
    .resize(width, height)
    .jpeg()
    .toBuffer();
  return processedImage;
}

async function uploadProcessedImage(client, dstBucket, dstKey, image) {
  console.log("upload==");
  const params = {
    Bucket: dstBucket,
    Key: dstKey,
    Body: image,
    ContentType: "image/jpeg",
  };
  console.log("params", params);
  const command = new PutObjectCommand(params);
  const response = await client.send(command);
  console.log("repsonse", response);
  return response;
}

module.exports = {
  getClient: getClient,
  getOriginalImage: getOriginalImage,
  processImage: processImage,
  uploadProcessedImage: uploadProcessedImage,
};
```
* This code defines several functions to handle image processing in AWS S3. The functions use the Sharp library to resize images, the AWS SDK to interact with S3, and Promises and async/await for handling asynchronous operations.

The getClient() function creates a new S3 client.

The getOriginalImage() function retrieves an image from S3, reads its data as a buffer, and returns it.

The processImage() function resizes the input image using Sharp and returns the resulting image buffer.

The uploadProcessedImage() function uploads the processed image to a destination S3 bucket, given a key and content type.

Finally, all the functions are exported as an object with the same names as the functions, allowing them to be used by other parts of the application.

9. cd into the aws-bootcamp-cruddur-2023/aws/lambdas/process-images and install sharp.js
```
npm i @aws-sdk/client-s3
npm i sharp
npm install
rm -rf node_modules/sharp
SHARP_IGNORE_GLOBAL_LIBVIPS=1 npm install --arch=x64 --platform=linux --libc=glibc sharp
```
The commands npm i sharp and npm install are used to install the sharp package and its dependencies. rm -rf node_modules/sharp removes any previously installed version of sharp.The last command SHARP_IGNORE_GLOBAL_LIBVIPS=1 npm install --arch=x64 --platform=linux --libc=glibc sharp installs the sharp package with a specific architecture, platform and libc using the npm package manager.The SHARP_IGNORE_GLOBAL_LIBVIPS=1 environment variable is set to prevent the installation of a system-wide version of libvips, by doing this it will alllow to work in aws for the lambda function.

10. add the node modules to the .gitignore file.
11. created a bash script to install sharp --> aws-bootcamp-cruddur-2023/bin/avatar/build
```
#!/usr/bin/bash

CYAN='\033[1;36m'
NO_COLOR='\033[0m'
LABEL="build serverless images aws s3Bucket"
printf "${CYAN}==== ${LABEL}${NO_COLOR}====\n"

ABS_PATH=$(readlink -f "$0")
SERVERLESS_PATH=$(dirname $ABS_PATH)
BIN_PATH=$(dirname $SERVERLESS_PATH)
PROJECT_PATH=$(dirname $BIN_PATH)
SERVERLESS_PROJECT_PATH="$PROJECT_PATH/thumbing-serverless-cdk"

cd $SERVERLESS_PROJECT_PATH

npm install
rm -rf node_modules/sharp
SHARP_IGNORE_GLOBAL_LIBVIPS=1 npm install --arch=x64 --platform=linux --libc=glibc sharp
```
run chmod to give access to scripts chmod u+x bin/avatar/build

12. create a S3 Bucket in aws to store images --> assets.jessbkcloudcampus.com 

13. create bash script to upload images to aws S3 Bucket --> aws-bootcamp-cruddur-2023/bin/avatar/upload
```
#! /usr/bin/bash

CYAN='\033[1;36m'
NO_COLOR='\033[0m'
LABEL="upload s3 bucket"
printf "${CYAN}==== ${LABEL}${NO_COLOR}\n"

ABS_PATH=$(readlink -f "$0")
SERVERLESS_PATH=$(dirname $ABS_PATH)
DATA_FILE_PATH="$SERVERLESS_PATH/files/bain_batman.jpg"

aws s3 cp "$DATA_FILE_PATH" "s3://cruddur-uploaded-avatars-jessbkcloudcampus/bain_batman.jpg"
```
run chmod to give access to scripts chmod u+x bin/avatar/upload
```
./bin/avatar/upload
```
14. create a  bash script to delete images for aws S3 Bucket --> aws-bootcamp-cruddur-2023/bin/avatar/clear
```
#!/usr/bin/bash

CYAN='\033[1;36m'
NO_COLOR='\033[0m'
LABEL="clear images aws s3Bucket"
printf "${CYAN}==== ${LABEL}${NO_COLOR}====\n"

ABS_PATH=$(readlink -f "$0")
SERVERLESS_PATH=$(dirname $ABS_PATH)
DATA_FILE_PATH="$SERVERLESS_PATH/files/bain_batman.jpg"

aws s3 rm "s3://cruddur-uploaded-avatars-jessbkcloudcampus/bain_batman.jpg"
aws s3 rm "s3://assets.$DOMAIN_NAME/avatars/processed/bain_batman.jpg"
```
run chmod to give access to scripts chmod u+x bin/avatar/clear
you only need to run this if you want to delete the image.

15. update gitpod yaml file to install aws cdk on running gitpod.
```
  - name: cdk
    before: |
      npm install aws-cdk -g
      cd thumbing-serverless-cdk
      cp .env.example .env
      npm i
```

16. create a new folder in aws-bootcamp-cruddur-2023/aws/lambdas --> name process-images and create a file named index.js.
AWS Lambda function for processing images stored in an S3 bucket.
```
const process = require("process");
const {
  getClient,
  getOriginalImage,
  processImage,
  uploadProcessedImage,
} = require("./s3-image-processing.js");
const path = require("path");

const bucketName = process.env.DEST_BUCKET_NAME;
const folderInput = process.env.FOLDER_INPUT;
const folderOutput = process.env.FOLDER_OUTPUT;
const width = parseInt(process.env.PROCESS_WIDTH);
const height = parseInt(process.env.PROCESS_HEIGHT);

client = getClient();

exports.handler = async (event) => {
  const srcBucket = event.Records[0].s3.bucket.name;
  const srcKey = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, " ")
  );
  console.log("srcBucket", srcBucket);
  console.log("srcKey", srcKey);

  const dstBucket = bucketName;

  filename = path.parse(srcKey).name;
  const dstKey = `${folderOutput}/${filename}.jpg`;
  console.log("dstBucket", dstBucket);
  console.log("dstKey", dstKey);

  const originalImage = await getOriginalImage(client, srcBucket, srcKey);
  const processedImage = await processImage(originalImage, width, height);
  await uploadProcessedImage(client, dstBucket, dstKey, processedImage);
};
```

17. Run cdk synth in the terminal
cdk synth is a CDK CLI command that generates a CloudFormation template from your CDK app code.
```
cdk synth
```
18. now run cdk deploy
```
cdk deploy
```

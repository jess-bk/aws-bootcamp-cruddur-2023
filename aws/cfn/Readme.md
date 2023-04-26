CREATE A NEW FILE NAME Readme.md aws-bootcamp-cruddur-2023/aws/cfn/

## Architecture Guide

Before you run any templates, be sure to create an S3 bucket to contain all of our artifacts for CloudFormation.

```
aws s3 mk s3://jessbk-cfn-artifacts
export CFN_BUCKET="jessbk-cfn-artifacts"
gp env CFN_BUCKET="jessbk-cfn-artifacts"
```

> remember bucket names are unique to the provide code example you may need to adjust
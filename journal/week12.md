# Week X — Clean Up

# THE FOLLOWING CONTENT IS THE FINAL UPDATES MADE TO THE APPLICATION

# SQL Script (Backend-Flask) 
(seed data manually by running bash script).
*  This script inserts user data into the users table and related activities into the activities table, establishing a relationship between the two tables using the UUID of each user.
*  [Link to Seed SQL Script](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/backend-flask/db/seed.sql)
*  [Link to Bash Script](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/bin/db/seed)

# ShowActivity (Backend-Flask).
*  The code defines a class ShowActivity with a method run that retrieves information about a specific activity using a predefined SQL template from a custom database module (db). The result of the query is        returned as a JSON object.
*  [Link to show_activity.py file](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/backend-flask/services/show_activity.py)

# ActivityItem.js (Frontend React.JS).
*  Updates includes the navigation functionality using react-router-dom, allowing the activity_item div to be clickable and navigate to a specific URL. It also omits the replies functionality present in the        first snippet.
*  [Link to ActivityItem.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/components/ActivityItem.js)
*  CSS file was updated to reflect the changes made in ActivityItem.js.
*  [Link to ActivityItem.js CSS File](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/components/ActivityItem.css)

# Created New Component Replies.js (Frontend React.JS).
*  The Replies component is responsible for rendering a collection of ActivityItem components based on the props.replies array. If there are no replies (props.replies.length is 0), it displays a message            indicating that there is nothing to see yet. Otherwise, it renders the ActivityItem components. The CSS for the component is imported from the 'Replies.css' file.
*  [Link to Replies.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/components/Replies.js)

# Created New Component Requests.js Functions For Making HTTP Requests (Frontend React.JS).
*   This code provides a simple abstraction for making HTTP requests and handling responses. It supports authentication by adding an access token to the request headers when specified. The exported functions         make it easier to perform common HTTP methods such as POST, PUT, GET, and DELETE.
*   **Request Function:** 
*   The request function is an async function that takes four parameters: method, url, payload_data, and options. It is responsible for making the actual HTTP request.
*   It first checks if the options object has a property named setErrors. If it does, it sets its value to an empty string.
*   Next, it creates an object named attrs that holds the HTTP request attributes like method, headers, and potentially body.
*   If the options object has a property named auth and its value is true, it calls the getAccessToken function. This function likely retrieves an access token and stores it in the local storage. The access         token is then added to the request headers.
*   If the method is not "GET", the payload_data is converted to JSON and assigned to the attrs.body property.
*   The fetch function is then called with the provided url and attrs object. The response is stored in the res variable, and the JSON response data is stored in the data variable.
*   If the response status is 200 (indicating a successful request), the options.success function is called with the response data.
*   If the response status is not 200, the options.setErrors function is called with the response data. Additionally, the response and data are logged to the console.
*   **HTTP Request Functions:**
*   Four functions are exported from the module: post, put, get, and destroy.
*   These functions are convenience wrappers around the request function, making it easier to perform common HTTP methods.
*   The post function calls the request function with the "POST" method.
*   The put function calls the request function with the "PUT" method.
*   The get function calls the request function with the "GET" method.
*   The destroy function (often used for DELETE requests) calls the request function with the "DELETE" method.
*   [Link to Requests.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/lib/Requests.js)

# Request.js Updated Made In The Application (Frontend React.JS).
*   ReplyForm.js: [Link to ActivityContent.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/components/ReplyForm.js)
*   MessageForm.js: [Link to MessageForm.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/components/MessageForm.js)
*   ActivityForm.js: [Link to ActivityForm.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/components/ActivityForm.js)
*   ProfileForm.js: [Link to ProfileForm.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/components/ProfileForm.js)
*   HomeFeedPage.js: [Link to HomeFeedPage.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/pages/HomeFeedPage.js)
*   NotificationsFeedPage.js: [Link to NotificationsFeedPage.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/pages/NotificationsFeedPage.js)
*   MessageGroupPage.js: [Link to MessageGroupPage.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/pages/MessageGroupPage.js)
*   MessageGroupsPage.js: [Link to MessageGroupsPage.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/pages/MessageGroupsPage.js)
*   MessageGroupNewPage.js: [Link to MessageGroupNewPage.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/pages/MessageGroupNewPage.js)
*   UserFeedPage.js: [Link to UserFeedPage.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/pages/UserFeedPage.js)
*   ActivityShowPage.js: [Link to ActivityShowPage.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/pages/ActivityShowPage.js)

# Created Component ActivityShowPage.js Added Request.js (Frontend React.JS).
*   The ActivityShowPage component fetches and displays a specific activity along with its replies. It provides forms to create new activities and replies. The component also includes navigation and sidebar         components for the overall page layout.
*   The component defines an loadData function that makes an HTTP GET request to fetch activity data and replies from the backend API.
*   The loadData function is called within the useEffect hook when the component mounts.
*   The fetched activity and replies are stored in the component state variables using the setActivity and setReplies functions.
*   The ActivityForm, ReplyForm, and Replies components are passed appropriate props, including state variables and functions to handle interactions.
*   [Link to ActivityShowPage.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/pages/ActivityShowPage.js)

# Fixed Time And Date DateTimeFormats.js (Frontend React.JS).
*   Updated the seed file by adding by updating "current_timestamp 0 interval '10 day'"
*   format_datetime(value): This function takes a date/time value, converts it to a Luxon DateTime object, and formats it as a localized string representation of the full date and time.
*   message_time_ago(value): This function calculates the time difference between a given value and the current time. It returns a string indicating the time elapsed since the given value, such as "2h" for 2         hours ago, "5m" for 5 minutes ago, or "Oct 15" for a date more than 24 hours ago.
*   time_ago(value): This function is similar to message_time_ago, but it provides a more general time ago representation without any specific context. It calculates the time difference between a given value and     the current time and returns a string indicating the elapsed time, such as "2h" for 2 hours ago, "5m" for 5 minutes ago, or "3d" for 3 days ago.
*   time_future(value): This function calculates the time difference between the current time and a given future value. It returns a string indicating the remaining time until the future value, such as "2h" for     2 hours remaining, "5m" for 5 minutes remaining, or "3d" for 3 days remaining
*   [Link to DateTimeFormats.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/lib/DateTimeFormats.js)

# Update Time And Date To Following Components In Application (Frontend React.JS).
*   ActivityContent.js: [Link to ActivityContent.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/components/ActivityContent.js)
*   ActivityShowItem.js: [Link to ActivityShowItem.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/components/ActivityShowItem.js)
*   MessageItem.js: [Link to MessageItem.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/components/MessageItem.js)
*   MessageGroupItem.js [Link to MessageGroupItem.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/components/MessageGroupItem.js)

# Created Component ActivityShowItem.js (Frontend React.JS).
*   The component imports CSS styles from a separate file (ActivityItem.css).
*   The component imports several child components related to different actions on the activity, such as replying, reposting, liking, and sharing.
*   The component imports the Link component from React Router for creating links.
*   The component imports utility functions for formatting date and time from a file called DateTimeFormats.
*   The component defines the ActivityShowItem function component that renders the activity item's content and actions.
*   The component uses the imported child components (ActivityActionReply, ActivityActionRepost, ActivityActionLike, ActivityActionShare) to render the specific actions related to the activity.
*   The component renders the activity item's main content, including the user avatar, display name, handle, creation time, expiration time, and message.
*   The component renders the expanded metadata of the activity, including the creation time.
*   The component renders the activity actions section, which contains buttons or icons for replying, reposting, liking, and sharing the activity.
*   [Link to ActivityShowItem.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/components/ActivityShowItem.js)

# ActivityItem.js Updated (Frontend React.JS).
*   **useNavigate:** The useNavigate hook from "react-router-dom" is imported. This hook allows for navigation to different routes programmatically.
*   **Navigation:** The useNavigate hook is used to obtain the navigate function, which is then used in the click function. The click function is triggered when the clickable element is clicked. It prevents the     default behavior of the click event, constructs a URL based on the props.activity.handle and props.activity.uuid values, and navigates to that URL using the navigate function. This allows for navigation to a     specific activity's details when clicked.
*   **Updated attrs object:** The attrs object is still present to store the attributes that will be assigned to the rendered HTML element. However, the className attribute is always set to "activity_item           clickable", indicating that the rendered element will have this class applied to it. This suggests that the element will always be clickable.
*   The functionality of the component remains similar to the previous version, with the addition of navigation to the activity's details when the item is clicked. The ActivityContent component is                   rendered to display the activity's content, and the ActivityAction components are rendered to provide interaction options for the activity (e.g., reply, repost, like, share).
*   [Link to ActivityItem.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/components/ActivityItem.js)

# Run Migrations On Prod DataBase (Backend-Flask)

*   To run migrations on DataBase we have done this manually by first updating the Security Groups associated with the DataBase, the following is the method that was applied to update the DB in the cli.

1. ## Setting DB_SG_RULE_ID environment variable:
   * In the command line interface (CLI), the command export DB_SG_RULE_ID="<ENTER SG RULE ID THAT YOU WILL NEED TO CREATE TO ALLOW ACCESS TO>" is executed.
   * This sets the value of the environment variable DB_SG_RULE_ID to "<ENTER SG RULE ID THAT YOU WILL NEED TO CREATE TO ALLOW ACCESS TO>".
   * The purpose of this variable is likely to specify the security group rule ID for the database.

2. ## Setting DB_SG_RULE_ID environment variable using gp command:
   * In the CLI, the command gp | env DB_SG_RULE_ID="<ENTER SG RULE ID THAT YOU WILL NEED TO CREATE TO ALLOW ACCESS TO>" is executed.
   * This command sets the value of the environment variable DB_SG_RULE_ID to "<ENTER SG RULE ID THAT YOU WILL NEED TO CREATE TO ALLOW ACCESS TO>" for the current session.
   * The gp command is likely a custom command or alias used to set environment variables.

3. ## Setting DB_SG_ID environment variable:
   * In the CLI, the command export DB_SG_ID="<ENTER SG ID THAT YOU WILL NEED TO CREATE TO ALLOW ACCESS TO>" is executed.
   * This sets the value of the environment variable DB_SG_ID to "<ENTER SG RULE THAT YOU WILL NEED TO CREATE TO ALLOW ACCESS TO>".
   * The purpose of this variable is likely to specify the security group ID for the database.

4. ## Setting DB_SG_ID environment variable using gp command:
   * In the CLI, the command gp | env DB_SG_ID="<ENTER SG RULE THAT YOU WILL NEED TO CREATE TO ALLOW ACCESS TO>" is executed.
   * This command sets the value of the environment variable DB_SG_ID to "<ENTER SG RULE THAT YOU WILL NEED TO CREATE TO ALLOW ACCESS TO>" for the current session.
   * The gp command is likely a custom command or alias used to set environment variables.

5. ## Running script to update SG rule:
   * In the CLI, the command GITPOD_IP=$(curl ifconfig.me) ./bin/rds/db-rds-update-sg-rule is executed.
   * This command runs a script (db-rds-update-sg-rule) to update the security group (SG) rule associated with the database.
   * The GITPOD_IP=$(curl ifconfig.me) part retrieves the current IP address and sets it to the GITPOD_IP environment variable, which will be used to update the rds data base.

6. ## Setting PROD_CONNECTION_URL environment variable:
   * In the CLI, the command export PROD_CONNECTION_URL="<ENTER THE PROD CONNECTION URL FOR THE DATA BASE INSTANCE>" is executed.
   * This sets the value of the environment variable PROD_CONNECTION_URL to the connection URL of the production database.
   * The connection URL includes the necessary details for connecting to the database, such as username, password, host, port, and database name.
 
7. ## Setting PROD_CONNECTION_URL environment variable using gp command:
   * In the CLI, the command gp | env PROD_CONNECTION_URL="<ENTER THE PROD CONNECTION URL FOR THE DATA BASE INSTANCE>" is executed.
   * This command sets the value of the environment variable PROD_CONNECTION_URL to the production database connection URL for the current session.
   * The gp command is likely a custom command or alias used to set environment variables.

8. ## Running migration script:
   * n the CLI, the command CONNECTION_URL=$PROD_CONNECTION_URL ./bin/db/migrate is executed.
   * This command runs a migration script (migrate) on the database using the PROD_CONNECTION_URL environment variable as the connection URL.
   * The migration script is responsible for updating the database schema, applying any necessary changes or updates.
   * These steps are to set environment variables related to security groups and connection URLs, update the security group rule, and run a database migration on a production database. These steps are                 crucial for maintaining the security and integrity of the database while making necessary changes to its structure or schema.

 **EXAMPLE BELOW:**
 ```
 * type in cli and hit enter --> export DB_SG_RULE_ID="ENTER DB SECURITY GROUP RULE ID"
 * type in cli and hit enter --> gp | env DB_SG_RULE_ID="ENTER DB SECURITY GROUP RULE ID"
 * type in cli and hit enter --> export DB_SG_ID="ENTER DB SECURITY GROUP ID"
 * type in cli and hit enter --> gp | env DB_SG_ID="ENTER DB SECURITY GROUP ID"
 * Run script to update SG RULE --> GITPOD_IP=$(curl ifconfig.me) ./bin/rds/db-rds-update-sg-rule. 

 export PROD_CONNECTION_URL="postgresql://cruddurroot:<ENTER PROD CONNECTION URL>:5432/cruddur"
 gp | env PROD_CONNECTION_URL="postgresql://cruddurroot:<ENTER PROD CONNECTION URL>:5432/cruddur"

 * type in cli and hit enter --> CONNECTION_URL=$PROD_CONNECTION_URL ./bin/db/migrate
 ```

9. ## Now Check DataBase Connection Successfull
 ```
 type in cli and hit enter --> ./bin/db/connect prod
 \d activities
 ```

10. ## Bash Scripts For Migration And DB Connection
  * [Link to Migrations Bash Script](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/bin/db/migrate)
  * [Link to DB Connection Bash Script](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/bin/db/connect)

# Creating and Verifying a Pull Request for Backend Code Update to AWS CodePipeline(CICD) (Backend-Flask).
*  Create a new pull request.
   * Base: prod
   * Compare: main
*  Click on "Create a pull request"
*  Add a comment: "Update backend codebase to week-x"
*  Create the pull request
*  Click on "Merge pull request"
*  Confirm the merge
*  Check CodePipeline to verify if the update was successful
*  The provided steps outline the process of creating a new pull request to update the backend codebase. The pull request is created with the base set to "prod" (representing the production branch) and the          compare set to "main" (the main branch where the code changes are made). After creating the pull request, a comment is added to describe the update being made, such as updating the backend codebase to a          specific week or version. Once the pull request is created, it can be merged by clicking on "Merge pull request" and confirming the merge action. Finally, to ensure the update is successful, CodePipeline, a      continuous integration and delivery service, can be checked to verify if the code changes have been successfully deployed and integrated into the production environment.

# Building Frontend (Frontend-React.js).
*   Command: ./bin/frontend/static-build (bash script)
*   [Link to build frontend Bash Script](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/bin/frontend/static-build)
*   This command initiates the build process for the frontend of the application. It generates static files that can be deployed to a web server.
  
# AWS S3 Website Sync Tool Bash Script (Frontend-React.js).
*   The script performs the following actions: 
    1. Loads environment variables from the specified sync.env file.
    2. Displays the configuration details, including AWS region, S3 bucket, CloudFront distribution ID, and build directory.
    3. Sets the output changeset path, appending a timestamp to the original filename.
    4. Prints the output changeset path and the auto-approve setting.
    5. Executes the synchronization process using the AwsS3WebsiteSync::Runner.run method.
       * It provides AWS access key ID, secret access key, default region, S3 bucket, CloudFront distribution ID, build directory, output changeset path, auto-approve setting, and other options.
       * The silent option ignores specific types of changes and prevents printing of no-change messages.
       * The ignore_files option specifies a list of files to be ignored during synchronization.
*   The bash script is used to synchronize a website with AWS S3 and CloudFront. It utilizes the aws_s3_website_sync gem and requires the dotenv gem for environment variable management.
*   [Link to Sync Tool Bash Script](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/bin/frontend/sync)
*   To complete this action you will need to run "bundle install" and then run "gem install dotenv". This will download the required dependencies in application.(make sure to be in the correct directory)
*   In AWS console goto CLOUDFRONT: Distrubution : check frontend react js cruddur and for invalidation to complete.
  
# Update DDB for prod --> ddb.py (Backend-Flask).
*   The update that was made in ddb.py was table_name = 'cruddur-messages' is replaced with table_name = os.getenv("DDB_MESSAGE_TABLE"). This change is made to retrieve the table name from an environment             variable instead of hard-coding it in the code.   
*   I have added a value for the DDB (DynamoDB) table name in the erb/backend-flask.env.erb file and manually updated the backend environment file. Specifically, I have set the value of DDB_MESSAGE_TABLE to         cruddur-messages.
*   The reason for this action is to provide the backend application with the necessary configuration for connecting to the DynamoDB table. By specifying the table name in the environment file, the backend           application can dynamically retrieve this value and use it when interacting with the DynamoDB database.
*   After making this change, i run docker compose up to start the Docker containers and run the backend application. This command launches the necessary infrastructure, including the backend service, and           ensures that the application is up and running.
*   Following that, i run the bash script ./bin/db/setup, for setting up the database and performing any necessary migrations or initializations. This script creates tables, populate them with initial data.
*   [Link to build frontend bash script](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/backend-flask/lib/ddb.py)
*   [Link to setup bash script](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/bin/db/setup)
*   Updated were made to cfn template([cfn template](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/aws/cfn/service/template.yaml) and tomlfile([toml file](https://github.com/jess-bk/aws-             bootcamp-cruddur-2023/blob/main/aws/cfn/service/config.toml) for the DDB to add the DynamoDB Table (I have already done this in week 10, please check week 10 journal of cfn template file).
*   Now run the bash script to create DDB Message Table: ./bin/cfn/service.
*   AWS cloudformation execute the change set.
*   Check in task definition if the DynamoDB env var's have been successfully uploaded.
  
# Create Machine User For DDB  (Backend-Flask).

The CloudFormation template defines two resources: an IAM user (CruddurMachineUser) and an IAM policy (DynamoDBFullAccessPolicy).

## CruddurMachineUser: 
This resource creates an IAM user named "cruddur_machine_user". IAM users are identities that can be used to interact with AWS services and resources. This user can be used to authenticate and                   authorize access to various AWS services.

## DynamoDBFullAccessPolicy: 
This resource creates an IAM policy named "DynamoDBFullAccessPolicy" that grants full access permissions to DynamoDB actions for the specified IAM user (CruddurMachineUser). The policy allows the user to         perform actions such as putting items, getting items, scanning, querying, updating items, deleting items, and performing batch writes on any DynamoDB resource (Resource: "*").

This CloudFormation template creates an IAM user named "cruddur_machine_user" and attaches an IAM policy that provides full access to DynamoDB actions. The user can then use the assigned credentials to interact with DynamoDB resources within the AWS environment.
 
The Machine User that was created to have access to the DDB will also need to update the AWS Secret Access Key and AWS Access Key in the parameter store in AWS and this will allow all the Required permissions for the DDB.
  
The changes to take effect in the production environment of the application you will need release changes in CodePipeline(AWS).
  
**Here is the link to the Cloudformation template file.** [Link to MACHINE USER template](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/aws/cfn/machine-user/template.yaml)
  
**CONFIG TOML FILE FOR MACHINE USER** [Link to TOML file](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/aws/cfn/machine-user/config.toml)
 
When running the deployment process using these parameter values, it will create a stack named 'CrdMachineUser' in the 'us-east-1' region. The artifacts related to this stack will be stored in the 'jessbk-cfn-artifacts' S3 bucket.(for this enable to work later on you will need to update the access key and secret key in the parameter store with the ones associated with machine user aws credentials)
  
**Here is the link to the bash script.** [Link to Bash Script](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/bin/cfn/cicd)
  
The script performs linting on the CloudFormation template, extracts necessary configuration values, and deploys the stack using the AWS CLI and CloudFormation, with specific options and parameters.

# MACHINE USER STACK IMAGE
  
![image week10 aws](assets/week10aws/machine_user_cfn_week_10.png)
       
# Update Rollbar Error (Backend-Flask).
*   Rollbar has been updated and now uses "with app.app_context():" (backend-flask/app.py).
    ```
    with app.app_context():
         def init_rollbar():
             """init rollbar module"""
             rollbar.init(
                 # access token
                 rollbar_access_token,
                 # environment name
                 'production',
                 # server root directory, makes tracebacks prettier
                 root=os.path.dirname(os.path.realpath(__file__)),
                 # flask already sets up logging
                 allow_logging_basic_config=False)
    ```  
*   Once the update has been made you need to build and push the image to AWS.
*   run script in cli --> ./bin/backend/build [Link to Bash Script](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/bin/backend/build).
*   run script in cli --> ./bin/backend/push  [Link to Bash Script](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/bin/backend/push).

# Reconnect Database and PostConfirmation Lambda (Backend-Flask).

*  ## Retrieving the Password String and Comparing with RDS Name:
*  To obtain the password string, execute the command gp | env PROD. This command will return a string that contains the password. Ensure that the name in the string matches the name specified in the RDS            (Relational Database Service). If the names do not match, make the necessary changes in the RDS.

## Exporting and Assigning the Password String:
*  To export the password string, copy the string obtained from the previous step and use the export command. For example, export PASSWORD_STRING=your_password_string. This will assign the password string to        the environment variable PASSWORD_STRING.

## Verification of Updated Value in Environment: 
*  To verify if the value has been successfully updated, execute the command gp | env PROD. This will display the environment variables, including the updated value for the password string. Ensure that the          updated value matches the desired value.

## Adding Inbound Rule to AWS RDS Security Group:
*  To add a new inbound rule to the AWS RDS (Relational Database Service) Security Group, follow these steps:
1. Navigate to the AWS RDS console and select the desired Security Group, such as "CrdDbAlbSG."
2. Locate the inbound rules section and click on "Add Rule."
3. Select "POSTGRES" as the rule type.
4. Provide a name for the rule, such as "GITPOD."
5. Set the source as "MY IP" to allow access from your IP address.
6. Save the changes to add the new inbound rule to the Security Group.

## Updating the Security Group Rule using the Script:
*  To update the Security Group rule, execute the script ./bin/rds/update-sg-rule. This script will make the necessary modifications to the Security Group rule, ensuring that the changes are applied. It            ensures that the required access is granted to the RDS instance and allows for the smooth functioning of the system.
*  Now check if you can connect locally to production database --> ./bin/db/connect prod [Link to Bash Script](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/bin/db/connect).
*  Load data into production data base by running bash script --> ./bin/db/schema-load prod [Link to Bash Script](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/bin/db/schema-load).

## Updating User Bio with Migration Script:
*  To update the user bio using the migration script and overriding the connection URL, follow these steps:
1. cli --> Set the connection URL to the production (PROD) connection URL by executing the following command:
```
export CONNECTION_URL=$PROD_CONNECTION_URL
```
This ensures that the migration script connects to the production database.

2. Run the migration script by executing the following command:
   ./bin/db/migrate [Link to Bash Script](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/bin/db/migrate).
   This script will apply the necessary database migration to update the user bio.
3. The migration script will use the overridden connection URL to connect to the production database and perform the required updates.
4. Once the migration is complete, the user bio will be successfully updated in the production environment.
5. Check if migrations script updated the db, in terminal or command prompt --> ./bin/db/connect prod [Link to Bash Script](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/bin/db/connect).
6. After connecting to the database, execute the following command to view the table structure and schema of the "users" table --> \d users;
7. If the table structure matches the expected changes, it indicates that the database has been successfully updated with the desired modifications.

## Updating Database Value in AWS Post-Confirmation Lambda Function:  
*  To update the database value in the AWS Post-Confirmation Lambda function, follow these steps:
1. Navigate to the AWS Management Console and go to the AWS Lambda service.
2. Locate and select the Post-Confirmation Lambda function.
3. In the Lambda function dashboard, click on the "Configuration" tab.
4. Scroll down to the "Environment variables" section and locate the variable related to the database value.
5. Update the value of the database variable to "prod" or the desired production value.
6. Once you have made the necessary changes, save the updated environment variable.
7. Confirm that the database value has been updated by reviewing the updated environment variables.
*  By following these steps, you can access the AWS Post-Confirmation Lambda function, modify the environment variable related to the database value, and ensure that it reflects the desired production value        ("prod").

## Granting Lambda Permission to Correct VPC and Creating a New Security Group:
*  To provide the necessary permission to a Lambda function to access the correct VPC and create a new security group, follow these steps:
1. Access the AWS Management Console and navigate to the VPC service.
2. In the VPC dashboard, select the appropriate VPC with the CIDR block "10.0.0.0/16".
3. Choose the "Subnets" tab and select the three desired subnets (b, b, d, 3pub-b-d-a) associated with the VPC.
4. Next, go to the EC2 service and navigate to the Security Groups section.
5. Click on "Create Security Group" to create a new security group.
6. Provide a name for the security group, such as "CognitoLambdaSG", and add a description indicating that it is for the Lambda function that needs to connect to PostgreSQL.
7. In the VPC dropdown, select "CrdNetVpc" or the appropriate VPC that you have previously chosen.
8. Delete all the inbound rules for the security group.
9. Keep the default outbound rules, which allow all traffic.
10. Click on "Create" to create the new security group.
*  By completing these steps, you will have granted the Lambda function permission to access the correct VPC by associating it with the desired subnets. Additionally, you will have created a new security            group, "CognitoLambdaSG", with appropriate settings for the Lambda function's connection to PostgreSQL.

## Modifying Inbound Rule in CrdDbAlbSg Security Group:
*  To edit the inbound rule of the CrdDbAlbSg security group in AWS, follow these steps:
1. Navigate to the AWS Management Console and go to the EC2 service.
2. In the EC2 dashboard, select the "Security Groups" section.
3. Locate and select the "CrdDbAlbSg" security group.
4. Click on the "Inbound Rules" tab to view the existing inbound rules.
5. Identify the rule for PostgreSQL, which is typically listed as type "postgres".
6. Edit the rule by clicking on the "Edit" or "Modify" button associated with it.
7. In the rule settings, set the following values:
   * Type: Select "PostgreSQL" from the dropdown menu.
   * Source: Enter "CognitoLambdaSG" to specify the source security group.
   * Description: Add a brief description, such as "COGNITOPOSTCONF", to help identify the purpose of this rule.
8. Save the changes to update the inbound rule.
* By following these steps, you will have modified the inbound rule of the CrdDbAlbSg security group to allow access from the CognitoLambdaSG security group specifically for PostgreSQL traffic. This                configuration ensures that the Lambda function associated with Cognito can establish a connection to the PostgreSQL database securely.

## Update cruddur-post-confirmation Lambda Function:
*  To update the cruddur-post-confirmation Lambda function in AWS, follow these steps:
1. Locate the file named "cruddur-post-confirmation.py" in the "aws/lambdas" directory in project.
2. Update the content of the file with the code(The code is updated in the application).[Link to Bash Script](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/aws/lambdas/cruddur-post-confirrmation.py).
3. Open the AWS Management Console and navigate to the Lambda service.
4. Locate and select the Lambda function associated with the cruddur-post-confirmation.
5. In the Lambda function's configuration, scroll down to the code editor section.
6. Replace the existing code with the updated code from the cruddur-post-confirmation.py file and save changes.
*  By following these steps, you will have successfully updated the cruddur-post-confirmation Lambda function with the new code, allowing it to handle user post-confirmation events and insert user data into        the PostgreSQL database.
       
## Deleting Account in Cognito and Creating a New Account:
**Delete Account in Cognito:**
1. Log in to the AWS Management Console and navigate to the Cognito service.
2. Locate the user account you want to delete.
3. Select the user account and choose the option to delete it.
4. Confirm the deletion when prompted.

## Create a New Account on jessbkcloudcampus:
1. Access the jessbkcloudcampus website or application.
2. Look for the registration or sign-up page.
3. Provide the required information to create a new account.
3. Follow the on-screen instructions to complete the account creation process.

## To create a CRUD operation and check if it updates, follow these steps:
1. Test the CRUD operations to ensure they function correctly.
*  By following these steps, you can create a CRUD system and verify if the desired updates are successfully reflected in the associated data storage.

# Refactor Flask Routes And App.py (Backend-Flask).
#### we refactored the Backend-Flask project to improve its performance and scalability. It includes a summary of the modifications made to specific files and directories within the application codebase. We made the following changes:
1. ### Create new folder routes and four files:
  * activities.py
  * general.py
  * messages.py
  * users.py
  * These files define specific routes and handlers for different functionalities of the application.
2. ### backend-flask/routes/activities.py:
  * Summary: This file contains route handlers for activities-related functionality.
  * It includes endpoints for retrieving home feed, notifications, searching activities, creating activities, and more.
3. ### Update backend-flask/routes/general.py:
  * Summary: This file contains a health check route.
4. ### backend-flask/routes/messages.py:
  * Summary: This file contains routes and handlers related to messaging functionality.
  * It includes endpoints for retrieving message groups, messages within a group, and creating messages
5. ### backend-flask/routes/users.py:
  * Summary: This file contains routes and handlers for user-related functionality.
  * The route includes endpoints for retrieving user activities, user profiles, and updating user profiles.
6. ### Create a new file backend-flask/lib/helpers.py:
  * Create a new file named helpers.py under the lib directory in the Flask application.
  * Add the provided code that defines a helper function named model_json.
7. ### Update backend-flask/lib/cognito_jwt_token.py:
  * Summary: This update modifies the Cognito JWT token handling in the backend Flask application.
  * Added error handling for unauthenticated requests.
  * Debug logging for errors.
  * Integration of error handling callback function.
  * Updated the decorator function for JWT token verification.
8. ### Update frontend-react-js/src/pages/NotificationsFeedPage.js:
  * Summary: This update modifies the NotificationsFeedPage component in the frontend React.js application.
  * Added functions for checking authentication and retrieving the access token.
  * Modified the loadData function to include authorization headers.
  * Removed unnecessary checkAuth function and its usage.
  * Updated the useEffect hook to prevent double function calls.
9. ### Update backend-flask/app.py:
  * Summary: This update modifies the main app.py file in the backend Flask application.
  * Added import statements for necessary modules and services.
  * Initialized external integrations (X-Ray, Rollbar, Honeycomb, CORS).
  * Defined route functions for various API endpoints.
  * Updated route decorators for JWT token verification.
  * Added health check route.
10. ### Create directory backend-flask/lib/cloudwatch.py:
  * Summary: This addition creates a new directory and file for CloudWatch logging in the backend Flask application.
  * Imported necessary modules for CloudWatch logging.
  * Defined a function to initialize CloudWatch logging.
  * Updated logging configuration to include request details.
11. ### Create directory backend-flask/lib/cors.py:
  * Summary: This addition creates a new directory and file for CORS configuration in the backend Flask application.
  * Imported necessary modules for CORS handling.
  * Defined a function to initialize CORS with specific origins, headers, and methods.
12. ### Create directory backend-flask/lib/honeycomb.py:
  * Summary: This addition creates a new directory and file for Honeycomb integration in the backend Flask application.
  * Imported necessary modules for Honeycomb tracing.
  * Initialized the Honeycomb tracer provider and processors.
  * Instrumented Flask and Requests libraries for tracing.
13. ### Create directory backend-flask/lib/rollbar.py:
  * Summary: This addition creates a new directory and file for Rollbar integration in the backend Flask application.
  * Imported necessary modules for Rollbar error reporting.
  * Defined a function to initialize Rollbar and connect it to Flask's error reporting system.
14. ### Create directory backend-flask/lib/xray.py:
  * Summary: This addition creates a new directory and file for AWS X-Ray integration in the backend Flask application.
  * Configured X-Ray recorder with the service name and dynamic naming.
  * Instrumented Flask middleware for X-Ray tracing.
  
# Refactor JWT  (Backend-Flask).  Refactor JWT 
1. ### frontend-react-js/src/components/ReplyForm.js:
  * Updated the close function to handle the click event on the popup form.
  * If the clicked element has the class "reply_popup," it sets the "popped" state to false.
2. ### backend-flask/lib/cognito_jwt_token.py:
 * Defined a decorator function jwt_required that can be used to enforce JWT authentication on Flask routes.
 * The decorator function wraps the original function and performs the following actions:
  * Verifies the access token using CognitoJwtToken class.
  * Stores the user_id in the global g object.
  * Handles TokenVerifyError if the verification fails.
  * Returns an error response if the request is unauthenticated.
  * Executes the original function if the verification succeeds.
3. ### backend-flask/app.py:
  * Removed the unnecessary code related to cognito_jwt_token.
  * Added jwt_required decorator to secure the following routes:
   * "/api/message_groups" (GET)
   * "/api/messages/string:message_group_uuid" (GET)
   * "/api/messages" (POST, OPTIONS)
   * "/api/activities/home" (GET)
   * "/api/activities/notifications" (GET)
   * "/api/activities" (POST, OPTIONS)
   * "/api/activities/string:activity_uuid" (GET)
   * "/api/profile/update" (POST, OPTIONS)
  * The decorated routes now require JWT authentication and access the cognito_user_id from the global g object.
  * Each route executes the corresponding logic, returning the appropriate response or error.
4. ### default_home_feed function:
   * Handles unauthenticated requests to the "/api/activities/home" route.
   * Executes HomeActivities.run and returns the resulting data.
  
The code changes aim to refactor the existing JWT authentication implementation by introducing a decorator, jwt_required, to enforce authentication on specified routes. This approach simplifies the authentication logic by centralizing it within the decorator and allows for easy application to multiple routes. The decorator verifies the JWT access token using the CognitoJwtToken class, stores the user_id in the global g object, and handles authentication errors. The modified routes now use the jwt_required decorator, ensuring only authenticated users can access them.

# CICD (Continuous Integration/Continuous Deployment).
  
Several updates and changes have been made to various files and components in the CICD (Continuous Integration/Continuous Deployment) pipeline. These updates aim to improve the functionality and user experience of the application.
  
Firstly, the docker-compose.yml file has been modified to prevent the application from starting in the production environment. This change ensures that the application is not accidentally launched in the production environment during the CI/CD process. [Link to DockerFile](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/docker-compose.yml).

In the backend-flask directory, the app.py file has been updated to handle POST requests to the data_activities endpoint. The updated endpoint now extracts the access token from the request headers, verifies it, retrieves the user's cognito_user_id from the access token claims, and obtains the message and ttl values from the request's JSON payload. It then calls the CreateActivity.run() method with the necessary parameters to create a new activity. If any errors occur during this process, an appropriate error response is returned. Otherwise, the data is returned. [Link to app.py file](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/backend-flask/app.py).

The seed.sql file in the backend-flask/db directory has been updated to include sample data for the users table. This ensures that the database is initialized with some initial user data for testing and demonstration purposes. [Link to seed.sql file](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/backend-flask/db/seed.sql).

In the backend-flask/services directory, the create_activity.py file has been updated with a CreateActivity class that now includes a run() method. This method takes in the message, cognito_user_id, and ttl as parameters. Inside the run() method, a model dictionary is initialized with errors and data keys. Various validations are performed on the parameters, and if the validations pass, the CreateActivity.create_activity() method is called to create a new activity in the database. The resulting activity object is fetched from the database and added to the model dictionary. Finally, the model dictionary is returned. [Link to create_activity.py file](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/backend-flask/services/create_activity.py).

The create.sql file in the backend-flask/db/sql/activities directory has been updated to include a query for inserting a new activity into the activities table. This SQL query is used when creating a new activity in the database.  [Link to create.sql file](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/backend-flask/db/sql/activities/create.sql).

In the frontend-react-js/src/components directory, the ActivityForm.js file has been updated to include the necessary imports and code for submitting the form. The backend URL is obtained from the environment variables, and the access token is retrieved using the getAccessToken() function. The form data is then sent as a POST request to the backend API.
[Link ActivityForm.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/components/ActivityForm.js).

The provided scripts, ./bin/db/setup and ./bin/db/connect, are used to set up and connect to the database, respectively. These scripts facilitate the database-related operations during the CI/CD process.
* [Link ./bin/db/setup](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/bin/db/setup).
* [Link ./bin/db/connect](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/bin/db/connect).
  
The changes made to the activity form are committed to the Git repository, allowing for version control and collaboration among team members.

In the aws/cfn/cicd directory, the config.toml file has been updated with the correct repository and artifact bucket names. These values ensure that the CI/CD pipeline is linked to the appropriate resources.

The old CodeBuild project in the AWS console is deleted to remove any outdated configurations or artifacts.

The template.yaml file in the aws/cfn/cicd directory has been updated to include a CodeBuild project for baking container images. The template includes parameters for the log group path, log stream name, CodeBuild image, compute type, timeout, build spec, and artifact bucket name. The CodeBuild project is configured with the specified parameters, role, and policies.
* [Link config toml file](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/aws/cfn/cicd/config.toml).
* [Link  template yaml file](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/aws/cfn/cicd/template.yaml).

The nested/codebuild.yaml file in the aws/cfn/cicd directory has also been updated to include the ArtifactBucketName parameter. This parameter allows the CodeBuild project to access the necessary artifacts stored in the S3 bucket.

The ./bin/cfn/cicd bash script is executed to deploy the updated CloudFormation stacks for the CICD pipeline. This script ensures that the changes are applied correctly and consistently.
[Link to ./bin/cfn/cicd bash script](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main//bin/cfn/cicd).

A new pull request is created in GitHub to merge the changes from the main branch into the prod branch. This pull request triggers the CICD pipeline to build and deploy the changes, ensuring that the application is updated in the production environment.

In the AWS Pipeline, the execution of the backend service is stopped and abandoned. The old cruddur-backend-fargate service is deleted from the pipeline, making way for the updated service to be deployed.
  
# Replies.
The following is the updates and changes made to various files and components related to the Week-X Replies feature. It provides a comprehensive overview of the modifications made to improve functionality and user experience. The updates include changes to frontend and backend files, database queries, migration scripts, and CSS styles.
  
1. Update - frontend-react-js/src/components/ReplyForm.js: [Link to ReplyForm.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/components/ReplyForm.js).
* Description: This update handles the submission of reply forms in the frontend. It retrieves the access token, sends a POST request to the backend API, and updates the activity feed accordingly.
  
2. Update - backend-flask/routes/activities.py: [Link toa ctivities.py](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/backend-flask/routes/activities.py).
* Description: This update adds a new route in the backend to handle replies to activities. It validates the message and user ID, calls the appropriate service to create a reply, and returns the model JSON.
  
3. Update - backend-flask/services/create_reply.py: [Link to create_reply.py](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/backend-flask/services/create_reply.py).
* Description: This update includes a new service for creating replies. It performs validations on the message and user ID, creates a new reply in the database, and returns the resulting model JSON.

4. Create - backend-flask/db/sql/activities/reply.sql: [Link to reply.sql](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/backend-flask/db/sql/activities/reply.sql).
* Description: This newly created SQL file contains an INSERT query for adding replies to the activities table in the database.

5. Update - backend-flask/db/sql/activities/object.sql: [Link to object.sql](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/backend-flask/db/sql/activities/object.sql).
* Description: This update modifies the object SQL query for activities to exclude the reply_to_activity_uuid field.
  
6. Update - bin/db/migrate: [Link to bin/db/migrate](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/bin/db/migrate).
* Description: This update modifies the migration script to correctly compare the last successful run timestamp with the migration file timestamp during the migration process.
  
7. Update - bin/db/rollback: * [Link to bin/db/rollback](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/bin/db/rollback).
* Description: This update modifies the rollback script to set the last successful run timestamp after rolling back a migration file.
  
8. Update - bin/generate/migration: [Link to bin/generate/migration](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/bin/generate/migration).
* Description: This update modifies the migration generation script to remove the unnecessary instantiation of a migration class.
  
9. Update - backend-flask/db/sql/activities/home.sql: [Link home.sql](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/backend-flask/db/sql/activities/home.sql).
* Description: This update modifies the SQL query for retrieving activities on the home page to include the replies count and other relevant information.
  
10. Update - backend-flask/db/sql/activities/object.sql: [Link to object.sql](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/backend-flask/db/sql/activities/object.sql).
* Description: This update modifies the SQL query for retrieving activity objects to exclude the reply_to_activity_uuid field.
  
11. Run Migration - reply_to_activity_uuid_to_string: [Link to migrations script](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/bin/generate/migration).
* Description: This migration updates the reply_to_activity_uuid column in the activities table to change its data type from UUID to string.
  
12. Update - frontend-react-js/src/components/ActivityItem.js: [Link to ActivityItem.js](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/components/ActivityItem.js).
* Description: This update modifies the rendering of activity items to include a section for displaying replies to each activity.
  
13. Update - frontend-react-js/src/components/ActivityItem.css:
* Description: This update adds missing CSS styles for the activity item and replies sections to ensure proper layout and presentation. [Link to ActivityItem.css](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/frontend-react-js/src/components/ActivityItem.css).
  
14. Run Migration - ./bin/db/migrate:
* Description: This command is used to execute the migration process, applying any pending database schema changes. [Link to migration script](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/bin/generate/migration).
  
  
# Error Handling and Fetch Requests.
Updated mades to handle errors and create a new component for making http requests.

1. ./bin/db/setup:
 * This command is used to run the database setup script.
2. Update backend-flask/db/sql/activities/home.sql:
 * This update modifies a SQL query in the file backend-flask/db/sql/activities/home.sql.
 * The updated query selects various columns from the public.activities table and joins it with the public.users table.
 * The result is ordered by the created_at column in descending order.
3. Update backend-flask/db/sql/activities/show.sql:
 * This update modifies a SQL query in the file backend-flask/db/sql/activities/show.sql.
 * The updated query selects various columns from the public.activities table and joins it with the public.users table.
 * Additionally, a subquery is used to fetch replies related to each activity.
 * The result is ordered by the created_at column in descending order.
4. Update backend-flask/services/create_activity.py:
 * This update modifies the CreateActivity class in the backend-flask/services/create_activity.py file.
 * The run method of the CreateActivity class is updated to handle error conditions and create an activity record in the database.
 * The method takes input parameters such as message, cognito_user_id, and ttl (time-to-live) to create the activity.
 * It performs validations on the input parameters and generates appropriate error messages if any validation fails.
 * If there are no errors, it calculates the expiration time based on the ttl and creates the activity in the database.
 * Finally, it returns a model object with the created activity data or error information.
5. Update backend-flask/services/create_message.py:
 * This update modifies the create_message.py file in the backend-flask/services directory.
 * The update adds additional error handling for messages that exceed the maximum character limit.
 * If the message length exceeds 1024 characters, it adds the error code 'message_exceed_max_chars_1024' to the model['errors'] list.
6. Update backend-flask/services/create_reply.py:
 * This update modifies the create_reply.py file in the backend-flask/services directory.
 * Similar to the previous update, it adds additional error handling for replies that exceed the maximum character limit.
 * If the message length exceeds 1024 characters, it adds the error code 'message_exceed_max_chars_1024' to the model['errors'] list.
7. Create frontend-react-js/src/lib/Requests.js:
 * This creates a new file Requests.js in the frontend-react-js/src/lib directory.
 * The file defines several functions (request, post, put, get, destroy) to handle HTTP requests using the Fetch API.
 * These functions accept parameters such as the HTTP method, URL, payload data, error handling function, and success function.
 * They set the necessary headers for the request and handle different response scenarios (success, error with JSON data, network error).
 * The response data is processed and passed to the success function if the request is successful.
 * If there are errors, they are handled by setting error messages or logging them to the console.
8. Update frontend-react-js/src/components/ActivityFeed.js:
 * This update modifies the ActivityFeed.js file in the frontend-react-js/src/components directory.
 * It updates the rendering logic of the ActivityFeed component.
 * If there are no activities available, it displays a message within a div element with the class activity_feed_primer.
 * If there are activities, it maps through the activities and renders an ActivityItem component for each activity.
9. Update --> frontend-react-js/src/components/ActivityForm.js:
 * Event Handlers: Several event handler functions are defined, including onsubmit, textarea_onchange, and ttl_onchange. These functions handle form submission, textarea value changes, and TTL (time-to-live)        value changes, respectively.
 * Form Submission: When the form is submitted, an HTTP POST request is made to the backend API. The request includes the message and ttl values from the form. If the request is successful, the returned data is    used to update the activities list and reset the form fields.
 * JSX Rendering: The JSX code defines the structure and elements of the form. It includes a textarea for entering the activity message, a character count display, a submit button, and a dropdown for selecting      the TTL value. Additionally, a FormErrors component is rendered to display any errors that occur during form submission.
10. Create --> frontend-react-js/src/components/FormErrorItem.js:
 * Render Error Function: The render_error function is defined to handle different error codes and return the corresponding error message.
 * JSX Rendering: The JSX code renders a <div> element that displays the error message returned by the render_error function.
11. Create --> frontend-react-js/src/components/FormErrors.js:
 * FormErrors.js in the frontend-react-js/src/components directory is being created. This component is responsible for rendering a list of error messages.
 * JSX Rendering: The JSX code checks if there are any errors in the props.errors array. If there are errors, it renders a <div> element with the errors class. Inside this element, it maps over the error codes      and renders a FormErrorItem component for each error code.
12. Update --> frontend-react-js/src/components/MessageForm.js:
 * Event Handlers: The onsubmit and textarea_onchange functions are defined to handle form submission and textarea value changes, respectively.
 * Form Submission: When the form is submitted, an HTTP POST request is made to the backend API to send the direct message. The request includes the message value from the form. If the request is successful, the    returned data is used to update the messages list.
 * JSX Rendering: The JSX code defines the structure and elements of the form. It includes a textarea for entering the message, a character count display, and a submit button. Additionally, a FormErrors            component is rendered to display any errors that occur during form submission.
13. Update --> frontend-react-js/src/components/ProfileForm.js:
 * This file is responsible for rendering a form component used to edit user profiles. Here's an overview of the changes:
 * The JSX code defines the structure and elements of the form. It includes an input field for uploading an avatar image, input fields for entering the display name and bio, and a submit button. Additionally, a    FormErrors component is rendered to display any errors that occur during form submission.
14. Update --> frontend-react-js/src/components/ReplyForm.js:
 * Event Handlers: The onsubmit and textarea_onchange functions are defined to handle form submission and textarea value changes, respectively.
 * Form Submission: When the form is submitted, an HTTP POST request is made to the backend API to submit the reply. The request includes the activity_uuid and message values. If the request is successful, the      returned data is used to update the activities list and reset the form fields.
 * JSX Rendering: The JSX code defines the structure and elements of the form. It includes the activity content, a textarea for entering the reply message, a character count display, a submit button, and a          FormErrors component to display any errors that occur during form submission.
15. Update --> frontend-react-js/src/pages/HomeFeedPage.js:
 * State Variables: The activities, popped, poppedReply, replyActivity, and user state variables are declared using the React.useState hook. These variables store the activities list, the state of the activity      form popup, the state of the reply form popup, the activity for which a reply is being composed, and the user data, respectively.
 * Data Fetching: The loadData function is defined to fetch the activities data from the backend API using an HTTP GET request.
 * useEffect Hook: The useEffect hook is used to fetch the data and check the user authentication status when the component mounts.
 * JSX Rendering: The JSX code defines the structure and elements of the home feed page. It includes the desktop navigation, activity form, reply form, activity feed, and desktop sidebar. The ActivityForm and      ReplyForm components are passed relevant props and functions to handle form submission and update the activities list.
16. Update --> frontend-react-js/src/pages/MessageGroupNewPage.js:
 * This file is responsible for rendering the message group page for a specific user. Here's an overview of the changes:
 * State Variables: The otherUser, messageGroups, messages, popped, and user state variables are declared using the React.useState hook. These variables store the data related to the other user, message groups,    messages, the state of the message form popup, and the user data, respectively.
 * Data Fetching: The loadUserShortData and loadMessageGroupsData functions are defined to fetch the user and message groups data from the backend API using HTTP GET requests.
 * useEffect Hook: The useEffect hook is used to fetch the data and check the user authentication status when the component mounts.
 *JSX Rendering: The JSX code defines the structure and elements of the message group page. It includes the desktop navigation, message group feed, messages feed, and message form. The MessageGroupFeed component   is passed relevant props to display the other user's data and the message groups.
17. Update --> frontend-react-js/src/pages/MessageGroupPage.js:
 * This file defines the MessageGroupsPage component, which represents the page for displaying message groups. It imports the required dependencies, including DesktopNavigation and MessageGroupFeed components,      as well as the checkAuth and getAccessToken functions from the CheckAuth module.
 * The component's main function initializes state variables using the React.useState hook, including messageGroups, popped, user, and dataFetchedRef. The messageGroups variable stores an array of message          groups, popped keeps track of the state of the message form popup, user holds the user data, and dataFetchedRef is a reference object used to prevent duplicate data fetching.
 * The loadData function is defined to fetch the message groups data from the backend API using an HTTP GET request.
 * The useEffect hook is used to load the data and check the user authentication status when the component mounts. It prevents duplicate data fetching by checking the dataFetchedRef value.
 * The JSX code renders the message groups page, including the desktop navigation, message group feed, and a content div.
18. Updated --> frontend/src/pages/NotificationsFeedPage.js:
 * The component's main function initializes state variables using the React.useState hook, including activities, popped, poppedReply, replyActivity, user, and dataFetchedRef. The activities variable stores an      array of activities, popped and poppedReply keep track of the state of popups, replyActivity stores the selected activity for replying, user holds the user data, and dataFetchedRef is a reference object used    to prevent duplicate data fetching.
 * The loadData function is defined to fetch the activities data from the backend API using an HTTP GET request.
 * The useEffect hook is used to load the data and check the user authentication status when the component mounts. It prevents duplicate data fetching by checking the dataFetchedRef value.
 * The JSX code renders the notifications feed page, including the desktop navigation, content div with activity form and reply form, and the activity feed section.
19. Updated --> frontend/src/pages/SignInPage.js:
 * The component's main function initializes state variables using the React.useState hook, including email, password, and errors. The email and password variables store the user's input values, while errors  *    stores any form validation errors.
 * The onsubmit function is defined to handle the form submission. It prevents the default form submission behavior, clears any previous errors, and attempts to sign in the user using the provided email and        password. If successful, the user's access token is stored in the local storage, and the user is redirected to the home page. If the user is not confirmed, they are redirected to the confirmation page. If an    error occurs during sign-in, the error message is stored in the errors state variable.
 * The email_onchange, password_onchange, and other similar functions handle the changes in the respective input fields and update the state variables accordingly.
20. Updated frontend/src/pages/SignupPage.js
 * The SignupPage component represents the page for user sign-up. It allows users to create a Cruddur account by providing their name, email, username, and password. The component uses the AWS Amplify library      for authentication.
21. Updated --> frontend/src/pages/SignupPage.js:
 * The SignupPage.js component is responsible for rendering the signup page of the application. It provides a form for users to sign up by entering their name, email, username, and password. Upon submission, the    component sends a request to the backend API to create a new user account using the provided information. If successful, the user is redirected to the confirmation page. If there are any errors during the        signup process, they are displayed on the form
 * errors: A string representing any errors that occur during the signup process.
 * onsubmit: A function that handles the form submission event. It sends a request to the backend API using AWS Amplify's Auth.signUp method to create a new user account. Upon success, the user is redirected to    the confirmation page. If an error occurs, it is captured and displayed in the errors state.
22. Updated --> frontend/src/pages/UserFeedPage.js:
 * The UserFeedPage.js component represents the user feed page of the application. It displays the activity feed, profile information, and allows users to post new activities and update their profile. The          component fetches the user's activities and profile data from the backend API upon component mount.
 * Import Added: get from 'lib/Requests': A function for making GET requests to the backend API.
 * loadData: A function that fetches the user's activities and profile data from the backend API using an HTTP GET request.
 * dataFetchedRef: A reference object used to prevent duplicate data fetching.
 * The component uses the useEffect hook to load the data and check the user authentication status when the component mounts. It prevents duplicate data fetching by checking the dataFetchedRef value.

# Activity Show Page.
 * Changes made to the Week-X Activity Show Page:

 * The reply_to_activity_uuid column in the activities table was changed from an integer to a string. This was done to allow for more flexibility in the way that replies are handled.
 * The show.sql query in the activities database was updated to reflect the change to the reply_to_activity_uuid column.
 * The data_show_activity route in the users.py file was updated to return the updated show.sql query.
 * The ActivityShowPage component in the frontend-react-js project was updated to handle the updated show.sql query.
 * The ActivityActionLike, ActivityActionReply, ActivityActionRepost, and ActivityActionShare components in the frontend-react-js project were updated to handle the updated show.sql query.
 * The ActivityContent.css file in the frontend-react-js project was updated to reflect the changes to the ActivityShowPage component.
 * The ActivityContent.js file in the frontend-react-js project was updated to reflect the changes to the ActivityShowPage component.
 * The backend-flask/services/show_activity.py file was updated to include the following changes:
 * The reply_to_activity_uuid column is now a string.
 * The show.sql query has been updated to reflect the change to the reply_to_activity_uuid column.
 * The results variable now returns a JSON object that contains the updated data for the activity.

 * Specific changes made to each file:

 * reply_to_activity_uuid column in the activities table was changed from an integer to a string.
 * show.sql query in the activities database was updated to reflect the change to the reply_to_activity_uuid column.
 * data_show_activity route in the users.py file was updated to return the updated show.sql query.
 * ActivityShowPage component in the frontend-react-js project was updated to handle the updated show.sql query.
 * ActivityActionLike, ActivityActionReply, ActivityActionRepost, and ActivityActionShare components in the frontend-react-js project were updated to handle the updated show.sql query.
 * ActivityContent.css file in the frontend-react-js project was updated to reflect the changes to the ActivityShowPage component.
 * ActivityContent.js file in the frontend-react-js project was updated to reflect the changes to the ActivityShowPage component.
 * backend-flask/services/show_activity.py file was updated to include the following changes:
 * The reply_to_activity_uuid column is now a string.
 * The show.sql query has been updated to reflect the change to the reply_to_activity_uuid column.
 * The results variable now returns a JSON object that contains the updated data for the activity.
 
The changes made to the Week-X Activity Show Page allow for more flexibility in the way that replies are handled. The updated show.sql query now returns a JSON object that contains the updated data for the      activity, which allows the ActivityShowPage component to be updated to reflect the changes
  
# CORS.
* CORS stands for Cross-Origin Resource Sharing. It is a mechanism that allows web browsers to make requests to resources from other domains. By default, web browsers restrict these requests to prevent malicious   websites from accessing resources from other websites without the user's permission.
* In the Week-X Activity Show Page, you were having an issue with CORS because the frontend and backend were hosted on different domains. This meant that the frontend was not able to make requests to the           backend.
* To resolve this issue, I updated the aws/cfn/service/config.toml
* These lines specify the frontend and backend URLs. By setting these values, you are telling the frontend that it is allowed to make requests to the backend. Once you made this change, the issue with CORS was     resolved and the frontend was able to make requests to the backend. [Link to toml file](https://github.com/jess-bk/aws-bootcamp-cruddur-2023/blob/main/aws/cfn/service/config.toml).

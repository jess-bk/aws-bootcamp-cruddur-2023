# Week 4 — Postgres and RDS
PostgreSQL is a popular open-source relational database management system (RDBMS) that is widely used by developers and organizations. Amazon Web Services (AWS) provides a managed PostgreSQL database service called Amazon RDS (Relational Database Service), which makes it easy to set up, operate, and scale PostgreSQL databases in the cloud.

Amazon RDS for PostgreSQL provides several benefits to users, including automatic backups, automated software patching, and replication for high availability. It also supports Amazon Aurora PostgreSQL, which is a highly scalable and performance-optimized version of PostgreSQL.

With Amazon RDS for PostgreSQL, you can choose the instance type, storage capacity, and other configuration settings that best fit your application requirements. You can also easily scale up or down your PostgreSQL database based on changing workload demands.

One of the key advantages of using Amazon RDS for PostgreSQL is that it takes care of many of the routine database management tasks, such as backups, patching, and monitoring, allowing you to focus on developing your application. Additionally, AWS provides several tools and services to help you manage your PostgreSQL databases, including Amazon CloudWatch for monitoring, AWS Database Migration Service for migrating data, and AWS Schema Conversion Tool for converting database schemas.

# Setting RDS Instance In AWS By Using Cli
1. select your zone in aws --> us-east-1
2. paste code into cli and hit enter
```
aws rds create-db-instance \
  --db-instance-identifier cruddur-db-instance \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --engine-version  14.6 \
  --master-username cruddurroot \
  --master-user-password <enter password min 8 characters> \
  --allocated-storage 20 \
  --availability-zone us-east-1a \
  --backup-retention-period 0 \
  --port 5432 \
  --no-multi-az \
  --db-name cruddur \
  --storage-type gp2 \
  --publicly-accessible \
  --storage-encrypted \
  --enable-performance-insights \
  --performance-insights-retention-period 7 \
  --no-deletion-protection
```
The above command is using the AWS CLI (Command Line Interface) to create a new PostgreSQL RDS (Relational Database Service) instance in AWS with the following 
* --db-instance-identifier option sets a unique name for the RDS instance, in this case cruddur-db-instance.
* --db-instance-class option sets the instance type as db.t3.micro.
* --engine option sets the database engine to be used as PostgreSQL.
* --engine-version option sets the version of PostgreSQL to be used, in this case 14.6.
* --master-username option sets the master username for the database, in this case cruddurroot.
* --master-user-password option sets the master user password for the database.
* --allocated-storage option sets the storage capacity for the database, in GB, in this case 20.
* --availability-zone option sets the availability zone in which the database will be created, in this case us-east-1a.
* --backup-retention-period option sets the number of days to retain automated backups, in this case 0, meaning no backups will be retained.
* --backup-retention-period option sets the number of days to retain automated backups, in this case 0, meaning no backups will be retained.
* --no-multi-az option specifies that the database should not be created with a Multi-AZ configuration.
* --db-name option sets the name of the database to be created, in this case cruddur.
* --storage-type option sets the storage type to be used, in this case gp2.
* --publicly-accessible option allows the database to be accessed publicly over the internet.
* --storage-encrypted option specifies that the storage for the database should be encrypted.
* --enable-performance-insights option enables Performance Insights, a feature that provides database performance monitoring and diagnostics.
* --performance-insights-retention-period option sets the number of days to retain Performance Insights data, in this case 7.
* --no-deletion-protection option specifies that deletion protection should not be enabled for the RDS instance.
3. Start docker-compose --> docker compose up (comment out dynamoDB to free up container space if needed).
4. Check if RDS is running in AWS if yes then stop temporarily. (this will insure not to incure any charges), the RDS instance will incure charges after 7 days of being active and will need stoping before that date from incuring any charges.
5. Check if you have a running connection to your PostgreSQL in cli
```
psql -Upostgres --host localhost
```
6. Common PSQL commands that we can use
```
\x on -- expanded display when looking at data
\q -- Quit PSQL
\l -- List all databases
\c database_name -- Connect to a specific database
\dt -- List all tables in the current database
\d table_name -- Describe a specific table
\du -- List all users and their roles
\dn -- List all schemas in the current database
CREATE DATABASE database_name; -- Create a new database
DROP DATABASE database_name; -- Delete a database
CREATE TABLE table_name (column1 datatype1, column2 datatype2, ...); -- Create a new table
DROP TABLE table_name; -- Delete a table
SELECT column1, column2, ... FROM table_name WHERE condition; -- Select data from a table
INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...); -- Insert data into a table
UPDATE table_name SET column1 = value1, column2 = value2, ... WHERE condition; -- Update data in a table
DELETE FROM table_name WHERE condition; -- Delete data from a table
```
7. Create a DB in postgreSQL
```
CREATE database cruddur;
```
type --> \l --> this will show the DB that you just created.
8. In IDE(vs code) backend-flask create a new folder --> db --> new file --> schema.sql
9. schema.sql code
```
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public.activities;


CREATE TABLE public.users (
  uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  display_name text NOT NULL,
  handle text NOT NULL,
  email text NOT NULL,
  cognito_user_id text NOT NULL,
  created_at TIMESTAMP default current_timestamp NOT NULL
);

CREATE TABLE public.activities (
  uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_uuid UUID NOT NULL,
  message text NOT NULL,
  replies_count integer DEFAULT 0,
  reposts_count integer DEFAULT 0,
  likes_count integer DEFAULT 0,
  reply_to_activity_uuid integer,
  expires_at TIMESTAMP,
  created_at TIMESTAMP default current_timestamp NOT NULL
);
```
10. Stop PostgeSQL and import the schema file into PostgreSQL DB and cd into backend-flask and run the following external script.
```
psql cruddur < db/schema.sql -h localhost -U postgres
```
11. Create a URL CONNECTION STRING instead of running the script everytime we update and check if the CONNECTION URL STRING works in PostgreSQL --> run the script in cli
```
psql postgresql://postgres:password@localhost:5432/cruddur
```
this show the PostgreSQL output password and local host
12. Quit out of PostgreSQL --> run \q and run script into the bash terminal --> cli
```
export CONNECTION_URL="postgresql://postgres:password@localhost:5432/cruddur"
```
13. type in cli --> 
```
psql CONNECTION_URL
```
output: cruudur=# and then quit --> \q
14. Now set the env vars for DB connections in gitpod
```
gp env CONNECTION_URL="postgresql://postgres:password@localhost:5432/cruddur"
```
15 Setup connection for the RDS INSTANCE --> cli
```
export PROD_CONNECTION_URL="postgresql://root:<PASSWORD>@<ENTER DATA BASE ENDPOINT AND PORT FROM AWS>RDS:5433/cruddur"
```
16. Now set the env vars for DB connections in gitpod for RDS INSTANCE --> cli
```
gp env PROD_CONNECTION_URL="postgresql://root:<PASSWORD>@<ENTER DATA BASE ENDPOINT AND PORT FROM AWS>RDS:5433/cruddur"
```
17. Create a bin file to add scripts to add and remove from the schema file --> backend-flask in the root create a folder named bin and create 3 files db-create, db-drop, db-schema-load.
run in cli --> whereis bash --> add the path to all three file at the top
*db-create
```
#! /usr/bin/bash

CYAN='\033[1;36m'
NO_COLOR='\033[0m'
LABEL="db-create"
printf "${CYAN}== ${LABEL}${NO_COLOR}\n"

echo "db-create"

NO_DB_CONNECTION_URL=$(sed 's/\/cruddur//g' <<<"$CONNECTION_URL")
psql $NO_DB_CONNECTION_URL -c "create database cruddur;"
```
*db-drop
```
#! /usr/bin/bash

CYAN='\033[1;36m'
NO_COLOR='\033[0m'
LABEL="db-drop"
printf "${CYAN}== ${LABEL}${NO_COLOR}\n"

echo "db-drop"

NO_DB_CONNECTION_URL=$(sed 's/\/cruddur//g' <<<"$CONNECTION_URL")
psql $NO_DB_CONNECTION_URL -c "drop database cruddur;"
```
*db-schema-load
```
#! /usr/bin/bash

CYAN='\033[1;36m'
NO_COLOR='\033[0m'
LABEL="db-schema-load"
printf "${CYAN}== ${LABEL}${NO_COLOR}\n"

schema_path="$(realpath .)/db/schema.sql"
echo $schema_path

if [ "$1" = "prod" ]; then
  echo "Running in production mode"
  URL=$PROD_CONNECTION_URL
else
  URL=$CONNECTION_URL
fi

psql $URL cruddur < $schema_path
```
18. When creating new bash files you need to give premission to execute this will set for the user.
```
chmod u+x bin/db-create
chmod u+x bin/db-drop
chmod u+x bin/db-schema-load
```
if you want to set permission for all
```
chmod +x bin/db-create
chmod +x bin/db-drop
chmod +x bin/db-schema-load
```
run in cli check if the access has been given --> ls -l ./bin (cd into backend-flask)
19. run command to drop db --> ./bin/db-drop
20. run command to create db --> ./bin/db-create
21. run command to schema --> ./bin/db-schema-load --> this should create the tables from the schema
22. create a file inside bin --> db-connect
```
#! /usr/bin/bash
if [ "$1" = "prod" ]; then
  echo "Running in production mode"
  URL=$PROD_CONNECTION_URL
else
  URL=$CONNECTION_URL
fi

psql $URL
```
23. grant access permission to the bash script --> chmod u+x db-connect --> check if worked --> ./bin/db-connect.
24. check if tables exist --> \dt.
25. create a new inside db --> seed.sql
```
-- this file was manually created
INSERT INTO public.users (display_name, handle, cognito_user_id)
VALUES
  ('Andrew Brown', 'andrewbrown' ,'MOCK'),
  ('Andrew Bayko', 'bayko' ,'MOCK');

INSERT INTO public.activities (user_uuid, message, expires_at)
VALUES
  (
    (SELECT uuid from public.users WHERE users.handle = 'andrewbrown' LIMIT 1),
    'This was imported as seed data!',
    current_timestamp + interval '10 day'
  )
```
26. create a new file in bin folder --> db-seed
```
#! /usr/bin/bash

CYAN='\033[1;36m'
NO_COLOR='\033[0m'
LABEL="db-seed"
printf "${CYAN}== ${LABEL}${NO_COLOR}\n"

seed_path="$(realpath .)/db/seed.sql"
echo $seed_path

if [ "$1" = "prod" ]; then
  echo "Running in production mode"
  URL=$PROD_CONNECTION_URL
else
  URL=$CONNECTION_URL
fi

psql $URL cruddur < $seed_path
```
27. grant access permission to the bash script --> chmod u+x db-seed --> check if worked --> ./bin/db-seed.
28. run in cli --> ./bin/seed.sql

# Checking Data
To check the data in the data base run --> ./bin/db-connect --> \dt --> SELECT * FROM activities; 
to check the data in more readable format --> first quit out of data table --> then type --> \x on and then type --> SELECT * FROM activities; 

# Check The Active Connection We Are Using In PostgreSQL
1. create a new file in bin folder --> db-sessions.
2. add the code below
```
#! /usr/bin/bash
CYAN='\033[1;36m'
NO_COLOR='\033[0m'
LABEL="db-sessions"
printf "${CYAN}== ${LABEL}${NO_COLOR}\n"

if [ "$1" = "prod" ]; then
  echo "Running in production mode"
  URL=$PROD_CONNECTION_URL
else
  URL=$CONNECTION_URL
fi

NO_DB_URL=$(sed 's/\/cruddur//g' <<<"$URL")
psql $NO_DB_URL -c "select pid as process_id, \
       usename as user,  \
       datname as db, \
       client_addr, \
       application_name as app,\
       state \
from pg_stat_activity;"
```
3. make the file executable --> chmod u+x bin/db-session.
4. run the bash script --> ./bin/db-session.

# Create a new bash script to Setup Data Base
1. create a new file in the bin folder and name it db-setup.
2. add the code below.
```
#! /usr/bin/bash
-e # stop if it fails at any point

CYAN='\033[1;36m'
NO_COLOR='\033[0m'
LABEL="db-setup"
printf "${CYAN}==== ${LABEL}${NO_COLOR}\n"

bin_path="$(realpath .)/bin"

source "$bin_path/db-drop"
source "$bin_path/db-create"
source "$bin_path/db-schema-load"
source "$bin_path/db-seed"
```
3. make the file executable --> chmod u+x bin/db-setup.
4. run the bash script --> ./bin/db-setup.

# Create a bash script to connect to DB
1. create a file name db-connect
2. add the code below
```
#! /usr/bin/bash
if [ "$1" = "prod" ]; then
  echo "Running in production mode"
  URL=$PROD_CONNECTION_URL
else
  URL=$CONNECTION_URL
fi

psql $URL
```
3. grant access to the script --> chmod u+x bin/db-connect.
4. run the script --> ./bin/db-connect PROD

# Installing Drivers For PostgreSQL
1. add the packages to the requirements.txt file.
```
psycopg[binary]
psycopg[pool]
```
2. now install the packages by running the command in cli.
```
pip install -r requirements.txt
```
# Creating connection with PostgreSQL using Psycopg Connection Pooling 
1. create a new file inside lib --> db.py.
2. add the code below.
```
from psycopg_pool import ConnectionPool
import os

  def query_wrap_object(template):
    sql = f"""
    (SELECT COALESCE(row_to_json(object_row),'{{}}'::json) FROM (
    {template}
    ) object_row);
    """
    return sql
  def query_wrap_array(template):
    sql = f"""
    (SELECT COALESCE(array_to_json(array_agg(row_to_json(array_row))),'[]'::json) FROM (
    {template}
    ) array_row);
    """
    return sql

connection_url = os.getenv("CONNECTION_URL")
pool = ConnectionPool(connection_url)
```
# Add the connection of the pool to the docker-compose file
```
backend-flask:
  environment:
    CONNECTION_URL: "${CONNECTION_URL}"
    #CONNECTION_URL: "postgresql://postgres:password@db:5432/cruddur"
```
# Import db.py file and update the home_activities.py to make a query to the DB
```
from datetime import datetime, timedelta, timezone
from opentelemetry import trace

from lib.db import pool, query_wrap_array

#tracer = trace.get_tracer("home.activities")

class HomeActivities:
  def run(cognito_user_id=None):
    #logger.info("HomeActivities")
    #with tracer.start_as_current_span("home-activites-mock-data"):
    #  span = trace.get_current_span()
    #  now = datetime.now(timezone.utc).astimezone()
    #  span.set_attribute("app.now", now.isoformat())

    sql = query_wrap_array("""
    SELECT
      activities.uuid,
      users.display_name,
      users.handle,
      activities.message,
      activities.replies_count,
      activities.reposts_count,
      activities.likes_count,
      activities.reply_to_activity_uuid,
      activities.expires_at,
      activities.created_at
    FROM public.activities
    LEFT JOIN public.users ON users.uuid = activities.user_uuid
    ORDER BY activities.created_at DESC
    """)
    print(sql)
    with pool.connection() as conn:
      with conn.cursor() as cur:
        cur.execute(sql)
        # this will return a tuple
        # the first field being the data
        json = cur.fetchone()
    return json[0]

```
The method is responsible for executing a SQL query to fetch some data from a database using the db module. The SQL query is created using the template method of the db object, which is an instance of the Db class defined in the db module.The query is then executed using the query_array_json method of the db object. The results are then returned by the run method.

# Establish Connection To The PostgreSQL Database
1. AWS console start the RDS connection.
2. AWS setup new security inbound rule
* TYPE --> PostgreSQL
* PROTOCOL --> TCP
* PORT RANGE --> 5432 
* RUN IN CLI --> GITPOD_IP=$(curl ifconfig.me) --> get the ip address and add in AWS source
* SOURCE --> eneter here the ip address
* DESCRIPTION --> GITPOD
* SAVE
3. run in terminal cli
```
psql $PROD_CONNECTION_URL
```
4. now type \ls to show the tables on data base connected to RDS with PostgreSQL

# Modify the security groups in AWS
1. paste these into cli turn by turn and hit enter.
```
export DB_SG_ID="<Add the security group id here from AWS>"
gp env DB_SG_ID="<Add the security group id here from AWS>"

export DB_SG_RULE_ID="<Add the security group rule here from AWS>"
gp env DB_SG_RULE_ID="<Add the security group rule here from AWS>"
```
2. now set the modified security rules --> paste into cli and hit enter.
* first run export GITPOD_IP=$(curl ifconfig.me) in cli and then paste the code in cli 
```
aws ec2 modify-security-group-rules \
    --group-id $DB_SG_ID \
    --security-group-rules "SecurityGroupRuleId=$DB_SG_RULE_ID,SecurityGroupRule={Description=GITPOD,IpProtocol=tcp,FromPort=5432,ToPort=5432,CidrIpv4=$GITPOD_IP/32}"
```
3. create a new bash script to update the GITPOD yml file to load the env vars into AWS RDS security rules
* create a new file db-rds-update-sg-rule inside the bin folder and add the code below.
```
#! /usr/bin/bash

CYAN='\033[1;36m'
NO_COLOR='\033[0m'
LABEL="rds-update-sg-rule"
printf "${CYAN}==== ${LABEL}${NO_COLOR}\n"

aws ec2 modify-security-group-rules \
    --group-id $DB_SG_ID \
    --security-group-rules "SecurityGroupRuleId=$DB_SG_RULE_ID,SecurityGroupRule={Description=GITPOD,IpProtocol=tcp,FromPort=5432,ToPort=5432,CidrIpv4=$GITPOD_IP/32}"
```
4. set the env var's for GITPOD.
```
export GITPOD_IP=$(curl ifconfig.me)
```
5. grant permission to bash script --> chmod u+x bin/rds-update-sg-rule
6. Update GITPOD yaml file to update everytime we start GITPOD
```
command: |
  export GITPOD_IP=$(curl ifconfig.me)
  source  "$THEIA_WORKSPACE_ROOT/backend-flask/bin/db-rds-update-sg-rule"
```
7. Check in AWS RDS security rules if the script has worked and git commit and quit out of gitpod and restart a new GITPOD environment.
8. run script --> ./bin/db-connect PROD
9. make sure in backend-flask and run script --> ./bin/db-schema-load and refresh frontend page.

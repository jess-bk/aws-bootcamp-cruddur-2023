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
export CONNECTION_URL="postgresql://postgres:pssword@127.0.0.1:5433/cruddur"
```
this show the PostgreSQL output password and local host
12. Quit out of PostgreSQL --> run \q and run script into the bash terminal --> cli
```
export CONNECTION_URL="postgresql://postgres:pssword@127.0.0.1:5433/cruddur"
```
13. type in cli --> 
```
psql CONNECTION_URL
```
output: cruudur=# and then quit --> \q
14. Now set the env vars for DB connections in gitpod
```
gp env CONNECTION_URL="postgresql://postgres:pssword@127.0.0.1:5433/cruddur"
```
15 Setup connection for the RDS INSTANCE --> cli
```
export PROD_CONNECTION_URL="postgresql://root:<PASSWORD>@<ENTER DATA BASE ENDPOINT AND PORT FROM AWS RDS:5433/cruddur>"
```
16. Now set the env vars for DB connections in gitpod for RDS INSTANCE --> cli
```
gp env PROD_CONNECTION_URL="postgresql://root:<PASSWORD>@<ENTER DATA BASE ENDPOINT AND PORT FROM AWS RDS:5433/cruddur>
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
22. create a file insode bin --> db-connect
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
24. check if tables exist --> /dt.
25. create a new file in bin folder --> db-seed
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
26. grant access permission to the bash script --> chmod u+x db-seed --> check if worked --> ./bin/db-seed.
27. create a new inside db --> seed.sql
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
28. run in cli --> ./bin/seed.sql

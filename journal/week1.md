# Week 1 — App Containerization

# watched the recorded live stream
1. added the Dockerfile that contains the image and the scirpt that are set of instructions how to run the application, this was created in the backend-flask
2. 
```
FROM python:3.10-slim-buster

# Inside Container
# make a new folder inside container
WORKDIR /backend-flask

# Outside Container -> Inside Container
# this contains the libraries want to install to run the app
COPY requirements.txt requirements.txt

# Inside Container
# Install the python libraries used for the app
RUN pip3 install -r requirements.txt

# Outside Container -> Inside Container
# . means everything in the current directory
# first period . - /backend-flask (outside container)
# second period . /backend-flask (inside container)
COPY . .

# Set Enviroment Variables (Env Vars)
# Inside Container and wil remain set when the container is running
ENV FLASK_ENV=development

EXPOSE ${PORT}

# CMD (Command)
# python3 -m flask run --host=0.0.0.0 --port=4567
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0", "--port=4567"]
```

3. step 3 was to install the and run the flask app
```
pip3 install -r requiremnets.txt
```

5. setting the environment variables that are in the app.py that allow access to the app
```
export FRONTEND_URL"*"
export BACKEND_URL"*"
```

6. the option to unset the environment variables
```
unset FRONTEND_URL
unset BACKEND_URL
```

7. checking if the environment variables have been set
```
 env | grep BACKEND_URL
 env | grep FRONTEND_URL
```

8. This command will open ports where the app is running on and you would have to unlock the port to gain acccess to the browser command to run the backend application
```
python3 -m flask run --host=0.0.0.0  --port=4567
```

10. This command is used to create a Docker image for a backend application written in Flask, The command docker build -t backend-flask ./backend-flask is used to build a Docker image with a given tag -t and context path ./backend-flask, the Dockerfile for building the image is located.

More specifically, this command instructs Docker to look for a Dockerfile in the ./backend-flask directory and build a Docker image with the name backend-flask. The -t flag stands for "tag" and it allows us to give a name to the Docker image we are building
```
docker build -t  backend-flask ./backend-flask
```

11. The command to run the conatiner
```
docker run --rm -p 4567:4567 -it -e FRONTEND_URL='*' -e BACKEND_URL='*' backend-flask
```

12. The tag in  docker image --> does not mean it is the latest version it is set to latest tag as default by docker

13. In the frontend created Dockerfile and added the following script to create the image for docker.
```
FROM node:16.18

ENV PORT=3000

COPY . /frontend-react-js
WORKDIR /frontend-react-js
RUN npm install
EXPOSE ${PORT}
CMD ["npm", "start"]
```

14. Then run npm i to install the node modules for the frontend application

15. Created docker-compose.yml file in the root directory 
```
version: "3.8"
services:
  backend-flask:
    environment:
      FRONTEND_URL: "https://3000-${GITPOD_WORKSPACE_ID}.${GITPOD_WORKSPACE_CLUSTER_HOST}"
      BACKEND_URL: "https://4567-${GITPOD_WORKSPACE_ID}.${GITPOD_WORKSPACE_CLUSTER_HOST}"
    build: ./backend-flask
    ports:
      - "4567:4567"
    volumes:
      - ./backend-flask:/backend-flask
  frontend-react-js:
    environment:
      REACT_APP_BACKEND_URL: "https://4567-${GITPOD_WORKSPACE_ID}.${GITPOD_WORKSPACE_CLUSTER_HOST}"
    build: ./frontend-react-js
    ports:
      - "3000:3000"
    volumes:
      - ./frontend-react-js:/frontend-react-js

# the name flag is a hack to change the default prepend folder
# name when outputting the image names
networks: 
  internal-network:
    driver: bridge
    name: cruddur
```

14. run the docker-compose file in the vs code by using docker-compose up, this will do a docker run and docker build on both of the containers, now you can open the ports and goto the application, on the frontend added file docker-compose that allows containers front and backend to work together instead of doing them separately, you can update the app and it will take effect as the containers are running and will update the changes.

# Docker
Docker containerization is becoming an increasingly popular method for developing, packaging, deploying, and running software applications

Isolation: Docker containers provide a high level of isolation between applications and dependencies, which helps ensure that software applications run reliably and predictably.

Portability: Docker containers are highly portable and can be run on any platform that supports Docker, making it easy to move applications between different environments, such as development, testing, and production.

Consistency: Docker containers provide consistent environments for development, testing, and production, which helps ensure that software applications run consistently across different environments.

Efficiency: Docker containers are lightweight and efficient, using only the resources that are required to run the application, which helps reduce infrastructure costs.

Speed: Docker containers are fast to start and stop, which helps reduce development and deployment times.

Scalability: Docker containers can be easily scaled up or down based on demand, which helps ensure that applications can handle large numbers of users or requests.

Security: Docker containers provide an added layer of security by isolating applications and dependencies from the underlying host system, which helps reduce the risk of security vulnerabilities.

Versioning: Docker containers can be versioned, allowing developers to easily manage different versions of their application and dependencies.

Collaboration: Docker containers make it easy for developers to collaborate on projects by providing consistent environments for development and testing.

Automation: Docker containers can be easily integrated into automated build and deployment processes, which helps reduce manual tasks and human error.

Flexibility: Docker containers can be used to package and run almost any type of application, including web applications, databases, and microservices.

Open-source: Docker is an open-source technology with a large and active community, which means that there are many resources and tools available to help developers get started and troubleshoot issues.

# Docker Compose

Docker Compose is a tool for defining and running multi-container Docker applications. It allows you to specify the configuration of your application's services, networks, and volumes in a single YAML file. With Docker Compose, you can define a multi-container application as a single entity, allowing you to manage your application and its dependencies as a whole.

Using a Docker Compose file, you can define the containers that make up your application, including their dependencies and relationships, as well as any configuration options that need to be set. This allows you to easily start up and manage all of the containers in your application together, instead of having to start them individually. Docker Compose also provides a number of helpful commands for managing your containers, including starting, stopping, and restarting them.

One of the key benefits of using Docker Compose is that it simplifies the process of managing complex multi-container applications. By defining your application as a single entity, you can easily manage its components and dependencies, and ensure that they are all running correctly. Docker Compose also provides a number of useful features for working with containers, including the ability to easily scale your containers up or down, and to manage their configuration and network settings.

Overall, Docker Compose is a powerful tool for managing multi-container Docker applications, and can help you streamline your development and deployment workflows by simplifying the process of managing complex containerized environments.

# Watched the video for adding notifications 
created a new api endpoint and then created a new component for notification api endpoint and addded to the routing page.
1. added api end point in the openapi.yml file
```
  /api/activities/notifications:
    get:
      description: 'Return a feed of activity for all of those that I follow'
      tags:
        - activities
      parameters: []
      responses:
        '200':
          description: Returns an array of activities
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Activity'

```

2. Added the api endpoint route in app.py
```
from services.notifications_activities import *

@app.route("/api/activities/notifications", methods=['GET'])
@cross_origin()
def data_notifications():
  data = NotificationsActivities.run()
  return data, 200
```

3. Added the notification to service.py that will show the relevent notification to the frontend user
```
from datetime import datetime, timedelta, timezone
class NotificationsActivities:
  def run():
    now = datetime.now(timezone.utc).astimezone()
    results = [{
      'uuid': '68f126b0-1ceb-4a33-88be-d90fa7109eee',
      'handle':  'jess-bk',
      'message': 'I am mern stack developer',
      'created_at': (now - timedelta(days=2)).isoformat(),
      'expires_at': (now + timedelta(days=5)).isoformat(),
      'likes_count': 5,
      'replies_count': 1,
      'reposts_count': 1,
      'replies': [{
        'uuid': '26e12864-1c26-5c3a-9658-97a10f8fea67',
        'reply_to_activity_uuid': '68f126b0-1ceb-4a33-88be-d90fa7109eee',
        'handle':  'andrew brown',
        'message': 'wow amazing!',
        'likes_count': 10,
        'replies_count': 1,
        'reposts_count': 1,
        'created_at': (now - timedelta(days=2)).isoformat()
      }],
    }
    ]
    return results
```

5. Frontent Updates to handle the api endpoint and new page to diaplay the notfications app.js updated to handle the routes
```
import NotificationsFeedPage from './pages/NotificationsFeedPage';

  {
    path: "/notifications",
    element: <NotificationsFeedPage />
  },
```

6. Notifications page and css file
```
import './NotificationsFeedPage.css';
import React from "react";

import DesktopNavigation  from '../components/DesktopNavigation';
import DesktopSidebar     from '../components/DesktopSidebar';
import ActivityFeed from '../components/ActivityFeed';
import ActivityForm from '../components/ActivityForm';
import ReplyForm from '../components/ReplyForm';

// [TODO] Authenication
import Cookies from 'js-cookie'

export default function NotificationsFeedPage() {
  const [activities, setActivities] = React.useState([]);
  const [popped, setPopped] = React.useState(false);
  const [poppedReply, setPoppedReply] = React.useState(false);
  const [replyActivity, setReplyActivity] = React.useState({});
  const [user, setUser] = React.useState(null);
  const dataFetchedRef = React.useRef(false);

  const loadData = async () => {
    try {
      const backend_url = `${process.env.REACT_APP_BACKEND_URL}/api/activities/notifications`
      const res = await fetch(backend_url, {
        method: "GET"
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setActivities(resJson)
      } else {
        console.log(res)
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkAuth = async () => {
    console.log('checkAuth')
    // [TODO] Authenication
    if (Cookies.get('user.logged_in')) {
      setUser({
        display_name: Cookies.get('user.name'),
        handle: Cookies.get('user.username')
      })
    }
  };

  React.useEffect(()=>{
    //prevents double call
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    loadData();
    checkAuth();
  }, [])

  return (
    <article>
      <DesktopNavigation user={user} active={'notifications'} setPopped={setPopped} />
      <div className='content'>
        <ActivityForm  
          popped={popped}
          setPopped={setPopped} 
          setActivities={setActivities} 
        />
        <ReplyForm 
          activity={replyActivity} 
          popped={poppedReply} 
          setPopped={setPoppedReply} 
          setActivities={setActivities} 
          activities={activities} 
        />
        <ActivityFeed 
          title="Notifications" 
          setReplyActivity={setReplyActivity} 
          setPopped={setPoppedReply} 
          activities={activities} 
        />
      </div>
      <DesktopSidebar user={user} />
    </article>
  );
}
```
![image Notification](assets/week%20one%20aws/frontend%20connected%20to%20backend%20and%20updated%20notifications.png)

# Issue with cors
the issue was the notifications were not getting access from the backend because cors was blocking the acccess, generally cors will not alllow acccess to the web if the origin are not set and have not been installed in the app, in the backend we could have set the origins explicitly by addding acccess option to cors by creating a file in the backend and then allowing cors to have access to certain ip address, but i just added them at all the in the app.py file and that just worked fine

![image to update i made on the backend](assets/week%20one%20aws/week-cors-issue.png)

# Watched the video to install and work with dynamodb and postgres
updated the docker-compose.yml file, added the images for docker containers for postgresSQL and Dynamodb
1.
```
version: "3.8"
services:
  backend-flask:
    environment:
      FRONTEND_URL: "https://3000-${GITPOD_WORKSPACE_ID}.${GITPOD_WORKSPACE_CLUSTER_HOST}"
      BACKEND_URL: "https://4567-${GITPOD_WORKSPACE_ID}.${GITPOD_WORKSPACE_CLUSTER_HOST}"
    build: ./backend-flask
    ports:
      - "4567:4567"
    volumes:
      - ./backend-flask:/backend-flask
  frontend-react-js:
    environment:
      REACT_APP_BACKEND_URL: "https://4567-${GITPOD_WORKSPACE_ID}.${GITPOD_WORKSPACE_CLUSTER_HOST}"
    build: ./frontend-react-js
    ports:
      - "3000:3000"
    volumes:
      - ./frontend-react-js:/frontend-react-js
  dynamodb-local:
    # https://stackoverflow.com/questions/67533058/persist-local-dynamodb-data-in-volumes-lack-permission-unable-to-open-databa
    # We needed to add user:root to get this working.
    user: root
    command: "-jar DynamoDBLocal.jar -sharedDb -dbPath ./data"
    image: "amazon/dynamodb-local:latest"
    container_name: dynamodb-local
    ports:
      - "8000:8000"
    volumes:
      - "./docker/dynamodb:/home/dynamodblocal/data"
    working_dir: /home/dynamodblocal
  db:
    image: postgres:13-alpine
    restart: always
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    ports:
      - '5432:5432'
    volumes: 
      - db:/var/lib/postgresql/data

# the name flag is a hack to change the default prepend folder
# name when outputting the image names
networks: 
  internal-network:
    driver: bridge
    name: cruddur

volumes:
  db:
    driver: local
```
2. Run docker-compose up this will start the postgres and dynamoDB local on the specified ports as done above and that will verify or call the correct api because of the ports that are set above

3. running dynamoDB local and checking if it works and setting some data into the local database.
# Create a table
```
aws dynamodb create-table \
    --endpoint-url http://localhost:8000 \
    --table-name Music \
    --attribute-definitions \
        AttributeName=Artist,AttributeType=S \
        AttributeName=SongTitle,AttributeType=S \
    --key-schema AttributeName=Artist,KeyType=HASH AttributeName=SongTitle,KeyType=RANGE \
    --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
    --table-class STANDARD
```
# Create an item inside DB
```
aws dynamodb put-item \
    --endpoint-url http://localhost:8000 \
    --table-name Music \
    --item \
        '{"Artist": {"S": "No One You Know"}, "SongTitle": {"S": "Call Me Today"}, "AlbumTitle": {"S": "Somewhat Famous"}}' \
    --return-consumed-capacity TOTAL  
```
# Print the list of tables in cli
```
aws dynamodb list-tables --endpoint-url http://localhost:8000
```
# Get Records
```
aws dynamodb scan --table-name Music --query "Items" --endpoint-url http://localhost:8000
```
![image DynamoBD get records](assets/week%20one%20aws/DynamoDB_get_records_week1.png)

# POSTGRESQL
1. added script to gitpod.yml file to start up postgresql on starting gitpod
```
  - name: postgres
    init: |
      curl -fsSL https://www.postgresql.org/media/keys/ACCC4CF8.asc|sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/postgresql.gpg
      echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" |sudo tee  /etc/apt/sources.list.d/pgdg.list
      sudo apt update
      sudo apt install -y postgresql-client-13 libp
```

first command downloads the PostgreSQL GPG key for package verification.
second command adds the PostgreSQL repository to the system's package manager.
third command updates the package lists.
fourth command installs the PostgreSQL client and libpq library.
installing the PostgreSQL client, the developer can connect to a remote PostgreSQL database instance from within the Gitpod workspace and perform various database-related tasks.

2. Now you need to copy and paste the first 3 commands turn by turn into the cli and finally the last command to execute.

3. run the follwoing command to start PostgreSQL
```
psql --host localhost psql -Upostgres --host localhost
```
![image PostgreSQL](assets/week%20one%20aws/postgresSQL%20database.png)

# Commands for PostgeSql 

psql: This command is used to start the PostgreSQL interactive terminal, allowing you to interact with a running PostgreSQL server. You can run SQL queries, view tables, and perform other tasks through this terminal.

createdb: This command is used to create a new database in PostgreSQL. You can specify the name of the database as an argument to the command.

dropdb: This command is used to delete a database in PostgreSQL. You can specify the name of the database as an argument to the command.

CREATE TABLE: This SQL statement is used to create a new table in a database. You can specify the name of the table, along with the columns and their data types, in the statement.

ALTER TABLE: This SQL statement is used to modify an existing table in a database. You can add or remove columns, change column data types, and perform other modifications using this statement.

INSERT INTO: This SQL statement is used to insert new rows into a table in a database. You can specify the values for each column in the row being inserted.

UPDATE: This SQL statement is used to update existing rows in a table in a database. You can specify which rows to update and what values to set for each column.

DELETE FROM: This SQL statement is used to delete rows from a table in a database. You can specify which rows to delete based on certain conditions.

SELECT: This SQL statement is used to retrieve data from one or more tables in a database. You can specify which columns to retrieve and filter the results based on certain conditions.

GRANT: This SQL statement is used to grant privileges to specific users or roles in a database. You can grant privileges such as SELECT, INSERT, UPDATE, DELETE, and others.

REVOKE: This SQL statement is used to revoke privileges that were previously granted to users or roles in a database.

# PostgreSQL meta-commands

\q: Quit the psql command-line interface
\l: List all databases
\c <database>: Connect to a specific database
\d: List all tables in the current database
\d <table>: Describe the specified table
\dn: List all schemas in the current database
\df: List all functions in the current database
\df+ <function>: Describe the specified function
\du: List all roles (users) in the current database
\du+ <role>: Describe the specified role
\timing: Toggle timing of SQL statements
\e: Open an external editor to edit the current query buffer before execution
\s: Display current psql settings
\!: Execute a shell command

# Added command to the docker-compose file to install and run npm on starting docker-compose.
```
 command: sh -c "npm i && npm start"
```

# Configured GitPod.yml file to install vs code extensions on start up
![image GitPod.yml vs code extensions](assets/week%20one%20aws/gitpod%20yml%20file.png)

# Health check implemented in the V3 Docker compose file
![image Health Check](assets/week%20one%20aws/health%20check%20docker-compose%20.png)
The healthcheck command is used to define a test that checks whether the container is working properly. If the test fails, the container will be considered unhealthy and will be restarted.

health check sends a curl request to the frontend app running on localhost:3000 and backend running on localhost:3000 . If the request fails, it exits with status code 1 indicating a failure. The health check runs every 10 seconds (interval), and waits for a response for up to 5 seconds (timeout) before considering the check a failure. The health check is retried up to 3 times (retries) before it is considered a failure.

this health check ensures that the frontend and backend is running and responding to requests. If the health check fails, the Docker container for the frontend and backend will be restarted automatically
 
# Multi-Stage building for a Dockerfile build
backend added a new stage at the end of the file. This new stage will be used to build the production image.
in this new stage, we're copying our requirements.txt file and installing the dependencies. Then we're copying the rest of the code and setting the FLASK_ENV environment variable to production. Finally, we're exposing the same port as before and running the Flask app with the same command
1.
```
 # Backend Production Stage
FROM python:3.10-slim-buster as production

WORKDIR /backend-flask

COPY requirements.txt requirements.txt

RUN pip3 install --no-cache-dir --upgrade pip && \
    pip3 install --no-cache-dir -r requirements.txt

COPY . .

ENV FLASK_ENV=production

EXPOSE ${PORT}

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0", "--port=4567"]
```
2. frontend app added a new stage at the end of the file. This new stage will be used to build the production image, In this new stage, we're copying the entire directory as before, installing the production-only dependencies with npm install --only=production, and running the same command to start the app

```
# Frontend Production Stage
FROM node:16.18 as production

ENV PORT=3000

COPY . /frontend-react-js
WORKDIR /frontend-react-js
RUN npm install --only=production
EXPOSE ${PORT}
CMD ["npm", "start"]
```
3. updated docker-compose.yml file with the new multi-stage build for the frontend, In this updated version of the file, i have added a build section to the frontend-react-js service. The context is set to the directory where the Dockerfile is located, and the dockerfile is set to the filename of the Dockerfile. This tells Docker Compose to build the frontend image using the Dockerfile in the specified directory.
also added a depends_on section to the frontend-react-js service. This tells Docker Compose that the backend-flask service must be started before the frontend-react-js service. This is because the frontend needs to know the URL of the backend in order to make API requests.

Finally, added the frontend-react-js service to the internal-network, which is the network that the other services are also connected to
```
 version: "3.8"

services:
  backend-flask:
    environment:
      FRONTEND_URL: "https://3000-${GITPOD_WORKSPACE_ID}.${GITPOD_WORKSPACE_CLUSTER_HOST}"
      BACKEND_URL: "https://4567-${GITPOD_WORKSPACE_ID}.${GITPOD_WORKSPACE_CLUSTER_HOST}"
    build: ./backend-flask
    ports:
      - "4567:4567"
    volumes:
      - ./backend-flask:/backend-flask
    healthcheck:
      test: ["CMD-SHELL", "curl --fail http://localhost:4567/health || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 3
  frontend-react-js:
    environment:
      REACT_APP_BACKEND_URL: "https://4567-${GITPOD_WORKSPACE_ID}.${GITPOD_WORKSPACE_CLUSTER_HOST}"
    build:
      context: ./frontend-react-js
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    volumes:
      - ./frontend-react-js:/frontend-react-js
    command: sh -c "npm i && npm start"
    depends_on:
      - backend-flask
    networks:
      - internal-network
  dynamodb-local:
    # https://stackoverflow.com/questions/67533058/persist-local-dynamodb-data-in-volumes-lack-permission-unable-to-open-databa
    # We needed to add user:root to get this working.
    user: root
    command: "-jar DynamoDBLocal.jar -sharedDb -dbPath ./data"
    image: "amazon/dynamodb-local:latest"
    container_name: dynamodb-local
    ports:
      - "8000:8000"
    volumes:
      - "./docker/dynamodb:/home/dynamodblocal/data"
    working_dir: /home/dynamodblocal
    healthcheck:
      test:
        [
          "CMD-SHELL",
          "aws dynamodb list-tables --endpoint-url http://localhost:8000",
        ]
      interval: 10s
      timeout: 5s
      retries: 3
  db:
    image: postgres:13-alpine
    restart: always
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    ports:
      - "5432:5432"
    volumes:
      - db:/var/lib/postgresql/data

# the name flag is a hack to change the default prepend folder
# name when outputting the image names
networks:
  internal-network:
    driver: bridge
    name: cruddur

volumes:
  db:
    driver: local
```
4. check the size of the final image by running the following command in your terminal
```
docker images
```

# Images of multi-stage build
![image multi stage build](assets/week%20one%20aws/backend%20flask%20multi-stage%20building%20.png)
![image multi stage build](assets/week%20one%20aws/constiners%20up%20and%20running%20in%20the%20multi-stage%20build.png)
![image multi stage build](assets/week%20one%20aws/docker-compose%20multi-stage%20build%20updated.png)
![image multi stage build](assets/week%20one%20aws/multi-build%20out%20log%20in%20terminal%20image%20sizes.png)
![image multi stage build](assets/week%20one%20aws/constiners%20up%20and%20running%20in%20the%20multi-stage%20build.png)

# Run the dockerfile CMD as an external script
1. created run.sh file
```
 #!/bin/bash
export PORT=4567
python3 -m flask run --host=0.0.0.0 --port=$PORT
```
2. Build Docker image
```
 docker build -t myproject .
```
3. Run Docker container
```
 docker run -p 4567:4567 myproject
```
4. open up port on 4567 in web browser and goto the api endpoint http://localhost:4567/api/activities/home
![image dockerfile CMD as an external script ](assets/week%20one%20aws/external%20script%20localhost%20snap.png)
![image dockerfile CMD as an external script ](assets/week%20one%20aws/external%20script%20ports.png)
 
# Launch an EC2 instance that has docker installed, and pull a container to demonstrate you can run your own docker processes
 
so this one really gave me the go around i just could not manage to get the public ip address to load up the app, so first i created an ec2 instance then set the Security groups and Network ACL to allow traffic on ports that were supposed to let me connect but i never got it to work, i must have tried for half a day just changing the Security Groups and Network ACL's, then i added an ELastic IP Address but that didnt work.
 
1. first created an ec2 instance
2. installed Putty on machine
3. connected to ec2 instance by using the SSH key and configuring putty
4. installed docker into ec2 instance by doing the below steps one at a time
```
sudo yum install docker -y
sudo service docker start
sudo usermod -a -G docker ec2-user
```
5. logout and logged in again from the ec2 instance and stoped and started the ec2 instance
6. installed docker-compose running the steps one by one, in this step i not sure if needed to sudo pip3 install and sudo curl to run both.
```
sudo apt-get update
sudo apt-get install -y python3-pip
sudo pip3 install docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version
```
7. installed apt
```
sudo yum install -y amazon-linux-extras
sudo yum install -y amazon-linux-extras
sudo yum install -y epel-release
sudo yum install -y apt
sudo apt update
```
8. installed git and run in steps
```
sudo yum install git
git clone https://github.com/jess-bk/aws-bootcamp-cruddur-2023.git
docker-compose up
```
9 run docker compose
```
docker-compose up --build
```
10. i will update the journal again with details once i have managed to get this up and running
![image EC2 instance and docker running](assets/week%20one%20aws/ec2%20docker-compose.png)
![image EC2 instance and docker running](assets/week%20one%20aws/ec2-instance-console-week1.png)
![image EC2 instance and docker running](assets/week%20one%20aws/ec2-instance-running-week1.png)
![image EC2 instance and docker running](assets/week%20one%20aws/ec2-instance-week1.png)
![image EC2 instance and docker running](assets/week%20one%20aws/sudo%20netstat%20-tulpn.png)

11. i installed apache and checked if i can make http request and check if it was active and everything was working and running, with no error, i checked for any firewalls blocking the connection in my ec2 instance and everything was good also made sure that chrome extension was not causing an issue related to firewall not allowing access but that was all good to. the follwing is some of the steps i took to resolve the issue
```
sudo systemctl start ufw
```
```
Chain INPUT (policy ACCEPT)
target     prot opt source               destination

Chain FORWARD (policy DROP)
target     prot opt source               destination
DOCKER-USER  all  --  anywhere             anywhere
DOCKER-ISOLATION-STAGE-1  all  --  anywhere             anywhere
ACCEPT     all  --  anywhere             anywhere             ctstate RELATED,ESTABLISHED
DOCKER     all  --  anywhere             anywhere
ACCEPT     all  --  anywhere             anywhere
ACCEPT     all  --  anywhere             anywhere
ACCEPT     all  --  anywhere             anywhere             ctstate RELATED,ESTABLISHED
DOCKER     all  --  anywhere             anywhere
ACCEPT     all  --  anywhere             anywhere
ACCEPT     all  --  anywhere             anywhere

Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination

Chain DOCKER (2 references)
target     prot opt source               destination
ACCEPT     tcp  --  anywhere             ip-172-18-0-2.ec2.internal  tcp dpt:postgres
ACCEPT     tcp  --  anywhere             ip-172-18-0-3.ec2.internal  tcp dpt:tram
ACCEPT     tcp  --  anywhere             ip-172-18-0-4.ec2.internal  tcp dpt:irdmi
ACCEPT     tcp  --  anywhere             ip-172-18-0-5.ec2.internal  tcp dpt:hbci

Chain DOCKER-ISOLATION-STAGE-1 (1 references)
target     prot opt source               destination
DOCKER-ISOLATION-STAGE-2  all  --  anywhere             anywhere
DOCKER-ISOLATION-STAGE-2  all  --  anywhere             anywhere
RETURN     all  --  anywhere             anywhere

Chain DOCKER-ISOLATION-STAGE-2 (2 references)
target     prot opt source               destination
DROP       all  --  anywhere             anywhere
DROP       all  --  anywhere             anywhere
RETURN     all  --  anywhere             anywhere

Chain DOCKER-USER (1 references)
target     prot opt source               destination
RETURN     all  --  anywhere             anywhere
[ec2-user@ip-i have done this my self ~
```
12. checked if ports were open and listening
```
sudo netstat -nlp | grep LISTEN | grep -E ':(80|443)'
```
```
 [ec2-user@ip---i have left this my self]$ sudo netstat -nlp | grep LISTEN | grep -E ':(80|443)'
tcp        0      0 0.0.0.0:8000            0.0.0.0:*               LISTEN      13329/docker-proxy
tcp6       0      0 :::80                   :::*                    LISTEN      3050/httpd
tcp6       0      0 :::8000                 :::*                    LISTEN      13333/docker-proxy
[ec2-user@ip-i have done this my self]$ sudo netstat -nlp | grep LISTEN | grep -E ':(3000|4567)'
tcp        0      0 0.0.0.0:4567            0.0.0.0:*               LISTEN      13271/docker-proxy
tcp        0      0 0.0.0.0:3000            0.0.0.0:*               LISTEN      13553/docker-proxy
tcp6       0      0 :::4567                 :::*                    LISTEN      13276/docker-proxy
tcp6       0      0 :::3000                 :::*                    LISTEN      13557/docker-proxy
```

There is to much to list what i have done but will try again to resolve this im sure its SG rules
 
# Docker Container Security Best Practices
Conatiner securiry practices of protecting your applications hosted on compute services like containers exmaples could be SPA's, MICRO SERVICES, etc.
 
1. Use Official Images: Always use official images provided by the Docker Hub or trusted sources like your organization’s image repository. These images have gone through thorough security checks and are less likely to contain vulnerabilities.

2. Update Regularly: Keep your Docker images and containers up to date with the latest security patches and software updates to ensure the security of your application.

3. Limit Access to Containers: Limit the access to Docker containers to only authorized personnel. You can achieve this by using proper authentication and access control mechanisms.

4 .Use Minimal Base Images: Use minimal base images, which are stripped-down versions of the OS, that only contain the essential components required to run your application. This helps reduce the attack surface and the risk of vulnerabilities.

5. Scan Container Images: Scan the container images for vulnerabilities before deploying them. Tools like Docker Security Scanning and Clair can help you detect vulnerabilities and malware in your images.

6. Use a Firewall: Use a firewall to control the network traffic to and from the containers. Configure the firewall to only allow necessary ports and services.

7. Run Containers with Non-Root Users: Running containers with non-root users can help mitigate the risks associated with running containers as root.

8. Use Secrets Management: Store secrets like passwords, keys, and tokens in a secure and centralized location like a secrets management system. This helps prevent accidental exposure of sensitive information.

9. Remove Unnecessary Packages: Remove unnecessary packages and files from your container images. This helps reduce the size of the images and the attack surface.

10. Use Monitoring and Logging: Use monitoring and logging tools to detect and respond to security incidents in real-time. This helps you identify security breaches and take corrective actions quickly.

# Managed containers and unmanaged containers
An unmanaged container refers to a container that is running directly on a host system, without the use of a container orchestration platform or any management tools. The user is responsible for managing and monitoring the container and ensuring that it is properly secured.

On the other hand, a managed container service is a platform or service provided by a cloud provider that manages the underlying infrastructure, such as server hardware, networking, storage, and operating systems, as well as the container orchestration layer. Examples of managed container services include Amazon ECS, Google Kubernetes Engine, and Microsoft Azure Container Service. In a managed container service, the cloud provider takes care of the infrastructure management tasks, allowing users to focus on developing and deploying their applications. These services often include built-in security features and tools to help users secure their containers
 
 # SNYK
Snyk is a security tool that helps developers find and fix vulnerabilities in their open source dependencies and container images. It provides automated scanning of container images to detect vulnerabilities and misconfigurations, and also integrates with the development workflow to provide real-time feedback and guidance on how to remediate security issues. Some best practices for using Snyk with Docker containers include:

Scan container images early and often: Use Snyk to scan container images as part of the build and deployment process, and ensure that scans are performed regularly to catch new vulnerabilities as they are discovered.

Monitor for new vulnerabilities: Snyk can provide notifications when new vulnerabilities are discovered that affect your container images, so it's important to monitor these alerts and take action to remediate any issues as soon as possible.

Harden container configurations: Snyk can also scan container configurations to identify potential security weaknesses, so it's important to review and adjust container configurations to minimize risk.

Keep dependencies up-to-date: Snyk can help identify outdated dependencies and suggest updates to improve the security of your container images.

Integrate with DevOps workflows: Snyk integrates with popular DevOps tools like Jenkins, GitHub, and Kubernetes, making it easy to incorporate security scanning into your existing workflows.

# DOCKER COMPONENTS

1. Docker is a platform that allows users to create, deploy, and run applications in containers. The main components of Docker include:

2. Docker daemon: The Docker daemon is the background process that manages and controls the Docker containers, images, and networks.

3. Docker client: The Docker client is the command-line tool that allows users to interact with the Docker daemon. It provides an interface to create, manage, and run Docker containers, images, and networks.

4. Docker images: Docker images are read-only templates that are used to create Docker containers. They include everything needed to run an application, including the code, libraries, dependencies, and other files.

5. Docker containers: Docker containers are lightweight, standalone executable packages that contain everything needed to run an application, including the code, libraries, dependencies, and other files. They run in isolation from the host system and other containers.

6. Docker registry: The Docker registry is a service that stores Docker images. It allows users to share and distribute their Docker images with others.

7. Dockerfile: A Dockerfile is a text file that contains instructions for building a Docker image. It specifies the base image, the application code, and other dependencies needed to build the image.

8. Docker network: A Docker network is a virtual network that allows Docker containers to communicate with each other. It provides a way to isolate containers and control the traffic between them.

9. Docker volumes: Docker volumes are used to store data that needs to persist between container runs or be shared between containers. They provide a way to manage data in Docker containers separately from the container itself.
 
# Docker security components
Docker provides several security components that help to secure the Docker environment and the containers running within it:

1. Docker Daemon: The Docker daemon is responsible for running, creating, and managing Docker containers. It communicates with the Docker client to receive instructions on how to build, run, and manage containers. The Docker daemon can be configured to only allow connections from authorized users or networks.

2. Docker Content Trust: Docker Content Trust is a feature that provides cryptographic verification of image integrity and provenance. This ensures that the images running on a Docker host are authentic and have not been tampered with. Content Trust uses digital signatures to verify the image and the registry where the image was stored.

3. Docker Security Scanning: Docker Security Scanning is a tool that scans Docker images for vulnerabilities and provides detailed reports on any security issues that are found. This helps to identify and fix security vulnerabilities before they can be exploited by attackers.

4. Docker AppArmor and SELinux: AppArmor and SELinux are Linux security modules that provide an additional layer of security for Docker containers. These modules limit the access that containers have to system resources and can prevent malicious actions by attackers or compromised containers.

5. Docker Secrets: Docker Secrets is a tool for securely managing sensitive data such as passwords, API keys, and other secrets. Secrets can be stored securely in Docker Swarm and accessed only by authorized services.

6. Docker Network Security: Docker provides several network security features such as network isolation, encrypted communication between containers, and network segmentation to prevent unauthorized access to containers and their data.

By using these security components, Docker provides a secure and reliable platform for running containerized applications.

# AWS security manager
 
AWS Secrets Manager is a fully managed service that enables you to easily and securely store and retrieve secrets such as database credentials, API keys, and other secrets, throughout their lifecycle. You can also use Secrets Manager to rotate, manage, and retrieve database credentials, API keys, and other secrets throughout their lifecycle. AWS Secrets Manager eliminates the need to hard-code credentials in your code or environment variables, making it easier for you to follow security best practices.

With AWS Secrets Manager, you can also control access to secrets using fine-grained access policies, audit secret rotation centrally, and apply multi-factor authentication (MFA) to your secrets. Secrets Manager provides support for Amazon Virtual Private Cloud (VPC) endpoints and VPC security groups, giving you additional security when you are using Secrets Manager within your VPC.

You can use AWS Secrets Manager to store secrets for AWS resources like Amazon Relational Database Service (Amazon RDS), Amazon DocumentDB, and Amazon Aurora, as well as for third-party services like MongoDB, PostgreSQL, and MySQL. Secrets Manager can also be integrated with AWS CloudFormation, AWS Lambda, and AWS Identity and Access Management (IAM) to simplify your infrastructure and application deployments

# Amazon Inspector 
is an automated security assessment service that helps to improve the security and compliance of applications that are deployed on Amazon Web Services (AWS)
 
# Clair is an open-source container security analyzer developed by CoreOS. 
Its purpose is to scan container images for known vulnerabilities and produce a report of its findings

# Week 1 — App Containerization

# watched the recorded live stream
1. added the Dockerfile and thats contains the image and the scirpt that are instructions how to run the application, this was created in the backend-flask
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

10. This command is used to create a Docker image for a backend application written in Flask The command docker build -t backend-flask ./backend-flask is used to build a Docker image with a given tag -t and context path ./backend-flask where the Dockerfile for building the image is located.

More specifically, this command instructs Docker to look for a Dockerfile in the ./backend-flask directory and build a Docker image with the name backend-flask. The -t flag stands for "tag" and it allows us to give a name to the Docker image we are building
```
docker build -t  backend-flask ./backend-flask
```

11. The command to run the conatiner
```
docker run --rm -p 4567:4567 -it -e FRONTEND_URL='*' -e BACKEND_URL='*' backend-flask
```

12. The tag in  docker image --> does not mean it is the latest version it is set to latest tag as default by docker

13. In the frontend created Dockerfile and added the following script to create the image for docker and cd into the frontend application
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

14. run the docker-compose file in the vs code by using docker-compose up, this will do a docker run and docker build on both of the containers, now you can open the ports and goto the apploication, docker compose on the frontend added file docker-compose that allows containers fron and backend to work together instead of doing them separately, you can update the app and it will take effect as the containers are running and will update the changes.

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

6. Notifications page and Crested css file
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
the issue was the notifications were not getting access from the backend because blocking the acccess generally cors will not alllow acccess to the web if the origin are not set and have installed cors that can allow access, in the back end we could have set the origins explicitly by addding acccess option to cors  by creating a file in the backend and then allowing cors to have access to certain address, but i just added them at all the endpoints and that just worked fine

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
2. Run docker-compose up this will start the postgres and dynamobd local on the specified ports as done above and that will verify or call the correct api because of the ports that are set above

3. running dynamodb local and checking if it works and setting some data into the local database of dynamobd
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

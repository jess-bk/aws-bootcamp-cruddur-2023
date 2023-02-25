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

# Watched the video for adding notifications 
created a new api endpoint and then created a new component for notification api endpoint and addded to the routing page.

# Issue with cors
the issue was the notifications were not getting access from the backend because blocking the acccess generally cors will not alllow acccess to the web if the origin are not set and have installed cors that can allow access, in the back end we could have set the origins explicitly by addding acccess option to cors  by creating a file in the backend and then allowing cors to have access to certain address, but i just added them at all the endpoints and that just worked fine

![image to update i made on the backend](assets/week%20one%20aws/week-cors-issue.png)

# # Backend Development Stage
# FROM python:3.10-slim-buster as development

# # Container path directory
# # make a new folder inside conatiner
# WORKDIR /backend-flask

# # Outside Container -> Inside Container
# # Contains the libraries want to install to run the app
# COPY requirements.txt requirements.txt

# # Inside Container
# # Install the pyhon libraries used for the app
# RUN pip3 install -r requirements.txt

# # Inside Conatiner -> Inside Container
# # . .  Copy eveything in the current directory
# # first period . -/backend-flask (outside container)
# # second period . -/backend-flask (inside container)
# COPY . .

# # Set Development Environment Variables
# # Set inside the container
# ENV FLASK_ENV=development

# # Port that the container is running on
# EXPOSE ${PORT}

# # CDM -> COMMAND
# # The array is the command to run the flask
# # python3 -m flask run --host=0.0.0.0  --port=4567
# CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0", "--port=4567"]

# # Backend Production Stage
# FROM python:3.10-slim-buster as production

# WORKDIR /backend-flask

# COPY requirements.txt requirements.txt

# RUN pip3 install --no-cache-dir --upgrade pip && \
#     pip3 install --no-cache-dir -r requirements.txt

# COPY . .

# ENV FLASK_ENV=production

# EXPOSE ${PORT}

# CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0", "--port=4567"]

# Orginal file from the repo
FROM 517899574827.dkr.ecr.us-east-1.amazonaws.com/cruddur-python:3.10-slim-buster

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
ENV FLASK_DEBUG=1

EXPOSE ${PORT}

# CMD (Command)
# python3 -m flask run --host=0.0.0.0 --port=4567
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0", "--port=4567"]
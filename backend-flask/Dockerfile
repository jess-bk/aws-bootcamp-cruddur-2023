FROM python:3.10-slim-buster

# Container path directory
# make a new folder inside conatiner
WORKDIR /backend-flask

# Outside Container -> Inside Container
# Contains the libraries want to install to run the app
COPY requirements.txt requirements.txt

# Inside Container
# Install the pyhon libraries used for the app
RUN pip3 install -r requirements.txt

# Inside Conatiner -> Inside Container
# . .  Copy eveything in the current directory
# first period . -/backend-flask (outside container)
# second period . -/backend-flask (inside container)
COPY . .

# Set Development Environment Variables
# Set inside the container
ENV FLASK_ENV=development

# Port that the container is running on
EXPOSE ${PORT}

# CDM -> COMMAND
# The array is the command to run the flask
# python3 -m flask run --host=0.0.0.0  --port=4567
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0", "--port=4567"]
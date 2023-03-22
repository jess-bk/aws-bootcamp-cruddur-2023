# # Frontend Development Stage
# FROM node:16.18 as development

# ENV PORT=3000

# COPY . /frontend-react-js
# WORKDIR /frontend-react-js
# RUN npm install
# EXPOSE ${PORT}
# CMD ["npm", "start"]

# # Frontend Production Stage
# FROM node:16.18 as production

# ENV PORT=3000

# COPY . /frontend-react-js
# WORKDIR /frontend-react-js
# RUN npm install --only=production
# EXPOSE ${PORT}
# CMD ["npm", "start"]

# original docker file from the repo
FROM node:16.18

ENV PORT=3000

COPY . /frontend-react-js
WORKDIR /frontend-react-js
RUN npm install
EXPOSE ${PORT}
CMD ["npm", "start"]
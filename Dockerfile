FROM node:8.11.3-alpine

ARG buildenv="default"

WORKDIR /code 

#Build
COPY . /code


#Debug packages
RUN npm install
RUN npm install -g nodemon


#RUN cat logo.txt
EXPOSE 80

CMD ["npm", "start"] 
FROM node:8.11.3-alpine

ARG buildenv="default"

# COPY .npmrc /root/.npmrc

#Build
COPY . /code

# RUN rm -f /code/.npmrc

WORKDIR /code

#Debug packages
RUN if [ $buildenv != "local" ]; then set -x && \
npm install \
; else \
npm install -g nodemon \
; fi

#RUN cat logo.txt

EXPOSE 80

CMD ["npm", "start"] 
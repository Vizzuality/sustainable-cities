FROM node:8.1.2

ENV NODE_ENV production

RUN apt-get update && \
    apt-get install -y bash git build-essential \
    automake autoconf make g++ libtool libcairo2-dev \
    && npm install -g node-gyp --loglevel warn \
    && mkdir -p /usr/src/app && mkdir -p /usr/src/app

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install --loglevel warn

# Bundle app source
COPY . /usr/src/app
RUN npm run build

FROM node:18-alpine

# Installing necessary packages including git and libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# Cloning the Strapi repository
WORKDIR /opt/
RUN git clone https://github.com/jaredgoldman/jit-cms.git strapi-project

# Navigate into the cloned Strapi directory
WORKDIR /opt/strapi-project
RUN yarn global add node-gyp
RUN yarn config set network-timeout 600000 -g && yarn install
ENV PATH /opt/strapi-project/node_modules/.bin:$PATH

RUN chown -R node:node /opt/strapi-project
USER node
RUN ["yarn", "build"]

EXPOSE 1337
CMD ["yarn", "dev"]


FROM node:12
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY ./package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm ci

# Generate prisma client, leave out if generating in `postinstall` script
RUN npx prisma generate

COPY . .

RUN npm run build

RUN chown -R node:node /app
USER node

EXPOSE 8080
CMD npm run start

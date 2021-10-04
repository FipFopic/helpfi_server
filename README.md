# Backend

## Setup

Pre-requisites:

- Docker for Desktop

Run `npm run docker-dev` in the root of the project.
It will bring up `Postgres` and the `Express` application server in development mode.

# Alternative run on dev

`cp .env-example .env`
`npm run dev`

# Prod run

Setup postgres and node js
`configure .env`
`npm run build`
`npm run start`

# Migrate DB

```
npm run migrate:deploy
```

# Updating the local docker

```
docker-compose build
```

# Deploy dev

```
docker-compose build
docker-compose up -d
```

# IDE

Maker sure you have `Elint` and `Prettier` plugins installed

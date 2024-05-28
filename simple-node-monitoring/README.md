## Installation

```bash
$ npm install
```

## Run Docker

```bash
docker run -d -p 9411:9411 openzipkin/zipkin
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
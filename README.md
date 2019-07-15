# Spock example

## Development

```sh
docker-compose up # starts a database (run 'docker-compose down' then 'docker-compose up' to restart)

# in other terminal window
yarn               # installs deps (just once)
yarn migrate       # migrate database schema
yarn start-etl     # starts ETL
yarn start-api     # starts GraphQL API (only for functions in the 'api' schema)
```

## Running Tests

1.  start a test db instance `yarn test:db`
2.  run the tests `yarn test`
```

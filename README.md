# ES Sandbox

Simple Elasticsearch with React frontend to test out some Elasticsearch stuff.

## Running

Use docker-compose to start the instance of Elasticsearch.

Load the mapping with the below curl command.

```bash
curl -XPUT -H "Content-Type: application/json" "http://localhost:9200/movies" --data-binary "@movies_mapping.json"
```

Blow data into the index.

```bash
curl -s -H "Content-Type: application/x-ndjson" -XPOST "http://localhost:9200/movies/_bulk?pretty" --data-binary "@movies.json"
```

Then start the React frontend.

```bash
cd simple-search
yarn install
yarn start
```

Commence searching.

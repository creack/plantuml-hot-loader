# plantuml-hot-loader

Plantuml server with hot-reload.

Minimalist node application setup with React and Websocket, using Babel and ESLint.

## TLDR

```sh
# Start with en empty or existing puml file.
touch diagram.puml

# Run the server from docker-hub.
docker run --rm -it -p 9000:9000 -v $(pwd)/diagram.puml:/app/diagrams/main.puml creack/plantuml-hot-loader
```

## Run with node

Running with node requries to have java and node installed as well as the plantuml jar locally.
See the `.nvmrc` / Dockerfile for the node version.

By default, it is expected to be in the local directory, but can be set using the `PLANTUML_JAR` environment variable.

```sh
PLANTUML_JAR=./plantuml.jar
yarn start
```

## Run in docker

The dockerfile installs the expected version of node, java and planuml.

```sh
# Build the image.
docker build -t plantuml-hot-loader .

# With just diagrams hot-loading, the rest being static.
docker run --rm -it -p 9000:9000 -v $(pwd)/diagrams:/app/diagrams plantuml-hot-loader

# With the diagrams and the react app hot-loading.
docker run --rm -it -p 9000:9000 -v $(pwd)/src:/app/src -v $(pwd)/diagrams:/app/diagrams plantuml-hot-loader
```

## Build and deploy

The result can be compiled in a static bundle via webpack.

```sh
# With node.
yarn build

# With Docker
docker build -t plantuml-hot-loader . && docker run -v $(pwd)/dist:/app/dist plantuml-hot-loader yarn build
```

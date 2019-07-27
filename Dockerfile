FROM node:10.16.0

# Install plantuml.
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y default-jdk graphviz

ENV PLANTUML_VERSION=1.2019.8 \
    PLANTUML_CHECKSUM=17819f671efe27589640510ad99c9bbf09ff5c0ee9a5e7751163dc8fbc967e4d \
    PLANTUML_JAR=/plantuml.jar \
    LANG=es_US.UTF-8

RUN wget "https://downloads.sourceforge.net/project/plantuml/${PLANTUML_VERSION}/plantuml.${PLANTUML_VERSION}.jar" -O ${PLANTUML_JAR} && \
    echo "${PLANTUML_CHECKSUM}  ${PLANTUML_JAR}" | sha256sum -c -

WORKDIR /app

# Download the node modules.
ADD package.json yarn.lock ./
RUN yarn install

# Add the sources.
ADD ./ ./

# Optional: mount-bind this.
VOLUME /app/src
VOLUME /app/diagrams

ENV PORT=9000
EXPOSE 9000

CMD yarn start

FROM oven/bun

ADD ./ /app
WORKDIR /app

RUN apt-get update
RUN apt-get install unzip
RUN bun upgrade

RUN bun install

CMD ["bun", "run", "start"]
FROM oven/bun:latest

ADD ./ /app
WORKDIR /app

RUN bun install

CMD ["bun", "run", "start"]
FROM oven/bun:latest

ADD ./ /app
WORKDIR /app

RUN bun install
RUN bun run postinstall

CMD ["bun", "run", "start"]
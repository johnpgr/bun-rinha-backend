FROM oven/bun:latest

ADD ./ /app
WORKDIR /app

RUN bun install --frozen-lockfile --production

# RUN bun build ./src/index.ts --outdir=dist --minify ./src/index.ts

CMD ["bun", "run", "src/index.ts"]
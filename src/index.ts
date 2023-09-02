import { Elysia } from "elysia";

new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/pessoas", () => "Hello from /pessoas")
  .listen(
    {
      hostname: "0.0.0.0",
      port: "8080",
    },
    (server) =>
      console.log(
        `index.ts:${process.pid}: Server is running on ${server.hostname}:${server.port}`
      )
  );

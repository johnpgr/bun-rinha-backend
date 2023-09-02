import { Elysia, t } from "elysia";
// import { databaseConnection } from "./database";

new Elysia()
  // .decorate("db", databaseConnection)
  // .get("/", () => "Hello Elysia")
  // .get("/pessoas", async ({ db }) => {
  //   return await getAllPessoas.run(undefined, db);
  // })
  // .post("/pessoas", async ({ body, db }) => {
  //   const id = randomUUID();
  //   const stack = body.stack.join(",");
  //   if (stack.length > 100) throw new Error("Stack overflow LUL");

  //   return await insertPessoa.run(
  //     {
  //       id,
  //       apelido: body.apelido,
  //       nascimento: body.nascimento,
  //       nome: body.nome,
  //       stack,
  //     },
  //     db
  //   );
  // })
  .get("/", () => "Hello World")
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

import { appFactory, appUrl } from "@/app"
import { appContext } from "@/context"
import { db, schema } from "@/database"
import { appRequest } from "@/shared/app-request"
import { ErrorCodes } from "@/shared/error-codes"
import { afterAll, beforeAll, describe, expect, it } from "bun:test"
import { eq } from "drizzle-orm"

describe("pessoasController", () => {
  const app = appFactory(appContext)

  beforeAll(async () => {
    await new Promise<void>((resolve) => {
      app.listen(appUrl, (server) => {
        console.log(
          `index.ts:${process.pid}: Server is running on ${server.hostname}:${server.port}`
        )
        resolve()
      })
    })
  })

  const validPessoa = {
    apelido: "John_Doe",
    nome: "John Doe",
    nascimento: "1990-01-01",
    stack: ["Node.js", "React"],
  }

  const invalidPessoaApelido = {
    ...validPessoa,
    apelido: "A".repeat(33),
  }

  const invalidPessoaNome = {
    ...validPessoa,
    apelido: "John_Doe_2",
    nome: "A".repeat(101),
  }

  const invalidPessoaStackSize = {
    ...validPessoa,
    stack: Array.from({ length: 33 }, () => "Invalid"),
  }

  const invalidPessoaStackStringLength = {
    ...validPessoa,
    stack: ["A".repeat(33)],
  }

  it("Should return health check", async () => {
    const healthcheck = await appRequest(app, {
      endpoint: "health",
    })
    expect(healthcheck.status).toStrictEqual(200)
    const json = await healthcheck.json()
    expect(json).toHaveProperty("status")
  })

  it("should create a new pessoa", async () => {
    const res = await appRequest(app, {
      method: "POST",
      endpoint: "pessoas",
      body: validPessoa,
    })
    expect(res.headers.get("Location")).toBeDefined()
    expect(res.status).toStrictEqual(201)
    const json = await res.json()
    expect(json).toHaveProperty("id")
  })

  it("should return 422 when pessoa with same apelido already exists", async () => {
    const res = await appRequest(app, {
      method: "POST",
      endpoint: "pessoas",
      body: validPessoa,
    })

    expect(res.status).toStrictEqual(422)

    const json = await res.json()
    expect(json).toHaveProperty("code")
    expect(json.code).toStrictEqual(ErrorCodes.FailedInsert)
    expect(json).toHaveProperty("message")
  })

  it("should return 400 when pessoa apelido is invalid", async () => {
    const res = await appRequest(app, {
      method: "POST",
      endpoint: "pessoas",
      body: invalidPessoaApelido,
    })

    expect(res.status).toStrictEqual(400)

    const json = await res.json()
    expect(json).toHaveProperty("code")
    expect(json.code).toStrictEqual(ErrorCodes.ValidationError)
    expect(json).toHaveProperty("message")
  })

  it("should return 400 when pessoa nome is invalid", async () => {
    const res = await appRequest(app, {
      method: "POST",
      endpoint: "pessoas",
      body: invalidPessoaNome,
    })

    expect(res.status).toStrictEqual(400)

    const json = await res.json()
    expect(json).toHaveProperty("code")
    expect(json.code).toStrictEqual(ErrorCodes.ValidationError)
    expect(json).toHaveProperty("message")
  })

  it("should return 400 when pessoa stack size is invalid", async () => {
    const res = await appRequest(app, {
      method: "POST",
      endpoint: "pessoas",
      body: invalidPessoaStackSize,
    })

    expect(res.status).toStrictEqual(400)

    const json = await res.json()
    expect(json).toHaveProperty("code")
    expect(json.code).toStrictEqual(ErrorCodes.ValidationError)
    expect(json).toHaveProperty("message")
  })

  it("should return 400 when pessoa stack string length is invalid", async () => {
    const res = await appRequest(app, {
      method: "POST",
      endpoint: "pessoas",
      body: invalidPessoaStackStringLength,
    })

    expect(res.status).toStrictEqual(400)

    const json = await res.json()
    expect(json).toHaveProperty("code")
    expect(json.code).toStrictEqual(ErrorCodes.ValidationError)
    expect(json).toHaveProperty("message")
  })
  afterAll(async () => {
    await db
      .delete(schema.pessoas)
      .where(eq(schema.pessoas.apelido, validPessoa.apelido))
    await app.stop()
  })
})

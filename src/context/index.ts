import type { Elysia } from "elysia"
import { db } from "../database"

export const appContext = (app: Elysia) => app.decorate("db", db)
export type AppContext = ReturnType<typeof appContext>

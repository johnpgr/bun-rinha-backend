import { db } from "@/database"
import type { Elysia } from "elysia"

export const appContext = (app: Elysia) => app.decorate("db", db)
export type AppContext = ReturnType<typeof appContext>

import { appFactory, appUrl } from "../app"

export function appRequest(
  app: ReturnType<typeof appFactory>,
  {
    endpoint = "",
    body,
    method = "GET",
  }: { endpoint?: string; body?: unknown; method?: string },
) {
  return app.handle(
    new Request(`${appUrl.full}/${endpoint}`, {
      method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }),
  )
}

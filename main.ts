import { Hono } from "https://deno.land/x/hono@v3.2.3/mod.ts";
// import { serveStatic } from "https://deno.land/x/hono@v3.2.5/middleware.ts"

const app = new Hono();

app.post(
  async (c) => c.json(await find((await c.req.json()).URL)),
);

app.get("/api/test", (c) => {
  console.log((c.env?.remoteAddr as Deno.NetAddr).hostname);

  return c.text("testing");
});

app.get("/api/docs", serveStatic({ path: "./docs.html" }));

// app.get("enripen.deno.dev/*", (c) => c.text(c.req.url))
// app.get("*", (c) => c.text(c.req.url))

export const handler = app.fetch;

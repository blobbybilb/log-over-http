/// <reference lib="deno.unstable" />

import { Hono } from "https://deno.land/x/hono@v3.2.3/mod.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import * as Eta from "https://deno.land/x/eta@v2.2.0/mod.ts";

export const logsPage = /*html*/ `
<!DOCTYPE html>
<html>
  <head>
    <title>Log over HTTP</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
      crossorigin="anonymous"
    />
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
      crossorigin="anonymous"
    ></script>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>

  <body class="m-4">
    <h1 class="text-center">Log over HTTP</h1>
    <h3 class="text-center my-4">Logs for <kbd><%= it.id %></kbd></h3>
    <div class="text-center my-4">
      <a href="/download/<%= it.id %>" class="btn btn-primary">Download logs</a>
    </div>
    <% it.logs.forEach(function(log) { %>
    <div class="alert alert-<%= log.loglevel %>" role="alert">
      <b class="date"><%= log.date %></b> <%= log.message %>
    </div>
    <% }) %>
  </body>

  <script>
      const dates = document.querySelectorAll(".date")
      for (const date of dates) {
        const dateText = date.innerText
        const dateObject = new Date(dateText)
        date.innerText = dateObject.toLocaleString()
      }
  </script>
</html>
`;

const kv = await Deno.openKv();

type Log = { date: string; loglevel: string; message: string };

async function saveLog(loglevel: LogLevel, id: string, message: string) {
  const date = new Date().toString();
  const log: Log = { date, loglevel, message };
  await kv.set(["logs", id, date], log);
}

async function getLogs(id: string): Promise<Log[]> {
  const logs = [];
  for await (const log of kv.list({ prefix: ["logs", id] })) {
    logs.push(log.value as Log);
  }

  return logs;
}

const app = new Hono();

enum LogLevel {
  ok = "ok",
  info = "info",
  warn = "warn",
  error = "error",
}

const classForLogLevel = {
  [LogLevel.ok]: "success",
  [LogLevel.info]: "light",
  [LogLevel.warn]: "warning",
  [LogLevel.error]: "danger",
};

app.post("/:id/:logtype?", async (c) => {
  let { id, logtype } = c.req.param();

  logtype = logtype ?? LogLevel.info;

  const message = await c.req.text();

  if (!Object.values(LogLevel).includes(logtype as LogLevel)) {
    logtype = LogLevel.info;
  }

  await saveLog(logtype as LogLevel, id, message);

  return c.text("done");
});

app.get("/download/:id", async (c) => {
  const { id } = c.req.param();
  const logs = (await getLogs(id))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((log) => `[ ${log.date} ${log.loglevel.toUpperCase()} ] ${log.message}`)
    .join("\n");

  c.res.headers.set("Content-Disposition", `attachment; filename=${id}-logs-over-http.txt`);
  return c.text(logs);
});

app.get("/:id", async (c) => {
  const { id } = c.req.param();
  const logs = (await getLogs(id))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((log) => ({
      ...log,
      loglevel: classForLogLevel[log.loglevel as LogLevel],
      date: new Date(log.date).toString().split(" ").slice(0, 6).join(" "),
    }));

  return c.html(Eta.render(logsPage, { id, logs }));
});

serve(app.fetch);
// const iter = kv.list({ prefix: ["logs"] })
// const users = []
// for await (const res of iter) users.push(res)

// for (const user of users) {
//   await kv.delete(user.key)
// }

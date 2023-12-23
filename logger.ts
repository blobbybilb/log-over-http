const loggerID = "example"

export async function logger(
  message: string,
  logtype: "ok" | "info" | "warn" | "error" = "info",
) {
  const serverURL = "https://hlog.deno.dev"

  await fetch(`${serverURL}/${loggerID}/${logtype}`, {
    method: "POST",
    body: message,
  })
}

logger("test")

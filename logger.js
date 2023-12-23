const loggerID = "example";

export async function logger(message, logtype = "info") {
  const serverURL = "https://hlog.deno.dev";

  await fetch(`${serverURL}/${loggerID}/${logtype}`, {
    method: "POST",
    body: message,
  });
}

logger("Let the logging begin! - JS");

import requests
from typing import Literal

loggerID: str = "example"

def logger(
    message: str,
    logtype: Literal["ok", "info", "warn", "error"] = "info"
) -> None:
    serverURL: str = "https://hlog.deno.dev"
    requests.post(f"{serverURL}/{loggerID}/{logtype}", data=message)

logger("Let the logging begin!")

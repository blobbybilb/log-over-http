local requests = require("requests")

function logger(message, logtype)
    logtype = logtype or "info"
    local serverURL = "https://hlog.deno.dev"
    requests.post(serverURL .. "/" .. loggerID .. "/" .. logtype, message)
end
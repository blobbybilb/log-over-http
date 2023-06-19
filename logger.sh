#!/bin/sh

loggerID="example"

logger() {
    message="$1"
    logtype="${2:-info}"
    serverURL="https://hlog.deno.dev"

    curl -X POST "${serverURL}/${loggerID}/${logtype}" -d "$message"
}

logger "Let the logging begin!"

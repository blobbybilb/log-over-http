require "http/client"

LOGGER_ID = "example"

def logger(message : String, log_type = "info" : String)
  server_url = "https://hlog.deno.dev"
  url = "#{server_url}/#{LOGGER_ID}/#{log_type}"

  response = HTTP::Client.post(url, body: message)
  unless response.status.success?
    raise "Error: #{response.status_code}"
  end
end

logger("Let the logging begin!")

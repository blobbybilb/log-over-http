require 'net/http'

LOGGER_ID = "example"

def logger(message, log_type = "info")
  server_url = "https://hlog.deno.dev"
  uri = URI("#{server_url}/#{LOGGER_ID}/#{log_type}")
  
  Net::HTTP.post(uri, message)
end

logger("Let the logging begin!")

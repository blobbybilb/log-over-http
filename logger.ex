defmodule Logger do
  @logger_id "example"
  @server_url "https://hlog.deno.dev"

  def logger(message, log_type \\ "info") do
    url = "#{@server_url}/#{@logger_id}/#{log_type}"
    options = [
      {:body_format, :plain},
      {:body, message}
    ]
    :httpc.request(:post, {url, []}, [], options)
  end
end

Logger.logger("Let the logging begin! - Elixir")

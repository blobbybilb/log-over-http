using System;
using System.Net.Http;
using System.Threading.Tasks;

const string LoggerID = "example";

static void Logger(string message, string logType = "info")
{
    string serverURL = "https://hlog.deno.dev";
    string url = $"{serverURL}/{LoggerID}/{logType}";

    using (HttpClient client = new HttpClient())
    {
        client.PostAsync(url, new StringContent(message)).Wait();
    }
}

Logger("Let the logging begin! - C#");



using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program
{
    const string LoggerID = "example";

    static async Task Main()
    {
        await Logger("Let the logging begin!");
    }

    static async Task Logger(string message, string logType = "info")
    {
        string serverURL = "https://hlog.deno.dev";
        string url = $"{serverURL}/{LoggerID}/{logType}";

        using (HttpClient client = new HttpClient())
        {
            await client.PostAsync(url, new StringContent(message));
        }
    }
}

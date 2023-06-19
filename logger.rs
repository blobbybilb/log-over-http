use reqwest::Client;
use tokio::runtime::Runtime;

const LOGGER_ID: &str = "example";

#[tokio::main]
async fn main() {
    let _ = logger("Let the logging begin!", LogType::Info).await;
}

async fn logger(message: &str, log_type: LogType) -> Result<(), LoggerError> {
    let server_url = "https://hlog.deno.dev";
    let url = format!("{}/{}/{}", server_url, LOGGER_ID, log_type.to_string());
    
    let client = Client::new();
    let _ = client.post(&url).body(message).send().await?;
    
    Ok(())
}

enum LogType {
    Ok,
    Info,
    Warn,
    Error,
}

impl ToString for LogType {
    fn to_string(&self) -> String {
        match self {
            LogType::Ok => "ok".to_string(),
            LogType::Info => "info".to_string(),
            LogType::Warn => "warn".to_string(),
            LogType::Error => "error".to_string(),
        }
    }
}

#[derive(Debug)]
enum LoggerError {
    InvalidURL,
    RequestFailed,
}

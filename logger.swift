import Foundation

enum LogType: String {
    case ok = "ok"
    case info = "info"
    case warn = "warn"
    case error = "error"
}

enum LoggerError: Error {
    case invalidURL
    case invalidLogType
    case requestFailed
}

let loggerID = "example"

func logger(message: String, logType: LogType = .info) throws {
    let serverURL = "https://hlog.deno.dev"
    let urlString = "\(serverURL)/\(loggerID)/\(logType.rawValue)"
    guard let url = URL(string: urlString) else {
        throw LoggerError.invalidURL
    }
    
    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.httpBody = message.data(using: .utf8)
    
    let semaphore = DispatchSemaphore(value: 0)
    var responseError: Error?
    
    let task = URLSession.shared.dataTask(with: request) { (_, _, error) in
        responseError = error
        semaphore.signal()
    }
    task.resume()
    
    semaphore.wait()
    
    if let error = responseError {
        throw error
    }
}

// logger(message: "Let the logging begin!")

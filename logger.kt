import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody

const val loggerID = "example"

enum class LogType {
    OK,
    INFO,
    WARN,
    ERROR
}

fun logger(message: String, logType: LogType = LogType.INFO) {
    val serverURL = "https://hlog.deno.dev"
    val url = "$serverURL/$loggerID/${logType.name.toLowerCase()}"
    val client = OkHttpClient()

    val requestBody = message.toRequestBody("text/plain".toMediaType())
    val request = Request.Builder()
        .url(url)
        .post(requestBody)
        .build()

    client.newCall(request).execute().use { response ->
        // Ignore the response
    }
}

fun main() {
    logger("Let the logging begin!")
    println("Logging successful.")
}

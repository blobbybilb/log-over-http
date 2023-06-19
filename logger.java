import okhttp3.*;

enum LogType {
    OK,
    INFO,
    WARN,
    ERROR
}

public class Main {
    private static final String loggerID = "example";

    public static void main(String[] args) {
        logger("Let the logging begin!");
        System.out.println("Logging successful.");
    }

    public static void logger(String message, LogType logType) {
        String serverURL = "https://hlog.deno.dev";
        String url = serverURL + "/" + loggerID + "/" + logType.name().toLowerCase();

        OkHttpClient client = new OkHttpClient();

        MediaType mediaType = MediaType.parse("text/plain");
        RequestBody requestBody = RequestBody.create(mediaType, message);

        Request request = new Request.Builder()
                .url(url)
                .post(requestBody)
                .build();

        try (Response response = client.newCall(request).execute()) {
            // Ignore the response
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void logger(String message) {
        logger(message, LogType.INFO);
    }
}

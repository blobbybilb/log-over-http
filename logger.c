#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <curl/curl.h>

const char* loggerID = "example";

void logger(const char* message, const char* logtype) {
    const char* serverURL = "https://hlog.deno.dev";
    CURL* curl = curl_easy_init();
    if (curl) {
        char url[256];
        snprintf(url, sizeof(url), "%s/%s/%s", serverURL, loggerID, logtype);

        curl_easy_setopt(curl, CURLOPT_URL, url);
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, message);

        CURLcode res = curl_easy_perform(curl);
        if (res != CURLE_OK) {
            fprintf(stderr, "curl_easy_perform() failed: %s\n", curl_easy_strerror(res));
        }

        curl_easy_cleanup(curl);
    }
}

int main() {
    logger("Let the logging begin!", "info");
    return 0;
}

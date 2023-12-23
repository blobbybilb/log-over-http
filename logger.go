package main

import (
	"fmt"
	"net/http"
	"strings"
)

const loggerID = "example"

func logger(message string, logtype string) error {
	serverURL := "https://hlog.deno.dev"
	url := fmt.Sprintf("%s/%s/%s", serverURL, loggerID, logtype)
	body := strings.NewReader(message)

	_, err := http.Post(url, "text/plain", body)
	if err != nil {
		return err
	}

	return nil
}

func main() {
	err := logger("Let the logging begin!", "info")
	if err != nil {
		fmt.Println("Error:", err)
	}
}

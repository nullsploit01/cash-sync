package errors

import (
	"fmt"
	"net/http"
)

type ErrorHttpResponse struct {
	Message string `json:"message"`
	Code    int    `json:"code"`
}

func (e ErrorHttpResponse) Error() string {
	return fmt.Sprintf("message: %s", e.Message)
}

func HttpError(message string, code int) ErrorHttpResponse {
	return ErrorHttpResponse{
		Message: message,
		Code:    code,
	}
}

func BadRequest(description string) ErrorHttpResponse {
	return HttpError(description, http.StatusBadRequest)
}

func NotFound() ErrorHttpResponse {
	return HttpError("Resource Not Found", http.StatusNotFound)
}

func Unauthorized() ErrorHttpResponse {
	return HttpError("Unauthorized", http.StatusUnauthorized)
}

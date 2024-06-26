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
	return HttpError("Resource Not Found, please check again", http.StatusNotFound)
}

func Unauthorized() ErrorHttpResponse {
	return HttpError("Session Expired! Please login again", http.StatusUnauthorized)
}

func UnknownException() ErrorHttpResponse {
	return HttpError("Something went wrong! Please login again", http.StatusInternalServerError)
}

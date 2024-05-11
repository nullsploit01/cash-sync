package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nullsploit01/cash-sync/pkg/errors"
)

func ErrorHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()

		for _, err := range c.Errors {
			switch e := err.Err.(type) {
			case errors.ErrorHttpResponse:
				c.AbortWithStatusJSON(e.Code, e)
			default:
				c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": "Something went wrong, please try again later!", "code": http.StatusInternalServerError})
			}
		}
	}
}

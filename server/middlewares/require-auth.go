package middlewares

import (
	"strings"

	"github.com/clerk/clerk-sdk-go/v2/jwt"
	"github.com/gin-gonic/gin"
	"github.com/nullsploit01/cash-sync/pkg/errors"
)

func RequireAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		sessionToken := strings.TrimPrefix(c.Request.Header.Get("Authorization"), "Bearer ")

		// Verify the session
		_, err := jwt.Verify(c.Request.Context(), &jwt.VerifyParams{
			Token: sessionToken,
		})

		if err != nil {
			c.Error(errors.Unauthorized())
			c.Abort()
			return
		}

		c.Next()
	}
}

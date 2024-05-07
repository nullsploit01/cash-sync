package router

import (
	"net/http"
	"strings"

	"github.com/clerk/clerk-sdk-go/v2/jwt"
	"github.com/gin-gonic/gin"
	"github.com/nullsploit01/cash-sync/pkg/settings"
	"github.com/nullsploit01/cash-sync/router/api"
)

func pong(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, gin.H{"message": "pong", "mode": settings.ProjectSettings.App.RunMode})
}

func InitRouter() *gin.Engine {
	router := gin.Default()

	router.Use(gin.Recovery())
	router.Use(gin.Logger())

	router.GET("/ping", pong)

	authRouter := router.Group("/auth")

	authRouter.Use(ProtectedRoute())
	{
		authRouter.GET("/users/:id", api.GetUser)
		authRouter.PUT("/users/:id", api.UpdateUser)
	}

	return router
}

func ProtectedRoute() gin.HandlerFunc {
	return func(c *gin.Context) {
		sessionToken := strings.TrimPrefix(c.Request.Header.Get("Authorization"), "Bearer ")

		// Verify the session
		_, err := jwt.Verify(c.Request.Context(), &jwt.VerifyParams{
			Token: sessionToken,
		})

		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": err.Error()})
			return
		}

		c.Next()
	}
}

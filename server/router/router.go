package router

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nullsploit01/cash-sync/middlewares"
	"github.com/nullsploit01/cash-sync/pkg/settings"
	"github.com/nullsploit01/cash-sync/router/api"
)

func pong(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, gin.H{"message": "pong", "mode": settings.ProjectSettings.App.RunMode})
}

func InitRouter() *gin.Engine {
	router := gin.Default()

	router.Use(gin.Logger())

	router.GET("/ping", pong)

	router.Use(middlewares.ErrorHandler())

	authRouter := router.Group("/auth").Use(middlewares.RequireAuth())
	{
		authRouter.GET("/users/:id", api.GetUser)
		authRouter.PUT("/users/:id", api.UpdateUser)
	}

	return router
}

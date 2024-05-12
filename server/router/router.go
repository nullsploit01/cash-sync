package router

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nullsploit01/cash-sync/middlewares"
	"github.com/nullsploit01/cash-sync/pkg/errors"
	"github.com/nullsploit01/cash-sync/pkg/settings"
	"github.com/nullsploit01/cash-sync/router/api"
)

func pong(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, gin.H{"message": "pong", "mode": settings.ProjectSettings.App.RunMode})
}

func InitRouter() *gin.Engine {
	router := gin.Default()

	router.Use(gin.Logger())
	router.Use(middlewares.ErrorHandler())

	router.GET("/ping", pong)

	authRoutes := router.Group("/auth")
	authRoutes.Use(middlewares.RequireAuth())
	{
		authRoutes.GET("/users/:id", api.GetUser)
		authRoutes.PUT("/users/:id", api.UpdateUser)
	}

	bookRoutes := router.Group("/books")
	// bookRoutes.Use(middlewares.RequireAuth())
	{
		bookRoutes.GET("/", api.GetBooks)
		bookRoutes.POST("/", api.AddBook)
	}

	router.NoRoute(func(c *gin.Context) {
		c.Error(errors.NotFound())
		c.Abort()
	})

	return router
}

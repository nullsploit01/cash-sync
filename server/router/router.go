package router

import (
	"net/http"

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

	router.GET("/ping", pong)

	router.GET("/auth/users/:id", api.GetUser)
	router.PUT("/auth/users/:id", api.UpdateUser)

	return router
}

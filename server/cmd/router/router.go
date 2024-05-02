package router

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func pong(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, gin.H{"message": "pong"})
}

func InitRouter() *gin.Engine {
	router := gin.Default()
	router.GET("/ping", pong)

	return router
}

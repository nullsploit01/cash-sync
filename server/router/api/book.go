package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nullsploit01/cash-sync/pkg/errors"
)

func GetBooks(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, gin.H{"message": "get books"})
}

func AddBook(c *gin.Context) {
	user, exists := c.Get("user")

	if !exists {
		c.Error(errors.Unauthorized())
		c.Abort()
		return
	}

	c.IndentedJSON(http.StatusCreated, gin.H{"message": user})
}

package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetBooks(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, gin.H{"message": "get books"})
}

func AddBook(c *gin.Context) {
	c.IndentedJSON(http.StatusCreated, gin.H{"message": "add book"})
}

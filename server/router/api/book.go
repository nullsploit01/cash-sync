package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nullsploit01/cash-sync/models"
	"github.com/nullsploit01/cash-sync/pkg/errors"
)

type AddBookRequest struct {
	Name string `json:"name" binding:"required"`
}

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

	userId, ok := user.(string)
	if !ok {
		c.Error(errors.BadRequest("Invalid User"))
		c.Abort()
		return
	}

	var requestBody AddBookRequest

	err := c.ShouldBindJSON(&requestBody)
	if err != nil {
		c.Error(errors.BadRequest(err.Error()))
		c.Abort()
		return
	}

	err = models.AddBook(requestBody.Name, userId)
	if err != nil {
		c.Error(errors.UnknownException("Failed to add book"))
		c.Abort()
		return
	}

	c.IndentedJSON(http.StatusCreated, gin.H{"message": "Book added successfully"})
}

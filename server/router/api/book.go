package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nullsploit01/cash-sync/models"
	"github.com/nullsploit01/cash-sync/pkg/errors"
	"github.com/nullsploit01/cash-sync/pkg/service/auth"
)

type AddBookRequest struct {
	Name string `json:"name" binding:"required"`
}

func GetBooks(c *gin.Context) {
	userId := auth.GetIdUserFromContext(c)

	books, err := models.GetBooks(userId)
	if err != nil {
		c.Error(errors.UnknownException())
		c.Abort()
		return
	}

	c.IndentedJSON(http.StatusOK, books)
}

func GetBook(c *gin.Context) {
	bookId := c.Param("bookId")

	userId := auth.GetIdUserFromContext(c)

	book, err := models.GetBook(bookId, userId)
	if err != nil {
		c.Error(errors.UnknownException())
		c.Abort()
		return
	}

	c.IndentedJSON(http.StatusOK, book)
}

func AddBook(c *gin.Context) {
	userId := auth.GetIdUserFromContext(c)

	var requestBody AddBookRequest
	err := c.ShouldBindJSON(&requestBody)
	if err != nil {
		c.Error(errors.BadRequest(err.Error()))
		c.Abort()
		return
	}

	err = models.AddBook(requestBody.Name, userId)
	if err != nil {
		c.Error(errors.UnknownException())
		c.Abort()
		return
	}

	c.IndentedJSON(http.StatusCreated, gin.H{"message": "Book added successfully"})
}

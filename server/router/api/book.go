package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nullsploit01/cash-sync/pkg/errors"
	"github.com/nullsploit01/cash-sync/pkg/service/authService"
	"github.com/nullsploit01/cash-sync/pkg/service/modelService"
)

func GetBooks(c *gin.Context) {
	userId := authService.GetIdUserFromContext(c)

	books, err := modelService.GetBooks(userId)
	if err != nil {
		c.Error(errors.BadRequest(err.Error()))
		c.Abort()
		return
	}

	c.IndentedJSON(http.StatusOK, books)
}

func GetBook(c *gin.Context) {
	bookId := c.Param("bookId")

	userId := authService.GetIdUserFromContext(c)

	book, err := modelService.GetBook(userId, bookId)
	if err != nil {
		c.Error(errors.BadRequest(err.Error()))
		c.Abort()
		return
	}

	c.IndentedJSON(http.StatusOK, book)
}

func AddBook(c *gin.Context) {
	type addBookRequest struct {
		Name string `json:"name" binding:"required"`
	}

	var requestBody addBookRequest
	userId := authService.GetIdUserFromContext(c)

	err := c.ShouldBindJSON(&requestBody)
	if err != nil {
		c.Error(errors.BadRequest(err.Error()))
		c.Abort()
		return
	}

	book, err := modelService.AddBook(requestBody.Name, userId)
	if err != nil {
		c.Error(errors.BadRequest(err.Error()))
		c.Abort()
		return
	}

	c.IndentedJSON(http.StatusCreated, book)
}

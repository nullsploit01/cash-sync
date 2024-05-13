package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nullsploit01/cash-sync/models"
	"github.com/nullsploit01/cash-sync/pkg/errors"
	"github.com/nullsploit01/cash-sync/pkg/service/auth"
)

type AddEntryRequest struct {
	Name string `json:"name" binding:"required"`
}

func AddEntry(c *gin.Context) {
	bookId := c.Param("bookId")

	userId := auth.GetIdUserFromContext(c)
	var entry models.Entry

	if err := c.ShouldBindJSON(&entry); err != nil {
		c.Error(errors.BadRequest(err.Error()))
		c.Abort()
		return
	}

	err := models.AddEntry(userId, bookId, entry)
	if err != nil {
		c.Error(errors.UnknownException())
		c.Abort()
		return
	}

	c.IndentedJSON(http.StatusCreated, gin.H{"message": "Entry added successfully"})
}

func GetEntries(c *gin.Context) {
	bookId := c.Param("bookId")
	userId := auth.GetIdUserFromContext(c)

	entries, err := models.GetEntries(userId, bookId)
	if err != nil {
		c.Error(errors.UnknownException())
		c.Abort()
		return
	}
	c.IndentedJSON(http.StatusAccepted, entries)
}

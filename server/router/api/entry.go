package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nullsploit01/cash-sync/models"
	"github.com/nullsploit01/cash-sync/pkg/errors"
	"github.com/nullsploit01/cash-sync/pkg/service/authService"
	"github.com/nullsploit01/cash-sync/pkg/service/modelService"
)

type AddEntryRequest struct {
	Name string `json:"name" binding:"required"`
}

func AddEntry(c *gin.Context) {
	bookId := c.Param("bookId")

	userId := authService.GetIdUserFromContext(c)
	var entry models.Entry

	if err := c.ShouldBindJSON(&entry); err != nil {
		c.Error(errors.BadRequest(err.Error()))
		c.Abort()
		return
	}

	addedEntry, err := modelService.AddEntry(userId, bookId, entry)
	if err != nil {
		c.Error(errors.BadRequest(err.Error()))
		c.Abort()
		return
	}

	c.IndentedJSON(http.StatusCreated, addedEntry)
}

func UpdateEntry(c *gin.Context) {
	bookId := c.Param("bookId")

	userId := authService.GetIdUserFromContext(c)
	var entry models.Entry

	if err := c.ShouldBindJSON(&entry); err != nil {
		c.Error(errors.BadRequest(err.Error()))
		c.Abort()
		return
	}

	addedEntry, err := modelService.UpdateEntry(userId, bookId, entry)
	if err != nil {
		c.Error(errors.BadRequest(err.Error()))
		c.Abort()
		return
	}

	c.IndentedJSON(http.StatusOK, addedEntry)
}

func DeleteEntry(c *gin.Context) {
	bookId, entryId := c.Param("bookId"), c.Param("entryId")

	userId := authService.GetIdUserFromContext(c)

	deletedEntry, err := modelService.DeleteEntry(userId, bookId, entryId)
	if err != nil {
		c.Error(errors.BadRequest(err.Error()))
		c.Abort()
		return
	}

	c.IndentedJSON(http.StatusOK, deletedEntry)
}

func GetEntries(c *gin.Context) {
	bookId := c.Param("bookId")
	userId := authService.GetIdUserFromContext(c)

	entries, err := modelService.GetEntries(userId, bookId)
	if err != nil {
		c.Error(errors.BadRequest(err.Error()))
		c.Abort()
		return
	}
	c.IndentedJSON(http.StatusAccepted, entries)
}

package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nullsploit01/cash-sync/pkg/service/auth"
)

type AddEntryRequest struct {
	Name string `json:"name" binding:"required"`
}

func AddEntry(c *gin.Context) {
	userId := auth.GetIdUserFromContext(c)
	c.IndentedJSON(http.StatusAccepted, gin.H{"message": userId})
}

func GetEntries(c *gin.Context) {
	userId := auth.GetIdUserFromContext(c)
	c.IndentedJSON(http.StatusAccepted, gin.H{"message": userId})
}

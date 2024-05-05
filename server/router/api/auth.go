package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nullsploit01/cash-sync/service/auth"
)

func GetUser(c *gin.Context) {
	id := c.Param("id")
	user, err := auth.GetUser(id)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err.Error()})
		return
	}

	c.IndentedJSON(http.StatusOK, user)
}

package api

import (
	"net/http"

	"github.com/clerk/clerk-sdk-go/v2/user"
	"github.com/gin-gonic/gin"
	"github.com/nullsploit01/cash-sync/pkg/errors"
	"github.com/nullsploit01/cash-sync/service/auth"
)

func GetUser(c *gin.Context) {
	id := c.Param("id")
	user, err := auth.GetUser(id)

	if err != nil {
		c.Error(errors.BadRequest(err.Error()))
		c.Abort()
		return
	}

	c.IndentedJSON(http.StatusOK, user)
}

func UpdateUser(c *gin.Context) {
	id := c.Param("id")
	var params user.UpdateParams

	if err := c.BindJSON(&params); err != nil {
		c.Error(errors.BadRequest(err.Error()))
		c.Abort()
		return
	}

	user, err := auth.UpdateUser(id, &params)

	if err != nil {
		c.Error(errors.Unauthorized())
		c.Abort()
		return
	}

	c.IndentedJSON(http.StatusCreated, user)
}

package auth

import (
	"github.com/clerk/clerk-sdk-go/v2"
	"github.com/gin-gonic/gin"
	"github.com/nullsploit01/cash-sync/pkg/errors"
	"github.com/nullsploit01/cash-sync/pkg/settings"
)

type User struct {
	ID             string   `json:"id"`
	FirstName      string   `json:"firstName"`
	LastName       string   `json:"lastName"`
	EmailAddresses []string `json:"emailAddresses"`
	ImageURL       string   `json:"imageUrl"`
}

func Setup() {
	clerk.SetKey(settings.ProjectSettings.App.ClerkApiKey)
}

func GetIdUserFromContext(c *gin.Context) string {
	user, exists := c.Get("user")

	if !exists {
		c.Error(errors.Unauthorized())
		c.Abort()
		return ""
	}

	userId, ok := user.(string)
	if !ok {
		c.Error(errors.BadRequest("Invalid User"))
		c.Abort()
		return ""
	}

	return userId
}

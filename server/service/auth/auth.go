package auth

import (
	"github.com/clerk/clerk-sdk-go/v2"
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

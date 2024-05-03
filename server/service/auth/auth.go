package auth

import (
	"github.com/clerk/clerk-sdk-go/v2"
	"github.com/nullsploit01/cash-sync/pkg/settings"
)

func Setup() {
	clerk.SetKey(settings.ProjectSettings.App.ClerkApiKey)
}

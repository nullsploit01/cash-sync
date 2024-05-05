package auth

import (
	"context"
	"errors"

	"github.com/clerk/clerk-sdk-go/v2"
	"github.com/clerk/clerk-sdk-go/v2/user"
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

func GetUser(id string) (User, error) {
	ctx := context.Background()

	list, _ := user.List(ctx, &user.ListParams{})
	for _, resource := range list.Users {
		if resource.ID == id {
			return MapClerkUser(resource), nil
		}
	}

	return User{}, errors.New("user not found")
}

func MapClerkUser(clerkUser *clerk.User) User {
	if clerkUser == nil {
		return User{} // Return an empty User struct if clerkUser is nil
	}

	var emailAddresses []string

	for _, email := range clerkUser.EmailAddresses {
		if email != nil {
			emailAddresses = append(emailAddresses, email.EmailAddress)
		}
	}

	return User{
		ID:             clerkUser.ID,
		FirstName:      *clerkUser.FirstName,
		LastName:       *clerkUser.LastName,
		EmailAddresses: emailAddresses,
		ImageURL:       *clerkUser.ImageURL,
	}
}

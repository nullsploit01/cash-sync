package authService

import (
	"context"
	"errors"

	"github.com/clerk/clerk-sdk-go/v2"
	"github.com/clerk/clerk-sdk-go/v2/user"
)

var ctx = context.Background()

func GetUser(id string) (User, error) {

	list, err := user.List(ctx, &user.ListParams{})

	if err != nil {
		return User{}, errors.New(err.Error())
	}

	for _, resource := range list.Users {
		if resource.ID == id {
			return MapClerkUser(resource), nil
		}
	}

	return User{}, errors.New("user not found")
}

func UpdateUser(id string, updateParams *user.UpdateParams) (User, error) {
	updatedUser, err := user.Update(ctx, id, updateParams)

	if err != nil {
		return User{}, errors.New(err.Error())
	}

	return MapClerkUser(updatedUser), nil
}

func MapClerkUser(clerkUser *clerk.User) User {
	if clerkUser == nil {
		return User{}
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

package models

import (
	"fmt"
	"time"

	"github.com/google/uuid"
)

type Book struct {
	Id        string
	UserId    string
	Name      string
	CreatedAt time.Time
	UpdatedAt time.Time
}

func AddBook(name, userId string) error {
	_, _, err := client.Collection("books").Add(ctx, Book{
		Id:        uuid.NewString(),
		UserId:    userId,
		Name:      name,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	})

	if err != nil {
		return fmt.Errorf("could not add book: %s", err.Error())
	}

	return nil
}

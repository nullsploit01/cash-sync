package models

import (
	"fmt"
	"time"

	"github.com/google/uuid"
	"google.golang.org/api/iterator"
)

type Book struct {
	Id        string    `json:"id"`
	UserId    string    `json:"userId"`
	Name      string    `json:"name"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
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

func GetBooks(userId string) ([]Book, error) {
	var books []Book

	iter := client.Collection("books").Where("UserId", "==", userId).Documents(ctx)
	for {
		doc, err := iter.Next()

		if err == iterator.Done {
			break
		}

		if err != nil {
			return nil, fmt.Errorf("failed to iterate: %v", err)
		}

		var book Book
		if err := doc.DataTo(&book); err != nil {
			return nil, fmt.Errorf("failed to parse book data: %v", err)
		}

		books = append(books, book)
	}

	return books, nil
}

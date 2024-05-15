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
	Balance   int64     `json:"balance"`
	TotalIn   int64     `json:"totalIn"`
	TotalOut  int64     `json:"totalOut"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

func AddBook(userId, name string) (Book, error) {
	var bookToAdd Book = Book{
		Id:        uuid.NewString(),
		UserId:    userId,
		Name:      name,
		Balance:   0,
		TotalIn:   0,
		TotalOut:  0,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
	_, _, err := client.Collection("books").Add(ctx, bookToAdd)

	if err != nil {
		return bookToAdd, fmt.Errorf("could not add book: %s", err.Error())
	}

	return bookToAdd, nil
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
			return nil, fmt.Errorf("failed to iterate: %v", err.Error())
		}

		var book Book
		if err := doc.DataTo(&book); err != nil {
			return nil, fmt.Errorf("failed to parse book data: %v", err.Error())
		}

		books = append(books, book)
	}

	return books, nil
}

func GetBook(userId, bookId string) (Book, error) {
	var book Book

	iter := client.Collection("books").Where("Id", "==", bookId).Where("UserId", "==", userId).Limit(1).Documents(ctx)

	doc, err := iter.Next()
	if err == iterator.Done {
		return Book{}, fmt.Errorf("book not found")
	}

	if err != nil {
		return Book{}, fmt.Errorf("failed to retrieve book: %v", err)
	}

	if err := doc.DataTo(&book); err != nil {
		return Book{}, fmt.Errorf("failed to parse book data: %v", err)
	}

	return book, nil
}

func UpdateBook(userId string, bookToUpdate Book) (Book, error) {
	iter := client.Collection("books").Where("Id", "==", bookToUpdate.Id).Where("UserId", "==", userId).Documents(ctx)
	defer iter.Stop()

	doc, err := iter.Next()
	if err == iterator.Done {
		return Book{}, fmt.Errorf("book not found")
	}
	if err != nil {
		return Book{}, err
	}

	_, err = doc.Ref.Set(ctx, bookToUpdate)
	if err != nil {
		return Book{}, err
	}

	return bookToUpdate, nil
}

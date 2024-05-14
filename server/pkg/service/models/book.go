package models

import (
	"errors"

	"github.com/nullsploit01/cash-sync/models"
)

func GetBook(userId, bookId string) (models.Book, error) {
	book, err := models.GetBook(bookId, userId)
	if err != nil {
		return models.Book{}, err
	}

	if book == (models.Book{}) {
		return models.Book{}, errors.New("book not found")
	}

	return book, nil
}

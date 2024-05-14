package modelService

import (
	"github.com/nullsploit01/cash-sync/models"
)

func GetBook(userId, bookId string) (models.Book, error) {
	book, err := models.GetBook(bookId, userId)
	if err != nil {
		return models.Book{}, err
	}

	return book, nil
}

func GetBooks(userId string) ([]models.Book, error) {
	books, err := models.GetBooks(userId)
	if err != nil {
		return nil, err
	}

	return books, nil
}

func AddBook(userId, bookName string) (models.Book, error) {
	book, err := models.AddBook(bookName, userId)

	if err != nil {
		return models.Book{}, err
	}

	return book, nil
}

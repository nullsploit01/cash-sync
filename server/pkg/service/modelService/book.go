package modelService

import (
	"github.com/nullsploit01/cash-sync/models"
)

func GetBook(userId, bookId string) (models.Book, error) {
	book, err := models.GetBook(userId, bookId)
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

func UpdateBalance(userId, bookId string, entry models.Entry) (models.Book, error) {
	book, err := models.GetBook(userId, bookId)
	if err != nil {
		return models.Book{}, err
	}

	if entry.Type == "cashin" {
		book.TotalIn += entry.Amount
	} else {
		book.TotalOut += entry.Amount
	}

	book.Balance = book.TotalIn - book.TotalOut

	_, err = models.UpdateBook(userId, book)

	if err != nil {
		return models.Book{}, err
	}

	return book, nil
}

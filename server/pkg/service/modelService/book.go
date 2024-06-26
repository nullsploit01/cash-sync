package modelService

import (
	"sort"

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
	sort.Slice(books, func(i, j int) bool {
		return books[i].UpdatedAt.After(books[j].UpdatedAt)
	})

	return books, nil
}

func AddBook(userId, bookName string) (models.Book, error) {
	book, err := models.AddBook(bookName, userId)

	if err != nil {
		return models.Book{}, err
	}

	return book, nil
}

func UpdateBalance(userId, bookId string) (models.Book, error) {
	book, err := models.GetBook(userId, bookId)
	if err != nil {
		return models.Book{}, err
	}

	entries, err := models.GetEntries(userId, bookId)
	if err != nil {
		return models.Book{}, err
	}

	var totalIn, totalOut int64

	for _, entry := range entries {
		if entry.Type == "CASH_IN" {
			totalIn += entry.Amount
		} else if entry.Type == "CASH_OUT" {
			totalOut += entry.Amount
		}
	}

	book.TotalIn = totalIn
	book.TotalOut = totalOut
	book.Balance = totalIn - totalOut

	_, err = models.UpdateBook(userId, book)

	if err != nil {
		return models.Book{}, err
	}

	return book, nil
}

func UpdateBookName(userId, bookId, bookName string) (models.Book, error) {
	book, err := models.GetBook(userId, bookId)
	if err != nil {
		return models.Book{}, err
	}

	book.Name = bookName

	_, err = models.UpdateBook(userId, book)

	if err != nil {
		return models.Book{}, err
	}

	return book, nil
}

func DeleteBook(userId, bookId string) (models.Book, error) {
	deletedBook, err := models.DeleteBook(userId, bookId)

	if err != nil {
		return models.Book{}, err
	}

	return deletedBook, nil
}

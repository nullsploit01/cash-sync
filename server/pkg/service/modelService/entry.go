package modelService

import (
	"github.com/nullsploit01/cash-sync/models"
)

func GetEntries(userId, bookId string) ([]models.Entry, error) {
	entries, err := models.GetEntries(userId, bookId)
	if err != nil {
		return nil, err
	}

	return entries, nil
}

func AddEntry(userId, bookId string, entry models.Entry) (models.Entry, error) {
	_, err := GetBook(userId, bookId)

	if err != nil {
		return models.Entry{}, err
	}

	addedEntry, err := models.AddEntry(userId, bookId, entry)

	if err != nil {
		return models.Entry{}, err
	}

	_, err = UpdateBalance(userId, bookId)

	if err != nil {
		return models.Entry{}, err
	}

	return addedEntry, nil
}

func UpdateEntry(userId, bookId string, entry models.Entry) (models.Entry, error) {
	updatedEntry, err := models.UpdateEntry(userId, bookId, entry)

	if err != nil {
		return models.Entry{}, err
	}

	_, err = UpdateBalance(userId, bookId)

	if err != nil {
		return models.Entry{}, err
	}

	return updatedEntry, nil
}

func DeleteEntry(userId, bookId, entryId string) (models.Entry, error) {
	deletedEntry, err := models.DeleteEntry(userId, bookId, entryId)

	if err != nil {
		return models.Entry{}, err
	}

	return deletedEntry, nil
}

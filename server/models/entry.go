package models

import (
	"fmt"
	"time"

	"github.com/google/uuid"
	"google.golang.org/api/iterator"
)

type Entry struct {
	Id          string    `json:"id"`
	UserId      string    `json:"userId"`
	BookId      string    `json:"bookId"`
	Amount      int64     `json:"amount" binding:"required"`
	Remark      string    `json:"remark"`
	PaymentMode string    `json:"paymentMode" binding:"required,oneof=cash online"`
	Type        string    `json:"type" binding:"required,oneof=cashin cashout"`
	EnteredOn   time.Time `json:"enteredOn"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
}

func AddEntry(userId, bookId string, entry Entry) (Entry, error) {
	var entryToAdd Entry = Entry{
		Id:          uuid.NewString(),
		UserId:      userId,
		BookId:      bookId,
		Amount:      entry.Amount,
		Remark:      entry.Remark,
		PaymentMode: entry.PaymentMode,
		Type:        entry.Type,
		EnteredOn:   time.Now(),
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}
	_, _, err := client.Collection("entries").Add(ctx, entryToAdd)

	if err != nil {
		return Entry{}, fmt.Errorf("could not add book: %s", err.Error())
	}

	return entryToAdd, nil
}

func GetEntries(userId, bookId string) ([]Entry, error) {
	var entries []Entry

	iter := client.Collection("entries").Where("UserId", "==", userId).Where("BookId", "==", bookId).Documents(ctx)
	for {
		doc, err := iter.Next()

		if err == iterator.Done {
			break
		}

		if err != nil {
			return nil, fmt.Errorf("failed to iterate: %v", err.Error())
		}

		var entry Entry
		if err := doc.DataTo(&entry); err != nil {
			return nil, fmt.Errorf("failed to parse entry data: %v", err.Error())
		}

		entries = append(entries, entry)
	}

	return entries, nil
}

func UpdateEntry(userId, bookId string, entryToUpdate Entry) (Entry, error) {
	iter := client.Collection("entries").Where("Id", "==", entryToUpdate.Id).Where("UserId", "==", userId).Documents(ctx)
	defer iter.Stop()

	doc, err := iter.Next()
	if err == iterator.Done {
		return Entry{}, fmt.Errorf("entry not found")
	}
	if err != nil {
		return Entry{}, err
	}

	var entry Entry
	if err := doc.DataTo(&entry); err != nil {
		return Entry{}, fmt.Errorf("failed to parse entry data: %v", err.Error())
	}

	entry.UpdatedAt = time.Now()
	entry.Amount = entryToUpdate.Amount
	entry.Remark = entryToUpdate.Remark

	if entryToUpdate.PaymentMode != "" {
		entry.PaymentMode = entryToUpdate.PaymentMode
	}
	if entryToUpdate.Type != "" {
		entry.Type = entryToUpdate.Type
	}
	if !entryToUpdate.EnteredOn.IsZero() {
		entry.EnteredOn = entryToUpdate.EnteredOn
	}

	_, err = doc.Ref.Set(ctx, entry)
	if err != nil {
		return Entry{}, err
	}

	return entry, nil
}

func DeleteEntry(userId, bookId, entryId string) (Entry, error) {
	iter := client.Collection("entries").Where("Id", "==", entryId).Where("UserId", "==", userId).Where("BookId", "==", bookId).Documents(ctx)
	defer iter.Stop()

	doc, err := iter.Next()
	if err == iterator.Done {
		return Entry{}, fmt.Errorf("entry not found")
	}
	if err != nil {
		return Entry{}, err
	}

	var entry Entry
	err = doc.DataTo(&entry)
	if err != nil {
		return Entry{}, err
	}

	_, err = doc.Ref.Delete(ctx)
	if err != nil {
		return Entry{}, err
	}

	return entry, nil
}

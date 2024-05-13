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
	Amount      float32   `json:"amount" binding:"required"`
	Remark      string    `json:"remark"`
	PaymentMode string    `json:"paymentMode" binding:"required,oneof=cashin cashout"`
	Type        string    `json:"type" binding:"required,oneof=cash online"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
}

func AddEntry(userId, bookId string, entry Entry) error {
	_, _, err := client.Collection("entries").Add(ctx, Entry{
		Id:          uuid.NewString(),
		UserId:      userId,
		BookId:      bookId,
		Amount:      entry.Amount,
		Remark:      entry.Remark,
		PaymentMode: entry.PaymentMode,
		Type:        entry.Type,
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	})

	if err != nil {
		return fmt.Errorf("could not add book: %s", err.Error())
	}

	return nil
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

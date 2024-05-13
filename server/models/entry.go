package models

import (
	"fmt"
	"time"

	"github.com/google/uuid"
)

type PaymentMode string

const (
	PaymentModeOnline PaymentMode = "Online"
	PaymentModeCash   PaymentMode = "Cash"
)

type EntryType int

const (
	EntryTypeCashIn  EntryType = 0
	EntryTypeCashOut EntryType = 1
)

type Entry struct {
	Id          string      `json:"id"`
	UserId      string      `json:"userId" binding:"required"`
	BookId      string      `json:"bookId" binding:"required"`
	Amount      int32       `json:"amount" binding:"required"`
	Remark      string      `json:"remark"`
	PaymentMode PaymentMode `json:"paymentMode" binding:"required"`
	Type        EntryType   `json:"type" binding:"required"`
	CreatedAt   time.Time   `json:"createdAt"`
	UpdatedAt   time.Time   `json:"updatedAt"`
}

func AddEntry(userId string, entry Entry) error {
	_, _, err := client.Collection("entries").Add(ctx, Entry{
		Id:          uuid.NewString(),
		UserId:      userId,
		BookId:      entry.BookId,
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

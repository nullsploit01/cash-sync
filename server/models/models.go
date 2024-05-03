package models

import (
	"context"
	"log"

	"cloud.google.com/go/firestore"
	"github.com/nullsploit01/cash-sync/pkg/settings"
	"google.golang.org/api/option"
)

var client *firestore.Client

func Setup() {
	ctx := context.Background()
	var err error
	if settings.ProjectSettings.App.RunMode == "debug" {
		sa := option.WithCredentialsFile("private/firestore-keys.json")
		client, err = firestore.NewClientWithDatabase(ctx, settings.ProjectSettings.App.ProjectId, "cashsync-store", sa)
	} else {
		client, err = firestore.NewClientWithDatabase(ctx, settings.ProjectSettings.App.ProjectId, "cashsync-store")
	}

	if err != nil {
		log.Fatalln(err)
	}

	if err != nil {
		log.Fatalln(err)
	}
}

func TestConn() {
	ctx := context.Background()

	_, _, err := client.Collection("users").Add(ctx, map[string]interface{}{
		"first": "Ada",
		"last":  "Lovelace",
		"born":  1815,
	})
	if err != nil {
		log.Fatalf("Failed adding alovelace: %v", err)
	}

}

func Close() {
	client.Close()
}

package models

import (
	"context"
	"log"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	"github.com/nullsploit01/cash-sync/pkg/settings"
)

var client *firestore.Client

func Setup() {
	ctx := context.Background()
	conf := &firebase.Config{ProjectID: settings.ProjectSettings.App.ProjectId}
	app, err := firebase.NewApp(ctx, conf)
	if err != nil {
		log.Fatalln(err)
	}

	client, err = app.Firestore(ctx)
	if err != nil {
		log.Fatalln(err)
	}
}

func Close() {
	client.Close()
}

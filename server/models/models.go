package models

import (
	"context"
	"log"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
)

var client *firestore.Client

func Setup() {
	ctx := context.Background()
	conf := &firebase.Config{ProjectID: "cashsync-4ac59"}
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

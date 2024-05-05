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
	var err error
	ctx := context.Background()
	serviceAccount := GetServiceAccount()

	if serviceAccount == nil {
		client, err = firestore.NewClientWithDatabase(ctx, settings.ProjectSettings.App.ProjectId, settings.ProjectSettings.App.DatabaseId)
	} else {
		client, err = firestore.NewClientWithDatabase(ctx, settings.ProjectSettings.App.ProjectId, settings.ProjectSettings.App.DatabaseId, serviceAccount)
	}

	if err != nil {
		log.Fatalln(err)
	}

}

func GetServiceAccount() option.ClientOption {
	if settings.ProjectSettings.App.RunMode != "debug" {
		return nil
	}

	return option.WithCredentialsFile(settings.ProjectSettings.App.FirestoreServiceAccountKeysLocation)
}

func Close() {
	client.Close()
}

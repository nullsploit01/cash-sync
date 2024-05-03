package settings

import (
	"log"

	"github.com/ilyakaznacheev/cleanenv"
)

type Settings struct {
	App struct {
		RunMode                             string `yaml:"runMode" env:"RUN_MODE"`
		ProjectId                           string `yaml:"projectId" env:"PROJECT_ID"`
		DatabaseId                          string `yaml:"databaseId" env:"DATABASE_ID"`
		ClerkApiKey                         string `yaml:"clerkApiKey" env:"CLERK_API_KEY"`
		FirestoreServiceAccountKeysLocation string `yaml:"firestoreServiceAccountKeysLocation"`
	} `yaml:"app"`
}

var ProjectSettings = &Settings{}

func Setup() {
	err := cleanenv.ReadConfig("conf/config.yaml", ProjectSettings)
	if err != nil {
		log.Fatalf("setting.Setup, fail to parse 'conf/config.yaml': %v", err)
	}
}

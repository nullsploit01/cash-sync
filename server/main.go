package main

import (
	"github.com/gin-gonic/gin"
	"github.com/nullsploit01/cash-sync/models"
	"github.com/nullsploit01/cash-sync/pkg/settings"
	"github.com/nullsploit01/cash-sync/router"
)

func init() {
	settings.Setup()
	models.Setup()
}

func main() {
	gin.SetMode(settings.ProjectSettings.App.RunMode)

	r := router.InitRouter()
	r.Run()
}

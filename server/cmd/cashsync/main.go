package main

import (
	"github.com/nullsploit01/cash-sync/models"
	"github.com/nullsploit01/cash-sync/router"
)

func init() {
	models.Setup()
}

func main() {
	models.Setup()
	r := router.InitRouter()
	r.Run()
}

package main

import (
	"github.com/nullsploit01/cash-sync/cmd/router"
)

func main() {
	r := router.InitRouter()
	r.Run()
}

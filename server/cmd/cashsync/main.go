package main

import (
	"github.com/nullsploit01/cash-sync/router"
)

func main() {
	r := router.InitRouter()
	r.Run()
}

package main

import (
	"os"
	"path/filepath"

	"github.com/BLimmie/intouch-health-capstone-2019/routes"
)

func main() {
	googleAPI, err := filepath.Abs("interlinked-1cd3dab50e3e.json")
	if err != nil {
		panic(err)
	}
	os.Setenv("GOOGLE_APPLICATION_CREDENTIALS", googleAPI)
	routes.Routes()
}

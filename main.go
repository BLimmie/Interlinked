package main

import (
	// "github.com/BLimmie/intouch-health-capstone-2019/tree/testrtc/routes"
	"./routes"
	"os"
	"path/filepath"
)

func main() {
	googleAPI, err := filepath.Abs("interlinked-1cd3dab50e3e.json")
	if err != nil {
		panic(err)
	}
	os.Setenv("GOOGLE_APPLICATION_CREDENTIALS", googleAPI)
	routes.Routes()
}

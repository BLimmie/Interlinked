package main

import (
	"github.com/BLimmie/intouch-health-capstone-2019/app"
	"github.com/BLimmie/intouch-health-capstone-2019/routes"
)

func main() {
	routes.Routes(app.NewAPIKeys("config.json"))
}

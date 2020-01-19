package routes

import (
	"github.com/BLimmie/intouch-health-capstone-2019/app"
	"github.com/gin-gonic/gin"
)

type roomProperties struct {
	IdentityType string `json:"identityType"`
	RoomName     string `json:"roomName"`
}

func getToken(c *gin.Context) {

	c.Header("Access-Control-Allow-Origin", "*")

	var json roomProperties
	if err := c.ShouldBindJSON(&json); err != nil {
		c.String(500, err.Error())
		return
	}

	resChan := app.NewResultChannel()
	GCPWorkers.SubmitJob(resChan, func(idx int) (interface{}, error) {
		return app.GetAuthToken(json.IdentityType, json.RoomName)
	})
	result := <-resChan
	res, err := result.Result.(map[string]string), result.Err
	if err != nil {
		c.String(500, err.Error())
		return
	}

	c.JSON(200, res)

}

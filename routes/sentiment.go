package routes

import (
	"fmt"
	"github.com/BLimmie/intouch-health-capstone-2019/app"
	"github.com/gin-gonic/gin"
)

func submitSentimentText(c *gin.Context) {

}

func getSentimentText(c *gin.Context) {

}

func submitSentimentFrame(c *gin.Context) {

}

func getSentimentFrame(c *gin.Context) {
	file, err := c.FormFile("file")
	if err != nil {
		c.String(500, "Internal Server Error")
		return
	}
	resChan := app.NewResultChannel()

	AlgorithmiaWorkers.SubmitJob(resChan, func(idx int) (interface{}, error) {
		filename := fmt.Sprintf("tmp%d.jpg", idx)
		if err := c.SaveUploadedFile(file, filename); err != nil {
			return nil, err
		}
		return app.ImageMetrics(filename, apiKeys.Algorithmia)
	})
	result := <-resChan
	res, err := result.Result.(map[string]float64), result.Err
	if err != nil {
		c.String(500, err.Error())
		return
	}
	c.JSON(200, res)
}

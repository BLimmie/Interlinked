package routes

import (
	"fmt"
	"github.com/BLimmie/intouch-health-capstone-2019/app"
	"github.com/gin-gonic/gin"
	"io/ioutil"
)

func submitSentimentText(c *gin.Context) {

}

func getSentimentText(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	text, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		c.String(400, "Bad Request formatting")
	}
	resChan := app.NewResultChannel()
	GCPWorkers.SubmitJob(resChan, func(idx int) (interface{}, error){
		return app.TextSentiment(string(text))
	})
	result := <-resChan
	res, err := result.Result.(float32), result.Err
	if err != nil {
		c.String(500, "Internal Server Error")
		return
	}
	c.JSON(200, map[string]float32{"sentiment": res})
}

func submitSentimentFrame(c *gin.Context) {

}

func getSentimentFrame(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	file, err := c.FormFile("file")
	if err != nil {
		c.String(500, "Internal Server Error")
		return
	}
	resChan := app.NewResultChannel()

	GCPWorkers.SubmitJob(resChan, func(idx int) (interface{}, error) {
		filename := fmt.Sprintf("tmp%d.jpg", idx)
		if err := c.SaveUploadedFile(file, filename); err != nil {
			return nil, err
		}
		return app.ImageMetrics(filename)
	})
	result := <-resChan
	res, err := result.Result.(map[string]string), result.Err
	if err != nil {
		c.String(500, err.Error())
		return
	}
	c.JSON(200, res)

}

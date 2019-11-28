package routes

import (
	"encoding/base64"
	"fmt"
	"github.com/BLimmie/intouch-health-capstone-2019/app"
	"github.com/gin-gonic/gin"
	"image"
	"image/jpeg"
	"io/ioutil"
	"os"
	"strings"
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
		c.String(500, err.Error())
		return
	}
	c.JSON(200, map[string]float32{"sentiment": res})
}

func submitSentimentFrame(c *gin.Context) {

}

func getSentimentFrame(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	text, err := ioutil.ReadAll(c.Request.Body)
	reader := base64.NewDecoder(base64.StdEncoding, strings.NewReader(string(text)))
	m, _, err := image.Decode(reader)

	if err != nil {
		c.String(500, err.Error())
		return
	}
	openfaceResChan := app.NewResultChannel()
	resChan := app.NewResultChannel()
	OFWorkers.SubmitJob(openfaceResChan, func(idx int) (interface{}, error) {
		filename := fmt.Sprintf("tmpof%d.jpg", idx)
		f, err := os.Create(filename)
		if err != nil {
			return nil, err
		}
		defer f.Close()
		jpeg.Encode(f, m, nil)
		return app.ImageAU(filename, "of_output")
	})
	GCPWorkers.SubmitJob(resChan, func(idx int) (interface{}, error) {
		filename := fmt.Sprintf("tmp%d.jpg", idx)
		f, err := os.Create(filename)
		if err != nil {
			return nil, err
		}
		defer f.Close()
		jpeg.Encode(f, m, nil)

		return app.ImageMetrics(filename)
	})
	output := make(map[string]interface{})
	result := <-resChan
	res, err := result.Result.(map[string]string), result.Err
	if err != nil {
		c.String(500, err.Error())
		return
	}
	output["Emotion"] = res
	result = <-openfaceResChan
	res2, err := result.Result.(map[string]float32), result.Err
	if err != nil {
		c.String(500, err.Error())
		return
	}
	output["au"] = res2
	c.JSON(200, output)
}

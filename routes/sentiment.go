package routes

import (
	"encoding/base64"
	"fmt"

	"image"
	"image/jpeg"
	"io/ioutil"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"github.com/BLimmie/intouch-health-capstone-2019/app"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func submitSentimentText(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	text, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		c.String(400, "Bad Request formatting")
		return
	}
	resChan := app.NewResultChannel()
	err = GCPWorkers.SubmitJob(resChan, func(idx int) (interface{}, error) {
		return app.TextSentiment(string(text))
	})
	if err != nil {
		c.String(500, "All workers busy")
		return
	}
	result := <-resChan
	res, err := result.Result.(float64), result.Err
	if err != nil {
		c.String(500, err.Error())
		return
	}
	metric := app.TextMetrics{
		Time:      time.Now().Unix(),
		Sentiment: res,
		Text:      string(text),
	}
	for ok := true; ok; ok = err != nil {
		err = DBWorkers.SubmitJob(resChan, func(idx int) (interface{}, error) {
			id, err := primitive.ObjectIDFromHex(c.Param("id"))
			if err != nil {
				return nil, err
			}
			err = ic.InsertTextMetric(id, metric)
			if err != nil {
				return nil, err
			}
			return nil, nil
		})
	}
	result = <-resChan
	err = result.Err
	if err != nil {
		c.String(500, err.Error())
		return
	}
	c.JSON(200, map[string]float64{"sentiment": res})
}

func getSentimentText(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	text, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		c.String(400, "Bad Request formatting")
		return
	}
	resChan := app.NewResultChannel()
	err = GCPWorkers.SubmitJob(resChan, func(idx int) (interface{}, error) {
		return app.TextSentiment(string(text))
	})
	if err != nil {
		c.String(500, "All workers busy")
		return
	}
	result := <-resChan
	res, err := result.Result.(float32), result.Err
	if err != nil {
		c.String(500, err.Error())
		return
	}
	c.JSON(200, map[string]float32{"sentiment": res})
}

func submitSentimentFrame(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	text, err := ioutil.ReadAll(c.Request.Body)
	reader := base64.NewDecoder(base64.StdEncoding, strings.NewReader(string(text)))
	m, _, err := image.Decode(reader)
	if err != nil {
		c.String(500, err.Error())
		return
	}
	sessionID := c.Param("id")
	t := 0
	t2 := ""
	var maxFrame = &t
	dir := filepath.Join("session", sessionID)
	filename := &t2
	openfaceResChan := app.NewResultChannel()
	resChan := app.NewResultChannel()
	err = OFWorkers.SubmitJob(openfaceResChan, func(idx int) (interface{}, error) {
		if err := os.MkdirAll(dir, os.ModePerm); err != nil {
			return nil, err
		}
		files, err := ioutil.ReadDir(dir)
		if err != nil {
			return nil, err
		}
		for _, file := range files {
			if filepath.Ext(file.Name()) == ".jpg" {
				fileIdx, err := strconv.ParseInt(strings.TrimSuffix(filepath.Base(file.Name()), ".jpg"), 10, 64)
				if err != nil {
					return nil, err
				}
				if int(fileIdx) > *maxFrame {
					*maxFrame = int(fileIdx)
				}
			}
		}
		nextFileIdx := (*maxFrame) + 1
		*filename = filepath.Join("session", sessionID, strconv.Itoa(nextFileIdx)+".jpg")
		f, err := os.Create(*filename)
		if err != nil {
			return nil, err
		}
		defer f.Close()
		jpeg.Encode(f, m, nil)
		return app.ImageAU(*filename, "of_output")
	})
	if err != nil {
		c.String(500, "All workers busy")
		return
	}
	for ok := true; ok; ok = err != nil {
		err = GCPWorkers.SubmitJob(resChan, func(idx int) (interface{}, error) {
			filename := fmt.Sprintf("tmp%d.jpg", idx)
			f, err := os.Create(filename)
			if err != nil {
				return nil, err
			}
			defer f.Close()
			jpeg.Encode(f, m, nil)

			return app.ImageMetrics(filename)
		})
	}
	output := make(map[string]interface{})
	result := <-resChan
	res, err := result.Result.(map[string]string), result.Err
	if err != nil {
		c.String(500, err.Error())
		return
	}
	output["Emotion"] = res
	result = <-openfaceResChan
	err = result.Err
	if err != nil {
		c.String(500, err.Error())
		return
	}
	res2 := result.Result.(map[string]float64)
	output["au"] = res2

	metric := app.FrameMetrics{
		Time:          time.Now().Unix(),
		ImageFilename: filepath.ToSlash(*filename),
		Emotion:       res,
		AU:            res2,
	}
	for ok := true; ok; ok = err != nil {
		err = DBWorkers.SubmitJob(resChan, func(idx int) (interface{}, error) {
			id, err := primitive.ObjectIDFromHex(sessionID)
			if err != nil {
				return nil, err
			}
			err = ic.InsertFrameMetric(id, metric)
			if err != nil {
				return nil, err
			}
			return nil, nil
		})
	}
	c.JSON(200, output)
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
	err = OFWorkers.SubmitJob(openfaceResChan, func(idx int) (interface{}, error) {
		filename := fmt.Sprintf("tmpof%d.jpg", idx)
		f, err := os.Create(filename)
		if err != nil {
			return nil, err
		}
		defer f.Close()
		jpeg.Encode(f, m, nil)
		return app.ImageAU(filename, "of_output")
	})
	if err != nil {
		c.String(500, "All workers busy")
		return
	}
	for ok := true; ok; ok = err != nil {
		err = GCPWorkers.SubmitJob(resChan, func(idx int) (interface{}, error) {
			filename := fmt.Sprintf("tmp%d.jpg", idx)
			f, err := os.Create(filename)
			if err != nil {
				return nil, err
			}
			defer f.Close()
			jpeg.Encode(f, m, nil)

			return app.ImageMetrics(filename)
		})
	}
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
	output["AU"] = res2
	c.JSON(200, output)
}

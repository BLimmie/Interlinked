package routes

import (
	"encoding/base64"
	"errors"
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
	res := 0.0

	err = DBWorkers.SubmitJob(resChan, func(idx int) (interface{}, error) {
		gcpResChan := app.NewResultChannel()

		err = GCPWorkers.SubmitJob(gcpResChan, func(idx int) (interface{}, error) {
			var err error
			if (string(text) == "") {
				return nil, errors.New("tried submitting empty string")
			}
			res, err = app.TextSentiment(string(text))
			if err != nil {
				return nil, err
			}
			return nil, nil
		})
		if err != nil {
			return nil, errors.New("gcp workers busy")
		}
		result := <-gcpResChan
		if result.Err != nil {
			return nil, result.Err
		}

		id, err := primitive.ObjectIDFromHex(c.Param("id"))
		if err != nil {
			return nil, err
		}
		metric := app.TextMetrics{
			Time:      time.Now().Unix(),
			Sentiment: res,
			Text:      string(text),
		}
		err = ic.InsertTextMetric(id, metric)
		if err != nil {
			return nil, err
		}
		return nil, nil
	})

	result := <-resChan
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
	output := make(map[string]interface{})
	resChan := app.NewResultChannel()

	err = DBWorkers.SubmitJob(resChan, func(idx int) (interface{}, error) {
		gcpResChan := app.NewResultChannel()
		res2 := make(map[string]float64)
		res := make(map[string]string)
		var err error
		err = GCPWorkers.SubmitJob(gcpResChan, func(idx int) (interface{}, error) {
			openfaceResChan := app.NewResultChannel()
			var err error
			err = OFWorkers.SubmitJob(openfaceResChan, func(idx int) (interface{}, error) {
				var err error
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
				res2, err = app.ImageAU(*filename, "of_output")
				if err != nil {
					return nil, err
				}
				output["au"] = res2
				return nil, nil
			})
			if err != nil {
				return nil, errors.New("all openface workers busy")
			}
			result := <-openfaceResChan
			err = result.Err
			if err != nil {
				return nil, err
			}

			filename := fmt.Sprintf("tmp%d.jpg", idx)
			f, err := os.Create(filename)
			if err != nil {
				return nil, err
			}
			defer f.Close()
			jpeg.Encode(f, m, nil)

			res, err = app.ImageMetrics(filename)
			if err != nil {
				return nil, err
			}
			output["Emotion"] = res
			return nil, nil
		})
		if err != nil {
			return nil, errors.New("all gcp workers busy")
		}

		result := <-gcpResChan
		err = result.Err
		if err != nil {
			return nil, err
		}
		id, err := primitive.ObjectIDFromHex(sessionID)
		if err != nil {
			return nil, err
		}
		metric := app.FrameMetrics{
			Time:          time.Now().Unix(),
			ImageFilename: filepath.ToSlash(*filename),
			Emotion:       res,
			AU:            res2,
		}
		err = ic.InsertFrameMetric(id, metric)
		if err != nil {
			return nil, err
		}
		return nil, nil
	})
	if err != nil {
		c.JSON(500, "All Workers busy")
		return
	}

	result := <-resChan
	err = result.Err
	if err != nil {
		c.JSON(500, err.Error())
		return
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

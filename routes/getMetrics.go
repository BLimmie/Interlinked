package routes

import (
	"github.com/BLimmie/intouch-health-capstone-2019/app"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func getSessionMetricsAggregate(c *gin.Context) {
	id := c.Param("id")
	recalculate := c.Query("recalculate") != "false"
	resultChan := app.NewResultChannel()
	err := DBWorkers.SubmitJob(resultChan, func(idx int) (interface{}, error) {
		objID, err := primitive.ObjectIDFromHex(id)
		if err != nil {
			return nil, err
		}
		return ic.FindSessionByID(objID)
	})
	if err != nil {
		c.String(500, "All Workers Busy")
		return
	}
	res := <-resultChan
	session, err := res.Result.(*app.Session), res.Err
	if err != nil {
		c.String(500, err.Error())
		return
	}
	if !(session.Summary == nil || recalculate) {
		response := session.Summary
		response["Created Time"] = session.CreatedTime
		response["Text Metrics"] = session.TextMetrics
		response["Frame Metrics"] = session.ImageMetrics
		c.JSON(200, response)
		return
	}
	aggregator, err := app.AggregatorFromSession(session)
	if err != nil {
		c.String(500, err.Error())
		return
	}
	result, err := aggregator.Run()
	if err != nil {
		c.String(500, err.Error())
		return
	}
	response := result
	response["Created Time"] = session.CreatedTime
	response["Text Metrics"] = session.TextMetrics
	response["Frame Metrics"] = session.ImageMetrics
	c.JSON(200, response)
}

func getSessionMetrics(c *gin.Context) {
	id := c.Param("id")
	resultChan := app.NewResultChannel()
	err := DBWorkers.SubmitJob(resultChan, func(idx int) (interface{}, error) {
		objID, err := primitive.ObjectIDFromHex(id)
		if err != nil {
			return nil, err
		}
		return ic.FindSessionByID(objID)
	})
	if err != nil {
		c.String(500, "All Workers Busy")
		return
	}
	res := <-resultChan
	session, err := res.Result.(*app.Session), res.Err
	if err != nil {
		c.String(500, err.Error())
		return
	}
	response := make(map[string]interface{})
	response["Created Time"] = session.CreatedTime
	response["Text Metrics"] = session.TextMetrics
	response["Frame Metrics"] = session.ImageMetrics
	c.JSON(200, response)
	return
}

package routes

import (
	"github.com/BLimmie/intouch-health-capstone-2019/app"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func getPatient(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	username := c.Param("user")
	resultChan := app.NewResultChannel()
	DBWorkers.SubmitJob(resultChan, func(idx int) (interface{}, error) {
		pat, err := ic.FindPatient(bson.D{{"username", username}})
		return pat, err
	})

	result := <-resultChan
	patient, err := result.Result.(*app.Patient), result.Err

	if err != nil {
		if err.Error() == "all workers busy" {
			c.String(500, "Server busy")
		} else {
			c.String(500, "Unable to get patient")
		}
	}
	c.JSON(200, *patient)
}

func getSession(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	sessionID, err := primitive.ObjectIDFromHex(c.Param("id"))
	if err != nil {
		c.String(400, "Bad format")
	}
	resultChan := app.NewResultChannel()
	DBWorkers.SubmitJob(resultChan, func(idx int) (interface{}, error) {
		session, err := ic.FindSessionByID(sessionID)
		return session, err
	})

	result := <- resultChan
	session, err := result.Result.(*app.Session), result.Err

	if err != nil {
		if err.Error() == "all workers busy" {
			c.String(500, "Server busy")
		} else {
			c.String(500, "Unable to get session")
		}
	}
	c.JSON(200, *session)
}

func getProvider(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	username := c.Param("user")
	resultChan := app.NewResultChannel()
	DBWorkers.SubmitJob(resultChan, func(idx int) (interface{}, error) {
		pat, err := ic.FindProvider(bson.D{{"username", username}})
		return pat, err
	})

	result := <-resultChan
	provider, err := result.Result.(*app.Provider), result.Err

	if err != nil {
		if err.Error() == "all workers busy" {
			c.String(500, "Server busy")
		} else {
			c.String(500, "Unable to get provider")
		}
	}
	c.JSON(200, *provider)
}

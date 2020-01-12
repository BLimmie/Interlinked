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
	err := DBWorkers.SubmitJob(resultChan, func(idx int) (interface{}, error) {
		pat, err := ic.FindPatient(bson.D{{"username", username}})
		return pat, err
	})
	if err != nil {
		c.String(500, "All workers busy")
		return
	}
	result := <-resultChan
	patient, err := result.Result.(*app.Patient), result.Err

	if err != nil {
		c.String(500, "Unable to get patient")
		return
	}
	c.JSON(200, *patient)
}

func getPatientsOfProvider(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	username := c.Param("user")
	resultChan := app.NewResultChannel()
	err := DBWorkers.SubmitJob(resultChan, func(idx int) (interface{}, error) {
		pat, err := ic.FindPatient(bson.D{{"username", username}})
		return pat, err
	})
	if err != nil {
		c.String(500, "All workers busy")
		return
	}
	result := <-resultChan
	patient, err := result.Result.(*app.Patient), result.Err

	if err != nil {
		c.String(500, "Unable to get patient")
		return
	}
	c.JSON(200, *patient)
}

func getSession(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	sessionID, err := primitive.ObjectIDFromHex(c.Param("id"))
	if err != nil {
		c.String(400, "Bad format")
		return
	}
	resultChan := app.NewResultChannel()
	err = DBWorkers.SubmitJob(resultChan, func(idx int) (interface{}, error) {
		session, err := ic.FindSessionByID(sessionID)
		return session, err
	})
	if err != nil {
		c.String(500, "All workers busy")
		return
	}
	result := <-resultChan
	session, err := result.Result.(*app.Session), result.Err

	if err != nil {
		c.String(500, err.Error())
		return
	}
	c.JSON(200, *session)
}

func getProvider(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	username := c.Param("user")
	resultChan := app.NewResultChannel()
	err := DBWorkers.SubmitJob(resultChan, func(idx int) (interface{}, error) {
		pat, err := ic.FindProvider(bson.D{{"username", username}})
		return pat, err
	})
	if err != nil {
		c.String(500, "All workers busy")
		return
	}
	result := <-resultChan
	provider, err := result.Result.(*app.Provider), result.Err

	if err != nil {
		c.String(500, err.Error())
		return
	}

	c.JSON(200, *provider)
}

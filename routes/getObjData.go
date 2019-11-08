package routes

import (
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

func getPatient (c *gin.Context) {
	username := c.Param("user")
	patient, err := ic.FindPatient(bson.D{{"username", username}})
	if err != nil {
		c.String(500, "Unable to get patient")
	}
	c.JSON(200, *patient)
}

func getSession(c *gin.Context) {
}

func getProvider(c *gin.Context) {
	username := c.Param("user")
	prov, err := ic.FindProvider(bson.D{{"username", username}})
	if err != nil {
		c.String(500, "Unable to get provider")
	}
	c.JSON(200, *prov)
}
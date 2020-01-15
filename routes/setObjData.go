package routes

import (
	"encoding/hex"
	"fmt"
	"time"

	"github.com/BLimmie/intouch-health-capstone-2019/app"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func addSession(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")

	created := time.Now().String()
	resChan := app.NewResultChannel()
	DBWorkers.SubmitJob(resChan, func(idx int) (interface{}, error) {
		pat, err := ic.FindPatient(bson.D{{"username", c.Request.Header.Get("patUsername")}})
		if err != nil {
			return nil, err
		}
		prov, err := ic.FindProvider(bson.D{{"username", c.Request.Header.Get("provUsername")}})
		if err != nil {
			return nil, err
		}
		patient := pat.ToRef()
		provider := prov.ToRef()
		var id *primitive.ObjectID
		for ok := true; ok; ok = err != nil {
			id, err = ic.InsertSession(created, patient, provider)
			if err != nil {
				return nil, nil
			}
			link := fmt.Sprintf("/session/%s", id.Hex())
			ic.AddLink(*id, link)
		}
		return id.Hex(), nil
	})

	result := <-resChan
	res, err := result.Result, result.Err
	if err != nil {
		c.String(500, err.Error())
		return
	}
	c.JSON(200, map[string]string{
		"id":   res.(string),
		"link": fmt.Sprintf("/session/%s", res.(string)),
	})

}

func addProvider(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	name, username, password := c.Request.Header.Get("name"), c.Request.Header.Get("username"), c.Request.Header.Get("password")
	_, err := hex.DecodeString(username)
	if err == nil && len(username) == 24 {
		c.String(400, "Username not allowed")
	}
	_, err = ic.InsertUser(name, username, password, 1)
	if err != nil {
		c.String(500, err.Error())
		return
	}
	c.String(200, "Success")
}

func addPatient(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	name, username, password := c.Request.Header.Get("name"), c.Request.Header.Get("username"), c.Request.Header.Get("password")
	_, err := hex.DecodeString(username)
	if err == nil && len(username) == 24 {
		c.String(400, "Username not allowed")
	}
	_, err = ic.InsertUser(name, username, password, 0)
	if err != nil {
		c.String(500, err.Error())
		return
	}
	c.String(200, "Success")
}

func associateUser(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	providerid, patientusername := c.Request.Header.Get("providerid"), c.Request.Header.Get("patientusername")
	pat, err := ic.FindPatient(bson.D{{"username", patientusername}})
	if err != nil {
		c.String(500, err.Error())
		return
	}
	provideroid, _ := primitive.ObjectIDFromHex(providerid)
	err = ic.AssociatePatient(provideroid, pat.ID)
	if err != nil {
		c.String(500, err.Error())
		return
	}
	c.String(200, "Success")
}

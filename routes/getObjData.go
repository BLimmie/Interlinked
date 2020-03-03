package routes

import (
	"github.com/BLimmie/intouch-health-capstone-2019/app"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"io/ioutil"
	"sort"
	"strings"
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
		//Treat as if username is id
		err2 := DBWorkers.SubmitJob(resultChan, func(idx int) (interface{}, error) {
			id, err := primitive.ObjectIDFromHex(username)
			if err != nil {
				return nil, err
			}
			pat, err := ic.FindPatientByID(id)
			return pat, err
		})
		if err2 != nil {
			c.String(500, "All workers busy")
			return
		}
		result = <-resultChan
		patient, err = result.Result.(*app.Patient), result.Err
	}

	if err != nil {
		// if err is still nil after checking id
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

func getSessions(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	userID, err := primitive.ObjectIDFromHex(c.Param("userid"))
	if err != nil {
		c.String(400, "Bad format")
		return
	}
	resultChan := app.NewResultChannel()
	err = DBWorkers.SubmitJob(resultChan, func(idx int) (interface{}, error) {
		sessions, err := ic.FindSessions(bson.D{{"patient._id", userID}})
		return sessions, err
	})
	if err != nil {
		c.String(500, "All workers busy")
		return
	}
	result := <-resultChan
	sessions, err := result.Result.([]app.Session), result.Err

	if err != nil {
		c.String(500, err.Error())
		return
	}
	for ii := 0; ii < len(sessions); ii++ {
		sessions[ii].Summary = make(map[string]interface{})
	}
	c.JSON(200, sessions)
}

func getAssociatedSessions(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	proID, err := primitive.ObjectIDFromHex(c.Param("proid"))
	patUsername := c.Param("patun")
	if err != nil {
		c.String(400, "Bad format")
		return
	}
	resultChan := app.NewResultChannel()
	err = DBWorkers.SubmitJob(resultChan, func(idx int) (interface{}, error) {
		sessions, err := ic.FindSessions(bson.D{{"provider._id", proID}, {"patient.username", patUsername}})
		return sessions, err
	})
	if err != nil {
		c.String(500, "All workers busy")
		return
	}
	result := <-resultChan
	sessions, err := result.Result.([]app.Session), result.Err

	if err != nil {
		c.String(500, err.Error())
		return
	}
	for ii := 0; ii < len(sessions); ii++ {
		sessions[ii].Summary = make(map[string]interface{})
	}
	c.JSON(200, sessions)
}

func getLatestSession(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	patusername := c.Request.Header.Get("patusername")
	provusername := c.Request.Header.Get("provusername")
	resultChan := app.NewResultChannel()
	err := DBWorkers.SubmitJob(resultChan, func(idx int) (interface{}, error) {
		session, err := ic.FindLatestSession(provusername, patusername)
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
		//Treat as if username is id
		err2 := DBWorkers.SubmitJob(resultChan, func(idx int) (interface{}, error) {
			id, err := primitive.ObjectIDFromHex(username)
			if err != nil {
				return nil, err
			}
			pat, err := ic.FindProviderByID(id)
			return pat, err
		})
		if err2 != nil {
			c.String(500, "All workers busy")
			return
		}
		result = <-resultChan
		provider, err = result.Result.(*app.Provider), result.Err
	}

	if err != nil {
		// if err is still nil after checking id
		c.String(500, "Unable to get provider")
		return
	}

	c.JSON(200, *provider)
}

func getUserFromToken(c *gin.Context) {
	token := c.Param("token")

	if registry.Exists(token) {
		isPatient := registry.CurrentTokens[token].UserType == "patient"
		id := registry.CurrentTokens[token].Id
		resultChan := app.NewResultChannel()
		err := DBWorkers.SubmitJob(resultChan, func(idx int) (interface{}, error) {
			if isPatient {
				return ic.FindPatientByID(id)
			} else {
				return ic.FindProviderByID(id)
			}
		})
		if err != nil {
			c.String(500, "All workers busy")
			return
		}
		res := <-resultChan
		user, err := res.Result, res.Err
		c.JSON(200, user)
	} else {
		c.String(404, "Token not found")
	}
}

func getLatestTextMetrics(c *gin.Context) {
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
	textMetrics := session.TextMetrics
	searchParam_tmp, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		c.String(500, err.Error())
		return
	}
	searchParam := string(searchParam_tmp)
	var createdTime int64 = 0
	if searchParam == c.Param("id") {
		goto noError
	}
	for _, tm := range textMetrics {
		if strings.TrimSpace(tm.Text) == strings.TrimSpace(searchParam) {
			createdTime = tm.Time
			goto noError
		}
	}
	//couldn't find searchParam
	c.String(400, "Could not find text metric with body as text")
	return
noError:
	resultSet := make([]app.TextMetrics, 0)
	for _, tm := range textMetrics {
		if tm.Time > createdTime {
			resultSet = append(resultSet, tm)
		}
	}
	sort.SliceStable(resultSet, func(i, j int) bool {
		return resultSet[i].Time < resultSet[j].Time
	})
	c.JSON(200, resultSet)
}

package routes

import (
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/BLimmie/intouch-health-capstone-2019/app"
	"github.com/gin-gonic/gin"
	cors "github.com/rs/cors/wrapper/gin"
	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson"
)

var testrouter *gin.Engine = nil

func TestAddPatient(t *testing.T) {

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/patient", nil)
	name := "Felix Zhao"
	username := "fzhao1"
	password := "passw"
	req.Header.Set("name", name)
	req.Header.Set("username", username)
	req.Header.Set("password", password)
	testrouter.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
	patient, _ := ic.FindPatient(bson.D{{"username", "fzhao1"}})
	assert.Equal(t, patient.Name, name)
	assert.Equal(t, patient.Username, username)
	assert.Equal(t, patient.Password, password)

	ic.DeleteEntity(patient.ID, app.Pat)
}

func TestAddProvider(t *testing.T) {

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/provider", nil)
	name := "Felix Zhao"
	username := "fzhao2"
	password := "passw"
	req.Header.Set("name", name)
	req.Header.Set("username", username)
	req.Header.Set("password", password)
	testrouter.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
	provider, _ := ic.FindProvider(bson.D{{"username", "fzhao2"}})
	assert.Equal(t, provider.Name, name)
	assert.Equal(t, provider.Username, username)
	assert.Equal(t, provider.Password, password)

	ic.DeleteEntity(provider.ID, app.Pro)
}

func TestAddSession(t *testing.T) {
}

func TestGetPatient(t *testing.T) {
	name := "Felix Zhao"
	username := "fzhao4"
	password := "passw"
	ic.InsertUser(name, username, password, app.Pat)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/patient/"+username, nil)
	testrouter.ServeHTTP(w, req)
	assert.Equal(t, 200, w.Code)

	patient := app.Patient{}
	json.NewDecoder(w.Body).Decode(&patient)
	assert.Equal(t, patient.Name, name)
	assert.Equal(t, patient.Username, username)
	assert.Equal(t, patient.Password, password)

	ic.DeleteEntity(patient.ID, app.Pat)
}

func TestGetProvider(t *testing.T) {
	name := "Felix Zhao"
	username := "fzhao5"
	password := "passw"
	ic.InsertUser(name, username, password, app.Pro)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/provider/"+username, nil)
	testrouter.ServeHTTP(w, req)
	assert.Equal(t, 200, w.Code)

	provider := app.Provider{}
	json.NewDecoder(w.Body).Decode(&provider)
	assert.Equal(t, provider.Name, name)
	assert.Equal(t, provider.Username, username)
	assert.Equal(t, provider.Password, password)

	ic.DeleteEntity(provider.ID, app.Pro)
}

func TestGetSession(t *testing.T) {
	patName := "Felix Zhao"
	patUsername := "fzhao6"
	patPassword := "passw"
	proName := "Felix Zhao"
	proUsername := "fzhao7"
	proPassword := "passw"
	link := "link"
	created := "01-01-2001"
	patID, _ := ic.InsertUser(patName, patUsername, patPassword, app.Pat)
	proID, _ := ic.InsertUser(proName, proUsername, proPassword, app.Pro)
	patient, _ := ic.FindPatientByID(*patID)
	provider, _ := ic.FindProviderByID(*proID)
	sesID, _ := ic.InsertSession(link, created, patient.ToRef(), provider.ToRef())

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/session/"+sesID.Hex(), nil)
	testrouter.ServeHTTP(w, req)
	assert.Equal(t, 200, w.Code)

	session := app.Session{}
	json.NewDecoder(w.Body).Decode(&session)
	assert.Equal(t, session.Link, link)
	assert.Equal(t, session.CreatedTime, created)
	assert.Equal(t, session.Patient, *(patient.ToRef()))
	assert.Equal(t, session.Provider, *(provider.ToRef()))

	ic.DeleteEntity(*proID, app.Pro)
	ic.DeleteEntity(*patID, app.Pat)
	ic.DeleteEntity(*sesID, app.Ses)
}

func TestLogin(t *testing.T) {
	name := "Felix Zhao"
	username := "fzhao8"
	password := "passw"
	id, _ := ic.InsertUser(name, username, password, app.Pro)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/login?userType=provider", nil)
	req.SetBasicAuth(username, password)
	testrouter.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
	assert.Equal(t, "application/json; charset=utf-8", w.Header().Get("content-type"))

	// ret := gin.H{}
	// json.NewDecoder(w.Body).Decode(&ret)
	// assert.True(t, registry.Exists(ret["token"].(string)))

	ic.DeleteEntity(*id, app.Pro)
}

func setup() {
	ic.ProCol.DeleteMany(context.TODO(), bson.D{{}})
	ic.PatCol.DeleteMany(context.TODO(), bson.D{{}})
	ic.SesCol.DeleteMany(context.TODO(), bson.D{{}})

	DBWorkers = app.NewWorkerHandler(4)
	AlgorithmiaWorkers = app.NewWorkerHandler(1)
	GCPWorkers = app.NewWorkerHandler(6)
	testrouter = gin.Default()
	//Allow all origin headers
	testrouter.Use(cors.Default())
	// Get Object Data
	testrouter.POST("/patient/:user", getPatient)
	testrouter.POST("/provider/:user", getProvider)
	testrouter.POST("/session/:id", getSession)
	// Submit New Data
	testrouter.POST("/patient", addPatient)
	testrouter.POST("/provider", addProvider)
	testrouter.POST("/session", addSession)

	// Get Session Metrics
	testrouter.POST("/metrics/:id", getSessionMetrics)
	testrouter.POST("/metrics/:id/aggregate", getSessionMetricsAggregate)
	// Get Sentiment
	testrouter.POST("/sentiment/frame", getSentimentFrame)
	testrouter.POST("/sentiment/frame/:id", submitSentimentFrame)
	testrouter.POST("/sentiment/text", getSentimentText)
	testrouter.POST("/sentiment/text/:id", submitSentimentText)
	// Authenticate
	testrouter.POST("/login", login)
}

func teardown() {
}

func TestMain(m *testing.M) {
	setup()
	run := m.Run()
	teardown()
	os.Exit(run)
}

package routes

import (
	"github.com/BLimmie/intouch-health-capstone-2019/app"
	"github.com/gin-gonic/gin"
	cors "github.com/rs/cors/wrapper/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

var client *mongo.Client = nil
var ic *app.IntouchClient = nil
var DBWorkers *app.WorkerHandler = nil
var OFWorkers *app.WorkerHandler = nil
var GCPWorkers *app.WorkerHandler = nil

func init() {
	client = app.OpenConnection()
	ic = app.CreateIntouchClient("test", client)
}

var registry = app.NewLoginHandler()

func Routes() {
	// Creates a gin router with default middleware:
	// logger and recovery (crash-free) middleware
	DBWorkers = app.NewWorkerHandler(4)
	OFWorkers = app.NewWorkerHandler(4)
	GCPWorkers = app.NewWorkerHandler(4)
	router := gin.Default()
	//Allow all origin headers
	corsOps := cors.New(cors.Options{
		AllowOriginFunc: func(origin string) bool { return true },
		// AllowedOrigins:   []string{"http://localhost:3000", "*"},
		AllowedMethods:   []string{"PUT", "GET", "POST", "PATCH", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Origin", "Content-Type", "X-Auth-Token", "Authorization", "Name", "Username", "Password", "Provid", "Patid", "Patusername", "Provusername"},
		AllowCredentials: true,
		Debug:            true,
	})
	router.Use(corsOps)
	// Get Object Data
	router.POST("/patient/:user", getPatient)
	router.POST("/provider/:user", getProvider)
	router.POST("/session/:id", getSession)
	router.POST("/latestsession", getLatestSession)
	router.POST("/user/:token", getUserFromToken)
	// Submit New Data
	router.POST("/patient", addPatient)
	router.POST("/provider", addProvider)
	router.POST("/session", addSession)
	router.POST("/associateUser", associateUser)

	// Get Session Metrics
	router.POST("/metrics/:id", getSessionMetrics)
	router.POST("/metrics/:id/aggregate", getSessionMetricsAggregate)
	// Get Sentiment
	router.POST("/sentiment/frame", getSentimentFrame)
	router.POST("/sentiment/frame/:id", submitSentimentFrame)
	router.POST("/sentiment/text", getSentimentText)
	router.POST("/sentiment/text/:id", submitSentimentText)
	// Get Twilio Token
	router.POST("/twilio/getToken", getToken)
	// Authenticate
	router.POST("/login", login)

	// By default it serves on :8080 unless a
	// PORT environment variable was defined.
	router.Run()
	// router.Run(":3000") for a hard coded port
}

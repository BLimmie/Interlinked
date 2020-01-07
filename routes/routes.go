package routes

import (
	"github.com/BLimmie/intouch-health-capstone-2019/app"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	cors "github.com/rs/cors/wrapper/gin"
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

var registry = app.LoginHandler{CurrentTokens: map[string]primitive.ObjectID{}}

func Routes() {
	// Creates a gin router with default middleware:
	// logger and recovery (crash-free) middleware
	DBWorkers = app.NewWorkerHandler(4)
	OFWorkers = app.NewWorkerHandler(4)
	GCPWorkers = app.NewWorkerHandler(4)
	router := gin.Default()
	//Allow all origin headers
	router.Use(cors.Default())
	// Get Object Data
	router.POST("/patient/:user", getPatient)
	router.POST("/provider/:user", getProvider)
	router.POST("/session/:id", getSession)
	// Submit New Data
	router.POST("/patient", addPatient)
	router.POST("/provider", addProvider)
	router.POST("/session", addSession)

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

	router.StaticFile("/", "./routes/js/index.html")
	router.StaticFile("/index.jsx", "./routes/js/index.jsx")
	router.StaticFile("/favicon.ico", "./routes/js/favicon.ico")

	// By default it serves on :8080 unless a
	// PORT environment variable was defined.
	router.Run()
	// router.Run(":3000") for a hard coded port
}

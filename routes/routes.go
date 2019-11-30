package routes

import (
	"log"

	"github.com/BLimmie/intouch-health-capstone-2019/app"
	"github.com/gin-gonic/gin"
	socketio "github.com/googollee/go-socket.io"
	cors "github.com/rs/cors/wrapper/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var client *mongo.Client = nil
var ic *app.IntouchClient = nil
var DBWorkers *app.WorkerHandler = nil
var AlgorithmiaWorkers *app.WorkerHandler = nil
var GCPWorkers *app.WorkerHandler = nil
var sigServer *sockeio.Server = nil

func init() {
	client = app.OpenConnection()
	ic = app.CreateIntouchClient("test", client)
}

var registry = app.LoginHandler{CurrentTokens: map[string]primitive.ObjectID{}}

func socket() {
	var err error = nil
	sigServer, err = socketio.NewServer(nil)
	if err != nil {
		log.Fatal(err)
	}
	sigServer.OnConnect("/", func(s socketio.Conn) error {
		s.SetContext("")
		s.Join("link")
		return nil
	})
	sigServer.OnEvent("/", "join", func(s socketio.Conn, msg string) {
		s.Join("link")
	})
	sigServer.OnEvent("/", "offer", func(s socketio.Conn, msg string) {
		s.Emit("offer", msg)
	})
	sigServer.OnEvent("/", "answer", func(s socketio.Conn, msg string) {
		s.Emit("answer", msg)
	})
	sigServer.OnEvent("/", "candidate", func(s socketio.Conn, msg string) {
		s.Emit("candidate", msg)
	})
	sigServer.OnEvent("/", "close", func(s socketio.Conn, msg string) {
		s.Emit("close", msg)
		s.Close()
	})

	go sigServer.Serve()
	defer sigServer.Close()
}

func Routes() {
	socket()
	// Creates a gin router with default middleware:
	// logger and recovery (crash-free) middleware
	DBWorkers = app.NewWorkerHandler(4)
	AlgorithmiaWorkers = app.NewWorkerHandler(1)
	GCPWorkers = app.NewWorkerHandler(6)
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
	// Authenticate
	router.POST("/login", login)
	router.GET("/socket.io/*any", gin.WrapH(sigServer))
	router.POST("/socket.io/*any", gin.WrapH(sigServer))

	// By default it serves on :8080 unless a
	// PORT environment variable was defined.
	router.Run()
	// router.Run(":3000") for a hard coded port
}

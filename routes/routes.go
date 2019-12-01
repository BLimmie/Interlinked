package routes

import (
	"log"
	"net/http"

	"github.com/BLimmie/intouch-health-capstone-2019/app"
	"github.com/gin-gonic/gin"
	cors "github.com/rs/cors/wrapper/gin"

	engineio "github.com/googollee/go-engine.io"
	"github.com/googollee/go-engine.io/transport"
	"github.com/googollee/go-engine.io/transport/polling"
	"github.com/googollee/go-engine.io/transport/websocket"
	socketio "github.com/googollee/go-socket.io"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var client *mongo.Client = nil
var ic *app.IntouchClient = nil
var DBWorkers *app.WorkerHandler = nil
var AlgorithmiaWorkers *app.WorkerHandler = nil
var GCPWorkers *app.WorkerHandler = nil
var sigServer *socketio.Server = nil

func init() {
	client = app.OpenConnection()
	ic = app.CreateIntouchClient("test", client)
}

var registry = app.LoginHandler{CurrentTokens: map[string]primitive.ObjectID{}}

func socket() {
	var err error = nil
	pt := polling.Default
	wt := websocket.Default
	wt.CheckOrigin = func(req *http.Request) bool {
		return true
	}
	sigServer, err = socketio.NewServer(&engineio.Options{
		Transports: []transport.Transport{
			pt,
			wt,
		},
	})

	if err != nil {
		log.Fatal(err)
	}
	sigServer.OnConnect("/", func(s socketio.Conn) error {
		s.SetContext("")
		log.Println("connection established with " + s.ID())
		s.Join("link")
		return nil
	})
	sigServer.OnEvent("/", "join", func(s socketio.Conn, msg string) {
		log.Println("join")
		s.Join("link")
	})
	sigServer.OnEvent("/", "offer", func(s socketio.Conn, msg string) {
		log.Println("offer")
		sigServer.BroadcastToRoom("link", "offer", msg)
		// s.Emit("offer", msg)
	})
	sigServer.OnEvent("/", "answer", func(s socketio.Conn, msg string) {
		log.Println("answer")
		// s.Emit("answer", msg)
		sigServer.BroadcastToRoom("link", "answer", msg)
	})
	sigServer.OnEvent("/", "candidate", func(s socketio.Conn, msg string) {
		log.Println("candidate")
		// s.Emit("candidate", msg)
		sigServer.BroadcastToRoom("link", "candidate", msg)
	})
	sigServer.OnEvent("/", "close", func(s socketio.Conn, msg string) {
		log.Println("close")
		// s.Emit("close", msg)
		sigServer.BroadcastToRoom("link", "close", msg)
		s.Close()
	})
	sigServer.OnDisconnect("/", func(s socketio.Conn, msg string) {
		log.Println("disconnected from " + s.ID())
	})

	go sigServer.Serve()
}

func Routes() {
	socket()
	// Creates a gin router with default middleware:
	// logger and recovery (crash-free) middleware
	DBWorkers = app.NewWorkerHandler(4)
	AlgorithmiaWorkers = app.NewWorkerHandler(1)
	GCPWorkers = app.NewWorkerHandler(6)
	router := gin.Default()
	// router := gin.New()
	//Allow all origin headers
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"},
		// AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
	})
	// router.Use(cors.Default())
	router.Use(c)
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
	// Signalling
	router.GET("/socket.io/*any", gin.WrapH(sigServer))
	router.POST("/socket.io/*any", gin.WrapH(sigServer))

	// By default it serves on :8080 unless a
	// PORT environment variable was defined.
	router.Run()
	// router.Run(":3000") for a hard coded port
}

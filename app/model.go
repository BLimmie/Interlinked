package app

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"sync"
)

type LoginHandler struct {
	CurrentTokens map[string]primitive.ObjectID
}

type ResultStruct struct {
	result interface{}
	err    error
}

type WorkerHandler struct {
	Workers chan bool
	mux     sync.Mutex
}

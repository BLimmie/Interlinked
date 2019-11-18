package app

import (
	"errors"
	"sync"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Entity int

var client *mongo.Client = nil
var ic *IntouchClient = nil

var passcode = []byte{0x31, 0x41, 0x59, 0x26, 0x53, 0x58, 0x97, 0x32, 0x38, 0x46, 0x26, 0x43, 0x38, 0x32, 0x79, 0x50, 0x28, 0x84, 0x19, 0x71, 0x69, 0x39, 0x93, 0x75}

const (
	Pat Entity = 0
	Pro Entity = 1
	Ses Entity = 2
)

var db = "intouch"

var errs = map[string]error{
	"ErrUsernameInvalid":  errors.New("Username is already in use"),
	"ErrPatientNotFound":  errors.New("Patient was not found"),
	"ErrProviderNotFound": errors.New("Provider was not found"),
	"ErrInvalidFlag":      errors.New("Flag parameter is wrong"),
	"ErrNotObjectID":      errors.New("ID is not type ObjectID"),
	"ErrLinkInvalid":      errors.New("Link is already in use"),
}

func init() {
	client = OpenConnection()
	ic = CreateIntouchClient("test", client)
}

type TimestampMetrics struct {
	Time      time.Duration
	Sentiment map[string]float64
	AU        map[string]float32
}

type LoginHandler struct {
	CurrentTokens map[string]primitive.ObjectID
}

type ResultStruct struct {
	Result interface{}
	Err    error
}

type WorkerHandler struct {
	Workers chan bool
	mux     sync.Mutex
}

// Session will reference patient and provider by _id, name and username
type Session struct {
	ID          primitive.ObjectID `bson:"_id"`
	Link        string
	CreatedTime string
	Patient     UserRef
	Provider    UserRef
	Metrics     []TimestampMetrics
}

// BlankSession for inserting new document with random id rather than our own
type BlankSession struct {
	Link        string
	CreatedTime string
	Patient     UserRef
	Provider    UserRef
}

// Patient if referenced by Provider or Session then Salt, Password, and Patients have no values
type Patient struct {
	ID        primitive.ObjectID `bson:"_id"`
	Name      string
	Username  string
	Password  string
	salt      string
	Providers []UserRef
}

// BlankUser for inserting new document with random id rather than our own
type BlankUser struct {
	Name     string
	Username string
	Password string
}

// UserRef for appending user as a reference in a different doc
// user ToRef of Provider or Patient to create UserRef
type UserRef struct {
	ID       primitive.ObjectID `bson:"_id"`
	Name     string
	Username string
}

// Provider if referenced by Patient or Session then Salt, Password, and Patients have no values
type Provider struct {
	ID       primitive.ObjectID `bson:"_id"`
	Name     string
	Username string
	Password string
	salt     string
	Patients []UserRef
}

// IntouchClient will add methods for easy transactions with db
type IntouchClient struct {
	ProCol *mongo.Collection
	PatCol *mongo.Collection
	SesCol *mongo.Collection
}

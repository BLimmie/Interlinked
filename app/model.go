package app

import (
	"errors"
	"sync"

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

var timeLayout = "2006-01-02 15:04:05.999999999 -0700 MST"

var errs = map[string]error{
	"ErrUsernameInvalid":  errors.New("Username is already in use"),
	"ErrPatientNotFound":  errors.New("Patient was not found"),
	"ErrProviderNotFound": errors.New("Provider was not found"),
	"ErrInvalidFlag":      errors.New("Flag parameter is wrong"),
	"ErrNotObjectID":      errors.New("ID is not type ObjectID"),
	"ErrLinkInvalid":      errors.New("Link is already in use"),
}

var auLabels = map[string]string{
	"AU01_r": "InnerBrowRaiser",
	"AU02_r": "OuterBrowRaiser",
	"AU04_r": "BrowLowerer",
	"AU05_r": "UpperLidRaiser",
	"AU06_r": "CheekRaiser",
	"AU07_r": "LidTightener",
	"AU09_r": "NoseWrinkler",
	"AU10_r": "UpperLipRaiser",
	"AU12_r": "LipCornerPuller",
	"AU14_r": "Dimpler",
	"AU15_r": "LipCornerDepressor",
	"AU17_r": "ChinRaiser",
	"AU20_r": "LipStretcher",
	"AU23_r": "LipTightener",
	"AU25_r": "LipsPart",
	"AU26_r": "JawDrop",
	"AU45_r": "Blink",
}

func init() {
	client = OpenConnection()
	ic = CreateIntouchClient("intouch", client)
}

type APIKeys struct {
	Algorithmia string
}

type TimestampMetrics struct {
	Time          string
	Text          string
	Sentiment     float32
	ImageFilename string
	Emotion       map[string]string
	AU            map[string]float32
}

type TextMetrics struct {
	Time      int64
	Text      string
	Sentiment float32
}
type FrameMetrics struct {
	Time          int64
	ImageFilename string
	Emotion       map[string]string
	AU            map[string]float32
}
type LoginHandler struct {
	CurrentTokens map[string]UserCache
}

type UserCache struct {
	Id       primitive.ObjectID
	UserType string
}

type ResultStruct struct {
	Result interface{}
	Err    error
}

type WorkerHandler struct {
	Workers chan bool
	mux     sync.Mutex
	idx     int
}

// Session will reference patient and provider by _id, name and username
type Session struct {
	ID           primitive.ObjectID `bson:"_id"`
	Link         string
	CreatedTime  int64
	Patient      UserRef
	Provider     UserRef
	TextMetrics  []TextMetrics  `bson:"text_metrics"`
	ImageMetrics []FrameMetrics `bson:"frame_metrics"`

	Summary map[string]interface{}
}

// BlankSession for inserting new document with random id rather than our own
type BlankSession struct {
	CreatedTime int64
	Patient     UserRef
	Provider    UserRef
}

// Patient if referenced by Provider or Session then Salt, password, and Patients have no values
type Patient struct {
	ID        primitive.ObjectID `bson:"_id"`
	Name      string
	Username  string
	password  string
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

// Provider if referenced by Patient or Session then Salt, password, and Patients have no values
type Provider struct {
	ID       primitive.ObjectID `bson:"_id"`
	Name     string
	Username string
	password string
	salt     string
	Patients []UserRef
}

// IntouchClient will add methods for easy transactions with db
type IntouchClient struct {
	ProCol *mongo.Collection
	PatCol *mongo.Collection
	SesCol *mongo.Collection
}

type Aggregator struct {
	session     *Session
	conclusions map[string]func(session *Session) (interface{}, error)
}

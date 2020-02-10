package app

import (
	"fmt"
	"time"
	"github.com/saintpete/twilio-go/token"
	"encoding/json"
    "io/ioutil"
    "os"
)

var twilioAccountSid = "AC4f79f5fa3f27d8e878d2a3a4bdb1f59b"

var roomNames []string
var numOfRooms int = -1

func roomExists(roomName string)  bool{
	for _, b := range roomNames {
        if b == roomName {
            return true
        }
    }
    return false
}

func deleteRoom(roomName string) {
	for i, v := range roomNames {
		if v == roomName {
			roomNames = append(roomNames[:i], roomNames[i+1:]...)
			break
		}
	}
}
type Grant interface {
	ToPayload() map[string]interface{}
	Key() string
}

type MyGrant struct {
	roomName string
}

func NewMyGrant(name string) *MyGrant {
	return &MyGrant{roomName: name}
}

func (gr *MyGrant) ToPayload() map[string]interface{}{
	if len(gr.roomName) > 0 {
		return map[string]interface{}{
			"room":gr.roomName,
		}
	}
	return make(map[string]interface{})
}

func (gr *MyGrant) Key() string {
	return "video"
}

type Twilio struct {
	Key string `json:"twilioApiKey"`
	Secret string `json:"twilioApiSecret"`
}
func GetAuthToken(identityType string, roomName string) (map[string] string, error){

	// Open our jsonFile
	jsonFile, err := os.Open("./interlinked-1sg3dgdgh45.json")
	// if we os.Open returns an error then handle it
	if err != nil {
		return map[string] string {
			"token": "",
			"roomName": "Cannot open twilio credentials",
		}, nil
	}
	fmt.Println("Successfully Opened users.json")
	byteValue, _ := ioutil.ReadAll(jsonFile)

	// we initialize our Users array
	var twilio Twilio

	// we unmarshal our byteArray which contains our
	// jsonFile's content into 'users' which we defined above
	json.Unmarshal(byteValue, &twilio)

	// defer the closing of our jsonFile so that we can parse it later on
	defer jsonFile.Close()

	if(identityType == "Doctor"){
		if(roomExists(roomName)){
			return map[string] string {
				"token": "",
				"roomName": "roomname is taken",
			}, nil
		}
		numOfRooms = numOfRooms + 1
		roomNames = append(roomNames, roomName)
	}

	if(identityType == "Patient"){
		if(!roomExists(roomName)){
			return map[string] string {
				"token": "",
				"roomName": "DNE",
			}, nil
		} else {
			deleteRoom(roomName)
		}
	}

	var identity = fmt.Sprintf("%s%d",identityType,numOfRooms)

	h, _ := time.ParseDuration("1h") 
	accessToken := token.New(
		twilioAccountSid,
		twilio.Key,
		twilio.Secret,
		identity,
		h)

	var grant Grant = NewMyGrant(roomName)
	accessToken.AddGrant(grant)
	accessTokenJWT, err := accessToken.JWT()
	return map[string] string {
		"token": accessTokenJWT,
		"roomName": roomName,
	}, err
}

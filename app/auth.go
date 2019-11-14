package app

import (
	"encoding/base64"
	"strings"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var client *mongo.Client = nil
var ic *IntouchClient = nil

var passcode = []byte{0x31, 0x41, 0x59, 0x26, 0x53, 0x58, 0x97, 0x32, 0x38, 0x46, 0x26, 0x43, 0x38, 0x32, 0x79, 0x50, 0x28, 0x84, 0x19, 0x71, 0x69, 0x39, 0x93, 0x75}

func init() {
	client = OpenConnection()
	ic = CreateIntouchClient("test", client)
}

func xorByteArray(a1, a2 []byte) []byte {
	var result []byte
	if len(a1) < len(a2) {
		a1, a2 = a2, a1
	}
	for i := 0; i < len(a1); i++ {
		result = append(result, a1[i]^a2[i])
	}
	return result
}

func VerifyLogin(data, userType string) (*primitive.ObjectID, error) {
	user, pass, err := GetCredentials(data)
	if err != nil {
		return nil, err
	}
	var auth *primitive.ObjectID = nil
	if userType == "provider" {
		auth, err = ic.AuthenticateUser(user, pass, Pro)
	} else {
		auth, err = ic.AuthenticateUser(user, pass, Pat)
	}
	if err != nil {
		return nil, err
	}
	return auth, nil
}

func GetCredentials(data string) (username, password string, err error) {
	data = strings.Split(data, " ")[1]
	decodedData, err := base64.StdEncoding.DecodeString(data)
	if err != nil {
		return "", "", err
	}
	strData := strings.Split(string(decodedData), ":")
	username = strData[0]
	password = strData[1]
	return
}

func CreateToken(user primitive.ObjectID) string {
	userBytes := [12]byte(user)
	userSlice := userBytes[:]
	timeBytes := [12]byte(primitive.NewObjectID())
	timeSlice := timeBytes[:]
	arr := xorByteArray(append(userSlice, timeSlice...), passcode)
	return string(arr[:])
}

func NewSalt() string {
	return ""
}

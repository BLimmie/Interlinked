package app

import (
	"encoding/base64"
	"errors"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"strings"
)

var Placeholder_TKN = "12345"
var passcode = []byte{0x31, 0x41, 0x59, 0x26, 0x53, 0x58, 0x97, 0x32, 0x38, 0x46, 0x26, 0x43, 0x38, 0x32, 0x79, 0x50, 0x28, 0x84, 0x19, 0x71, 0x69, 0x39, 0x93, 0x75}
var TMP_USER = "username"
var TMP_PASS = "password"

func xorByteArray(a1, a2 []byte) []byte {
	result := []byte{}
	for i := 0; i < len(a1); i++ {
		result[i] = a1[i] ^ a2[i]
	}
	return result
}

func VerifyLogin(data string) (primitive.ObjectID, error) {
	_, _, err := GetCredentials(data)
	if err != nil {
		return primitive.ObjectID{}, err
	}
	return primitive.ObjectID{}, errors.New("not implemented")
}

func GetCredentials(data string) (username, password string, err error) {
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

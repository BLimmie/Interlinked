package app

import (
	"encoding/base64"
	"encoding/hex"
	"encoding/json"
	"math/rand"
	"os"
	"strings"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

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
	rand.Shuffle(24, func(i, j int) {
		arr[i], arr[j] = arr[j], arr[i]
	})
	return hex.EncodeToString(arr)
}

func NewSalt() string {
	return ""
}

func NewAPIKeys(config string) APIKeys {
	r, err := os.Open(config)

	if err != nil {
		panic(err)
	}
	var keys = APIKeys{}
	d := json.NewDecoder(r)
	if err := d.Decode(&keys); err != nil {
		panic(err)
	}
	return keys
}
package app

import (
	"fmt"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"net/http"
	"testing"
)

func Test_GetCredentials(t *testing.T) {
	user := "test"
	pass := "test"
	req, err := http.NewRequest("na", "na", nil)
	if err != nil {
		t.Fatalf(err.Error())
	}
	req.SetBasicAuth(user, pass)
	auth := req.Header.Get("Authorization")
	returnUser, returnPass, err := GetCredentials(auth)
	if err != nil {
		t.Fatalf(err.Error())
	}
	if user != returnUser || pass != returnPass {
		t.Fatalf("Username or Password does not match")
	}
}

func TestCreateToken(t *testing.T) {
	id := primitive.NewObjectID()
	s := CreateToken(id)
	fmt.Println(s)
}

func Test_XorBytes(t *testing.T) {
	a1 := []byte{1, 0, 1, 0}
	a2 := []byte{1, 0, 1, 0}
	res := xorByteArray(a1, a2)

	for _, b := range res {
		if b != byte(0) {
			t.Fatalf("")
		}
	}
}

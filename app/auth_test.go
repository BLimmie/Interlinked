package app

import (
	"net/http"
	"strings"
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
	auth := strings.Split(req.Header.Get("Authorization"), " ")[1]
	returnUser, returnPass, err := GetCredentials(auth)
	if err != nil {
		t.Fatalf(err.Error())
	}
	if user != returnUser || pass != returnPass {
		t.Fatalf("Username or Password does not match")
	}
}

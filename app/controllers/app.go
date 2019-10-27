package controllers

import (
"errors"
"github.com/revel/revel"
"strings"
)

type App struct {
	*revel.Controller
}

var TMP_USER = "test"
var TMP_PASS = "test"

func (c App) Index() revel.Result {
	return c.Render()
}

func (c App) GetPatient(id int) revel.Result {
	if auth := c.Request.Header.Get("Authorization"); auth != "" {
		user, pass, err := getCredentials(strings.Split(auth, " ")[1])
		if err != nil {
			return c.RenderError(err);
		}
		if user == TMP_USER && pass == TMP_PASS {
			data := "testdata"
			return c.Render(data)
		} else {
			return c.RenderError(errors.New("403: Forbidden"))
		}
	} else {
		return c.RenderError(errors.New("401: Not Authorized"))
	}
}

func (c App) GetProvider(id int) revel.Result {
	if auth := c.Request.Header.Get("Authorization"); auth != "" {
		user, pass, err := getCredentials(strings.Split(auth, " ")[1])
		if err != nil {
			return c.RenderError(err);
		}
		if user == TMP_USER && pass == TMP_PASS {
			data := "testdata"
			return c.Render(data)
		} else {
			return c.RenderError(errors.New("403: Forbidden"))
		}
	} else {
		return c.RenderError(errors.New("401: Not Authorized"))
	}
}

func (c App) GetSession(id int) revel.Result {
	if auth := c.Request.Header.Get("Authorization"); auth != "" {
		user, pass, err := getCredentials(strings.Split(auth, " ")[1])
		if err != nil {
			return c.RenderError(err);
		}
		if user == TMP_USER && pass == TMP_PASS {
			data := "testdata"
			return c.Render(data)
		} else {
			return c.RenderError(errors.New("403: Forbidden"))
		}
	} else {
		return c.RenderError(errors.New("401: Not Authorized"))
	}
}
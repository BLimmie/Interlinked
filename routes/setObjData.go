package routes

import "github.com/gin-gonic/gin"

func addSession(c *gin.Context) {
	c.String(501, "Not Implemented")
}

func addProvider(c *gin.Context) {
	name, username, password := c.Request.Header.Get("name"), c.Request.Header.Get("username"), c.Request.Header.Get("password")
	_, err := ic.InsertUser(name, username, password, 1)
	if err != nil {
		c.String(500, err.Error())
		return
	}
	c.String(200, "Success")
}

func addPatient(c *gin.Context) {
	name, username, password := c.Request.Header.Get("name"), c.Request.Header.Get("username"), c.Request.Header.Get("password")
	_, err := ic.InsertUser(name, username, password, 0)
	if err != nil {
		c.String(500, err.Error())
		return
	}
}
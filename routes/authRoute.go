package routes

import "github.com/gin-gonic/gin"
import "github.com/BLimmie/intouch-health-capstone-2019/app"

func inRegistry(token string) bool {
	return registry.Exists(token)
}

func login(c *gin.Context) {
	userType := c.Query("userType")
	if userType != "patient" && userType != "provider" {
		c.String(400, "Invalid User Type %s", userType)
		return
	}
	userId, err := app.VerifyLogin(c.Request.Header.Get("Authorization"), userType)
	if err != nil {
		c.String(200, err.Error())
		return
	}

	//Create token and add to the registry
	token := app.CreateToken(*userId)

	if err := registry.AddLogin(*userId, token); err != nil {
		c.String(200, "Already Logged in: %s", err.Error())
		return
	}
	c.JSON(200, gin.H{
		"token":    token,
		"userType": userType,
	})
}

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
	user_id, err := app.VerifyLogin(c.Request.Header.Get("Authorization"))
	if err != nil {
		c.String(500, "Unable to authenticate")
		return
	}

	//Create token and add to the registry
	token := app.CreateToken(user_id)

	if err := registry.AddLogin(user_id, token); err != nil {
		c.String(500, "Already Logged in")
		return
	}
	c.JSON(200, gin.H{
		"token":    token,
		"userType": userType,
	})
}

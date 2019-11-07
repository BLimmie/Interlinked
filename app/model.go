package app

import "go.mongodb.org/mongo-driver/bson/primitive"

type LoginHandler struct {
	CurrentTokens map[string]primitive.ObjectID
}

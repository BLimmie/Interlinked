package app

import (
	"errors"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func NewLoginHandler() LoginHandler {
	return LoginHandler{CurrentTokens: map[string]UserCache{}}
}

func (lh LoginHandler) AddLogin(user primitive.ObjectID, token, userType string) error {
	if _, ok := lh.CurrentTokens[token]; ok {
		return errors.New("token already in login handler, tried to add")
	}
	lh.CurrentTokens[token] = UserCache{
		Id:       user,
		UserType: userType,
	}
	return nil
}

func (lh LoginHandler) RemoveLogin(token string) error {
	if _, ok := lh.CurrentTokens[token]; !ok {
		return errors.New("token not in login handler, tried to remove")
	}
	delete(lh.CurrentTokens, token)
	return nil
}

func (lh LoginHandler) Exists(token string) bool {
	_, ok := lh.CurrentTokens[token]
	return ok
}

func (lh LoginHandler) Size() int {
	return len(lh.CurrentTokens)
}

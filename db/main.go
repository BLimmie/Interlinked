package main

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// BlankUser for inserting new document with random id rather than our own
type BlankUser struct {
	Name     string
	Username string
	Password string
}

// Doctor if referenced by Patient then Salt, Password, and Patients have no values
type Doctor struct {
	ID       primitive.ObjectID `bson:"_id"`
	Name     string
	Username string
	Password string
	Salt     string
	Patients []Patient
}

// Patient if referenced by Doctor then Salt, Password, and Patients have no values
type Patient struct {
	ID       primitive.ObjectID `bson:"_id"`
	Name     string
	Username string
	Password string
	Salt     string
	Doctors  []Doctor
}

func CreateObjID(parm string) primitive.ObjectID {
	result, _ := primitive.ObjectIDFromHex(parm)
	return result
}

func main() {
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to Mongo")
	collection := client.Database("intouch").Collection("doctors")

	filter := bson.D{{"username", "Who"}}

	var result Doctor

	// insert a doctor / patient
	// doc := BlankUser{"Abc 123", "Abc", "123"}
	// insertResult, err := collection.InsertOne(context.TODO(), doc)
	// if err != nil {
	// 	log.Fatal(err)
	// }

	// fmt.Println("Inserted a single document: ", insertResult.InsertedID)

	// update doctor / patient
	err = collection.FindOne(context.TODO(), filter).Decode(&result)
	filter = bson.D{{"_id", CreateObjID("5dbf69c64f5707235185b61c")}}
	update := bson.D{{"$addToSet",
		bson.D{{"patients",
			bson.D{{"_id", CreateObjID("5db63380d635f34ac9e355e3")},
				{"name", "no"},
				{"username", "lmao"}}}}}}

	updateResult, err := collection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Matched %v documents and updated %v documents.\n",
		updateResult.MatchedCount, updateResult.ModifiedCount)

	// find a doctor / patient
	err = collection.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Found a single document: %+v\n", result)

	// remove a doctor / patient
	deleteResult, err := collection.DeleteMany(context.TODO(), bson.D{{"_id", primitive.NilObjectID}})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Deleted %v documents in the trainers collection\n", deleteResult.DeletedCount)

	err = client.Disconnect(context.TODO())

	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connection to MongoDB closed.")
}

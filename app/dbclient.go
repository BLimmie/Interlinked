package app

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func (ic *IntouchClient) getCollection(flag Entity) *mongo.Collection {
	if flag == Pat {
		return ic.PatCol
	} else if flag == Pro {
		return ic.ProCol
	} else if flag == Ses {
		return ic.SesCol
	} else {
		return nil
	}
}

// updateField takes a collection, filter, and update and updates one doc in collection
// matching the filter with the update
// returns error, nil if ok
func (ic *IntouchClient) updateField(filter bson.D, update bson.D, flag Entity) error {
	collection := ic.getCollection(flag)
	if collection == nil {
		return errs["ErrInvalidFlag"]
	}

	_, err := collection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		log.Print(err)
		return err
	}
	return err
}

// updateFieldAll takes a collection, filter, and update and updates all docs in collection
// matching the filter with the update
// returns error, nil if ok
func (ic *IntouchClient) updateFieldAll(filter bson.D, update bson.D, flag Entity) error {
	collection := ic.getCollection(flag)
	if collection == nil {
		return errs["ErrInvalidFlag"]
	}

	updateResult, err := collection.UpdateMany(context.TODO(), filter, update)
	if err != nil {
		log.Print(err)
		return err
	}

	fmt.Printf("Matched %v documents and updated %v documents.\n",
		updateResult.MatchedCount, updateResult.ModifiedCount)

	return err
}

func (ic *IntouchClient) insertEntity(doc interface{}, flag Entity) (*primitive.ObjectID, error) {
	collection := ic.getCollection(flag)
	if collection == nil {
		return nil, errs["ErrInvalidFlag"]
	}

	insertResult, err := collection.InsertOne(context.TODO(), doc)
	fmt.Println("Inserted a single document: ", insertResult.InsertedID)
	if id, ok := insertResult.InsertedID.(primitive.ObjectID); ok {
		return &id, err
	}
	return nil, errs["ErrNotObjectID"]
}

// deleteEntity deletes doc matching filter from given collection
// return error, nil if ok
func (ic *IntouchClient) deleteEntity(filter bson.D, flag Entity) error {
	collection := ic.getCollection(flag)
	if collection == nil {
		return errs["ErrInvalidFlag"]
	}

	deleteResult, err := collection.DeleteOne(context.TODO(), filter)
	if err != nil {
		log.Print(err)
		return err
	}

	fmt.Printf("Deleted %d documents\n", deleteResult.DeletedCount)
	return err
}

// deleteEntityAll deletes docs matching filter from given collection
// return error, nil if ok
func (ic *IntouchClient) deleteEntityAll(filter bson.D, flag Entity) error {
	collection := ic.getCollection(flag)
	if collection == nil {
		return errs["ErrInvalidFlag"]
	}

	deleteResult, err := collection.DeleteMany(context.TODO(), filter)
	if err != nil {
		log.Print(err)
		return err
	}

	fmt.Printf("Deleted %d documents\n", deleteResult.DeletedCount)
	return err
}

// FindProvider uses filter to find a provider matching the filter
// returns nil and err if it fails
func (ic *IntouchClient) FindProvider(filter bson.D) (*Provider, error) {
	var result Provider
	err := ic.ProCol.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		log.Print(err)
		return nil, err
	}

	return &result, nil
}

// FindProviderByID helper for finding provider by id easily
func (ic *IntouchClient) FindProviderByID(id primitive.ObjectID) (*Provider, error) {
	return ic.FindProvider(bson.D{{"_id", id}})
}

// FindPatient uses filter to find a patient matching the filter
// returns nil and err if it fails
func (ic *IntouchClient) FindPatient(filter bson.D) (*Patient, error) {
	var result Patient
	err := ic.PatCol.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		log.Print(err)
		return nil, err
	}

	return &result, nil
}

// FindPatientByID helper for finding patient by id easily
func (ic *IntouchClient) FindPatientByID(id primitive.ObjectID) (*Patient, error) {
	return ic.FindPatient(bson.D{{"_id", id}})
}

// FindSession uses filter to find a session matching the filter
// returns nil and err if it fails
func (ic *IntouchClient) FindSession(filter bson.D) (*Session, error) {
	var result Session
	err := ic.SesCol.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		log.Print(err)
		return nil, err
	}

	return &result, nil
}

// FindSessionByID helper for finding session by id easily
func (ic *IntouchClient) FindSessionByID(id primitive.ObjectID) (*Session, error) {
	return ic.FindSession(bson.D{{"_id", id}})
}

// FindSessionByLink helper for finding session by link easily
func (ic *IntouchClient) FindSessionByLink(link string) (*Session, error) {
	return ic.FindSession(bson.D{{"link", link}})
}

func (ic *IntouchClient) FindSessionByHexString(hexString string) (*Session, error) {
	s, err := primitive.ObjectIDFromHex(hexString)
	if err != nil {
		return nil, err
	}
	return ic.FindSessionByID(s)
}

// FindSessionByUserID helper for finding session by user id easily
func (ic *IntouchClient) FindSessionByUserID(id primitive.ObjectID, flag Entity) (*Session, error) {
	var filter bson.D = nil
	if flag == Pat {
		filter = bson.D{{"patient._id", id}}
	} else if flag == Pro {
		filter = bson.D{{"provider._id", id}}
	} else {
		return nil, errs["ErrInvalidFlag"]
	}

	return ic.FindSession(filter)
}

func (ic *IntouchClient) FindLatestSession(proUsername string, patUsername string) (*Session, error) {
	var result Session
	// filter := bson.D{{"patient._id", patId},
	// 				{"provider._id", proId},
	// 				{"max": }}
	findOps := options.FindOneOptions{}
	findOps.SetSort(bson.D{{"createdtime", -1}})
	err := ic.SesCol.FindOne(nil, bson.D{{"patient.username", patUsername},
		{"provider.username", proUsername}}, &findOps).Decode(&result)

	if err != nil {
		log.Print(err)
		return nil, err
	}

	return &result, nil
}

// IsUsernameInUse checks if username is already assigned to someone
// returns true if so, false otherwise
func (ic *IntouchClient) IsUsernameInUse(username string) bool {
	filter := bson.D{{"username", username}}
	inProviders, _ := ic.FindProvider(filter)
	inPatients, _ := ic.FindPatient(filter)
	if inProviders != nil || inPatients != nil {
		return true
	}
	return false
}

// IsLinkInUse checks if link is already assigned to a session
// returns true if so, false otherwise
func (ic *IntouchClient) IsLinkInUse(link string) bool {
	filter := bson.D{{"link", link}}
	inSessions, _ := ic.FindSession(filter)
	if inSessions != nil {
		return true
	}
	return false
}

// InsertUser inserts a user with name, username, password and checks if username is valid
// uses flag to decide whether to insert patient or provider
// returns nil id and error if problems arise, else id and nil
func (ic *IntouchClient) InsertUser(name string, username string, password string, flag Entity) (*primitive.ObjectID, error) {
	if ic.IsUsernameInUse(username) {
		return nil, errs["ErrUsernameInvalid"]
	}

	if flag == Pro {
		return ic.insertEntity(BlankUser{name, username, password}, Pro)
	} else if flag == Pat {
		return ic.insertEntity(BlankUser{name, username, password}, Pat)
	} else {
		return nil, errs["ErrInvalidFlag"]
	}
}

// InsertSession inserts a session with link, created time, patient, and provider
// returns nil id and error if problems arise, else id and nil
func (ic *IntouchClient) InsertSession(created int64, patient *UserRef, provider *UserRef) (*primitive.ObjectID, error) {
	return ic.insertEntity(BlankSession{created, *patient, *provider}, Ses)
}

func (ic *IntouchClient) AddLink(id primitive.ObjectID, link string) error {
	if ic.IsLinkInUse(link) {
		return errs["ErrLinkInvalid"]
	}
	filter := bson.D{{"_id", id}}
	update := bson.D{{"$set", bson.D{{"link", link}}}}
	return ic.updateField(filter, update, Ses)
}

// InsertSessionMetric adds a TimeStamp metric to a Session
// returns error, nil if ok
func (ic *IntouchClient) InsertTextMetric(id primitive.ObjectID, metric TextMetrics) error {

	// insert metric into session matching id
	filter := bson.D{{"_id", id}}
	update := bson.D{{"$addToSet",
		bson.D{{"text_metrics", metric}}}}
	return ic.updateField(filter, update, Ses)
}

// InsertSessionMetric adds a TimeStamp metric to a Session
// returns error, nil if ok
func (ic *IntouchClient) InsertFrameMetric(id primitive.ObjectID, metric FrameMetrics) error {

	// insert metric into session matching id
	filter := bson.D{{"_id", id}}
	update := bson.D{{"$addToSet",
		bson.D{{"frame_metrics", metric}}}}
	return ic.updateField(filter, update, Ses)
}

// DeleteEntity deletes given entity with id (patient, provider, session, etc. based on flag),
// doesn't check if exists
// will also update references to deleted entity
// returns error, nil if ok
func (ic *IntouchClient) DeleteEntity(id primitive.ObjectID, flag Entity) error {

	var err error
	var filterA, filterB, updateA, updateB bson.D
	var flagB Entity

	if flag == Pro {
		err = ic.deleteEntity(bson.D{{"_id", id}}, Pro)
		flagB = Pat
		filterA = bson.D{{"providers._id", id}}
		filterB = bson.D{{"provider._id", id}}
		updateA = bson.D{{"$pull",
			bson.D{{"providers",
				bson.D{{"_id", id}}}}}}
		updateB = bson.D{{"$unset",
			bson.D{{"provider._id", 1}}}}

	} else if flag == Pat {
		err = ic.deleteEntity(bson.D{{"_id", id}}, Pat)
		flagB = Pro
		filterA = bson.D{{"patients._id", id}}
		filterB = bson.D{{"patient._id", id}}
		updateA = bson.D{{"$pull",
			bson.D{{"patients",
				bson.D{{"_id", id}}}}}}
		updateB = bson.D{{"$unset",
			bson.D{{"provider._id", 1}}}}

	} else if flag == Ses {
		return ic.deleteEntity(bson.D{{"_id", id}}, Ses)
	} else {
		return errs["ErrInvalidFlag"]
	}

	if err != nil {
		return err
	}

	err = ic.updateFieldAll(filterA, updateA, flagB)
	if err != nil {
		fmt.Print("hello")
		return err
	}

	return ic.updateFieldAll(filterB, updateB, Ses)

}

// DeleteSessionMetric deletes a TimeStamp metric based on sentiment string from Session
// returns error, nil if ok
func (ic *IntouchClient) DeleteSessionMetric(id primitive.ObjectID, duration time.Duration) error {

	// delete metric from session matching id
	filter := bson.D{{"_id", id}}
	update := bson.D{{"$pull",
		bson.D{{"metrics",
			bson.D{{"time", duration}}}}}}
	return ic.updateField(filter, update, Ses)
}

// AuthenticateUser checks for a user (specify patient or provider with flag) with given username and password
// if result found, returns _id else nil and error
func (ic *IntouchClient) AuthenticateUser(username string, password string, flag Entity) (*primitive.ObjectID, error) {
	filter := bson.D{{"username", username}, {"password", password}}

	if flag == Pro {
		result, err := ic.FindProvider(filter)
		if err != nil {
			return nil, err
		}
		return &result.ID, nil

	} else if flag == Pat {
		result, err := ic.FindPatient(filter)
		if err != nil {
			return nil, err
		}
		return &result.ID, nil

	} else {
		return nil, errs["ErrInvalidFlag"]
	}

}

// UpdateUsername checks if submitted username is in use, if not then updates user of the type set in flag
// and (patient/provider) and session references to original username.
// returns error, nil if ok
func (ic *IntouchClient) UpdateUsername(id primitive.ObjectID, newusername string, flag Entity) error {
	if ic.IsUsernameInUse(newusername) {
		return errs["ErrUsernameInvalid"]
	}

	var flagA, flagB Entity = Pat, Pro
	var filterB, updateB, filterC, updateC bson.D = nil, nil, nil, nil
	if flag == Pat {
		filterB = bson.D{{"patients._id", id}}
		updateB = bson.D{{"$set",
			bson.D{{"patients.$.username", newusername}}}}
		filterC = bson.D{{"patient._id", id}}
		updateC = bson.D{{"$set",
			bson.D{{"patient.username", newusername}}}}
	} else if flag == Pro {
		flagA = Pro
		flagB = Pat
		filterB = bson.D{{"providers._id", id}}
		updateB = bson.D{{"$set",
			bson.D{{"providers.$.username", newusername}}}}
		filterC = bson.D{{"provider._id", id}}
		updateC = bson.D{{"$set",
			bson.D{{"provider.username", newusername}}}}
	} else {
		return errs["ErrInvalidFlag"]
	}

	// update user of colA with new username
	filterA := bson.D{{"_id", id}}
	updateA := bson.D{{"$set",
		bson.D{{"username", newusername}}}}
	err := ic.updateField(filterA, updateA, flagA)
	if err != nil {
		return err
	}

	// update users of colB referring to that original user
	// TODO: also update other collections
	err = ic.updateFieldAll(filterB, updateB, flagB)
	if err != nil {
		return err
	}

	return ic.updateFieldAll(filterC, updateC, Ses)
}

// AssociatePatient adds patient to provider's list of patients, as well as provider to
// target patient's list of providers
// returns error, nil if ok
func (ic *IntouchClient) AssociatePatient(proID primitive.ObjectID, patID primitive.ObjectID) error {
	provider, _ := ic.FindProvider(bson.D{{"_id", proID}})
	patient, _ := ic.FindPatient(bson.D{{"_id", patID}})

	if patient == nil {
		return errs["ErrPatientNotFound"]
	}
	if provider == nil {
		return errs["ErrProviderNotFound"]
	}

	filter := bson.D{{"_id", proID}}
	update := bson.D{{"$addToSet",
		bson.D{{"patients",
			bson.D{{"_id", patID},
				{"name", patient.Name},
				{"username", patient.Username}}}}}}

	err := ic.updateField(filter, update, Pro)

	if err != nil {
		return err
	}

	filter = bson.D{{"_id", patID}}
	update = bson.D{{"$addToSet",
		bson.D{{"providers",
			bson.D{{"_id", proID},
				{"name", provider.Name},
				{"username", provider.Username}}}}}}

	return ic.updateField(filter, update, Pat)
}

// DissociatePatient will remove patient and provider from each other's list
// returns error, nil if ok
func (ic *IntouchClient) DissociatePatient(proID primitive.ObjectID, patID primitive.ObjectID) error {
	filter := bson.D{{"_id", proID}}
	update := bson.D{{"$pull",
		bson.D{{"patients",
			bson.D{{"_id", patID}}}}}}
	err := ic.updateField(filter, update, Pro)

	if err != nil {
		return err
	}

	filter = bson.D{{"_id", patID}}
	update = bson.D{{"$pull",
		bson.D{{"providers",
			bson.D{{"_id", proID}}}}}}

	return ic.updateField(filter, update, Pat)
}

// ToRef converts provider to UserRef
func (pro *Provider) ToRef() *UserRef {
	return &UserRef{pro.ID, pro.Name, pro.Username}
}

// ToRef converts patient to UserRef
func (pat *Patient) ToRef() *UserRef {
	return &UserRef{pat.ID, pat.Name, pat.Username}
}

// OpenConnection opens connection to mongo server and returns client
func OpenConnection() *mongo.Client {
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Print(err)
		return nil
	}

	return client
}

// CreateIntouchClient uses mongo client to create collections for running queries
func CreateIntouchClient(db string, client *mongo.Client) *IntouchClient {
	providers := client.Database(db).Collection("providers")
	patients := client.Database(db).Collection("patients")
	sessions := client.Database(db).Collection("sessions")

	return &IntouchClient{providers, patients, sessions}
}

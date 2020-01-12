package app

import (
	"context"
	"fmt"
	"os"
	"testing"

	"go.mongodb.org/mongo-driver/bson"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var mclient *mongo.Client = nil
var testic *IntouchClient = nil

var providerA = Provider{primitive.NilObjectID, "Hello World", "HW", "123456", "salt", []UserRef{}}
var providerB = Provider{primitive.NilObjectID, "Gehrig Weber", "spiderman", "marvel", "salt", []UserRef{}}
var patientA = Patient{primitive.NilObjectID, "Mtestichaelangelo Z", "stout", "adonis", "salt", []UserRef{}}
var patientB = Patient{primitive.NilObjectID, "Diego Perez", "ddog", "okbud", "salt", []UserRef{}}
var createdTime = "test"

func TestStuff(t *testing.T) {
	username := "dummy1"
	username1 := "dummy2"
	id, _ := testic.InsertUser("Felix Zhao", username, "yesyesyes", Pat)
	id1, _ := testic.InsertUser("Felix Zhao", username1, "yesyesyes", Pat)

	testic.DeleteEntity(*id, Pro)
	if testic.IsUsernameInUse(username) {
		t.Errorf("Username should be free")
	}

	cur, _ := testic.FindPatients(bson.D{{"name", "Felix Zhao"}})
	if cur == nil {
		t.Log("yes")
	}

	testic.DeleteEntity(*id, Pat)
	testic.DeleteEntity(*id1, Pat)
}
func TestIsUsernameInUse(t *testing.T) {
	username := "fzhao"
	id, _ := testic.InsertUser("Felix Zhao", username, "yesyesyes", Pro)
	if !testic.IsUsernameInUse(username) {
		t.Errorf("Username should be in use for a provider but it's not")
	}

	testic.DeleteEntity(*id, Pro)
	if testic.IsUsernameInUse(username) {
		t.Errorf("Username should be free")
	}

	id, _ = testic.InsertUser("Felix Zhao", username, "yesyesyes", Pat)
	if !testic.IsUsernameInUse(username) {
		t.Errorf("Username should be in use for a patient but it's not")
	}

	testic.DeleteEntity(*id, Pat)
	if testic.IsUsernameInUse(username) {
		t.Errorf("Username should be free")
	}
}

func TestInsertProvider(t *testing.T) {
	id, err := testic.InsertUser(providerA.Name, "wewewewe", providerA.Password, Pro)

	if err != nil {
		t.Errorf("Insert failed with %s", err.Error())
	}
	if !isExistProvider(bson.D{{"_id", *id}}) {
		t.Errorf("No provider with id %s", *id)
	}

	testic.DeleteEntity(*id, Pro)
}

func TestAuthenticateProvider(t *testing.T) {
	providerB := Provider{primitive.NilObjectID, "Brian Lim", "blim", "catsarecute", "salt", []UserRef{}}
	provID, _ := testic.InsertUser(providerB.Name, providerB.Username, providerB.Password, Pro)
	id, err := testic.AuthenticateUser(providerB.Username, providerB.Password, Pro)

	if err != nil {
		t.Errorf("Authentication failed with %s", err.Error())
	} else if provID != nil && *provID != *id {
		t.Errorf("Authentication does not match %s, got %s", *provID, *id)
	}

	testic.DeleteEntity(*provID, Pro)
}

func TestDeleteProvider(t *testing.T) {
	id, _ := testic.InsertUser(providerA.Name, "damascus", providerA.Password, Pro)
	err := testic.DeleteEntity(*id, Pro)
	if err != nil {
		t.Errorf("Delete failed with %s", err.Error())
	}

	if isExistProvider(bson.D{{"_id", *id}}) {
		t.Errorf("Delete failed to delete %s", *id)
	}

}

func TestDeleteProviderAndReferences(t *testing.T) {
	id, _ := testic.InsertUser(providerA.Name, "wethepeople", providerA.Password, Pro)
	id1, _ := testic.InsertUser(patientA.Name, "declarewar", patientA.Password, Pat)
	id2, _ := testic.InsertUser(patientB.Name, "oneveryone", patientB.Password, Pat)

	testic.AssociatePatient(*id, *id1)
	testic.AssociatePatient(*id, *id2)

	testic.DeleteEntity(*id, Pro)

	if isExistProvider(bson.D{{"_id", *id}}) {
		t.Errorf("Delete failed to delete %s", *id)
	}

	pat1, _ := testic.FindPatientByID(*id1)
	pat2, _ := testic.FindPatientByID(*id2)
	found1, found2 := false, false

	for _, ii := range pat1.Providers {
		if ii.ID == *id {
			found1 = true
			break
		}
	}

	for _, ii := range pat2.Providers {
		if ii.ID == *id {
			found2 = true
			break
		}
	}
	if found1 || found2 {
		fmt.Printf("pat1: %v, pat2: %v", pat1, pat2)
		t.Errorf("Delete provider failed to delete references in patients")
	}

	testic.DeleteEntity(*id1, Pat)
	testic.DeleteEntity(*id2, Pat)

}

func TestUpdateProviderUsername(t *testing.T) {
	id, _ := testic.InsertUser(providerA.Name, "hopeisgone", providerA.Password, Pro)
	newusername := "bedazzled"

	err := testic.UpdateUsername(*id, newusername, Pro)
	if err != nil {
		t.Errorf("Update provider username failed with %s", err.Error())
	}

	pp, _ := testic.FindProvider(bson.D{{"_id", *id}})
	if newusername != pp.Username {
		t.Errorf("Expected username: %s, got username %s", newusername, pp.Username)
	}

	testic.DeleteEntity(*id, Pro)
}

func TestUpdateProviderUsernameAndReferences(t *testing.T) {
	id, _ := testic.InsertUser(providerA.Name, "myfathersaid", providerA.Password, Pro)
	id1, _ := testic.InsertUser(patientA.Name, "butshesaid", patientA.Password, Pat)
	id2, _ := testic.InsertUser(patientB.Name, "hesaid", patientB.Password, Pat)
	testic.AssociatePatient(*id, *id1)
	testic.AssociatePatient(*id, *id2)
	newusername := "mynazzle"

	err := testic.UpdateUsername(*id, newusername, Pro)
	if err != nil {
		t.Errorf("Update provider username failed with %s", err.Error())
	}

	pp, _ := testic.FindProviderByID(*id)
	if newusername != pp.Username {
		t.Errorf("Expected username: %s, got username %s", newusername, pp.Username)
	}

	pat1, _ := testic.FindPatientByID(*id1)
	pat2, _ := testic.FindPatientByID(*id2)
	found1, found2 := false, false

	for _, ii := range pat1.Providers {
		if ii.ID == *id && ii.Username == newusername {
			found1 = true
			break
		}
	}

	for _, ii := range pat2.Providers {
		if ii.ID == *id && ii.Username == newusername {
			found2 = true
			break
		}
	}
	if !found1 || !found2 {
		t.Errorf("Update provider username failed to be referenced in patients")
	}

	testic.DeleteEntity(*id, Pro)
	testic.DeleteEntity(*id1, Pat)
	testic.DeleteEntity(*id2, Pat)
}

func TestInsertPatient(t *testing.T) {
	id, err := testic.InsertUser(patientA.Name, "whatislife", patientA.Password, Pat)

	if err != nil {
		t.Errorf("Insert failed with %s", err.Error())
	}
	if !isExistPatient(bson.D{{"_id", *id}}) {
		t.Errorf("No patient with id %s", *id)
	}
	fmt.Printf("ok")

	testic.DeleteEntity(*id, Pat)
}

func TestAuthenticatePatient(t *testing.T) {
	patientB := Patient{primitive.NilObjectID, "Dead Man", "iamdead", "dogsarecute", "salt", []UserRef{}}
	patID, _ := testic.InsertUser(patientB.Name, patientB.Username, patientB.Password, Pat)
	id, err := testic.AuthenticateUser(patientB.Username, patientB.Password, Pat)

	if err != nil {
		t.Errorf("Authentication failed with %s", err.Error())
	} else if patID != nil && *patID != *id {
		t.Errorf("Authentication does not match %s, got %s", *patID, *id)
	}

	testic.DeleteEntity(*patID, Pat)
}

func TestDeletePatient(t *testing.T) {
	id, _ := testic.InsertUser(patientA.Name, "handsomeboi", patientA.Password, Pat)
	err := testic.DeleteEntity(*id, Pat)
	if err != nil {
		t.Errorf("Delete failed with %s", err.Error())
	}

	if isExistPatient(bson.D{{"_id", *id}}) {
		t.Errorf("Delete failed to delete %s", *id)
	}

}

func TestDeletePatientAndReferences(t *testing.T) {
	id, _ := testic.InsertUser(patientA.Name, "ntesticeboi", patientA.Password, Pat)
	id1, _ := testic.InsertUser(providerA.Name, "sadboi", providerA.Password, Pro)
	id2, _ := testic.InsertUser(providerB.Name, "goodboi", providerB.Password, Pro)

	testic.AssociatePatient(*id1, *id)
	testic.AssociatePatient(*id2, *id)

	testic.DeleteEntity(*id, Pat)

	if isExistPatient(bson.D{{"_id", *id}}) {
		t.Errorf("Delete failed to delete %s", *id)
	}

	pat1, _ := testic.FindProviderByID(*id1)
	pat2, _ := testic.FindProviderByID(*id2)
	found1, found2 := false, false

	for _, ii := range pat1.Patients {
		if ii.ID == *id {
			found1 = true
			break
		}
	}

	for _, ii := range pat2.Patients {
		if ii.ID == *id {
			found2 = true
			break
		}
	}
	if found1 || found2 {
		fmt.Printf("pat1: %v, pat2: %v", pat1, pat2)
		t.Errorf("Delete patient failed to delete references in providers")
	}

	testic.DeleteEntity(*id1, Pat)
	testic.DeleteEntity(*id2, Pat)

}

func TestUpdatePatientUsername(t *testing.T) {
	id, _ := testic.InsertUser(patientA.Name, "soyboi", patientA.Password, Pat)
	newusername := "greenboi"

	err := testic.UpdateUsername(*id, newusername, Pat)
	if err != nil {
		t.Errorf("Update patient username failed with %s", err.Error())
	}

	pp, _ := testic.FindPatient(bson.D{{"_id", *id}})
	if newusername != pp.Username {
		t.Errorf("Expected username: %s, got username %s", newusername, pp.Username)
	}

	testic.DeleteEntity(*id, Pat)
}

func TestUpdatePatientUsernameAndReferences(t *testing.T) {

	id, _ := testic.InsertUser(patientA.Name, "coolboi", patientA.Password, Pat)
	id1, _ := testic.InsertUser(providerA.Name, "yesboi", providerA.Password, Pro)
	id2, _ := testic.InsertUser(providerB.Name, "noboi", providerB.Password, Pro)
	testic.AssociatePatient(*id1, *id)
	testic.AssociatePatient(*id2, *id)
	newusername := "hotboi"

	err := testic.UpdateUsername(*id, newusername, Pat)
	if err != nil {
		t.Errorf("Update patient username failed with %s", err.Error())
	}

	pp, _ := testic.FindPatientByID(*id)
	if newusername != pp.Username {
		t.Errorf("Expected username: %s, got username %s", newusername, pp.Username)
	}

	pro1, _ := testic.FindProviderByID(*id1)
	pro2, _ := testic.FindProviderByID(*id2)
	found1, found2 := false, false

	for _, ii := range pro1.Patients {
		if ii.ID == *id && ii.Username == newusername {
			found1 = true
			break
		}
	}

	for _, ii := range pro2.Patients {
		if ii.ID == *id && ii.Username == newusername {
			found2 = true
			break
		}
	}
	if !found1 || !found2 {
		t.Errorf("Update patient username failed to be referenced in providers")
	}

	testic.DeleteEntity(*id, Pat)
	testic.DeleteEntity(*id1, Pro)
	testic.DeleteEntity(*id2, Pro)
}
func TestAssociatePatient(t *testing.T) {
	proID, _ := testic.InsertUser(providerA.Name, "pobody", providerA.Password, Pro)
	patID, _ := testic.InsertUser(patientA.Name, "nerfect", patientA.Password, Pat)

	err := testic.AssociatePatient(*proID, *patID)
	if err != nil {
		t.Errorf("Associating patient failed with %s", err.Error())
	}

	provider, _ := testic.FindProviderByID(*proID)
	patient, _ := testic.FindPatientByID(*patID)

	proFound, patFound := false, false
	for _, ii := range provider.Patients {
		if ii.ID == *patID {
			patFound = true
			break
		}
	}

	for _, ii := range patient.Providers {
		if ii.ID == *proID {
			proFound = true
			break
		}
	}

	if !patFound || !proFound {
		if patFound {
			t.Errorf("Patient does not have reference to provider")
		}
		t.Errorf("Provider does not have reference to patient")
	}

	testic.DeleteEntity(*proID, Pro)
	testic.DeleteEntity(*patID, Pat)
}

func TestDissociatePatient(t *testing.T) {
	proID, _ := testic.InsertUser(providerA.Name, "cold", providerA.Password, Pro)
	patID, _ := testic.InsertUser(patientA.Name, "lukewarm", patientA.Password, Pat)

	err := testic.AssociatePatient(*proID, *patID)
	if err != nil {
		t.Errorf("Associating patient failed with %s", err.Error())
	}

	err = testic.DissociatePatient(*proID, *patID)
	provider, _ := testic.FindProviderByID(*proID)
	patient, _ := testic.FindPatientByID(*patID)

	proFound, patFound := false, false
	for _, ii := range provider.Patients {
		if ii.ID == *patID {
			patFound = true
			break
		}
	}

	for _, ii := range patient.Providers {
		if ii.ID == *proID {
			proFound = true
			break
		}
	}

	if patFound || proFound {
		if patFound {
			t.Errorf("Patient should not have reference to provider")
		}
		t.Errorf("Provider should not have reference to patient")
	}

	testic.DeleteEntity(*proID, Pro)
	testic.DeleteEntity(*patID, Pat)
}

func TestIsLinkInUse(t *testing.T) {
	idA, _ := testic.InsertUser(providerA.Name, "asdf", providerA.Password, Pro)
	aa, _ := testic.FindProviderByID(*idA)
	pro := aa.ToRef()
	idB, _ := testic.InsertUser(patientA.Name, "fdsa", patientA.Password, Pat)
	bb, _ := testic.FindPatientByID(*idB)
	pat := bb.ToRef()
	ses, err := testic.InsertSession(createdTime, pat, pro)

	if err != nil {
		t.Errorf("Insert failed with %s", err.Error())
	}
	if !isExistSession(bson.D{{"_id", *ses}}) {
		t.Errorf("No session with id %s", *ses)
	}
	// _, err = testic.InsertSession(createdTime, pat, pro)
	// if err != errs["ErrLinkInvalid"] {
	// 	t.Errorf("Duplicate links should have caused an error")
	// }
	testic.DeleteEntity(*idA, Pro)
	testic.DeleteEntity(*ses, Ses)
	testic.DeleteEntity(*idB, Pat)
}
func TestInsertSession(t *testing.T) {
	idA, _ := testic.InsertUser(providerA.Name, "aa", providerA.Password, Pro)
	aa, _ := testic.FindProviderByID(*idA)
	pro := aa.ToRef()
	idB, _ := testic.InsertUser(patientA.Name, "bb", patientA.Password, Pat)
	bb, _ := testic.FindPatientByID(*idB)
	pat := bb.ToRef()
	ses, err := testic.InsertSession(createdTime, pat, pro)

	if err != nil {
		t.Errorf("Insert failed with %s", err.Error())
	}
	if !isExistSession(bson.D{{"_id", *ses}}) {
		t.Errorf("No session with id %s", *ses)
	}
	session, _ := testic.FindSessionByID(*ses)
	fmt.Printf("Found a single document: %+v\n", *session)

	testic.DeleteEntity(*idA, Pro)
	session, _ = testic.FindSessionByID(*ses)
	fmt.Printf("Found a single document: %+v\n", *session)
	if session.Provider.ID != primitive.NilObjectID {
		t.Errorf("Session's provider should be null since it was deleted")
	}
	testic.DeleteEntity(*ses, Ses)
	testic.DeleteEntity(*idB, Pat)
}

// TODO: implement insert session metric with timestamp in dbclient
// func TestInsertSessionMetric(t *testing.T) {
// 	idA, _ := testic.InsertUser(providerA.Name, "blue", providerA.Password, Pro)
// 	aa, _ := testic.FindProviderByID(*idA)
// 	pro := aa.ToRef()
// 	idB, _ := testic.InsertUser(patientA.Name, "red", patientA.Password, Pat)
// 	bb, _ := testic.FindPatientByID(*idB)
// 	pat := bb.ToRef()
// 	ses, err := testic.InsertSession(createdTime, pat, pro)

// 	if err != nil {
// 		t.Errorf("Insert failed with %s", err.Error())
// 	}
// 	if !isExistSession(bson.D{{"_id", *ses}}) {
// 		t.Errorf("No session with id %s", *ses)
// 	}

// 	metric := TimestampMetrics{"32", "32", 32.0, "32", map[string]string{"anger": "32.0"}, map[string]float32{"hello": 32.0}}
// 	ic.InsertSessionMetric(*ses, metric)

// 	session, _ := testic.FindSessionByID(*ses)
// 	fmt.Printf("Found a single document: %+v\n", *session)

// 	if !cmp.Equal(session.Metrics[0], metric) {
// 		t.Errorf("Metrics %+v does not contain inserted metric %+v", session.Metrics, metric)
// 	}

// 	testic.DeleteEntity(*idA, Pro)
// 	session, _ = testic.FindSessionByID(*ses)
// 	fmt.Printf("Found a single document: %+v\n", *session)
// 	if session.Provider.ID != primitive.NilObjectID {
// 		t.Errorf("Session's provider should be null since it was deleted")
// 	}
// 	testic.DeleteEntity(*ses, Ses)
// 	testic.DeleteEntity(*idB, Pat)
// }

func setup() {
	mclient = OpenConnection()
	testic = CreateIntouchClient("test", mclient)
	testic.ProCol.DeleteMany(context.TODO(), bson.D{{}})
	testic.PatCol.DeleteMany(context.TODO(), bson.D{{}})
	testic.SesCol.DeleteMany(context.TODO(), bson.D{{}})
	providerA = Provider{primitive.NilObjectID, "Hello World", "HW", "123456", "salt", []UserRef{}}
}

func teardown() {
	mclient.Disconnect(context.TODO())
}

func isExistProvider(filter bson.D) bool {
	prov, err := testic.FindProvider(filter)
	if err != nil {
		fmt.Printf(err.Error())
	}
	if prov != nil {
		return true
	}
	return false
}

func isExistPatient(filter bson.D) bool {
	pat, err := testic.FindPatient(filter)
	if err != nil {
		fmt.Printf(err.Error())
	}
	if pat != nil {
		return true
	}
	return false
}

func isExistSession(filter bson.D) bool {
	prov, err := testic.FindSession(filter)
	if err != nil {
		fmt.Printf(err.Error())
	}
	if prov != nil {
		return true
	}
	return false
}

func TestMain(m *testing.M) {
	setup()
	run := m.Run()
	teardown()
	os.Exit(run)
}

package db

import (
	"context"
	"fmt"
	"os"
	"testing"

	"go.mongodb.org/mongo-driver/bson"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var client *mongo.Client = nil
var ic *IntouchClient = nil

var providerA = Provider{primitive.NilObjectID, "Hello World", "HW", "123456", "salt", []Patient{}}
var providerB = Provider{primitive.NilObjectID, "Gehrig Weber", "spiderman", "marvel", "salt", []Patient{}}
var patientA = Patient{primitive.NilObjectID, "Michaelangelo Z", "stout", "adonis", "salt", []Provider{}}
var patientB = Patient{primitive.NilObjectID, "Diego Perez", "ddog", "okbud", "salt", []Provider{}}

func TestIsUsernameInUse(t *testing.T) {
	username := "fzhao"
	id, _ := ic.InsertProvider("Felix Zhao", username, "yesyesyes")
	if !ic.IsUsernameInUse(username) {
		t.Errorf("Username should be in use for a provider but it's not")
	}

	ic.DeleteProvider(*id)
	if ic.IsUsernameInUse(username) {
		t.Errorf("Username should be free")
	}

	id, _ = ic.InsertPatient("Felix Zhao", username, "yesyesyes")
	if !ic.IsUsernameInUse(username) {
		t.Errorf("Username should be in use for a patient but it's not")
	}

	ic.DeletePatient(*id)
	if ic.IsUsernameInUse(username) {
		t.Errorf("Username should be free")
	}
}

func TestInsertProvider(t *testing.T) {
	id, err := ic.InsertProvider(providerA.Name, "wewewewe", providerA.Password)

	if err != nil {
		t.Errorf("Insert failed with %s", err.Error())
	}
	if !isExistProvider(bson.D{{"_id", *id}}) {
		t.Errorf("No provider with id %s", *id)
	}

	ic.DeleteProvider(*id)
}

func TestAuthenticateProvider(t *testing.T) {
	providerB := Provider{primitive.NilObjectID, "Brian Lim", "blim", "catsarecute", "salt", []Patient{}}
	provID, _ := ic.InsertProvider(providerB.Name, providerB.Username, providerB.Password)
	id, err := ic.AuthenticateProvider(providerB.Username, providerB.Password)

	if err != nil {
		t.Errorf("Authentication failed with %s", err.Error())
	} else if provID != nil && *provID != *id {
		t.Errorf("Authentication does not match %s, got %s", *provID, *id)
	}

	ic.DeleteProvider(*provID)
}

func TestDeleteProvider(t *testing.T) {
	id, _ := ic.InsertProvider(providerA.Name, "damascus", providerA.Password)
	err := ic.DeleteProvider(*id)
	if err != nil {
		t.Errorf("Delete failed with %s", err.Error())
	}

	if isExistProvider(bson.D{{"_id", *id}}) {
		t.Errorf("Delete failed to delete %s", *id)
	}

}

func TestDeleteProviderAndReferences(t *testing.T) {
	id, _ := ic.InsertProvider(providerA.Name, "wethepeople", providerA.Password)
	id1, _ := ic.InsertPatient(patientA.Name, "declarewar", patientA.Password)
	id2, _ := ic.InsertPatient(patientB.Name, "oneveryone", patientB.Password)

	ic.AssociatePatient(*id, *id1)
	ic.AssociatePatient(*id, *id2)

	ic.DeleteProvider(*id)

	if isExistProvider(bson.D{{"_id", *id}}) {
		t.Errorf("Delete failed to delete %s", *id)
	}

	pat1, _ := ic.FindPatientByID(*id1)
	pat2, _ := ic.FindPatientByID(*id2)
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

	ic.DeletePatient(*id1)
	ic.DeletePatient(*id2)

}

func TestUpdateProviderUsername(t *testing.T) {
	id, _ := ic.InsertProvider(providerA.Name, "hopeisgone", providerA.Password)
	newusername := "bedazzled"

	err := ic.UpdateProviderUsername(*id, newusername)
	if err != nil {
		t.Errorf("Update provider username failed with %s", err.Error())
	}

	pp, _ := ic.FindProvider(bson.D{{"_id", *id}})
	if newusername != pp.Username {
		t.Errorf("Expected username: %s, got username %s", newusername, pp.Username)
	}

	ic.DeleteProvider(*id)
}

func TestUpdateProviderUsernameAndReferences(t *testing.T) {
	id, _ := ic.InsertProvider(providerA.Name, "myfathersaid", providerA.Password)
	id1, _ := ic.InsertPatient(patientA.Name, "butshesaid", patientA.Password)
	id2, _ := ic.InsertPatient(patientB.Name, "hesaid", patientB.Password)
	ic.AssociatePatient(*id, *id1)
	ic.AssociatePatient(*id, *id2)
	newusername := "mynazzle"

	err := ic.UpdateProviderUsername(*id, newusername)
	if err != nil {
		t.Errorf("Update provider username failed with %s", err.Error())
	}

	pp, _ := ic.FindProviderByID(*id)
	if newusername != pp.Username {
		t.Errorf("Expected username: %s, got username %s", newusername, pp.Username)
	}

	pat1, _ := ic.FindPatientByID(*id1)
	pat2, _ := ic.FindPatientByID(*id2)
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

	ic.DeleteProvider(*id)
	ic.DeletePatient(*id1)
	ic.DeletePatient(*id2)
}

func TestInsertPatient(t *testing.T) {
	id, err := ic.InsertPatient(patientA.Name, "whatislife", patientA.Password)

	if err != nil {
		t.Errorf("Insert failed with %s", err.Error())
	}
	if !isExistPatient(bson.D{{"_id", *id}}) {
		t.Errorf("No patient with id %s", *id)
	}
	fmt.Printf("ok")

	ic.DeletePatient(*id)
}

func TestAuthenticatePatient(t *testing.T) {
	patientB := Patient{primitive.NilObjectID, "Dead Man", "iamdead", "dogsarecute", "salt", []Provider{}}
	patID, _ := ic.InsertPatient(patientB.Name, patientB.Username, patientB.Password)
	id, err := ic.AuthenticatePatient(patientB.Username, patientB.Password)

	if err != nil {
		t.Errorf("Authentication failed with %s", err.Error())
	} else if patID != nil && *patID != *id {
		t.Errorf("Authentication does not match %s, got %s", *patID, *id)
	}

	ic.DeletePatient(*patID)
}

func TestDeletePatient(t *testing.T) {
	id, _ := ic.InsertPatient(patientA.Name, "handsomeboi", patientA.Password)
	err := ic.DeletePatient(*id)
	if err != nil {
		t.Errorf("Delete failed with %s", err.Error())
	}

	if isExistPatient(bson.D{{"_id", *id}}) {
		t.Errorf("Delete failed to delete %s", *id)
	}

}

func TestDeletePatientAndReferences(t *testing.T) {
	id, _ := ic.InsertPatient(patientA.Name, "niceboi", patientA.Password)
	id1, _ := ic.InsertProvider(providerA.Name, "sadboi", providerA.Password)
	id2, _ := ic.InsertProvider(providerB.Name, "goodboi", providerB.Password)

	ic.AssociatePatient(*id1, *id)
	ic.AssociatePatient(*id2, *id)

	ic.DeletePatient(*id)

	if isExistPatient(bson.D{{"_id", *id}}) {
		t.Errorf("Delete failed to delete %s", *id)
	}

	pat1, _ := ic.FindProviderByID(*id1)
	pat2, _ := ic.FindProviderByID(*id2)
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

	ic.DeletePatient(*id1)
	ic.DeletePatient(*id2)

}

func TestUpdatePatientUsername(t *testing.T) {
	id, _ := ic.InsertPatient(patientA.Name, "soyboi", patientA.Password)
	newusername := "greenboi"

	err := ic.UpdatePatientUsername(*id, newusername)
	if err != nil {
		t.Errorf("Update patient username failed with %s", err.Error())
	}

	pp, _ := ic.FindPatient(bson.D{{"_id", *id}})
	if newusername != pp.Username {
		t.Errorf("Expected username: %s, got username %s", newusername, pp.Username)
	}

	ic.DeletePatient(*id)
}

func TestUpdatePatientUsernameAndReferences(t *testing.T) {

	id, _ := ic.InsertPatient(patientA.Name, "coolboi", patientA.Password)
	id1, _ := ic.InsertProvider(providerA.Name, "yesboi", providerA.Password)
	id2, _ := ic.InsertProvider(providerB.Name, "noboi", providerB.Password)
	ic.AssociatePatient(*id1, *id)
	ic.AssociatePatient(*id2, *id)
	newusername := "hotboi"

	err := ic.UpdatePatientUsername(*id, newusername)
	if err != nil {
		t.Errorf("Update patient username failed with %s", err.Error())
	}

	pp, _ := ic.FindPatientByID(*id)
	if newusername != pp.Username {
		t.Errorf("Expected username: %s, got username %s", newusername, pp.Username)
	}

	pro1, _ := ic.FindProviderByID(*id1)
	pro2, _ := ic.FindProviderByID(*id2)
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

	ic.DeletePatient(*id)
	ic.DeleteProvider(*id1)
	ic.DeleteProvider(*id2)
}
func TestAssociatePatient(t *testing.T) {
	proID, _ := ic.InsertProvider(providerA.Name, "pobody", providerA.Password)
	patID, _ := ic.InsertPatient(patientA.Name, "nerfect", patientA.Password)

	err := ic.AssociatePatient(*proID, *patID)
	if err != nil {
		t.Errorf("Associating patient failed with %s", err.Error())
	}

	provider, _ := ic.FindProviderByID(*proID)
	patient, _ := ic.FindPatientByID(*patID)

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

	ic.DeleteProvider(*proID)
	ic.DeletePatient(*patID)
}

func TestDissociatePatient(t *testing.T) {
	proID, _ := ic.InsertProvider(providerA.Name, "cold", providerA.Password)
	patID, _ := ic.InsertPatient(patientA.Name, "lukewarm", patientA.Password)

	err := ic.AssociatePatient(*proID, *patID)
	if err != nil {
		t.Errorf("Associating patient failed with %s", err.Error())
	}

	err = ic.DissociatePatient(*proID, *patID)
	provider, _ := ic.FindProviderByID(*proID)
	patient, _ := ic.FindPatientByID(*patID)

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

	ic.DeleteProvider(*proID)
	ic.DeletePatient(*patID)
}

func setup() {
	client = OpenConnection()
	ic = CreateIntouchClient("test", client)
	ic.ProCol.DeleteMany(context.TODO(), bson.D{{}})
	ic.PatCol.DeleteMany(context.TODO(), bson.D{{}})
	providerA = Provider{primitive.NilObjectID, "Hello World", "HW", "123456", "salt", []Patient{}}
}

func teardown() {
	client.Disconnect(context.TODO())
}

func isExistProvider(filter bson.D) bool {
	prov, err := ic.FindProvider(filter)
	if err != nil {
		fmt.Printf(err.Error())
	}
	if prov != nil {
		return true
	}
	return false
}

func isExistPatient(filter bson.D) bool {
	pat, err := ic.FindPatient(filter)
	if err != nil {
		fmt.Printf(err.Error())
	}
	if pat != nil {
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

package app

import (
	"fmt"
	"github.com/algorithmiaio/algorithmia-go"
	"path"
	"testing"
)

func TestTest(t *testing.T) {
	keys := NewAPIKeys(path.Join("..", "config.json"))
	client := algorithmia.NewClient(keys.Algorithmia, "")
	dir := client.Dir("data://BLimmie/testdir")
	dir_exists, err := dir.Exists()
	if err != nil {
		fmt.Println(err)
	} else if dir_exists == false {
		dir.Create(nil)
		fmt.Println("dir created")
	} else {
		fmt.Println("dir already exists")
	}
}

func TestImageMetrics(t *testing.T) {
	keys := NewAPIKeys("../config.json")
	s, err := ImageMetrics("elon_musk.jpg", keys.Algorithmia)
	if err != nil {
		t.Fatalf(err.Error())
	}
	fmt.Println(s)
}

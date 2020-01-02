package app

import (
	"fmt"
	"github.com/algorithmiaio/algorithmia-go"
	"os"
	"path"
	"path/filepath"
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
	googleAPI, err := filepath.Abs("../interlinked-1cd3dab50e3e.json")
	if err != nil {
		t.Fatalf(err.Error())
	}
	os.Setenv("GOOGLE_APPLICATION_CREDENTIALS", googleAPI)
	res, err := ImageMetrics("elon_musk.jpg")
	if err != nil {
		t.Fatalf(err.Error())
	}
	fmt.Println(res)
}

func TestTextSentiment(t *testing.T) {
	googleAPI, err := filepath.Abs("../interlinked-1cd3dab50e3e.json")
	if err != nil {
		t.Fatalf(err.Error())
	}
	os.Setenv("GOOGLE_APPLICATION_CREDENTIALS", googleAPI)
	sentiment, err := TextSentiment("Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?")
	if err != nil {
		t.Fatalf(err.Error())
	}
	fmt.Println(sentiment)
}

func TestImageAU(t *testing.T) {
	res, err := ImageAU("test.jpg", path.Join("..", "of_output"))
	if err != nil {
		t.Fatalf(err.Error())
	}
	fmt.Println(res)
}
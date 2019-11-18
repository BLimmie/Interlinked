package app

import (
	"fmt"
	algorithmia "github.com/algorithmiaio/algorithmia-go"
	"github.com/pkg/errors"
	"path"
)

var apiKey string

func ImageMetrics(imgFilename, apiKey string) (map[string]float64, error) {
	client := algorithmia.NewClient("simveDj1HZ63nuwD7FaGadqS6n61", "")
	file := fmt.Sprintf("data://BLimmie/testdir/%s", path.Base(imgFilename))
	client.File(file).PutFile(imgFilename)
	fmt.Printf("File has been uploaded %s\n", file)
	input := map[string]interface{}{
		"image": file,
		"numResults": 3,
	}
	algo, err := client.Algo("deeplearning/EmotionRecognitionCNNMBP/1.0.1?timeout=300") // timeout is optional
	if err != nil {
		return nil, errors.New(err.Error())
	}
	resp, err := algo.Pipe(input)
	if err != nil {
		return nil, errors.New(err.Error())
	}
	response := resp.(*algorithmia.AlgoResponse)
	tmp_r := response.Result.(map[string]interface{})["results"]
	tmp_i := tmp_r.([]interface{})[0]
	tmp_e := tmp_i.(map[string]interface{})["emotions"]
	emotions := tmp_e.([]interface{})
	result := make(map[string]float64)
	for _, tmp := range emotions {
		// {"confidence":float32, "label":string}
		emotion := tmp.(map[string]interface{})
		confidence := emotion["confidence"].(float64)
		label := emotion["label"].(string)
		result[label] = confidence
	}
	return result, nil
}

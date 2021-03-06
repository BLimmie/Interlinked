package app

import (
	language "cloud.google.com/go/language/apiv1"
	vision "cloud.google.com/go/vision/apiv1"
	"context"
	"encoding/csv"
	"github.com/pkg/errors"
	languagepb "google.golang.org/genproto/googleapis/cloud/language/v1"
	"os"
	"os/exec"
	"path"
	"path/filepath"
	"strconv"
	"strings"
)

var apiKey string

func ImageMetrics(imgFilename string) (map[string]string, error) {
	ctx := context.Background()
	client, err := vision.NewImageAnnotatorClient(ctx)
	if err != nil {
		return nil, err
	}
	f, err := os.Open(imgFilename)
	if err != nil {
		return nil, err
	}
	defer f.Close()
	image, err := vision.NewImageFromReader(f)
	if err != nil {
		return nil, err
	}
	annotations, err := client.DetectFaces(ctx, image, nil, 1)
	if err != nil {
		return nil, err
	}
	if len(annotations) == 0 {
		return nil, errors.New("no faces found")
	}
	annotation := annotations[0]
	return map[string]string {
		"anger": annotation.AngerLikelihood.String(),
		"sorrow": annotation.SorrowLikelihood.String(),
		"joy": annotation.JoyLikelihood.String(),
		"surprise": annotation.SurpriseLikelihood.String(),
	}, nil
}

func TextSentiment(text string) (float64, error) {
	ctx := context.Background()
	client, err := language.NewClient(ctx)
	if err != nil {
		return 0, err
	}
	sentiment, err := client.AnalyzeSentiment(ctx, &languagepb.AnalyzeSentimentRequest{
		Document: &languagepb.Document{
			Source: &languagepb.Document_Content{
				Content: text,
			},
			Type: languagepb.Document_PLAIN_TEXT,
		},
		EncodingType: languagepb.EncodingType_UTF8,
	})
	if err != nil {
		return 0, err
	}
	return float64(sentiment.DocumentSentiment.Score), nil
}

func ImageAU(imgFilename string, outputDirectory string) (map[string]float64, error){
	cmd := exec.Command(path.Join(os.Getenv("OPENFACE_DIR"),"FaceLandmarkImg.exe"), "-f", imgFilename, "-out_dir", outputDirectory, "-aus")

	err := RunCommand(*cmd)
	if err != nil {
		return nil, err
	}
	fn := filenameWithoutExtension(filepath.Base(imgFilename))
	csvFilePath := filepath.Join(outputDirectory, fn+".csv")

	f, err := os.Open(csvFilePath)
	if err != nil {
		return nil, err
	}
	r := csv.NewReader(f)
	head, err := r.Read()
	if err != nil {
		return nil, err
	}
	firstResult, err := r.Read()
	result := make(map[string]float64)
	for i := 0; i < len(head); i++ {
		val, err := strconv.ParseFloat(strings.TrimSpace(firstResult[i]), 32)
		if err != nil {
			return nil, err
		}
		if in(strings.TrimSpace(head[i]), auLabels) {
			result[auLabels[strings.TrimSpace(head[i])]] = float64(val)
		}
	}

	return result, nil
}
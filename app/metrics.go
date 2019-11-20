package app

import (
	language "cloud.google.com/go/language/apiv1"
	vision "cloud.google.com/go/vision/apiv1"
	"context"
	"github.com/pkg/errors"
	languagepb "google.golang.org/genproto/googleapis/cloud/language/v1"
	"os"
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

func TextSentiment(text string) (float32, error) {
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
	return sentiment.DocumentSentiment.Score, nil
}
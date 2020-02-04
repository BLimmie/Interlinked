package app

import (
	"path"
	"strings"
	"time"
)

func filenameWithoutExtension(fn string) string {
	return strings.TrimSuffix(fn, path.Ext(fn))
}

func in(key string, dict map[string]string) bool {
	_, ok := dict[key]
	return ok
}

func formatTimeString(s string) string {
	return strings.Split(s, " m=")[0]
}

func removeMonotonicTime(s string) (time.Time, error) {
	return time.Parse(timeLayout, formatTimeString(s))
}

func removeMonotonicTimeNoErr(s string) time.Time {
	t, err := time.Parse(timeLayout, formatTimeString(s))
	if err != nil {
		panic(s)
	}
	return t
}

func removeMonotonicTimeFromTime(t time.Time) (time.Time, error) {
	return removeMonotonicTime(t.String())
}

func timeFromInt(i int64) time.Time {
	return time.Unix(i,0)
}

func (session *Session) getPercentagesRunningAverage() map[string]map[string]float32{
	newResp := make(map[string]map[string]float32)
	im := session.Summary["Percent in Facial Emotion over last 10 seconds"].(map[string]interface{})
	for second, obj := range im {
		tmp := obj.(map[string]interface{})
		p := tmp["Percentages"].(map[string]float32)
		newResp[second] = p
		// "$second" : {"joy" : 0.25}
	}
	return newResp
}
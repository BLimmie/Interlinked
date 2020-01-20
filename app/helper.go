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
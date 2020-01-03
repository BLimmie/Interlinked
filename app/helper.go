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

func removeMonotonicString(s string) string {
	return formatTimeString(s)
}

func removeMonotonicTime(t time.Time) (time.Time, error) {
	return time.Parse(timeLayout, removeMonotonicString(t.String()))
}
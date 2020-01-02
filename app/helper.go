package app

import (
	"path"
	"strings"
)

func filenameWithoutExtension(fn string) string {
	return strings.TrimSuffix(fn, path.Ext(fn))
}

func in(key string, dict map[string]string) bool {
	_, ok := dict[key]
	return ok
}
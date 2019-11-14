package app

import (
	"errors"
	"sync"
)

func NewWorkerHandler(numWorkers int) *WorkerHandler {
	return &WorkerHandler{
		Workers: make(chan bool, numWorkers),
		mux:     sync.Mutex{},
	}
}

func (wh *WorkerHandler) SubmitJob(resultChan chan ResultStruct, f func() (interface{}, error)) error {
	wh.mux.Lock()
	select {
	case wh.Workers <- true:
	default:
		return errors.New("all workers busy")
	}
	wh.mux.Unlock()
	go func() {
		res, err := f()
		resultChan <- ResultStruct{res, err}
		<-wh.Workers
	}()
	return nil
}

package app

import (
	"errors"
	"sync"
)

func NewResultChannel() chan ResultStruct {
	return make(chan ResultStruct)
}

func NewWorkerHandler(numWorkers int) *WorkerHandler {
	return &WorkerHandler{
		Workers: make(chan bool, numWorkers),
		mux:     sync.Mutex{},
		idx:     0,
	}
}

func (wh *WorkerHandler) SubmitJob(resultChan chan ResultStruct, f func(idx int) (interface{}, error)) error {
	wh.mux.Lock()
	var worker_idx int
	select {
	case wh.Workers <- true:
		wh.idx++
		worker_idx = wh.idx
	default:
		return errors.New("all workers busy")
	}
	wh.mux.Unlock()
	go func() {
		res, err := f(worker_idx)
		resultChan <- ResultStruct{res, err}
		<-wh.Workers
		wh.idx--
	}()
	return nil
}

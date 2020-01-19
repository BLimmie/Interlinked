package app

import "time"

func AggregatorFromSession(session *Session) (*Aggregator, error) {
	agg := &Aggregator{
		session:     session,
		conclusions: make(map[string]func(session *Session) (interface{}, error)),
	}
	agg.init()
	return agg, nil
}

func (agg *Aggregator) init() {
	agg.conclusions["Average Text Sentiment"] = isTextPositive
	agg.conclusions["Time in Facial Emotions"] = timeSpentEmotion
}

func (agg *Aggregator) run() (interface{}, error) {
	fullRes := make(map[string]interface{})
	for key, f := range agg.conclusions {
		res, err := f(agg.session)
		if err != nil {
			return nil, err
		}
		fullRes[key] = res
	}
	return fullRes, nil
}

func isTextPositive(session *Session) (interface{}, error) {
	var sum float32
	for _, m := range session.TextMetrics {
		sum += m.Sentiment
	}
	return map[string]float32{
		"AvgTextSentiment": sum / float32(len(session.TextMetrics)),
	}, nil
}

func timeSpentEmotion(session *Session) (interface{}, error) {
	emotions := map[string]time.Duration{
		"joy":      time.Duration(0),
		"sorrow":   time.Duration(0),
		"anger":    time.Duration(0),
		"surprise": time.Duration(0),
	}
	// lastTime, err := time.Parse(timeLayout, removeMonotonicString(session.CreatedTime))
	lastTime := time.Unix(session.CreatedTime, 0)
	startTime := lastTime
	// if err != nil {
	// 	return nil, err
	// }
	for _, m := range session.ImageMetrics {
		t, err := time.Parse(timeLayout, removeMonotonicString(m.Time))
		if err != nil {
			return nil, err
		}
		dur := t.Sub(lastTime)
		for emotion, level := range m.Emotion {
			if level == "VERY_LIKELY" {
				emotions[emotion] += dur
			} else if level == "POSSIBLE" {
				emotions[emotion] += dur / 2
			}
		}
		lastTime = t
	}
	var emotions_s = make(map[string]string)
	totalTime := lastTime.Sub(startTime)
	var emotions_p = make(map[string]float32)
	for e, t := range emotions {
		emotions_s[e] = t.String()
		emotions_p[e] = float32(t) / float32(totalTime)
	}
	return map[string]interface{}{
		"Total Time": emotions_s,
		"Percentage": emotions_p,
	}, nil
}

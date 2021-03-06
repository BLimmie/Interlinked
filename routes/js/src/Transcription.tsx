import React from "react";
import SpeechRecognition from "react-speech-recognition";
import Speech from './Speech';
import { sleep } from './funcs';

let sentiment_num: number = 0;
let tones: boolean[] = [];
let tones2: boolean[] = [];
let calledyet: boolean[] = [];


async function interpret_sentiment(sentiment: string, i: number) {
  var temp_s = sentiment.substring(13, sentiment.length - 2)
  sentiment_num = parseFloat(temp_s);
  await sleep(1000);
  tones[i] = true;
  return null;
}

function httpCall(method: string, url: string, data: any, callback: (result: any, r: any) => any, i: number) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  if (callback) xhr.onload = function () { callback(this['responseText'], i); };
  if (data != null) {
    xhr.setRequestHeader('Content-Type', 'text/plain');
    xhr.send(data);
  }
  else xhr.send();
}

interface SpeechProps {
  // Props injected by SpeechRecognition
  transcript: string,
  // resetTranscript: any,
  browserSupportsSpeechRecognition: boolean
};


// In the future, at the end of the session, the "words" Map will have every phrase
// and their associated sentiment for storage purposes. Just put that in the database.
// It might be more complicated than that. I wouldn't know.
export default class Transcription extends React.Component<SpeechProps> {
  private i = 0;
  private sessionId = window.location.pathname.split("/").pop()

  render() {
    let globalThis = window
    let the_props: SpeechProps = this.props

    if (!the_props.browserSupportsSpeechRecognition) {
      return null
    }

    // Dynamically updating transcript
    const transcript_split = the_props.transcript.split(' ');
    let sentences: string[] = [];
    var j = 0;
    for (var i = 0; i < transcript_split.length; i++) {
      if (transcript_split.slice(j, i).join(" ").length > 100) {
        sentences.push(transcript_split.slice(j, i - 1).join(" "));
        j = i - 1;
        i = i - 2;
      }
      else if (i === transcript_split.length - 1) {
        sentences.push(transcript_split.slice(j, i).join(" "));
      }
    }
    let temp = Array.from(globalThis.words.values());

    globalThis.words = new Map();

    let limit = sentences.length;
    if (tones.length < limit) {
      tones.length = limit;
    }
    if (tones2.length !== tones.length) {
      tones2.length = tones.length;
    }
    if (calledyet.length !== tones.length) {
      calledyet.length = tones.length;
    }
    for (var i = 0; i < limit; i++) {
      if (i !== limit - 1 && i !== limit - 2) {
        globalThis.words.set(sentences[i], temp[i]);
      }
      else if (i === limit - 2 && calledyet[i] !== true) {
        let recent_phrase: string = sentences[i];
        httpCall('POST', backendServerName + ":8080/sentiment/text/" + (this.sessionId as string), recent_phrase, interpret_sentiment, i);
        calledyet[i] = true;
      }
      else if (i === limit - 2 && tones[i] === true && tones2[i] !== true) {
        let tone: number = 0; // Neutral
        if (sentiment_num > 0.1) {
          tone = 1; // Slightly Positive
          if (sentiment_num > 0.4) {
            tone = 11; // Positive
            if (sentiment_num > 0.7) {
              tone = 111; // Very Positive
            }
          }
        }
        else if (sentiment_num < -0.1) {
          tone = 2; // Slightly Negative
          if (sentiment_num < -0.4) {
            tone = 22; // Negative
            if (sentiment_num < -0.7) {
              tone = 222; // Very Negative
            }
          }
        }
        let recent_phrase: string = sentences[i];
        globalThis.words.set(recent_phrase, tone);
        tones2[i] = true;
      }
      else if (i === limit - 1) {
        globalThis.words.set(sentences[i], 0);
      }
      else {
        globalThis.words.set(sentences[i], temp[i]);
      }
    }

    // All this global array/variable code is so that Speech can function properly
    globalThis.display_words = Array.from(globalThis.words.keys());
    globalThis.sentiment = Array.from(globalThis.words.values());

    if (globalThis.display_words.length !== globalThis.phrase_count) {
      globalThis.phrase_count = globalThis.display_words.length;
    }

    if (globalThis.point_in_transcript + 3 !== globalThis.phrase_count) {
      globalThis.point_in_transcript = globalThis.phrase_count - 3;
      if (globalThis.point_in_transcript < 0) {
        globalThis.point_in_transcript = 0;
      }
    }

    return (<Speech />);
  }
}

// export default SpeechRecognition(Transcription);
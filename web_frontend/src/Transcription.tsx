import React, { Component } from "react";
import SpeechRecognition from "react-speech-recognition";
import Speech from './Speech';

interface propTypes {
  // Props injected by SpeechRecognition
  transcript: string,
  resetTranscript: any,
  browserSupportsSpeechRecognition: boolean
};


// In the future, at the end of the session, the "words" Map will have every phrase
// and their associated sentiment for storage purposes. Just put that in the database.
// It might be more complicated than that. I wouldn't know.
class Transcription extends React.Component<propTypes> {
    private i = 0;

    render() {
      let the_props: propTypes  = this.props
  
      if (!the_props.browserSupportsSpeechRecognition) {
        return null
      }


    const transcript_split = the_props.transcript.split(' ');
    const recent_phrase = transcript_split.slice(-13, -1)

    if (transcript_split.length > 12 * (globalThis.phrase_count + 1)) {
        globalThis.words.set(recent_phrase.join(" "), 1);
    }

    globalThis.display_words = Array.from( globalThis.words.keys() );
    globalThis.sentiment = Array.from( globalThis.words.values() );

    if (globalThis.display_words.length > globalThis.phrase_count) {
      globalThis.phrase_count = globalThis.display_words.length;
    }

    // This is only supposed to be called when the program first starts and when a new phrase is added to "words"
    if (globalThis.point_in_transcript + 3 < globalThis.phrase_count) {
      globalThis.point_in_transcript++;
    }

    return(<Speech />);
    }
  }

export default SpeechRecognition(Transcription);
import React, { Component } from "react";
import SpeechRecognition from "react-speech-recognition";
import Speech from './Speech';

interface SpeechProps {
  // Props injected by SpeechRecognition
  transcript: string,
  resetTranscript: any,
  browserSupportsSpeechRecognition: boolean
};


// In the future, at the end of the session, the "words" Map will have every phrase
// and their associated sentiment for storage purposes. Just put that in the database.
// It might be more complicated than that. I wouldn't know.
class Transcription extends React.Component<SpeechProps> {
    private i = 0;

    render() {
      let the_props: SpeechProps  = this.props
  
      if (!the_props.browserSupportsSpeechRecognition) {
        return null
      }

    // Extracting the most recent phrase and determining whether to add it or not,
    // only adding it if there's no overlap with the previous phrase.
    const transcript_split = the_props.transcript.split(' ');
    const recent_phrase = transcript_split.slice(-13, -1)

    if (transcript_split.length > 12 * (globalThis.phrase_count + 1)) {
        globalThis.words.set(recent_phrase.join(" "), 1);
    }

    // All this global array/variable code is so that Speech can function properly
    globalThis.display_words = Array.from( globalThis.words.keys() );
    globalThis.sentiment = Array.from( globalThis.words.values() );

    if (globalThis.display_words.length > globalThis.phrase_count) {
      globalThis.phrase_count = globalThis.display_words.length;
    }

    if (globalThis.point_in_transcript + 3 < globalThis.phrase_count) {
      globalThis.point_in_transcript++;
    }

    return(<Speech />);
    }
  }

export default SpeechRecognition(Transcription);
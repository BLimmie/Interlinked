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

    /*  
    // Extracting the most recent phrase and determining whether to add it or not,
    // only adding it if there's no overlap with the previous phrase.
    const transcript_split = the_props.transcript.split(' ');
    const recent_phrase = transcript_split.slice(-12)

    if (transcript_split.length > 12 * (globalThis.phrase_count + 1)) {
        globalThis.words.set(recent_phrase.join(" "), getRandomInt(0,2));
    }
    */

    // Dynamically updating transcript, but in a rather inefficient way
    const transcript_split = the_props.transcript.split(' ');
    let temp = Array.from( globalThis.words.values() );
    globalThis.words = new Map();

    let limit = Math.floor(transcript_split.length / 12);
    if (transcript_split.length % 12 !== 0) {
      limit++;
    }
    for (var i = 0; i < limit; i++) {
      if (i !== limit - 1) {
        globalThis.words.set(transcript_split.slice(12 * i, 12 * (i + 1)).join(" "), temp[i]);
      }
      else {
        // Add the remaining <= 12 words to their own phrase
        globalThis.words.set(transcript_split.slice(12 * i).join(" "), limit % 3);
      }
    }

    // All this global array/variable code is so that Speech can function properly
    globalThis.display_words = Array.from( globalThis.words.keys() );
    globalThis.sentiment = Array.from( globalThis.words.values() );

    if (globalThis.display_words.length !== globalThis.phrase_count) {
      globalThis.phrase_count = globalThis.display_words.length;
    }

    if (globalThis.point_in_transcript + 3 !== globalThis.phrase_count) {
      globalThis.point_in_transcript = globalThis.phrase_count - 3;
      if (globalThis.point_in_transcript < 0) {
        globalThis.point_in_transcript = 0;
      }
    }

    return(<Speech />);
    }
  }

export default SpeechRecognition(Transcription);
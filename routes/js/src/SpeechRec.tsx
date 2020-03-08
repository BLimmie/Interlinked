import React from "react";
import SpeechRecognition from "react-speech-recognition";
import { LocalDataTrack } from "twilio-video";
import { localdt } from "./TruePatientUI/PatientInterface"

interface SpeechRecProps {
  // Props injected by SpeechRecognition
  transcript: string,
  resetTranscript: any,
  browserSupportsSpeechRecognition: boolean
};


class SpeechRec extends React.Component<SpeechRecProps> {
  componentDidUpdate(prevProps: SpeechRecProps) {
    if (this.props.transcript !== prevProps.transcript && this.props.transcript !== '') {
      (localdt as LocalDataTrack).send(this.props.transcript)
    }

  }

  render() {

    if (!this.props.browserSupportsSpeechRecognition) {
      return null
    }

    return (<div />);
  }
}

export default SpeechRecognition(SpeechRec);
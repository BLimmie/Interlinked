import React from "react";
import SpeechRecognition from "react-speech-recognition";
import { LocalDataTrack } from "twilio-video";
import { localdt } from "./TruePatientUI/PatientInterface"
import Transcription from "./Transcription"
import { Box, makeStyles, createStyles, Theme, WithStyles } from '@material-ui/core'


interface SpeechRecProps {
  // Props injected by SpeechRecognition
  transcript: string,
  resetTranscript: any,
  browserSupportsSpeechRecognition: boolean
};


class SpeechRec extends React.Component<SpeechRecProps> {
  private textbox = {
    width: "45vw",
    height: "25vh",
  }
  componentDidUpdate(prevProps: SpeechRecProps) {
    if (this.props.transcript !== prevProps.transcript && this.props.transcript !== '') {
      (localdt as LocalDataTrack).send(this.props.transcript)
    }
  }

  render() {

    if (!this.props.browserSupportsSpeechRecognition) {
      return null
    }

    return (
      <Box style={this.textbox} >
        <Transcription transcript={this.props.transcript} browserSupportsSpeechRecognition={true} />
      </Box>

    );
  }
}

export default SpeechRecognition(SpeechRec);
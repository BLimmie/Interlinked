import React from "react";
import SpeechRecognition from "react-speech-recognition";
import { LocalDataTrack } from "twilio-video";
import { localdt } from "./TruePatientUI/PatientInterface"
import Transcription from "./Transcription"
import { Box, makeStyles, createStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textbox: {
      width: "45vw",
      height: "25vh",
    }
  }),
)

interface SpeechRecProps {
  // Props injected by SpeechRecognition
  transcript: string,
  resetTranscript: any,
  browserSupportsSpeechRecognition: boolean
};


function SpeechRec(props: SpeechRecProps) {
  const classes = useStyles();
  React.useEffect(() => {
    if (props.transcript !== '') {
      (localdt as LocalDataTrack).send(props.transcript)
    }
  }, [props.transcript])


  if (!props.browserSupportsSpeechRecognition) {
    return null
  }

  return (
    <Box className={classes.textbox} >
      <Transcription transcript={props.transcript} browserSupportsSpeechRecognition={true} />
    </Box>

  );
}

export default SpeechRecognition(SpeechRec);
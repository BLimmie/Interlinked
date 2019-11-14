import React from 'react'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import Transcription from './Transcription'
import Emotions from "./Emotions"
import Peer from 'peerjs'
import Webcam from 'react-webcam'

import VideoControls from './Video/VideoControls'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      background: '#16001f'
    },
    transcription: {
      height: "30vh",
      width: "38vw",
    },
    control: {
      padding: theme.spacing(2),
    },
    their_video: {
      height: "55vh",
      background: '#16001f'
    },
    my_video: {
      height: "27vh"
    },
    settings: {
      background: '#16001f',
      height: "40vh"
    },
    emotions: {
      height: "54vh",
      width: "38vw",
    },
  }),
);

export type StateInterface = {
  state:string
}

interface InterfaceProps  {
  location: StateInterface
}

globalThis.point_in_transcript = 0;
globalThis.phrase_count = 0;

// This function is what arranges all of the individual elements into the complete UI
export default function Interface(props:InterfaceProps)  {
  //Get Twilio token passed through url location state
  const token = props.location.state

  globalThis.words = new Map();
  globalThis.display_words = Array.from( globalThis.words.keys() );
  globalThis.sentiment = Array.from( globalThis.words.values() ); 
  globalThis.point_in_transcript = 0;
  globalThis.phrase_count = 0;

  React.useEffect(() => {
    const peer = new Peer('sender', { host: 'localhost', port: 9000, path: '/' })

    const startChat = async () => {
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: true
      })
      const localMediaContainer:(HTMLMediaElement | null) = document.querySelector('video#local');
      (localMediaContainer as HTMLMediaElement).srcObject = localStream

      const call = peer.call('receiver', localStream)
      call.on('stream', remoteStream => {
          const remoteMediaContainer:(HTMLMediaElement | null) = document.querySelector('video#remote');
          (remoteMediaContainer as HTMLMediaElement).srcObject = remoteStream
      })
    }
    
    startChat()
  }, [])

  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={1} />
      <Grid item justify={"center"} className={classes.their_video} xs = {5} /*Beginning of the upper half*/>
          <div><video height={"inherit"} id ="remote" autoPlay></video></div>
      </Grid>
      <Grid item xs={1} />
      <Grid item xs = {5}>
        <Box className = {classes.emotions}
          my = {2}
          border = {8}
          borderColor = "white"
          borderRadius = "0%"
        >
          <Emotions current_phrase_count={0} />
          </Box>
      </Grid>
      
      <Grid item xs = {3} /*Beginning of the lower half*/ >
        <Card>
          <video id ="local" autoPlay></video>
        </Card>
      </Grid>
      <Grid item xs = {4}>
        <Card>
          <VideoControls className={classes.settings}/>
        </Card>
      </Grid>
      <Grid item xs = {5}>
        <Box className = {classes.transcription}
          border = {8}
          borderColor = "white"
          borderRadius = "0%"
        >
          <Transcription />
        </Box>
      </Grid>
    </Grid>
  );

}

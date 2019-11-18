import React from 'react'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import Transcription from './Transcription'
import Emotions from "./Emotions"
import Peer from 'peerjs'
import Webcam from 'react-webcam'

import VideoControls, { avStateInterface } from './Video/VideoControls'
import { Button } from '@material-ui/core'

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

export default function Interface()  {
  const [avState, setAvState] = React.useState<avStateInterface>({
    audio: true,
    video: true,
    volume: 50
  })
  const [startChat, setStartChat] = React.useState<boolean>(false)
  const webcamRef:  React.RefObject<Webcam> = React.useRef(null)
  const [localStream, setLocalStream] = React.useState<MediaStream>()

  globalThis.words = new Map();
  globalThis.display_words = Array.from( globalThis.words.keys() );
  globalThis.sentiment = Array.from( globalThis.words.values() ); 
  globalThis.point_in_transcript = 0;
  globalThis.phrase_count = 0;
  
  const endSession: Function = () => {}

  const startChatClick = () => {
    setStartChat(true)
    const peer = new Peer('sender', { host: 'localhost', port: 9000, path: '/' })
    if(webcamRef.current){
      setLocalStream(webcamRef.current.stream)
      const call = peer.call('receiver', webcamRef.current.stream)
      if(call){
        call.on('stream', remoteStream => {
          const remoteMediaContainer:(HTMLMediaElement | null) = document.querySelector('video#remote');
          (remoteMediaContainer as HTMLMediaElement).srcObject = remoteStream;
          (remoteMediaContainer as HTMLMediaElement).volume = avState.volume/100
        })
      } else {
        console.log(call)
      }
    }
  }

  React.useEffect(() => {
    console.log(avState.video)
    if(localStream){
      localStream.getVideoTracks()[0].enabled = avState.video
    }
  },[avState.video, localStream])

  React.useEffect(() => {
    console.log(avState.audio)
    if(localStream){
      localStream.getAudioTracks()[0].enabled = avState.audio
    }
  },[avState.audio, localStream])

  React.useEffect(() => {
    const remoteMediaContainer:(HTMLMediaElement | null) = document.querySelector('video#remote');
    if(remoteMediaContainer) (remoteMediaContainer as HTMLMediaElement).volume = avState.volume/100;
  },[avState.volume, localStream])

  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={1} />
      <Grid item className={classes.their_video} xs = {5} /*Beginning of the upper half*/>
          {
            !startChat &&
            <Button
              color="primary"
              size="large"
              variant="outlined"
              onClick={() => startChatClick()}
            >Start Chat</Button>
          }
          {
            startChat &&
            <div><video height={"inherit"} id ="remote" autoPlay></video></div>
          }
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
        <Webcam
            audio={true}
            id="local" 
            ref={webcamRef}
          />
        </Card>
      </Grid>
      <Grid item xs = {4}>
        <Card>
          <VideoControls
            className={classes.settings}
            endSession={() => endSession()}
            avState={avState}
            setAVState={setAvState}
          />
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

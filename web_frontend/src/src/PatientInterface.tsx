import React from 'react'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import Peer from 'peerjs'
import Webcam from 'react-webcam'
import VideoControls, { avStateInterface } from './Video/VideoControls'
import { Typography } from '@material-ui/core'

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


interface InterfaceProps  {
}

export default function PatientInterface(props:InterfaceProps)  {

  const classes = useStyles();
  const webcamRef:  React.RefObject<Webcam> = React.useRef(null)
  const [avState, setAvState] = React.useState<avStateInterface>({
    audio: true,
    video: true,
    volume: 50
  })
  const [localStream, setLocalStream] = React.useState<MediaStream>()
  const [remoteConnected, setRemoteConnected] = React.useState<boolean>(false)
  const patientScreenshots: string[] = []
  const endSession: Function = () => {}
  if(webcamRef){
    //every 1 second get screenshot
    window.setInterval(() => {
      if(webcamRef.current){
      const screenShot = webcamRef.current.getScreenshot()
      //Pushing screenshots into an array but will be later sent to the backend
      patientScreenshots.push(screenShot as string)
      }
    }, 1000)
  }
  React.useEffect(() => {
    const peer = new Peer('receiver', { host: 'localhost', port: 9000, path: '/' })
    peer.on('call', call => {
      const startChat = async () => {
        if(webcamRef.current){
          setLocalStream(webcamRef.current.stream)
          call.answer(localStream)
          call.on('stream', remoteStream => {
            setRemoteConnected(true)
            const remoteMediaContainer:(HTMLMediaElement | null) = document.querySelector('video#remote');
            (remoteMediaContainer as HTMLMediaElement).srcObject = remoteStream;
            (remoteMediaContainer as HTMLMediaElement).volume = avState.volume/100
          })
        }
      }
      startChat()
    })
  }, [])

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
    if(remoteMediaContainer) (remoteMediaContainer as HTMLMediaElement).volume = avState.volume/100
  },[avState.volume, localStream]);

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={1} />
      <Grid item className={classes.their_video} xs = {5} /*Beginning of the upper half*/>
          {
            remoteConnected &&
            <div>
              <video
                height={"inherit"}
                id ="remote"
                autoPlay
              >             
              </video>
            </div>
          }
          {
            !remoteConnected &&
            <div>
              <Typography
                variant="h1"
                color="primary"
              >
                Waiting for Doctor
              </Typography>
            </div>
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
          </Box>
      </Grid>
      
      <Grid item xs = {3} /*Beginning of the lower half*/ >
        <Card>
          <Webcam
            audio={avState.audio}
            id="local" 
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          />
        </Card>
      </Grid>
      <Grid item xs = {4}>
        <Card>
          <VideoControls
            className={classes.settings}
            avState={avState}
            setAVState={setAvState}
            endSession={endSession}
          />
        </Card>
      </Grid>
      <Grid item xs = {5}>
        <Box className = {classes.transcription}
          border = {8}
          borderColor = "white"
          borderRadius = "0%"
        >
        </Box>
      </Grid>
    </Grid>
  );

}

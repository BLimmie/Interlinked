import React from 'react'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import Peer from 'peerjs'
import Webcam from 'react-webcam'
import VideoControls from './Video/VideoControls'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      background: '#16001f'
    },
    speech: {
      height: "40vh"
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
      height: "55vh"
    }
  }),
);


interface InterfaceProps  {
}


export default function PatientInterface(props:InterfaceProps)  {

  const classes = useStyles();

  React.useEffect(() => {
    const peer = new Peer('receiver', { host: 'localhost', port: 9000, path: '/' })
    peer.on('call', call => {
      const startChat = async () => {
        const localStream = await navigator.mediaDevices.getUserMedia({
          video: true
        })
        const localMediaContainer:(HTMLMediaElement | null) = document.querySelector('video#local');
        (localMediaContainer as HTMLMediaElement).srcObject = localStream
        call.answer(localStream)
        call.on('stream', remoteStream => {
          const remoteMediaContainer:(HTMLMediaElement | null) = document.querySelector('video#remote');
          (remoteMediaContainer as HTMLMediaElement).srcObject = remoteStream
        })
      }
      startChat()
    })
  }, [])
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={1} />
      <Grid item justify={"center"} className={classes.their_video} xs = {5} /*Beginning of the upper half*/>
          <div><video height={"inherit"} id ="remote" autoPlay></video></div>
      </Grid>
      <Grid item xs={1} />
      <Grid item xs = {5}>
        <Box className = {classes.emotions}
          border = {8}
          borderColor = "white"
          borderRadius = "0%"
        >
          </Box>
      </Grid>
      
      <Grid item xs = {3} /*Beginning of the lower half*/ >
        <Card>
          <Webcam id="local" />
        </Card>
      </Grid>
      <Grid item xs = {4}>
        <Card>
          <VideoControls className={classes.settings}/>
        </Card>
      </Grid>
      <Grid item xs = {5}>
        <Box className = {classes.speech}
          border = {8}
          borderColor = "white"
          borderRadius = "0%"
        >
        </Box>
      </Grid>
    </Grid>
  );

}

import React from 'react'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Webcam from 'react-webcam'
import VideoControls, { avStateInterface } from './Video/VideoControls'
import {Redirect, RouteComponentProps} from 'react-router-dom'

import { httpCall, getToken } from './Video/Twilio'
import { connect, Room } from 'twilio-video'
import { RoomTextField } from './Video/RoomTextField'
import { WebcamWithControls } from './Video/WebcamWithControls'

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
    their_video: {
      height: "55vh",
      background: '#16001f',
      width: '100%',
      '& video' : {
        width: '100%',
        height: "55vh"
      }
    },
    my_video: {
      height: "41vh",
      background: '#16001f',
      '& video' : {
        width: '85%'
      }
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

type LinkParams = {link: string}
export default function PatientInterface({ match }: RouteComponentProps<LinkParams>)  {
  
  const classes = useStyles();
  const webcamRef:  React.RefObject<Webcam> = React.useRef(null)
  const [avState, setAvState] = React.useState<avStateInterface>({
    audio: true,
    video: true,
    volume: 50
  })
  
  const [roomName, setRoomName] = React.useState<string>(match.params.link)
  const [roomSubmitted, setRoomSubmitted] = React.useState<Room>()
  const [endChat, setEndChat] = React.useState<boolean>(false)

  
  if(webcamRef){
    //every 1 second get screenshot
    window.setInterval(() => {
      if(webcamRef.current){
      const screenShot = webcamRef.current.getScreenshot()
      screenShot && 
        httpCall(
          'POST',
          "http://localhost:8080/sentiment/frame",
          screenShot.split(",")[1],
          (result) => {console.log(result)}
        )
      }
    }, 1000)
  }

  // while (!webcamRef || !(webcamRef.current)) {}
  const submitRoom = () => {
    console.log(roomName)
    if (!roomSubmitted) {
    getToken("Patient", roomName)
      .then((value) => {
        if(value){
          //Connect to room with roomName and token
          if (navigator.mediaDevices.getUserMedia && !roomSubmitted) { 
            navigator.mediaDevices.getUserMedia({video: true, audio: true}).then(stream => 
          connect(value,{
            name: roomName,
            tracks: stream.getTracks()
          }).then((room: Room) => {
            setRoomSubmitted(room)
            const localParticipant = room.localParticipant
            console.log(`Connected to the Room as LocalParticipant "${localParticipant.identity}"`);

            room.participants.forEach(participant => {
              console.log(`Participant "${participant.identity}" is connected to the Room`);
              participant.tracks.forEach((publication: any) => {
                if (publication.isSubscribed) {
                  const track = publication.track;
                  const remoteMediaContainer: (HTMLElement | null)
                  = document.getElementById('remote');
                  (remoteMediaContainer as HTMLElement).appendChild(track.attach());
                }
              })
            
              participant.on('trackSubscribed', (track: any) => {
                const remoteMediaContainer: (HTMLElement | null)
                  = document.getElementById('remote');
                (remoteMediaContainer as HTMLElement).appendChild(track.attach());
              })
            });

            room.once('participantDisconnected', participant => {
              console.log(`Participant disconnected: ${participant.identity}`);
              room.disconnect()
              setEndChat(true)
            }) 
          })).catch(console.log)
        }
        } else {
          //Dialog to try again
        }
      })
    }
  }
  submitRoom()

  const endSession: Function = () => {
    if(roomSubmitted){
      roomSubmitted.disconnect()
      setEndChat(true)
    }
  }

  if(endChat){
    return <Redirect to='/' />;
  }

  return (
    <Grid container justify="center" className={classes.root} spacing={2}>
      <Grid item xs={1} />
      {
        !roomSubmitted &&
        <Grid item className={classes.their_video} xs = {5} >
        </Grid>
      }
      {
        roomSubmitted &&
        <Grid item className={classes.their_video}  id="remote" xs = {5} />
      }        
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
      
      <Grid item className={classes.my_video} xs={3} /*Beginning of the lower half*/ >
        <WebcamWithControls
          webcamRef={webcamRef}
          avState={avState}
        />
      </Grid>
      <Grid item xs = {4}>
        <VideoControls
          className={classes.settings}
          avState={avState}
          setAVState={setAvState}
          endSession={endSession}
        />
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

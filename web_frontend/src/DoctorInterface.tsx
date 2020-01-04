import React from 'react'

import { Grid, Box, makeStyles, createStyles, Theme } from '@material-ui/core'
import Emotions from "./Emotions"
import Webcam from 'react-webcam'
import {Redirect} from 'react-router-dom'
import VideoControls, { avStateInterface, defaultAVState } from './Video/VideoControls'
import { getRoom, setRemoteVideo } from './Video/Twilio'
import { RoomTextField } from './Video/RoomTextField'
import { WebcamWithControls } from './Video/WebcamWithControls'
import { Room } from 'twilio-video'
import Transcription from './Transcription'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: '#16001f'
    },
    upperHalf: {
      height: "55vh"
    },
    their_video: {
      '& video' : {
        width: '100%',
        height: '90%',
      }
    },
    lowerHalf: {
      height: "45vh",
    }
  }),
);

export default function DoctorInterface()  {
  const classes = useStyles();

  const [avState, setAvState] = React.useState<avStateInterface>(defaultAVState)

  const [roomField, setRoomField] = React.useState<string>('')
  const [videoRoom, setVideoRoom] = React.useState<Room>()
  const [endChat, setEndChat] = React.useState<boolean>(false)
  const webcamRef:  React.RefObject<Webcam> = React.useRef(null)

  globalThis.words = new Map();
  globalThis.display_words = Array.from( globalThis.words.keys() );
  globalThis.sentiment = Array.from( globalThis.words.values() ); 
  globalThis.point_in_transcript = 0;
  globalThis.phrase_count = 0;
  
  const createRoom = () => {
    const localTrackStream = (webcamRef.current as Webcam ).stream.getTracks()
    getRoom(roomField, localTrackStream, "Doctor")
      .then((room: Room) => {
        setVideoRoom(room)
        setRemoteVideo(room, endSession)
      })
      .catch(() => {setRoomField("Room name does not exist, try again")})
  }

  const endSession: Function = () => {
    if(videoRoom)
      videoRoom.disconnect()
    setEndChat(true)
  }

  if(endChat)
    return <Redirect to='/' />
  
  return (
    <div className={classes.root} >
      <Grid container className={classes.upperHalf} >
        <Grid item xs={1} />
        {
          !videoRoom &&
          <Grid item className={classes.their_video} xs = {5} >
            <RoomTextField
              inputLabel="Type a room name to create a chat"
              setRoomName={setRoomField}
              roomName={roomField}
              submitRoom={() => createRoom()}
            />
          </Grid>
        }
        {
          videoRoom &&
          <Grid item className={classes.their_video}  id="remote" xs = {5} />
        } 
        <Grid item xs={1} />
        <Grid item xs={5}>
          <Box
            my = {2}
            border = {8}
            borderColor = "white"
            borderRadius = "0%"
          >
            <Emotions current_phrase_count={0} />
          </Box>
        </Grid>
      </Grid>
      <Grid container className={classes.lowerHalf}>
        <Grid item xs={3} /*Beginning of the lower half*/ >
          <WebcamWithControls
            webcamRef={webcamRef}
            avState={avState}
            sendScreenshots={false}
            room={videoRoom}
          />
        </Grid>
        <Grid item xs={4}> 
          <VideoControls
            endSession={() => endSession()}
            avState={avState}
            setAVState={setAvState}
          />
        </Grid>
        <Grid item xs={5}>
          <Box
            className={classes.lowerHalf}
            border = {8}
            borderColor = "white"
            borderRadius = "0%"
          >
            <Transcription />
          </Box>
        </Grid>
      </Grid>
    </div>
  ); //Replace "<Transcription />" with "<Transcript_Tests i={0} />" to run the transcription and emotion display tests
}

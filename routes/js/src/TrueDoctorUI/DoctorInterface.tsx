import React from 'react'

import { Grid, Box, makeStyles, createStyles, Theme } from '@material-ui/core'
import Emotions, { zeroValueResponse, serverResponse, EmotionsInterface} from "../Emotions"
import {Redirect, RouteComponentProps} from 'react-router-dom'
import VideoControls, { avStateInterface, defaultAVState } from '../Video/VideoControls'
import { getRoom, setRemoteVideo } from '../Video/Twilio'
import { WebcamWithControls, setPatienSnapshotInterval } from '../Video/WebcamWithControls'
import { Room } from 'twilio-video'
import Transcription from '../Transcription'
import {AUInterface} from '../AUs'
import Image from '../TrueImages/background_Interface_16-9.png'
import TextboxImage from '../TrueImages/background_textbox_default.png'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: '#16001f'
    },
    background: {
      height: "100vh",
      width: "100vw",
      backgroundSize: 'cover'
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
    their_video_box: {
      width: "70vw",
      height: "70vh"
    },
    textbox_box: {
      width: "70vw",
      height: "25vh",
      backgroundSize: 'cover'
    },
    textbox: {
      width: "45vw",
      height: "25vh",
    },
    lowerHalf: {
      height: "45vh",
    }
  }),
);

type LinkParams = {link: string}
export default function DoctorInterface({ match }: RouteComponentProps<LinkParams>)  {
  const classes = useStyles();

  const [avState, setAvState] = React.useState<avStateInterface>(defaultAVState)

  const [videoRoom, setVideoRoom] = React.useState<Room>()
  const [endChat, setEndChat] = React.useState<boolean>(false)
  const [intervalId, setIntervalId] = React.useState<NodeJS.Timeout>()
  const [patientFrameResponse, setPatientResonse] = React.useState<serverResponse>(zeroValueResponse)
  const [localVidStream, setLocalVidStream] = React.useState<MediaStream>()

  
  const createRoom = () => {
    if (!videoRoom) {
      if (localVidStream) { 
        getRoom(match.params.link, localVidStream.getTracks(), "Doctor")
          .then((room: Room) => {
            setVideoRoom(room)
            setRemoteVideo(room, endSession)
          })
          .catch(() => {console.log("Room name does not exist, exit please")})
      }
    }
  }

  createRoom()

  const resultToResponse = (result: any) => {
    if(result && result === "no faces found"){
      console.log(result)
    } else {
      const AUs: AUInterface = JSON.parse(result).AU
      const Emotions: EmotionsInterface = JSON.parse(result).Emotion
      setPatientResonse({aus: AUs, emotions: Emotions})
    }
  }
   
  React.useEffect(() => {
   const id = setPatienSnapshotInterval(resultToResponse)
   setIntervalId(id)
  }, [])

  const endSession: Function = () => {
    if(videoRoom)
      videoRoom.disconnect()
    clearInterval((intervalId as NodeJS.Timeout))
    if(localVidStream)
      localVidStream.getTracks().forEach((track:MediaStreamTrack) => {
        track.stop()
      })
    setEndChat(true)
  }

  if(endChat)
    return <Redirect to='/client/TrueDoctorMainPage' />
  
  return (
    <Box
         className={classes.background}
         style={{backgroundImage: `url(${Image})` }}
     >
      <div style={{ padding: "1vw", paddingRight:"2vw", paddingLeft:"2vw" }} >
        <Grid 
          container
          spacing={2}
          direction='row'
          alignItems='flex-start'
          justify='space-between'
        >
          <Grid item>
            <Grid
              container
              spacing={1}
              direction='column'
              alignItems='flex-start'
              justify='flex-start'
            >
                <Grid item>
                  <Box className={classes.their_video_box}
                        bgcolor="#6e6b7a"               
                        border = {2}
                        borderColor = "#6e6b7a">
                    {
                      // videoRoom &&
                      <Grid item className={classes.their_video}  id="remote" xs = {5} />
                    }
                  </Box>
                </Grid>
            
              <Grid item>
                <Box justifyContent="center"
                  className={classes.textbox_box}
                  style={{backgroundImage: `url(${TextboxImage})` }}
                >
                  <div style={{ paddingLeft: "13vw", paddingTop: "1vh"}} >
                    <Box className={classes.textbox} >
                      <Transcription />
                    </Box>
                  </div>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid
              container
              spacing={2}
              direction='column'
              alignItems='center'
              justify='flex-start'
            >
                <Grid item>
                    <Emotions response={patientFrameResponse}/>
                </Grid>
            </Grid>
          </Grid>


          <div style={{ zIndex: 100, position:'absolute', top: "56vh", left:"1vw"}}>
            
            <Grid item xs={4} >
              <WebcamWithControls
                avState={avState}
                room={videoRoom}
                localVidStream={localVidStream}
                setLocalVidStream={setLocalVidStream}
              />
            </Grid>
          </div>

          <div style={{ zIndex: 100, position:'absolute', top: "63vh", left:"54vw"}}>
            <Grid item> 
                <VideoControls
                  endSession={() => endSession()}
                  avState={avState}
                  setAVState={setAvState}
                />
            </Grid>
          </div>

        </Grid>
      </div>
    </Box>
  ); //Replace "<Transcription />" with "<Transcript_Tests i={0} />" to run the transcription and emotion display tests
}

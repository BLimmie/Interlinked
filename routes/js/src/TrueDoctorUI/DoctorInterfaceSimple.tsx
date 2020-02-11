import React from 'react'

import { Grid, Box, makeStyles, createStyles, Theme } from '@material-ui/core'
import Emotions, { zeroValueResponse, serverResponse, EmotionsInterface} from "../EmotionsSimple"
import {Redirect, RouteComponentProps} from 'react-router-dom'
import VideoControls, { avStateInterface, defaultAVState } from '../Video/VideoControls'
import { getRoom, setRemoteVideo } from '../Video/Twilio'
import { WebcamWithControls, setPatienSnapshotInterval } from '../Video/WebcamWithControls'
import { Room } from 'twilio-video'
import Transcription from '../Transcription'
import {AUInterface} from '../AUs'
import Image from '../TrueImages/background_Interface_16-9.png'
import TextboxImage from '../TrueImages/background_textbox_simple.png'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: '#dddce7'
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
      width: "100vw",
      height: "100vh"
    },
    textbox_box: {
      width: "100vw",
      height: "25vh",
      backgroundSize: 'cover',
      opacity: "0.5"
    },
    textbox: {
      width: "55vw",
      height: "25vh",
      opacity: "2"
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
   const id = setPatienSnapshotInterval(resultToResponse, match.params.link)
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
             style={{backgroundImage: `url(${Image})` }}>
    
                      <Box className={classes.their_video_box}
                            bgcolor="#5f587d"               
                            border = {2}
                            borderColor = "#5f587d">
                        {
                          // videoRoom &&
                          <Grid item className={classes.their_video}  id="remote" xs = {5} />
                        }
                      </Box>
          <div style={{ zIndex: 50, position:'absolute', top: "74vh", left:"0vw"}}>
    
                    <Box justifyContent="center"
                      className={classes.textbox_box}
                      style={{backgroundImage: `url(${TextboxImage})` }}
                    >

                    </Box>
                  </div>
    
                  <div style={{ zIndex: 100, position:'absolute', top: "74vh", left:"0vw"}}>
    
                    <div style={{ paddingLeft: "13vw", paddingTop: "1vh"}} >
                      <Box className={classes.textbox} >
                        <Transcription />
                      </Box>
                    </div>
    
                  </div>
    
                  <div style={{ zIndex: 100, position:'absolute', top: "74vh", left:"0vw"}}>
    
                    <div style={{ paddingLeft: "67vw", paddingTop: "1vh"}} >
                        <Emotions response={patientFrameResponse}/>
                    </div>
    
                    </div>
    
                    <div style={{ zIndex: 100, position:'absolute', top: "0vh", left:"-1vw"}}>
                
            <Grid item xs={4} >
              <WebcamWithControls
                avState={avState}
                room={videoRoom}
                localVidStream={localVidStream}
                setLocalVidStream={setLocalVidStream}
              />
            </Grid>
              </div>
    
              <div style={{ zIndex: 100, position:'absolute', top: "66vh", left:"81vw"}}>
                <Grid item> 
                    <VideoControls
                      endSession={() => endSession()}
                      avState={avState}
                      setAVState={setAvState}
                    />
                </Grid>
              </div>
    
    
        </Box>
      ); //Replace "<Transcription />" with "<Transcript_Tests i={0} />" to run the transcription and emotion display tests
}

import React from 'react'

import { avStateInterface } from './VideoControls'

import Webcam from 'react-webcam'
import { sendFrame } from './Twilio'
import { makeStyles, createStyles, Theme } from '@material-ui/core'
import { LocalAudioTrackPublication, Room, LocalVideoTrackPublication } from 'twilio-video'
import { useAlert } from 'react-alert'


interface WebcamWithControlsProps{
    webcamRef?:  React.RefObject<Webcam>
    avState: avStateInterface
    sendScreenshots: boolean
    room: Room | undefined
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    video: {
      marginLeft: "16px",
      width: "80%"
    }
  }),
);

export const WebcamWithControls: React.SFC<WebcamWithControlsProps> = (props) => {
  const classes = useStyles();
  const alert = useAlert()

  const {webcamRef, avState, sendScreenshots, room} = props

  const [currentWebcam, setCurrentWebcam] = React.useState<Webcam>()
  const [startedInterval, setStartedInterval] = React.useState<boolean>(false)
  
  React.useEffect(()=> {
    webcamRef && setCurrentWebcam((webcamRef.current as Webcam))
  },[webcamRef])

  React.useEffect(() => {
    if(currentWebcam){
      //Enable or disable local video or audio
      if(avState.audio === false)
        room && (room as Room).localParticipant.audioTracks.forEach((audioTrack: LocalAudioTrackPublication) => {
          audioTrack.track.disable()
        })
      if(avState.audio === true)
        room && (room as Room).localParticipant.audioTracks.forEach((audioTrack: LocalAudioTrackPublication) => {
          audioTrack.track.enable()
        })
      if(avState.video === false){
        room && (room as Room).localParticipant.videoTracks.forEach((videoTrack:LocalVideoTrackPublication) => {
          videoTrack.track.disable()
        });
        const stream = currentWebcam.stream
        if(stream) stream.getVideoTracks()[0].enabled = false
      }
      if(avState.video === true){
        room && (room as Room).localParticipant.videoTracks.forEach((videoTrack:LocalVideoTrackPublication) => {
          videoTrack.track.enable()
        });
        const stream = currentWebcam.stream
        if(stream) stream.getVideoTracks()[0].enabled = true
      }
    }
    // Change remote video's volume
    const remoteMediaContainer:(HTMLMediaElement | null) = document.querySelector('audio');
    if(remoteMediaContainer) {
      (remoteMediaContainer as HTMLMediaElement).volume = avState.volume/100;
    }
  },[avState])

  const handleFaceResult = (result: string) => {
    if(result) {
      if (result === "no faces found"){
        alert.error("Face not Visible")
      }
      // TODO: Handle successful result
    }
  }

  if(sendScreenshots && !startedInterval){
    if(webcamRef && webcamRef.current){
      setInterval(() => {
        const screenShot = webcamRef && webcamRef.current && 
          webcamRef.current.getScreenshot()
        if(screenShot){
          setStartedInterval(true)
          sendFrame(screenShot, (result: any) => { handleFaceResult(result)})
        }
      }, 5000)
    }
  }

  return (
    <Webcam
        className={classes.video}
        audio={avState.audio}
        id="local" 
        ref={webcamRef}
        screenshotFormat="image/jpeg"
    />
  );
}
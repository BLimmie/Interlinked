import React from 'react'

import { avStateInterface } from './VideoControls'

import Webcam from 'react-webcam'
import { httpCall } from './Twilio'
import { makeStyles, createStyles, Theme } from '@material-ui/core'
import { LocalAudioTrackPublication, Room, LocalVideoTrackPublication } from 'twilio-video'


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

  const {webcamRef, avState, sendScreenshots, room} = props

  const [currentWebcam, setCurrentWebcam] = React.useState<Webcam>()

  React.useEffect(()=> {
    webcamRef && setCurrentWebcam((webcamRef.current as Webcam))
  },[webcamRef])

  React.useEffect(() => {
    if(currentWebcam){
      //Enable or disable local video or audio
      if(avState.audio === false)
        room?.localParticipant.audioTracks.forEach((audioTrack: LocalAudioTrackPublication) => {
          audioTrack.track.disable()
        })
      if(avState.audio === true)
        room?.localParticipant.audioTracks.forEach((audioTrack: LocalAudioTrackPublication) => {
          audioTrack.track.enable()
        })
      if(avState.video === false){
        room?.localParticipant.videoTracks.forEach((videoTrack:LocalVideoTrackPublication) => {
          videoTrack.track.disable()
        });
        const stream = currentWebcam.stream
        if(stream) stream.getVideoTracks()[0].enabled = false
      }
      if(avState.video === true){
        room?.localParticipant.videoTracks.forEach((videoTrack:LocalVideoTrackPublication) => {
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

  if(webcamRef && sendScreenshots){
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
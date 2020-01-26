import React from 'react'

import { avStateInterface } from './VideoControls'

import { httpCall } from './Twilio'
import { makeStyles, createStyles, Theme } from '@material-ui/core'
import { LocalAudioTrackPublication, Room, LocalVideoTrackPublication } from 'twilio-video'



interface WebcamWithControlsProps{
    avState: avStateInterface
    room: Room | undefined
    localVidStream: MediaStream | undefined
    setLocalVidStream: React.Dispatch<React.SetStateAction<MediaStream | undefined>>
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    video: {
      marginLeft: "16px",
      width: "80%"
    }
  }),
);

function sendFrame(screenShot: string, cb: (result:any)=>any) {
  httpCall(
    'POST',
    "http://localhost:8080/sentiment/frame",
    screenShot.split(",")[1],
    cb
  )
}

export function setPatienSnapshotInterval(resultCB: (result: any) => void ) : NodeJS.Timeout {
  const id = setInterval(() => {
    const videoParentElement = document.getElementById('remote')
    const videoElement = videoParentElement && videoParentElement.lastElementChild
    const imageCanvas = document.createElement('canvas')
    imageCanvas.width = 640
    imageCanvas.height = 480
    const ctx = imageCanvas.getContext('2d')
    if(videoElement && ctx)
      ctx.drawImage(videoElement as CanvasImageSource, 0, 0 , 640, 480)
      sendFrame(imageCanvas.toDataURL('image/jpeg'), (result: any) => { resultCB(result)} )
  }, 3000)
  return id
}

export const WebcamWithControls: React.SFC<WebcamWithControlsProps> = (props) => {
  const styles = useStyles()
  
  const { avState, room, localVidStream, setLocalVidStream} = props

  
  React.useEffect(()=> {
    navigator.mediaDevices.getUserMedia({video: {width: 720}, audio: true}).then(stream => {
      const localVideo = document.querySelector('#local-video');
      (localVideo as HTMLVideoElement).srcObject = stream;

      (localVideo as HTMLVideoElement).onloadedmetadata = function(e: any) {
        (localVideo as HTMLVideoElement).play()
      }
      setLocalVidStream(stream)
    })
  },[])

  React.useEffect(() => {
    if(localVidStream){
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
        localVidStream.getVideoTracks()[0].enabled = false
      }
      if(avState.video === true){
        room && (room as Room).localParticipant.videoTracks.forEach((videoTrack:LocalVideoTrackPublication) => {
          videoTrack.track.enable()
        });
        localVidStream.getVideoTracks()[0].enabled = true
      }
    }
    // Change remote video's volume
    const remoteMediaContainer:(HTMLMediaElement | null) = document.querySelector('audio');
    if(remoteMediaContainer) {
      (remoteMediaContainer as HTMLMediaElement).volume = avState.volume/100;
    }
  },[avState])

  return (
    <div id="local-media">
      <video id="local-video" className={styles.video} />
    </div>
  );
}
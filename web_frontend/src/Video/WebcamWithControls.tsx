import React from 'react';

import { avStateInterface } from './VideoControls';

import Webcam from 'react-webcam';


interface WebcamWithControlsProps{
    webcamRef?:  React.RefObject<Webcam>
    avState: avStateInterface
}

export const WebcamWithControls: React.SFC<WebcamWithControlsProps> = (props) => {
  const {webcamRef, avState} = props

  const [currentWebcam, setCurrentWebcam] = React.useState<Webcam>()

  React.useEffect(()=> {
    webcamRef && setCurrentWebcam((webcamRef.current as Webcam))
  },[webcamRef])

  React.useEffect(() => {
    if(currentWebcam){
      currentWebcam.stream.getVideoTracks()[0].enabled = avState.video
      currentWebcam.stream.getAudioTracks()[0].enabled = avState.audio
    }
    // Change remote video's Audio
    const remoteMediaContainer:(HTMLMediaElement | null) = document.querySelector('audio');
    if(remoteMediaContainer) {
      (remoteMediaContainer as HTMLMediaElement).volume = avState.volume/100;
    }
  },[avState])

  return (
    <Webcam
        audio={avState.audio}
        id="local" 
        ref={webcamRef}
        screenshotFormat="image/jpeg"
    />
  );
}
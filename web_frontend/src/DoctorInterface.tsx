import React from 'react'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import Transcription from './Transcription'
import Emotions from "./Emotions"
import Peer, { MediaConnection } from 'peerjs'
import Webcam from 'react-webcam'
import {Redirect} from 'react-router-dom'
import VideoControls, { avStateInterface } from './Video/VideoControls'
import { Button } from '@material-ui/core'
import io from 'socket.io-client'
import Transcript_Tests from './Transcript_Tests'

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

export default function Interface()  {
  const peer = new Peer('sender', { host: 'localhost', port: 9000, path: '/' })
  const [avState, setAvState] = React.useState<avStateInterface>({
    audio: true,
    video: true,
    volume: 50
  })
  const [connection, setConnection] = React.useState<MediaConnection>()
  const [startChat, setStartChat] = React.useState<boolean>(false)
  const [endChat, setEndChat] = React.useState<boolean>(false)
  const webcamRef:  React.RefObject<Webcam> = React.useRef(null)
  const [localStream, setLocalStream] = React.useState<MediaStream>()

  var globalThis = window;
  globalThis.words = new Map();
  globalThis.display_words = Array.from( globalThis.words.keys() );
  globalThis.sentiment = Array.from( globalThis.words.values() ); 
  globalThis.point_in_transcript = 0;
  globalThis.phrase_count = 0;
  globalThis.socket = io();

  globalThis.socket.on("close", closeCall);
  globalThis.socket.on("candidate", handleNewICECandidateMsg);
  globalThis.socket.on("offer", handleOfferMsg);
  globalThis.socket.on("answer", handleAnswerMsg);
  
  var localPC: RTCPeerConnection;
  function sendSignal(type: String, msg) {
    var msgJSON = JSON.stringify(msg);
    globalThis.socket.emit(type, msg)
  }
  function handleSignalingStateChangeEvent(event) {
    switch(localPC.signalingState) {
      case "closed":
        closeCall();
        break;
    }
  }
  function handleICEConnectionStateChangeEvent(event) {
    switch(localPC.iceConnectionState) {
      case "closed":
      case "failed":
      case "disconnected":
        closeCall();
        break;
    }
  }
  function closeConnection() {
    if (localPC) {
      localPC.close();
      const remoteMediaContainer:(HTMLMediaElement | null) = document.querySelector('video#remote');
      ((remoteMediaContainer as HTMLMediaElement).srcObject as MediaStream).getTracks().forEach(track => track.stop());
      (remoteMediaContainer as HTMLMediaElement).removeAttribute("src");
      (remoteMediaContainer as HTMLMediaElement).removeAttribute("srcObject");
    }

  }
  function closeCall() {
    closeConnection();
    sendSignal("close", {
      src: "fzhao1",
      dest: "fzhao2",
    });
  }
  function handleTrackEvent(event) {
    const remoteMediaContainer:(HTMLMediaElement | null) = document.querySelector('video#remote');
    (remoteMediaContainer as HTMLMediaElement).srcObject = event.Streams[0];
    (remoteMediaContainer as HTMLMediaElement).volume = avState.volume/100
  }
  function handleNewICECandidateMsg(msg) {
    if (localPC) {
      localPC.addIceCandidate(new RTCIceCandidate(msg.candidate));
    }
  }
  function handleICECandidateEvent(event) {
    if (event.candidate) {
      sendSignal("candidate", {
        dest: "fzhao2",
        candidate: event.candidate
      });
    }
  }
  function handleOfferMsg(msg) {
    createPC();
    localPC.setRemoteDescription(new RTCSessionDescription(msg.sdp)).then(function () {
      if (webcamRef.current) {
        setLocalStream(webcamRef.current.stream);
      }
      return localStream;
    }).then(function(stream) {
      if (stream) {
        stream.getTracks().forEach(track => localPC.addTrack(track, stream));
      }
    }).then(function() {
      return localPC.createAnswer();
    }).then(function(answer) {
      return localPC.setLocalDescription(answer);
    }).then(function() {
      sendSignal("answer", {
        src: "fzhao1",
        dest: msg.dest,
        sdp: localPC.localDescription
      });
    });
  }
  function handleAnswerMsg(msg) {
    localPC.setRemoteDescription(new RTCSessionDescription(msg.sdp))
  }
  function handleNegotiationNeededEvent() {
    // catch err here
    localPC.createOffer().then(function(offer) {
      return localPC.setLocalDescription(offer);
    }).then(function() {
      sendSignal("offer", {
        src: "fzhao1",
        dest: "fzhao2",
        sdp: localPC.localDescription
      });
    })
  }
  const createPC: Function = () => {
    localPC = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.internetcalls.com"
        }
      ]
    })
    localPC.onicecandidate = handleICECandidateEvent;
    localPC.ontrack = handleTrackEvent;
    localPC.onnegotiationneeded = handleNegotiationNeededEvent;
    localPC.oniceconnectionstatechange = handleICEConnectionStateChangeEvent;
    localPC.onsignalingstatechange = handleSignalingStateChangeEvent;
  }

  const endSession: Function = () => {
    (connection as MediaConnection).close()
  }

  const startChatClick = () => {
    setStartChat(true)
    if(webcamRef.current){
      setLocalStream(webcamRef.current.stream)
      // catch err here
      if (localStream) {
        localStream.getTracks().forEach(track => localPC.addTrack(track, localStream));
      }
      createPC();
      // const call = peer.call('receiver', webcamRef.current.stream)
      // setConnection(call)
      // call.on('stream', remoteStream => {
      //   const remoteMediaContainer:(HTMLMediaElement | null) = document.querySelector('video#remote');
      //   (remoteMediaContainer as HTMLMediaElement).srcObject = remoteStream;
      //   (remoteMediaContainer as HTMLMediaElement).volume = avState.volume/100
      // })
      // call.on('close', () => setEndChat(true))
    }
  }

  React.useEffect(() => {
    if(localStream){
      localStream.getVideoTracks()[0].enabled = avState.video
    }
  },[avState.video, localStream])

  React.useEffect(() => {
    if(localStream){
      localStream.getAudioTracks()[0].enabled = avState.audio
    }
  },[avState.audio, localStream])

  React.useEffect(() => {
    const remoteMediaContainer:(HTMLMediaElement | null) = document.querySelector('video#remote');
    if(remoteMediaContainer) (remoteMediaContainer as HTMLMediaElement).volume = avState.volume/100;
  },[avState.volume, localStream])

  const classes = useStyles();
  if(endChat){
    return <Redirect to='/' />;
  }

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={1} />
      <Grid item className={classes.their_video} xs = {5} /*Beginning of the upper half*/>
          {
            !startChat &&
            <Button
              color="primary"
              size="large"
              variant="outlined"
              onClick={() => startChatClick()}
            >Start Chat</Button>
          }
          {
            startChat &&
            <div><video height={"inherit"} id ="remote" autoPlay></video></div>
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
          <Emotions current_phrase_count={0} />
          </Box>
      </Grid>
      
      <Grid item xs = {3} /*Beginning of the lower half*/ >
        <Card>
        <Webcam
            audio={true}
            id="local" 
            ref={webcamRef}
          />
        </Card>
      </Grid>
      <Grid item xs = {4}>
        <Card>
          <VideoControls
            className={classes.settings}
            endSession={() => endSession()}
            avState={avState}
            setAVState={setAvState}
          />
        </Card>
      </Grid>
      <Grid item xs = {5}>
        <Box className = {classes.transcription}
          border = {8}
          borderColor = "white"
          borderRadius = "0%"
        >
          <Transcription />
        </Box>
      </Grid>
    </Grid>
  ); //Replace "<Transcription />" with "<Transcript_Tests i={0} />" to run the transcription and emotion display tests

}

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

var globalThis = window
var localPC: RTCPeerConnection;
globalThis.socket = io('http://localhost:8080');
var isOfferer = false
var inNegotiation = false
var gotAnswer = false
export default function Interface()  {
  // const peer = new Peer('sender', { host: 'localhost', port: 9000, path: '/' })
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

  // var globalThis = window;
  globalThis.words = new Map();
  globalThis.display_words = Array.from( globalThis.words.keys() );
  globalThis.sentiment = Array.from( globalThis.words.values() ); 
  globalThis.point_in_transcript = 0;
  globalThis.phrase_count = 0;
  // globalThis.socket = io('http://127.0.0.1:8080', { transports : ['websocket']});
  // globalThis.socket = io('http://localhost:8080');

  // globalThis.socket.on("close", closeCall);
  // globalThis.socket.on("candidate", handleNewICECandidateMsg);
  // globalThis.socket.on("offer", handleOfferMsg);
  // globalThis.socket.on("answer", handleAnswerMsg);
  
  // function createSocket() {
  //   globalThis.socket = io('http://localhost:8080');

    globalThis.socket.on("close", closeCall);
    globalThis.socket.on("candidate", handleNewICECandidateMsg);
    globalThis.socket.on("offer", handleOfferMsg);
    globalThis.socket.on("answer", handleAnswerMsg);

  // }
  function sendSignal(type: String, msg: any) {
    var msgJSON = JSON.stringify(msg);
    console.log("send type: " + type + " msg: " + msgJSON)
    globalThis.socket.emit(type, msgJSON)
  }
  function handleSignalingStateChangeEvent(event: any) {
    console.log("handle signal state change")
    inNegotiation = (localPC.signalingState !== "stable");
    console.log(inNegotiation)
    switch(localPC.signalingState) {
      case "closed":
        closeCall();
        break;
    }
  }
  function handleICEConnectionStateChangeEvent(event: any) {
    console.log("handle connection state change")
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
      if (remoteMediaContainer) {
        ((remoteMediaContainer as HTMLMediaElement).srcObject as MediaStream).getTracks().forEach(track => track.stop());
        (remoteMediaContainer as HTMLMediaElement).removeAttribute("src");
        (remoteMediaContainer as HTMLMediaElement).removeAttribute("srcObject");
      }
    }

  }
  function closeCall() {
    closeConnection();
    sendSignal("close", {
      src: "fzhao1",
      dest: "fzhao2",
    });
  }
  function handleTrackEvent(event: any) {
    console.log("handle received track")
    const remoteMediaContainer:(HTMLMediaElement | null) = document.querySelector('video#remote');
    if (remoteMediaContainer) {
      console.log("remote available");
      (remoteMediaContainer as HTMLMediaElement).srcObject = event.streams[0];
      (remoteMediaContainer as HTMLMediaElement).volume = avState.volume/100
    }
  }
  async function handleNewICECandidateMsg(msg: any) {
    var obj = JSON.parse(msg)
    if (obj.dest === isOfferer) {
      console.log("handle new candidate")
      if (localPC) {
        try {
          await localPC.addIceCandidate(new RTCIceCandidate(obj.candidate));
          console.log("NEW CANDIDATE: " + msg)
        } catch(err) {}
      }

    }
  }
  function handleICECandidateEvent(event: any) {
    if (event.candidate) {
      console.log("handle candidate")
      sendSignal("candidate", {
        dest: !isOfferer,
        candidate: event.candidate
      });
    }
  }
  async function handleOfferMsg(msg: any) {
    var obj = JSON.parse(msg)
    if (!isOfferer) {
      setStartChat(true)
      console.log("handle offer")
      createPC();
      await localPC.setRemoteDescription(new RTCSessionDescription(obj.sdp)).then(function () {
        if (webcamRef.current) {
          setLocalStream(webcamRef.current.stream);
          return webcamRef.current.stream;
        }
        return localStream
      }).then(function(stream) {
        if (stream) {
          try {
            stream.getTracks().forEach(track => localPC.addTrack(track, stream))
          } catch(err) {}
        }
      }).then(function() {
        return localPC.createAnswer();
      }).then(function(answer) {
        return localPC.setLocalDescription(answer);
      }).then(function() {
        sendSignal("answer", {
          src: "fzhao1",
          dest: obj.dest,
          sdp: localPC.localDescription
        });
      });
    }
  }
  async function handleAnswerMsg(msg: any) {
    var obj = JSON.parse(msg)
    if (isOfferer) {
      console.log("handle answer")
      if (gotAnswer) {
        console.log("SKIP handle answer")
        return
      }
      gotAnswer = true
      await localPC.setRemoteDescription(new RTCSessionDescription(obj.sdp))
    }
  }
  function handleNegotiationNeededEvent() {
    console.log("handle negotiation")
    // catch err here
    if (inNegotiation) {
      console.log("SKIP negotiation")
      return
    }
    inNegotiation = true
    gotAnswer = false
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
  function createPC() {
    console.log("create rtc peer connection")
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
    // (connection as MediaConnection).close()
    console.log("end session")
    closeCall();
  }

  // createSocket()
  const startChatClick = () => {
    setStartChat(true)
    // createSocket()
    if(webcamRef.current){
      console.log("started chat")
      isOfferer = true
      setLocalStream(webcamRef.current.stream)
      createPC();
      // catch err here
      if (webcamRef.current.stream) {
        console.log("add tracks")
        webcamRef.current.stream.getTracks().forEach(track => {
          if (webcamRef.current && webcamRef.current.stream) {
            localPC.addTrack(track, webcamRef.current.stream);
          }
        })
      }
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

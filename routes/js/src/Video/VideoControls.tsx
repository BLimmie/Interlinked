import React from 'react';
import { Button, IconButton, Slider, Box} from '@material-ui/core' 
import { Link } from 'react-router-dom'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Grid  } from '@material-ui/core/'
import {VideocamOffOutlined, MicOffOutlined, VolumeUpOutlined, VolumeOffOutlined, MicOutlined, VideocamOutlined} from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon:{
      color: theme.palette.background.default,
      fontSize:80
    },
    padding:{
      paddingLeft: '4px'
    },
    widthHundred: {
      width: '100%'
    }
  })
)
export interface avStateInterface {
  audio: boolean,
  video: boolean,
  volume: number
}

export const defaultAVState: avStateInterface = {
  audio: true,
  video: true,
  volume: 50
}

interface VideoControlsProps extends React.HTMLAttributes<HTMLElement>  {
  endSession: Function,
  avState: avStateInterface,
  setAVState:  React.Dispatch<React.SetStateAction<avStateInterface>>
}
// This function is what arranges all of the individual elements into the complete UI
export default function VideoControls(props:VideoControlsProps)  {
  const {className, avState, setAVState, endSession} = props

  const classes = useStyles();

  const onVolumeChange = (event:any, newValue: number | number[]) => {
    setAVState({
      volume: newValue as number,
      audio: avState.audio,
      video: avState.video
    })
  }

  const setVolume = (value: number) => {
    setAVState({
      volume: value,
      audio: avState.audio,
      video: avState.video
    })
  }

  const setVidFeed = (on: boolean) => {
    setAVState({
      volume: avState.volume,
      audio: avState.audio,
      video: on
    })
  }
  const setMic = (on: boolean) => {
    setAVState({
      volume: avState.volume,
      audio: on,
      video: avState.video
    })
  }

  return (
      <Grid container className={className} >
        <Grid item xs={3} >
          { avState.audio &&
            <IconButton className={classes.padding} onClick={() => setMic(false)} >
              <MicOffOutlined className={classes.icon}/>
            </IconButton>
          }
          { avState.audio === false &&
            <IconButton className={classes.padding} onClick={() => setMic(true)} >
              <MicOutlined className={classes.icon}/>
            </IconButton>
          }
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={5}>
          <Box
            border = {8}
            borderColor = "white"
            borderRadius = "0%"
          >
            <Link to={{
              pathname:'/'
            }}>
              <Button
                className={classes.widthHundred}
                color="primary"
                size="large"
                variant="outlined"
                onClick={() => endSession()}
              >End Session</Button>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={3} >
            { avState.video &&
            <IconButton
              className={classes.padding}
              onClick={() => setVidFeed(false)}
            >
              <VideocamOffOutlined className={classes.icon} />
            </IconButton>
            }
            { avState.video === false &&
              <IconButton
                className={classes.padding}
                onClick={() => setVidFeed(true)}
              >
                <VideocamOutlined className={classes.icon}/>
              </IconButton>
            }
        </Grid>
        <Grid item xs={2} >
          { avState.volume > 0 &&
            <IconButton onClick={() => setVolume(0)} >
              <VolumeUpOutlined className={classes.icon}/>
            </IconButton>
          }
          { avState.volume === 0 &&
            <IconButton onClick={() => setVolume(30)} >
              <VolumeOffOutlined className={classes.icon}/>
            </IconButton>
          }
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={5}>
          <Slider
            value={avState.volume}
            style={{width:"230px"}}
            onChange={onVolumeChange}
          />
        </Grid>
      </Grid>
  )
}
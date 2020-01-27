import React from 'react';
import { IconButton, Box} from '@material-ui/core'
import { Link } from 'react-router-dom'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Grid  } from '@material-ui/core/'
import {VideocamOffSharp, MicOffSharp, CallEndSharp, MicSharp, VideocamSharp} from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon_on:{
      color: theme.palette.primary.main,
      fontSize:45
    },
    icon_off:{
      color: theme.palette.background.default,
      fontSize:45
    },
    button_box: {
      width: "5vw",
      height: "7vh"
    },
    padding:{
      paddingLeft: '15px'
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
  const {avState, setAVState, endSession} = props

  const classes = useStyles();

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
    <Grid
      container
      spacing={2}
      direction='row'
      alignItems='flex-start'
      justify='flex-start'
    >
        <Grid item >
          { avState.audio &&
            <Box className={classes.button_box} bgcolor="#6e6b7a" justifyContent="center">
              <IconButton className={classes.padding} onClick={() => setMic(false)} >
                <MicOffSharp
                  data-testid={"mic-off-icon"}
                  className={classes.icon_off}
                />
              </IconButton>
            </Box>
          }
          { avState.audio === false &&
            <Box className={classes.button_box} bgcolor="#c7c6ce">
              <IconButton className={classes.padding} onClick={() => setMic(true)} >
                <MicSharp
                  data-testid={"mic-on-icon"}
                  className={classes.icon_on}
                />
              </IconButton>
            </Box>
          }
        </Grid>

        <Grid item>
            { avState.video === false &&
              <Box className={classes.button_box} bgcolor="#6e6b7a">
                <IconButton
                  className={classes.padding}
                  onClick={() => setVidFeed(true)}
                >
                  <VideocamOffSharp
                    data-testid={"videocam-off-icon"}
                    className={classes.icon_off}
                  />
                </IconButton>
              </Box>
            }
            { avState.video &&
              <Box className={classes.button_box} bgcolor="#c7c6ce">
                <IconButton
                  className={classes.padding}
                  onClick={() => setVidFeed(false)}
                >
                  <VideocamSharp
                    data-testid={"videocam-on-icon"}
                    className={classes.icon_on}
                  />
                </IconButton>
              </Box>
            }
        </Grid>

        <Grid item>
          <Box className={classes.button_box} bgcolor="#d26363">
            <Link to={{
              pathname:'/'
            }}>
              <IconButton
                className={classes.padding}
                onClick={() => endSession()}
              >
                <CallEndSharp
                  data-testid={"call-end-icon"}
                  className={classes.icon_off}
                />
              </IconButton>
            </Link>
          </Box>
        </Grid>
    </Grid>
  )
}

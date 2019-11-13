import React from 'react';
import { Button, IconButton, Slider, Box} from '@material-ui/core' 

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Grid  } from '@material-ui/core/'
import {VideocamOffOutlined, MicOffOutlined, VolumeUpOutlined} from '@material-ui/icons'

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

interface VideoControlsProps extends React.HTMLAttributes<HTMLElement>  {}
// This function is what arranges all of the individual elements into the complete UI
export default function VideoControls(props:VideoControlsProps)  {
  const [volume, setVolume] = React.useState<number>(30)
  const {className} = props

  const classes = useStyles();

  const onVolumeChange = (event:any, newValue: number | number[]) => {
    setVolume(newValue as number)
  }

  return (
      <Grid container className={className} >
        <Grid item xs={4} />
        <Grid item xs={4}>
          <Box
            border = {8}
            borderColor = "white"
            borderRadius = "0%"
          >
            <Button
              className={classes.widthHundred}
              color="primary"
              size="large"
              variant="outlined"
            >End Session</Button>
          </Box>
        </Grid>
        <Grid item xs={4} />
        <Grid item xs={2} >
          <Box
            border = {8}
            borderColor = "white"
            borderRadius = "0%"
          >
            <IconButton className={classes.padding}>
              <VideocamOffOutlined className={classes.icon} />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={2} >
          <Box
            border = {8}
            borderColor = "white"
            borderRadius = "0%"
          >
            <IconButton className={classes.padding}>
              <MicOffOutlined className={classes.icon} />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={7} >
          <IconButton >
            <VolumeUpOutlined className={classes.icon}/>
          </IconButton>
          <Slider
            value={volume}
            style={{width:"230px"}}
            onChange={onVolumeChange}
          />
        </Grid>
      </Grid>
  )
}
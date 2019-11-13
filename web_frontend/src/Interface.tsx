import React from 'react';
import { Button} from '@material-ui/core' 

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Emotions from "./Emotions";
import Transcription from './Transcription';

import RemoteVideo from './Video/RemoteVideo';
import LocalVideo from './Video/LocalVideo';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      background: '#16001f'
    },
    speech: {
      height: "30vh",
      width: "38vw",
    },
    control: {
      padding: theme.spacing(2),
    },
    their_video: {
      height: "53vh",
      width: "55vw",
    },
    my_video: {
      height: "30vh",
      width: "22vw",
    },
    settings: {
      height: "30vh",
      width: "32vw",
    },
    emotions: {
      height: "54vh",
      width: "38vw",
    },
  }),
);

export type StateInterface = {
  state:string
}


interface InterfaceProps  {
  location: StateInterface
}


// This function is what arranges all of the individual elements into the complete UI
export default function Interface(props:InterfaceProps)  {
  //Get Twilio token passed through url location state
  const token = props.location.state

  globalThis.words = new Map();
  globalThis.display_words = Array.from( globalThis.words.keys() );
  globalThis.sentiment = Array.from( globalThis.words.values() ); 
  globalThis.point_in_transcript = 0;
  globalThis.phrase_count = 0;

  const [spacing, setSpacing] = React.useState<GridSpacing>(2);
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpacing(Number((event.target as HTMLInputElement).value) as GridSpacing);
  };


  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs = {7} /*Beginning of the upper half*/>
        <Grid container justify = "center" spacing={spacing}>
            <Card>
              <RemoteVideo token={token}/>
            </Card>
        </Grid>
      </Grid>
      <Grid item xs = {5}>
        <Grid container justify = "center" spacing ={spacing}>
          <Box className = {classes.emotions}
            my = {4}
            border = {8}
            borderColor = "white"
            borderRadius = "0%"

            // Inside this box is where the emotion display will be
          >
            <Emotions />
          </Box>
        </Grid>
      </Grid>
      
      <Grid item xs = {3} /*Beginning of the lower half*/ >
        <Grid container justify = "center" spacing = {10}>
          <Card>
              <LocalVideo />
          </Card>
        </Grid>
      </Grid>
      <Grid item xs = {4}>
        <Grid container justify = "center" spacing = {10}>
          <Card>

              <Button
                variant="contained"
                color="secondary"
              >Exit</Button>
          </Card>
        </Grid>
      </Grid>
      <Grid item xs = {5}>
        <Grid container justify = "center" spacing ={10}>
          <Box className = {classes.speech}
            my = {4}
            border = {8}
            borderColor = "white"
            borderRadius = "0%"

            // Inside this box is where the audio transcription is
          >
            <Transcription />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );

}

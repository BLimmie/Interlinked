import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { sizing } from '@material-ui/system';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Speech from './Transcription';
import Patient from './patient.jpg';
import Doc from './doc.jpg';
import Settings from './settings.png';
import Emotions from "./Emotions";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
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





globalThis.point_in_transcript = 0;
globalThis.phrase_count = 0;

// This function is what arranges all of the individual elements into the complete UI
export default function App() {

  // The idea is, the entire transcript is stored in some other Map or vector or whatever
  // Then, the "display_words" structure has a limited amount of transcriptions
  // so the box isn't overloaded
  // This "display_words" structure has things added and removed one at a time
  // Everything in "display_words" is in the display box
  globalThis.display_words = Array.from( globalThis.words.keys() );
  globalThis.sentiment = Array.from( globalThis.words.values() );

  if (globalThis.display_words.length > globalThis.phrase_count) {
    globalThis.phrase_count = globalThis.display_words.length;
  }

  // This is only supposed to be called when the program first starts and when a new phrase is added to "words"
  if (globalThis.point_in_transcript + 3 < globalThis.phrase_count) {
    globalThis.point_in_transcript++;
  }


  const [spacing, setSpacing] = React.useState<GridSpacing>(2);
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpacing(Number((event.target as HTMLInputElement).value) as GridSpacing);
  };

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs = {7} /*Beginning of the upper half*/>
        <Grid container justify = "center" spacing ={spacing}>

            <Card>
              <CardMedia // Replacing this image is where the patient's video feed will go
                className={classes.their_video}
                src={Patient}
                component="img"
              />
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
              <CardMedia // Replacing this image is where the doctor's video feed will go
                className={classes.my_video}
                src={Doc}
                component="img"
              />
          </Card>
        </Grid>
      </Grid>
      <Grid item xs = {4}>
        <Grid container justify = "center" spacing = {10}>
          <Card>
              <CardMedia // Replacing this image is where the various settings and buttons will go
                className={classes.settings}
                src={Settings}
                component="img"
              />
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
            <Speech />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );

}

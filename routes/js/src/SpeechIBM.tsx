import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

// This is just some stub code in case we switch to IBM for text sentiment analysis
// Not to be used yet

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    neutral: {
      color: "#0bfc03",
    },
    joy: {
      color: "#0bfc03",
    },
    sadness: {
      color: "#0bfc03",
    },
    anger: {
      color: "#0bfc03",
    },
    fear: {
      color: "#0bfc03",
    },
  }),
);

// neutral: 0
// joy: 1
// sadness: 2
// anger: 3
// fear: 4
// These are the emotions that IBM Tone Analyzer gives


function Neutral0() {
  const classes = useStyles();

    return (
      <Typography className={classes.neutral} variant="body1" align="left" gutterBottom>
        {"> " + display_words[globalThis.point_in_transcript]}
        {" "}
      </Typography>
    );
  }
  
function Neutral1() {
    const classes = useStyles();
  
      return (
        <Typography className={classes.neutral} variant="body1" align="left" gutterBottom>
          {"> " + display_words[globalThis.point_in_transcript + 1]}
          {" "}
        </Typography>
      );
    }

function Neutral2() {
  const classes = useStyles();

    return (
      <Typography className={classes.neutral} variant="body1" align="left" gutterBottom>
        {"> " + display_words[globalThis.point_in_transcript + 2]}
        {" "}
      </Typography>
    );
  }
  
  
export default function Speech() {
    
    if (globalThis.phrase_count === 0) {
      return (
        <Typography variant="body1" color="error" align="left" gutterBottom>
          {""}
        </Typography>
      );
    }
  
    if (globalThis.phrase_count === 1) {
      if (sentiment[globalThis.point_in_transcript] === 0) {
        return (
          <Container maxWidth="sm">
            <Neutral0 />
          </Container>
        );
      }
  
      if (sentiment[globalThis.point_in_transcript] === 1) {
      }
  
      if (sentiment[globalThis.point_in_transcript] === 2) {
      }

      if (sentiment[globalThis.point_in_transcript] === 3) {
      }
  
      if (sentiment[globalThis.point_in_transcript] === 4) {
      }
  
      else {
        return (
          <Container maxWidth="sm">
            <Neutral0 />
          </Container>
        );
      }
    }
  
    if (globalThis.phrase_count === 2) {
      if (sentiment[globalThis.point_in_transcript] === 0) {
        if (sentiment[globalThis.point_in_transcript + 1] === 0) {
          return (
            <Container maxWidth="sm">
              <Neutral0 />
              <Neutral1 />
            </Container>
          );
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 1) {
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 2) {
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 3) {
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 4) {
        }

        else {
          //Should never happen
          return (
            <Container maxWidth="sm">
              <Neutral0 />
              <Neutral1 />
            </Container>
          );
        }
      }

      if (sentiment[globalThis.point_in_transcript] === 1) { 
        if (sentiment[globalThis.point_in_transcript + 1] === 0) {
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 1) {
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 2) {
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 3) {
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 4) {
        }

        else {
          //Should never happen
          return (
            <Container maxWidth="sm">
              <Neutral0 />
              <Neutral1 />
            </Container>
          );
        }
      }

      if (sentiment[globalThis.point_in_transcript] === 2) { 
        if (sentiment[globalThis.point_in_transcript + 1] === 0) {
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 1) {
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 2) {
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 3) {
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 4) {
        }

        else {
          //Should never happen
          return (
            <Container maxWidth="sm">
              <Neutral0 />
              <Neutral1 />
            </Container>
          );
        }
      }

      if (sentiment[globalThis.point_in_transcript] === 3) { 
        if (sentiment[globalThis.point_in_transcript + 1] === 0) {
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 1) {
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 2) {
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 3) {
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 4) {
        }

        else {
          //Should never happen
          return (
            <Container maxWidth="sm">
              <Neutral0 />
              <Neutral1 />
            </Container>
          );
        }
      }

      if (sentiment[globalThis.point_in_transcript] === 4) { 
        if (sentiment[globalThis.point_in_transcript + 1] === 0) {
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 1) {
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 2) {
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 3) {
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 4) {
        }

        else {
          //Should never happen
          return (
            <Container maxWidth="sm">
              <Neutral0 />
              <Neutral1 />
            </Container>
          );
        }
      }

      else {
        return (
          <Container maxWidth="sm">
            <Neutral0 />
            <Neutral1 />
          </Container>
        );
      }
    }
  
  
    if (globalThis.phrase_count > 2) {
      if (sentiment[globalThis.point_in_transcript] === 0) { 
        if (sentiment[globalThis.point_in_transcript + 1] === 0) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
            return (
              <Container maxWidth="sm">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 3) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 4) {
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="sm">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 1) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 3) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 4) {
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="sm">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 2) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 3) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 4) {
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="sm">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 3) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 3) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 4) {
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="sm">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 4) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 3) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 4) {
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="sm">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        else {
          //Should never happen
          return (
            <Container maxWidth="sm">
              <Neutral0 />
              <Neutral1 />
              <Neutral2 />
            </Container>
          );
        }
      }


      if (sentiment[globalThis.point_in_transcript] === 1) { 
        if (sentiment[globalThis.point_in_transcript + 1] === 0) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 3) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 4) {
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="sm">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 1) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 3) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 4) {
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="sm">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 2) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 3) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 4) {
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="sm">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 3) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 3) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 4) {
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="sm">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 4) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 3) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 4) {
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="sm">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        else {
          //Should never happen
          return (
            <Container maxWidth="sm">
              <Neutral0 />
              <Neutral1 />
              <Neutral2 />
            </Container>
          );
        }
      }

      
      if (sentiment[globalThis.point_in_transcript] === 2) { 
        if (sentiment[globalThis.point_in_transcript + 1] === 0) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 3) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 4) {
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="sm">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 1) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 3) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 4) {
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="sm">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 2) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 3) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 4) {
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="sm">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 3) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 3) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 4) {
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="sm">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 4) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 3) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 4) {
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="sm">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        else {
          //Should never happen
          return (
            <Container maxWidth="sm">
              <Neutral0 />
              <Neutral1 />
              <Neutral2 />
            </Container>
          );
        }
      }

      
      if (sentiment[globalThis.point_in_transcript] === 3) { 
        if (sentiment[globalThis.point_in_transcript + 1] === 0) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 3) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 4) {
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="sm">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 1) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 3) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 4) {
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="sm">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 2) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 3) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 4) {
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="sm">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 3) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 3) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 4) {
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="sm">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 4) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 3) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 4) {
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="sm">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        else {
          //Should never happen
          return (
            <Container maxWidth="sm">
              <Neutral0 />
              <Neutral1 />
              <Neutral2 />
            </Container>
          );
        }
      }

      
      if (sentiment[globalThis.point_in_transcript] === 4) { 
        if (sentiment[globalThis.point_in_transcript + 1] === 0) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 3) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 4) {
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="sm">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 1) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 3) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 4) {
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="sm">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 2) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 3) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 4) {
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="sm">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 3) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 3) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 4) {
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="sm">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 4) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 3) {
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 4) {
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="sm">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        else {
          //Should never happen
          return (
            <Container maxWidth="sm">
              <Neutral0 />
              <Neutral1 />
              <Neutral2 />
            </Container>
          );
        }
      }
  
      // No sentiment labels
      else {
        return (
          <Container maxWidth="sm">
            <Neutral0 />
            <Neutral1 />
            <Neutral2 />
          </Container>
        );
      }
    }
  
    else {
      // Should not happen
      return (
        <Typography variant="body1" color="primary" align="left" gutterBottom>
          {"error with phrase_count"}
        </Typography>
      );
    }
  }
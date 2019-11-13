import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

// 0: none
// 1: happiness (yellow)
// 2: sadness (blue)
// 3: anger (red)
// 4: fear (purple)
// 5: disgust (green)
// 6: surprise (orange)
// Google only gives positive or negative, but can be narrowed down to one of
// 3 choices by analyzing owrds present (definitions mostly)
// Like, "dying" would probably be sad, and "not dying" would be happy
// Maybe later, just do 0 (none, primary) 1 (positive, secondary) 2 (negative, error) for now


function Neutral0() {
    return (
      <Typography variant="body1" color="primary" align="left" gutterBottom>
        {"> " + display_words[globalThis.point_in_transcript]}
        {" "}
      </Typography>
    );
  }
  
  function Neutral1() {
    return (
      <Typography variant="body1" color="primary" align="left" gutterBottom>
        {"> " + display_words[globalThis.point_in_transcript + 1]}
        {" "}
      </Typography>
    );
  }
  
  function Neutral2() {
    return (
      <Typography variant="body1" color="primary" align="left" gutterBottom>
        {"> " + display_words[globalThis.point_in_transcript + 2]}
      </Typography>
    );
  }
  
  function Positive0() {
    return (
      <Typography variant="body1" color="secondary" align="left" gutterBottom>
        {"> " + display_words[globalThis.point_in_transcript]}
        {" "}
      </Typography>
    );
  }
  
  function Positive1() {
    return (
      <Typography variant="body1" color="secondary" align="left" gutterBottom>
        {"> " + display_words[globalThis.point_in_transcript + 1]}
        {" "}
      </Typography>
    );
  }
  
  function Positive2() {
    return (
      <Typography variant="body1" color="secondary" align="left" gutterBottom>
        {"> " + display_words[globalThis.point_in_transcript + 2]}
      </Typography>
    );
  }
  
  
  function Negative0() {
    return (
      <Typography variant="body1" color="error" align="left" gutterBottom>
        {"> " + display_words[globalThis.point_in_transcript]}
        {" "}
      </Typography>
    );
  }
  
  function Negative1() {
    return (
      <Typography variant="body1" color="error" align="left" gutterBottom>
        {"> " + display_words[globalThis.point_in_transcript + 1]}
        {" "}
      </Typography>
    );
  }
  
  function Negative2() {
    return (
      <Typography variant="body1" color="error" align="left" gutterBottom>
        {"> " + display_words[globalThis.point_in_transcript + 2]}
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
        return (
          <Container maxWidth="sm">
            <Positive0 />
          </Container>
        );
      }
  
      if (sentiment[globalThis.point_in_transcript] === 2) {
        return (
          <Container maxWidth="sm">
            <Negative0 />
          </Container>
        );
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
          return (
            <Container maxWidth="sm">
              <Neutral0 />
              <Positive1 />
            </Container>
          );
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 2) {
          return (
            <Container maxWidth="sm">
              <Neutral0 />
              <Negative1 />
            </Container>
          );
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
          return (
            <Container maxWidth="sm">
              <Positive0 />
              <Neutral1 />
            </Container>
          );
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 1) {
          return (
            <Container maxWidth="sm">
              <Positive0 />
              <Positive1 />
            </Container>
          );
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 2) {
          return (
            <Container maxWidth="sm">
              <Positive0 />
              <Negative1 />
            </Container>
          );
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
          return (
            <Container maxWidth="sm">
              <Negative0 />
              <Neutral1 />
            </Container>
          );
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 1) {
          return (
            <Container maxWidth="sm">
              <Negative0 />
              <Positive1 />
            </Container>
          );
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 2) {
          return (
            <Container maxWidth="sm">
              <Negative0 />
              <Negative1 />
            </Container>
          );
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
            return (
              <Container maxWidth="sm">
                <Neutral0 />
                <Neutral1 />
                <Positive2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="sm">
                <Neutral0 />
                <Neutral1 />
                <Negative2 />
              </Container>
            );
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
            return (
              <Container maxWidth="sm">
                <Neutral0 />
                <Positive1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="sm">
                <Neutral0 />
                <Positive1 />
                <Positive2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="sm">
                <Neutral0 />
                <Positive1 />
                <Negative2 />
              </Container>
            );
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
            return (
              <Container maxWidth="sm">
                <Neutral0 />
                <Negative1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="sm">
                <Neutral0 />
                <Negative1 />
                <Positive2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="sm">
                <Neutral0 />
                <Negative1 />
                <Negative2 />
              </Container>
            );
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
      // First 9 done

      if (sentiment[globalThis.point_in_transcript] === 1) { 
        if (sentiment[globalThis.point_in_transcript + 1] === 0) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
            return (
              <Container maxWidth="sm">
                <Positive0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="sm">
                <Positive0 />
                <Neutral1 />
                <Positive2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="sm">
                <Positive0 />
                <Neutral1 />
                <Negative2 />
              </Container>
            );
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
            return (
              <Container maxWidth="sm">
                <Positive0 />
                <Positive1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="sm">
                <Positive0 />
                <Positive1 />
                <Positive2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="sm">
                <Positive0 />
                <Positive1 />
                <Negative2 />
              </Container>
            );
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
            return (
              <Container maxWidth="sm">
                <Positive0 />
                <Negative1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="sm">
                <Positive0 />
                <Negative1 />
                <Positive2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="sm">
                <Positive0 />
                <Negative1 />
                <Negative2 />
              </Container>
            );
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
      // Second 9 done

      if (sentiment[globalThis.point_in_transcript] === 2) { 
        if (sentiment[globalThis.point_in_transcript + 1] === 0) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
            return (
              <Container maxWidth="sm">
                <Negative0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="sm">
                <Negative0 />
                <Neutral1 />
                <Positive2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="sm">
                <Negative0 />
                <Neutral1 />
                <Negative2 />
              </Container>
            );
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
            return (
              <Container maxWidth="sm">
                <Negative0 />
                <Positive1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="sm">
                <Negative0 />
                <Positive1 />
                <Positive2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="sm">
                <Negative0 />
                <Positive1 />
                <Negative2 />
              </Container>
            );
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
            return (
              <Container maxWidth="sm">
                <Negative0 />
                <Negative1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="sm">
                <Negative0 />
                <Negative1 />
                <Positive2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="sm">
                <Negative0 />
                <Negative1 />
                <Negative2 />
              </Container>
            );
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
      // Last 9 done
  
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
import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider, createMuiTheme } from '@material-ui/core'

const positive_theme = createMuiTheme({
  palette: {
    primary: {
      main: '#747450',
    },
    secondary: {
      main: '#949547'
    },
    error: {
      main: '#b9bb3b'
    }
  },
  typography: {
    fontSize: 18,
  }
});

const negative_theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6c6a95',
    },
    secondary: {
      main: '#6a69ab'
    },
    error: {
      main: '#6868c6'
    }
  },
  typography: {
    fontSize: 18,
  }
});



// 0: neutral (-0.1, 0, 0.1) (primary, default theme)

// 1: slightly positive (0.2, 0.3, 0.4) (primary, positive theme)
// 11: positive (0.5, 0.6, 0.7) (secondary, positive theme)
// 111: very positive (0.8, 0.9, 1) (error, positive theme)

// 2: slightly negative (-0.2, -0.3, -0.4) (primary, negative theme)
// 22: negative (-0.5, -0.6, -0.7) (secondary, negative theme)
// 222: very negative (-0.8, -0.9, -1) (error, negative theme)



var globalThis = window
function Neutral0() {
    return (
      <Typography variant="body1" color="primary" align="left" gutterBottom>
        {"■ " + display_words[globalThis.point_in_transcript]}
        {" "}
      </Typography>
    );
  }
  
  function Neutral1() {
    return (
      <Typography variant="body1" color="primary" align="left" gutterBottom>
        {"■ " + display_words[globalThis.point_in_transcript + 1]}
        {" "}
      </Typography>
    );
  }
  
  function Neutral2() {
    return (
      <Typography variant="body1" color="primary" align="left" gutterBottom>
        {"■ " + display_words[globalThis.point_in_transcript + 2]}
      </Typography>
    );
  }
  
  function PositiveS0() {
    return (
      <ThemeProvider theme={positive_theme}>
        <Typography variant="body1" color="primary" align="left" gutterBottom>
          {"■ " + display_words[globalThis.point_in_transcript]}
          {" "}
        </Typography>
      </ThemeProvider>
    );
  }
  
  function PositiveS1() {
    return (
      <ThemeProvider theme={positive_theme}>
        <Typography variant="body1" color="primary" align="left" gutterBottom>
          {"■ " + display_words[globalThis.point_in_transcript + 1]}
          {" "}
        </Typography>
      </ThemeProvider>
    );
  }
  
  function PositiveS2() {
    return (
      <ThemeProvider theme={positive_theme}>
        <Typography variant="body1" color="primary" align="left" gutterBottom>
          {"■ " + display_words[globalThis.point_in_transcript + 2]}
          {" "}
        </Typography>
      </ThemeProvider>
    );
  }

  function PositiveM0() {
    return (
      <ThemeProvider theme={positive_theme}>
        <Typography variant="body1" color="secondary" align="left" gutterBottom>
          {"■ " + display_words[globalThis.point_in_transcript]}
          {" "}
        </Typography>
      </ThemeProvider>
    );
  }
  
  function PositiveM1() {
    return (
      <ThemeProvider theme={positive_theme}>
        <Typography variant="body1" color="secondary" align="left" gutterBottom>
          {"■ " + display_words[globalThis.point_in_transcript + 1]}
          {" "}
        </Typography>
      </ThemeProvider>
    );
  }
  
  function PositiveM2() {
    return (
      <ThemeProvider theme={positive_theme}>
        <Typography variant="body1" color="secondary" align="left" gutterBottom>
          {"■ " + display_words[globalThis.point_in_transcript + 2]}
          {" "}
        </Typography>
      </ThemeProvider>
    );
  }

  function PositiveV0() {
    return (
      <ThemeProvider theme={positive_theme}>
        <Typography variant="body1" color="error" align="left" gutterBottom>
          {"■ " + display_words[globalThis.point_in_transcript]}
          {" "}
        </Typography>
      </ThemeProvider>
    );
  }
  
  function PositiveV1() {
    return (
      <ThemeProvider theme={positive_theme}>
        <Typography variant="body1" color="error" align="left" gutterBottom>
          {"■ " + display_words[globalThis.point_in_transcript + 1]}
          {" "}
        </Typography>
      </ThemeProvider>
    );
  }
  
  function PositiveV2() {
    return (
      <ThemeProvider theme={positive_theme}>
        <Typography variant="body1" color="error" align="left" gutterBottom>
          {"■ " + display_words[globalThis.point_in_transcript + 2]}
          {" "}
        </Typography>
      </ThemeProvider>
    );
  }
  
  function NegativeS0() {
    return (
      <ThemeProvider theme={negative_theme}>
        <Typography variant="body1" color="primary" align="left" gutterBottom>
          {"■ " + display_words[globalThis.point_in_transcript]}
          {" "}
        </Typography>
      </ThemeProvider>
    );
  }
  
  function NegativeS1() {
    return (
      <ThemeProvider theme={negative_theme}>
        <Typography variant="body1" color="primary" align="left" gutterBottom>
          {"■ " + display_words[globalThis.point_in_transcript + 1]}
          {" "}
        </Typography>
      </ThemeProvider>
    );
  }
  
  function NegativeS2() {
    return (
      <ThemeProvider theme={negative_theme}>
        <Typography variant="body1" color="primary" align="left" gutterBottom>
          {"■ " + display_words[globalThis.point_in_transcript + 2]}
          {" "}
        </Typography>
      </ThemeProvider>
    );
  }

  function NegativeM0() {
    return (
      <ThemeProvider theme={negative_theme}>
        <Typography variant="body1" color="secondary" align="left" gutterBottom>
          {"■ " + display_words[globalThis.point_in_transcript]}
          {" "}
        </Typography>
      </ThemeProvider>
    );
  }
  
  function NegativeM1() {
    return (
      <ThemeProvider theme={negative_theme}>
        <Typography variant="body1" color="secondary" align="left" gutterBottom>
          {"■ " + display_words[globalThis.point_in_transcript + 1]}
          {" "}
        </Typography>
      </ThemeProvider>
    );
  }
  
  function NegativeM2() {
    return (
      <ThemeProvider theme={negative_theme}>
        <Typography variant="body1" color="secondary" align="left" gutterBottom>
          {"■ " + display_words[globalThis.point_in_transcript + 2]}
          {" "}
        </Typography>
      </ThemeProvider>
    );
  }

  function NegativeV0() {
    return (
      <ThemeProvider theme={negative_theme}>
        <Typography variant="body1" color="error" align="left" gutterBottom>
          {"■ " + display_words[globalThis.point_in_transcript]}
          {" "}
        </Typography>
      </ThemeProvider>
    );
  }
  
  function NegativeV1() {
    return (
      <ThemeProvider theme={negative_theme}>
        <Typography variant="body1" color="error" align="left" gutterBottom>
          {"■ " + display_words[globalThis.point_in_transcript + 1]}
          {" "}
        </Typography>
      </ThemeProvider>
    );
  }
  
  function NegativeV2() {
    return (
      <ThemeProvider theme={negative_theme}>
        <Typography variant="body1" color="error" align="left" gutterBottom>
          {"■ " + display_words[globalThis.point_in_transcript + 2]}
          {" "}
        </Typography>
      </ThemeProvider>
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
          <Container maxWidth="lg">
            <Neutral0 />
          </Container>
        );
      }
  
      if (sentiment[globalThis.point_in_transcript] === 1) {
        return (
          <Container maxWidth="lg">
            <PositiveS0 />
          </Container>
        );
      }

      if (sentiment[globalThis.point_in_transcript] === 11) {
        return (
          <Container maxWidth="lg">
            <PositiveM0 />
          </Container>
        );
      }

      if (sentiment[globalThis.point_in_transcript] === 111) {
        return (
          <Container maxWidth="lg">
            <PositiveV0 />
          </Container>
        );
      }
  
      if (sentiment[globalThis.point_in_transcript] === 2) {
        return (
          <Container maxWidth="lg">
            <NegativeS0 />
          </Container>
        );
      }

      if (sentiment[globalThis.point_in_transcript] === 22) {
        return (
          <Container maxWidth="lg">
            <NegativeM0 />
          </Container>
        );
      }

      if (sentiment[globalThis.point_in_transcript] === 222) {
        return (
          <Container maxWidth="lg">
            <NegativeV0 />
          </Container>
        );
      }
  
      else {
        return (
          <Container maxWidth="lg">
            <Neutral0 />
          </Container>
        );
      }
    }
  
    if (globalThis.phrase_count === 2) {
      if (sentiment[globalThis.point_in_transcript] === 0) {
        if (sentiment[globalThis.point_in_transcript + 1] === 0) {
          return (
            <Container maxWidth="lg">
              <Neutral0 />
              <Neutral1 />
            </Container>
          );
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 1) {
          return (
            <Container maxWidth="lg">
              <Neutral0 />
              <PositiveS1 />
            </Container>
          );
        }
            
        if (sentiment[globalThis.point_in_transcript + 1] === 11) {
          return (
            <Container maxWidth="lg">
              <Neutral0 />
              <PositiveM1 />
            </Container>
          );
        }
            
        if (sentiment[globalThis.point_in_transcript + 1] === 111) {
          return (
            <Container maxWidth="lg">
              <Neutral0 />
              <PositiveV1 />
            </Container>
          );
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 2) {
          return (
            <Container maxWidth="lg">
              <Neutral0 />
              <NegativeS1 />
            </Container>
          );
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 22) {
          return (
            <Container maxWidth="lg">
              <Neutral0 />
              <NegativeM1 />
            </Container>
          );
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 222) {
          return (
            <Container maxWidth="lg">
              <Neutral0 />
              <NegativeV1 />
            </Container>
          );
        }

        else {
          //Should never happen
          return (
            <Container maxWidth="lg">
              <Neutral0 />
              <Neutral1 />
            </Container>
          );
        }
      }

      if (sentiment[globalThis.point_in_transcript] === 1) {
        if (sentiment[globalThis.point_in_transcript + 1] === 0) {
          return (
            <Container maxWidth="lg">
              <PositiveS0 />
              <Neutral1 />
            </Container>
          );
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 1) {
          return (
            <Container maxWidth="lg">
              <PositiveS0 />
              <PositiveS1 />
            </Container>
          );
        }
            
        if (sentiment[globalThis.point_in_transcript + 1] === 11) {
          return (
            <Container maxWidth="lg">
              <PositiveS0 />
              <PositiveM1 />
            </Container>
          );
        }
            
        if (sentiment[globalThis.point_in_transcript + 1] === 111) {
          return (
            <Container maxWidth="lg">
              <PositiveS0 />
              <PositiveV1 />
            </Container>
          );
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 2) {
          return (
            <Container maxWidth="lg">
              <PositiveS0 />
              <NegativeS1 />
            </Container>
          );
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 22) {
          return (
            <Container maxWidth="lg">
              <PositiveS0 />
              <NegativeM1 />
            </Container>
          );
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 222) {
          return (
            <Container maxWidth="lg">
              <PositiveS0 />
              <NegativeV1 />
            </Container>
          );
        }

        else {
          //Should never happen
          return (
            <Container maxWidth="lg">
              <Neutral0 />
              <Neutral1 />
            </Container>
          );
        }
      }

      if (sentiment[globalThis.point_in_transcript] === 11) {
        if (sentiment[globalThis.point_in_transcript + 1] === 0) {
          return (
            <Container maxWidth="lg">
              <PositiveM0 />
              <Neutral1 />
            </Container>
          );
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 1) {
          return (
            <Container maxWidth="lg">
              <PositiveM0 />
              <PositiveS1 />
            </Container>
          );
        }
            
        if (sentiment[globalThis.point_in_transcript + 1] === 11) {
          return (
            <Container maxWidth="lg">
              <PositiveM0 />
              <PositiveM1 />
            </Container>
          );
        }
            
        if (sentiment[globalThis.point_in_transcript + 1] === 111) {
          return (
            <Container maxWidth="lg">
              <PositiveM0 />
              <PositiveV1 />
            </Container>
          );
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 2) {
          return (
            <Container maxWidth="lg">
              <PositiveM0 />
              <NegativeS1 />
            </Container>
          );
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 22) {
          return (
            <Container maxWidth="lg">
              <PositiveM0 />
              <NegativeM1 />
            </Container>
          );
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 222) {
          return (
            <Container maxWidth="lg">
              <PositiveM0 />
              <NegativeV1 />
            </Container>
          );
        }

        else {
          //Should never happen
          return (
            <Container maxWidth="lg">
              <Neutral0 />
              <Neutral1 />
            </Container>
          );
        }
      }

      if (sentiment[globalThis.point_in_transcript] === 111) {
        if (sentiment[globalThis.point_in_transcript + 1] === 0) {
          return (
            <Container maxWidth="lg">
              <PositiveV0 />
              <Neutral1 />
            </Container>
          );
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 1) {
          return (
            <Container maxWidth="lg">
              <PositiveV0 />
              <PositiveS1 />
            </Container>
          );
        }
            
        if (sentiment[globalThis.point_in_transcript + 1] === 11) {
          return (
            <Container maxWidth="lg">
              <PositiveV0 />
              <PositiveM1 />
            </Container>
          );
        }
            
        if (sentiment[globalThis.point_in_transcript + 1] === 111) {
          return (
            <Container maxWidth="lg">
              <PositiveV0 />
              <PositiveV1 />
            </Container>
          );
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 2) {
          return (
            <Container maxWidth="lg">
              <PositiveV0 />
              <NegativeS1 />
            </Container>
          );
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 22) {
          return (
            <Container maxWidth="lg">
              <PositiveV0 />
              <NegativeM1 />
            </Container>
          );
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 222) {
          return (
            <Container maxWidth="lg">
              <PositiveV0 />
              <NegativeV1 />
            </Container>
          );
        }

        else {
          //Should never happen
          return (
            <Container maxWidth="lg">
              <Neutral0 />
              <Neutral1 />
            </Container>
          );
        }
      }

      if (sentiment[globalThis.point_in_transcript] === 2) {
        if (sentiment[globalThis.point_in_transcript + 1] === 0) {
          return (
            <Container maxWidth="lg">
              <NegativeS0 />
              <Neutral1 />
            </Container>
          );
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 1) {
          return (
            <Container maxWidth="lg">
              <NegativeS0 />
              <PositiveS1 />
            </Container>
          );
        }
            
        if (sentiment[globalThis.point_in_transcript + 1] === 11) {
          return (
            <Container maxWidth="lg">
              <NegativeS0 />
              <PositiveM1 />
            </Container>
          );
        }
            
        if (sentiment[globalThis.point_in_transcript + 1] === 111) {
          return (
            <Container maxWidth="lg">
              <NegativeS0 />
              <PositiveV1 />
            </Container>
          );
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 2) {
          return (
            <Container maxWidth="lg">
              <NegativeS0 />
              <NegativeS1 />
            </Container>
          );
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 22) {
          return (
            <Container maxWidth="lg">
              <NegativeS0 />
              <NegativeM1 />
            </Container>
          );
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 222) {
          return (
            <Container maxWidth="lg">
              <NegativeS0 />
              <NegativeV1 />
            </Container>
          );
        }

        else {
          //Should never happen
          return (
            <Container maxWidth="lg">
              <Neutral0 />
              <Neutral1 />
            </Container>
          );
        }
      }

      if (sentiment[globalThis.point_in_transcript] === 22) {
        if (sentiment[globalThis.point_in_transcript + 1] === 0) {
          return (
            <Container maxWidth="lg">
              <NegativeM0 />
              <Neutral1 />
            </Container>
          );
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 1) {
          return (
            <Container maxWidth="lg">
              <NegativeM0 />
              <PositiveS1 />
            </Container>
          );
        }
            
        if (sentiment[globalThis.point_in_transcript + 1] === 11) {
          return (
            <Container maxWidth="lg">
              <NegativeM0 />
              <PositiveM1 />
            </Container>
          );
        }
            
        if (sentiment[globalThis.point_in_transcript + 1] === 111) {
          return (
            <Container maxWidth="lg">
              <NegativeM0 />
              <PositiveV1 />
            </Container>
          );
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 2) {
          return (
            <Container maxWidth="lg">
              <NegativeM0 />
              <NegativeS1 />
            </Container>
          );
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 22) {
          return (
            <Container maxWidth="lg">
              <NegativeM0 />
              <NegativeM1 />
            </Container>
          );
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 222) {
          return (
            <Container maxWidth="lg">
              <NegativeM0 />
              <NegativeV1 />
            </Container>
          );
        }

        else {
          //Should never happen
          return (
            <Container maxWidth="lg">
              <Neutral0 />
              <Neutral1 />
            </Container>
          );
        }
      }

      if (sentiment[globalThis.point_in_transcript] === 222) {
        if (sentiment[globalThis.point_in_transcript + 1] === 0) {
          return (
            <Container maxWidth="lg">
              <NegativeV0 />
              <Neutral1 />
            </Container>
          );
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 1) {
          return (
            <Container maxWidth="lg">
              <NegativeV0 />
              <PositiveS1 />
            </Container>
          );
        }
            
        if (sentiment[globalThis.point_in_transcript + 1] === 11) {
          return (
            <Container maxWidth="lg">
              <NegativeV0 />
              <PositiveM1 />
            </Container>
          );
        }
            
        if (sentiment[globalThis.point_in_transcript + 1] === 111) {
          return (
            <Container maxWidth="lg">
              <NegativeV0 />
              <PositiveV1 />
            </Container>
          );
        }
    
        if (sentiment[globalThis.point_in_transcript + 1] === 2) {
          return (
            <Container maxWidth="lg">
              <NegativeV0 />
              <NegativeS1 />
            </Container>
          );
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 22) {
          return (
            <Container maxWidth="lg">
              <NegativeV0 />
              <NegativeM1 />
            </Container>
          );
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 222) {
          return (
            <Container maxWidth="lg">
              <NegativeV0 />
              <NegativeV1 />
            </Container>
          );
        }

        else {
          //Should never happen
          return (
            <Container maxWidth="lg">
              <Neutral0 />
              <Neutral1 />
            </Container>
          );
        }
      }

      else {
        return (
          <Container maxWidth="lg">
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
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
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
              <Container maxWidth="lg">
                <Neutral0 />
                <PositiveS1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <PositiveS1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <PositiveS1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <PositiveS1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <PositiveS1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <PositiveS1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <PositiveS1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 11) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <PositiveM1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <PositiveM1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <PositiveM1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <PositiveM1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <PositiveM1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <PositiveM1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <PositiveM1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 111) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <PositiveV1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <PositiveV1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <PositiveV1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <PositiveV1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <PositiveV1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <PositiveV1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <PositiveV1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
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
              <Container maxWidth="lg">
                <Neutral0 />
                <NegativeS1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <NegativeS1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <NegativeS1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <NegativeS1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <NegativeS1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <NegativeS1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <NegativeS1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 22) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <NegativeM1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <NegativeM1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <NegativeM1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <NegativeM1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <NegativeM1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <NegativeM1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <NegativeM1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 222) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <NegativeV1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <NegativeV1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <NegativeV1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <NegativeV1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <NegativeV1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <NegativeV1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <NegativeV1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }
        
        else {
          
          return (
            <Container maxWidth="lg">
              <Neutral0 />
              <Neutral1 />
              <Neutral2 />
            </Container>
          );
        }
      }
      // First 49 done

      if (sentiment[globalThis.point_in_transcript] === 1) { 
        if (sentiment[globalThis.point_in_transcript + 1] === 0) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <Neutral1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <Neutral1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <Neutral1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <Neutral1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <Neutral1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <Neutral1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
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
              <Container maxWidth="lg">
                <PositiveS0 />
                <PositiveS1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <PositiveS1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <PositiveS1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <PositiveS1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <PositiveS1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <PositiveS1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <PositiveS1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 11) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <PositiveM1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <PositiveM1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <PositiveM1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <PositiveM1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <PositiveM1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <PositiveM1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <PositiveM1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 111) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <PositiveV1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <PositiveV1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <PositiveV1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <PositiveV1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <PositiveV1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <PositiveV1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <PositiveV1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
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
              <Container maxWidth="lg">
                <PositiveS0 />
                <NegativeS1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <NegativeS1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <NegativeS1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <NegativeS1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <NegativeS1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <NegativeS1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <NegativeS1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 22) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <NegativeM1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <NegativeM1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <NegativeM1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <NegativeM1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <NegativeM1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <NegativeM1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <NegativeM1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 222) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <NegativeV1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <NegativeV1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <NegativeV1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <NegativeV1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <NegativeV1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <NegativeV1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <PositiveS0 />
                <NegativeV1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }
        
        else {
          
          return (
            <Container maxWidth="lg">
              <Neutral0 />
              <Neutral1 />
              <Neutral2 />
            </Container>
          );
        }
      }
      // Second 49 done

      if (sentiment[globalThis.point_in_transcript] === 11) { 
        if (sentiment[globalThis.point_in_transcript + 1] === 0) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <Neutral1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <Neutral1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <Neutral1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <Neutral1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <Neutral1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <Neutral1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
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
              <Container maxWidth="lg">
                <PositiveM0 />
                <PositiveS1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <PositiveS1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <PositiveS1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <PositiveS1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <PositiveS1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <PositiveS1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <PositiveS1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 11) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <PositiveM1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <PositiveM1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <PositiveM1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <PositiveM1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <PositiveM1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <PositiveM1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <PositiveM1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 111) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <PositiveV1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <PositiveV1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <PositiveV1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <PositiveV1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <PositiveV1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <PositiveV1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <PositiveV1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
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
              <Container maxWidth="lg">
                <PositiveM0 />
                <NegativeS1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <NegativeS1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <NegativeS1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <NegativeS1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <NegativeS1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <NegativeS1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <NegativeS1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 22) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <NegativeM1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <NegativeM1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <NegativeM1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <NegativeM1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <NegativeM1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <NegativeM1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <NegativeM1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 222) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <NegativeV1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <NegativeV1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <NegativeV1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <NegativeV1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <NegativeV1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <NegativeV1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <PositiveM0 />
                <NegativeV1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }
        
        else {
          
          return (
            <Container maxWidth="lg">
              <Neutral0 />
              <Neutral1 />
              <Neutral2 />
            </Container>
          );
        }
      }
      // Third 49 done

      if (sentiment[globalThis.point_in_transcript] === 111) { 
        if (sentiment[globalThis.point_in_transcript + 1] === 0) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <Neutral1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <Neutral1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <Neutral1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <Neutral1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <Neutral1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <Neutral1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
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
              <Container maxWidth="lg">
                <PositiveV0 />
                <PositiveS1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <PositiveS1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <PositiveS1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <PositiveS1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <PositiveS1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <PositiveS1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <PositiveS1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 11) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <PositiveM1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <PositiveM1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <PositiveM1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <PositiveM1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <PositiveM1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <PositiveM1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <PositiveM1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 111) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <PositiveV1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <PositiveV1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <PositiveV1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <PositiveV1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <PositiveV1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <PositiveV1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <PositiveV1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
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
              <Container maxWidth="lg">
                <PositiveV0 />
                <NegativeS1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <NegativeS1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <NegativeS1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <NegativeS1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <NegativeS1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <NegativeS1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <NegativeS1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 22) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <NegativeM1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <NegativeM1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <NegativeM1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <NegativeM1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <NegativeM1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <NegativeM1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <NegativeM1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 222) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <NegativeV1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <NegativeV1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <NegativeV1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <NegativeV1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <NegativeV1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <NegativeV1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <PositiveV0 />
                <NegativeV1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }
        
        else {
          
          return (
            <Container maxWidth="lg">
              <Neutral0 />
              <Neutral1 />
              <Neutral2 />
            </Container>
          );
        }
      }
      // Fourth 49 done

      if (sentiment[globalThis.point_in_transcript] === 2) { 
        if (sentiment[globalThis.point_in_transcript + 1] === 0) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <Neutral1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <Neutral1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <Neutral1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <Neutral1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <Neutral1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <Neutral1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
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
              <Container maxWidth="lg">
                <NegativeS0 />
                <PositiveS1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <PositiveS1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <PositiveS1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <PositiveS1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <PositiveS1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <PositiveS1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <PositiveS1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 11) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <PositiveM1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <PositiveM1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <PositiveM1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <PositiveM1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <PositiveM1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <PositiveM1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <PositiveM1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 111) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <PositiveV1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <PositiveV1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <PositiveV1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <PositiveV1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <PositiveV1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <PositiveV1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <PositiveV1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
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
              <Container maxWidth="lg">
                <NegativeS0 />
                <NegativeS1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <NegativeS1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <NegativeS1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <NegativeS1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <NegativeS1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <NegativeS1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <NegativeS1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 22) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <NegativeM1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <NegativeM1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <NegativeM1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <NegativeM1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <NegativeM1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <NegativeM1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <NegativeM1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 222) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <NegativeV1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <NegativeV1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <NegativeV1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <NegativeV1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <NegativeV1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <NegativeV1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <NegativeS0 />
                <NegativeV1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }
        
        else {
          
          return (
            <Container maxWidth="lg">
              <Neutral0 />
              <Neutral1 />
              <Neutral2 />
            </Container>
          );
        }
      }
      // Fifth 49 done

      if (sentiment[globalThis.point_in_transcript] === 22) { 
        if (sentiment[globalThis.point_in_transcript + 1] === 0) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <Neutral1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <Neutral1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <Neutral1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <Neutral1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <Neutral1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <Neutral1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
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
              <Container maxWidth="lg">
                <NegativeM0 />
                <PositiveS1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <PositiveS1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <PositiveS1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <PositiveS1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <PositiveS1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <PositiveS1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <PositiveS1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 11) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <PositiveM1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <PositiveM1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <PositiveM1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <PositiveM1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <PositiveM1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <PositiveM1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <PositiveM1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 111) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <PositiveV1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <PositiveV1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <PositiveV1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <PositiveV1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <PositiveV1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <PositiveV1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <PositiveV1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
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
              <Container maxWidth="lg">
                <NegativeM0 />
                <NegativeS1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <NegativeS1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <NegativeS1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <NegativeS1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <NegativeS1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <NegativeS1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <NegativeS1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 22) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <NegativeM1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <NegativeM1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <NegativeM1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <NegativeM1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <NegativeM1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <NegativeM1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <NegativeM1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 222) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <NegativeV1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <NegativeV1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <NegativeV1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <NegativeV1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <NegativeV1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <NegativeV1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <NegativeM0 />
                <NegativeV1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }
        
        else {
          
          return (
            <Container maxWidth="lg">
              <Neutral0 />
              <Neutral1 />
              <Neutral2 />
            </Container>
          );
        }
      }
      // Sixth 49 done

      if (sentiment[globalThis.point_in_transcript] === 222) { 
        if (sentiment[globalThis.point_in_transcript + 1] === 0) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <Neutral1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <Neutral1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <Neutral1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <Neutral1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <Neutral1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <Neutral1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
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
              <Container maxWidth="lg">
                <NegativeV0 />
                <PositiveS1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <PositiveS1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <PositiveS1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <PositiveS1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <PositiveS1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <PositiveS1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <PositiveS1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 11) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <PositiveM1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <PositiveM1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <PositiveM1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <PositiveM1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <PositiveM1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <PositiveM1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <PositiveM1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 111) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <PositiveV1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <PositiveV1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <PositiveV1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <PositiveV1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <PositiveV1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <PositiveV1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <PositiveV1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
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
              <Container maxWidth="lg">
                <NegativeV0 />
                <NegativeS1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <NegativeS1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <NegativeS1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <NegativeS1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <NegativeS1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <NegativeS1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <NegativeS1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 22) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <NegativeM1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <NegativeM1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <NegativeM1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <NegativeM1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <NegativeM1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <NegativeM1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <NegativeM1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }

        if (sentiment[globalThis.point_in_transcript + 1] === 222) { 
          if (sentiment[globalThis.point_in_transcript + 2] === 0) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <NegativeV1 />
                <Neutral2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 1) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <NegativeV1 />
                <PositiveS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 11) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <NegativeV1 />
                <PositiveM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 111) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <NegativeV1 />
                <PositiveV2 />
              </Container>
            );
          }
      
          if (sentiment[globalThis.point_in_transcript + 2] === 2) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <NegativeV1 />
                <NegativeS2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 22) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <NegativeV1 />
                <NegativeM2 />
              </Container>
            );
          }

          if (sentiment[globalThis.point_in_transcript + 2] === 222) {
            return (
              <Container maxWidth="lg">
                <NegativeV0 />
                <NegativeV1 />
                <NegativeV2 />
              </Container>
            );
          }

          else {
            //Should never happen
            return (
              <Container maxWidth="lg">
                <Neutral0 />
                <Neutral1 />
                <Neutral2 />
              </Container>
            );
          }
        }
        
        else {
          
          return (
            <Container maxWidth="lg">
              <Neutral0 />
              <Neutral1 />
              <Neutral2 />
            </Container>
          );
        }
      }
      // Seventh and Last 49 done
  
      // No sentiment labels
      else {
        return (
          <Container maxWidth="lg">
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
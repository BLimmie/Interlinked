import React from 'react';
import {Polar} from 'react-chartjs-2';
import { Grid, Button, Box } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';

var globalThis = window

interface EmotionProps {
    current_phrase_count: number;
}

interface EmotionState {
    current_phrase_count: number;
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// For demo purposes
function random_server_output() {

  var tmp = rand(1, 5);

  if (tmp === 1) {
    globalThis.emotions_AUs = '{"AU":{"Blink":0,"Brow Lowerer":0,"Cheek Raiser":3.62,"Chin Raiser":0,"Dimpler":1.46,"Inner Brow Raiser":0,"Jaw Drop":1.9,"Lid Tightener":2.91,"Lip Corner Depressor":0.24,"Lip Corner Puller":3.44,"Lip Stretcher":0,"Lip Tightener":0,"Lips Part":2.65,"Nose Wrinkler":1.46,"Outer Brow Raiser":0,"Upper Lid Raiser":0,"Upper Lip Raiser":2.87},"Emotion":{"anger":"VERY_UNLIKELY","joy":"VERY_LIKELY","sorrow":"VERY_UNLIKELY","surprise":"VERY_UNLIKELY"}}'
  }

  else if (tmp === 2) {
    globalThis.emotions_AUs = '{"AU":{"Blink":1,"Brow Lowerer":2.333,"Cheek Raiser":0,"Chin Raiser":0.2,"Dimpler":0,"Inner Brow Raiser":1.99,"Jaw Drop":0,"Lid Tightener":0,"Lip Corner Depressor":0,"Lip Corner Puller":1.44,"Lip Stretcher":1.2,"Lip Tightener":1.77,"Lips Part":0,"Nose Wrinkler":0,"Outer Brow Raiser":2.34,"Upper Lid Raiser":1.7,"Upper Lip Raiser":0},"Emotion":{"anger":"POSSIBLE","joy":"VERY_UNLIKELY","sorrow":"VERY_LIKELY","surprise":"VERY_UNLIKELY"}}'
  }

  else if (tmp === 3) {
    globalThis.emotions_AUs = '{"AU":{"Blink":0,"Brow Lowerer":0,"Cheek Raiser":0,"Chin Raiser":0,"Dimpler":0,"Inner Brow Raiser":0,"Jaw Drop":0,"Lid Tightener":0,"Lip Corner Depressor":0,"Lip Corner Puller":1.44,"Lip Stretcher":1.2,"Lip Tightener":1.77,"Lips Part":0.8,"Nose Wrinkler":4,"Outer Brow Raiser":2.34,"Upper Lid Raiser":1.7,"Upper Lip Raiser":1.111},"Emotion":{"anger":"POSSIBLE","joy":"POSSIBLE","sorrow":"VERY_UNLIKELY","surprise":"VERY_LIKELY"}}'
  }

  else if (tmp === 4) {
    globalThis.emotions_AUs = '{"AU":{"Blink":2.3,"Brow Lowerer":1.3,"Cheek Raiser":0.8,"Chin Raiser":0.1,"Dimpler":2.3,"Inner Brow Raiser":1.99,"Jaw Drop":1.23,"Lid Tightener":4.4,"Lip Corner Depressor":0.99,"Lip Corner Puller":0,"Lip Stretcher":0,"Lip Tightener":0,"Lips Part":0,"Nose Wrinkler":0,"Outer Brow Raiser":0,"Upper Lid Raiser":0,"Upper Lip Raiser":0},"Emotion":{"anger":"VERY_LIKELY","joy":"VERY_UNLIKELY","sorrow":"VERY_UNLIKELY","surprise":"VERY_UNLIKELY"}}'
  }

  else {
    globalThis.emotions_AUs = '{"AU":{"Blink":0,"Brow Lowerer":4.5,"Cheek Raiser":0,"Chin Raiser":0,"Dimpler":0,"Inner Brow Raiser":0,"Jaw Drop":0,"Lid Tightener":0.4,"Lip Corner Depressor":0,"Lip Corner Puller":1.44,"Lip Stretcher":0,"Lip Tightener":1.9,"Lips Part":12.7,"Nose Wrinkler":8.8,"Outer Brow Raiser":1,"Upper Lid Raiser":0,"Upper Lip Raiser":0},"Emotion":{"anger":"VERY_UNLIKELY","joy":"VERY_UNLIKELY","sorrow":"VERY_LIKELY","surprise":"POSSIBLE"}}'
  }
}
setInterval(random_server_output, 1000);


function get_AUs() {
  let temp: string[] = []

  for (var AU in JSON.parse(globalThis.emotions_AUs).AU) {
    temp.push(AU + ": " + JSON.parse(globalThis.emotions_AUs).AU[AU])
  }

  return temp;
}

export default class Emotions extends React.Component<EmotionProps, EmotionState> {
    private timer: any;
    private showAUs: boolean = false;
    private joy_level = 0;
    private sorrow_level = 0;
    private anger_level = 0;
    private surprise_level = 0;
    private AUs: string[] = [];
  
    constructor(props: EmotionProps) {
      super(props);
      this.setState({
        current_phrase_count: props.current_phrase_count
      });
    }
  
    determineEmotionLevels() {

        this.joy_level = 0;
        this.sorrow_level = 0;
        this.anger_level = 0;
        this.surprise_level = 0;

        if (JSON.parse(globalThis.emotions_AUs).Emotion["joy"] === "VERY_LIKELY") {
          this.joy_level = 100;
        }

        else if (JSON.parse(globalThis.emotions_AUs).Emotion["joy"] === "POSSIBLE") {
          this.joy_level = rand(35, 65);
        }

        if (JSON.parse(globalThis.emotions_AUs).Emotion["sorrow"] === "VERY_LIKELY") {
          this.sorrow_level = 100;
        }

        else if (JSON.parse(globalThis.emotions_AUs).Emotion["sorrow"] === "POSSIBLE") {
          this.sorrow_level = rand(35, 65);
        }

        if (JSON.parse(globalThis.emotions_AUs).Emotion["anger"] === "VERY_LIKELY") {
          this.anger_level = 100;
        }

        else if (JSON.parse(globalThis.emotions_AUs).Emotion["anger"] === "POSSIBLE") {
          this.anger_level = rand(35, 65);
        }

        if (JSON.parse(globalThis.emotions_AUs).Emotion["surprise"] === "VERY_LIKELY") {
          this.surprise_level = 100;
        }

        else if (JSON.parse(globalThis.emotions_AUs).Emotion["surprise"] === "POSSIBLE") {
          this.surprise_level = rand(35, 65);
        }

        // This exists to trick React into updating the graph
        this.setState({
            current_phrase_count: globalThis.phrase_count
        });
    
        return null;
    }

    determineAUs() {
      this.AUs = get_AUs();

      if ((this.AUs).length < 15) {
        this.AUs.length = 15;
      }

      for (var i = 0; i < 15; i++) {
        if (this.AUs[i] == null) {
          this.AUs[i] = " ";
        }
      }

      return null;
    }

    change_view() {
      if (this.showAUs === false) {
        this.showAUs = true;
      }
      else {
        this.showAUs = false;
      }
      return null;
    }
  
    componentDidMount() {
      this.timer = setInterval(() => {
        this.determineAUs();
        this.determineEmotionLevels();
      }, 1000);
    }
  
    componentWillUnmount() {
        clearInterval(this.timer)
      }

    render() {
      const legendOpts = {
        display: true,
        fullWidth: true,
        reverse: true,
        labels: {
          fontColor: 'rgb(255, 255, 255)'
        }
      };

      if (this.showAUs === false) {

        return ( 
          <Grid
          container
          spacing={0}
          direction='column'
          alignItems='center'
          justify='center'
        >
        <Polar data={() => ({
          datasets: [{
            data: [      
              this.surprise_level,        
              this.anger_level,
              this.sorrow_level,
              this.joy_level,
            ],
            backgroundColor: [
              '#ffa136',
              '#ff3636',
              '#4242ed',
              '#ffff36',
            ],
            label: 'Facial Emotions' // for legend
          }],
          labels: [
            'Surprise',
            'Anger',
            'Sorrow',
            'Joy',
          ],
          })} legend={legendOpts} height={149}/>
          <Box
            my = {2}
            border = {3}
            borderColor = "white"
            borderRadius = "0%"
          >
            <Button
            color="primary"
            size="small"
            variant="outlined"
            onClick={() => this.change_view()}
            >Details</Button>
          </Box>
        </Grid>
        );
      }

      else {

        return ( 
          <Grid
          container
          spacing={0}
          direction='column'
          alignItems='center'
          justify='center'
        >
        <Grid item xs = {12}>
        <Polar data={() => ({
          datasets: [{
            data: [      
              this.surprise_level,        
              this.anger_level,
              this.sorrow_level,
              this.joy_level,
            ],
            backgroundColor: [
              '#ffa136',
              '#ff3636',
              '#4242ed',
              '#ffff36',
            ],
            label: 'Facial Emotions' // for legend
          }],
          labels: [
            'Surprise',
            'Anger',
            'Sorrow',
            'Joy',
          ],
          })} legend={legendOpts} height={170} />
          </Grid>
          <Typography variant="body2" color="primary" align='center'>
            {this.AUs[0] + " | " + this.AUs[1] + " | " + this.AUs[2]} <br/>
            {this.AUs[3] + " | " + this.AUs[4] + " | " + this.AUs[5]} <br/>
            {this.AUs[6] + " | " + this.AUs[7] + " | " + this.AUs[8]} <br/>
            {this.AUs[9] + " | " + this.AUs[10] + " | " + this.AUs[11]} <br/>
            {this.AUs[12] + " | " + this.AUs[13] + " | " + this.AUs[14]}
          </Typography>
          <Box
            my = {0}
            border = {3}
            borderColor = "white"
            borderRadius = "0%"
          >
            <Button
            color="primary"
            size="small"
            variant="outlined"
            onClick={() => this.change_view()}
            >Details</Button>
          </Box>
        </Grid>
        );
      }
    }
  }
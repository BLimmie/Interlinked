import React from 'react';
import {Polar} from 'react-chartjs-2';
import { Grid, Button, Box } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';

interface EmotionProps {
    current_phrase_count: number;
}

interface EmotionState {
    current_phrase_count: number;
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// Just hardcodes random sentiment for now
function get_sentiment() {

  let j: string = "VERY_UNLIKELY";
  let so: string = "VERY_UNLIKELY";
  let a: string = "VERY_UNLIKELY";
  let su: string = "VERY_UNLIKELY";

  var test = rand(1, 10);

  var test2 = rand(1, 4);
  if (test2 === 1) {
    j = "VERY_LIKELY";
  }
  else if (test2 === 2) {
    so = "VERY_LIKELY";
  }
  else if (test2 === 3) {
    a = "VERY_LIKELY";
  }
  else {
    su = "VERY_LIKELY";
  }

  if (test > 5) {
    var test3 = rand(1,4);
    while (test2 === test3) {
      test3 = rand(1,4);
    }

    if (test3 === 1) {
      j = "POSSIBLE";
    }
    else if (test3 === 2) {
      so = "POSSIBLE";
    }
    else if (test3 === 3) {
      a = "POSSIBLE";
    }
    else {
      su = "POSSIBLE";
    }
  }

  if (test > 8) {
    var test3 = rand(1,4);
    while (test2 === test3) {
      test3 = rand(1,4);
    }

    if (test3 === 1) {
      j = "POSSIBLE";
    }
    else if (test3 === 2) {
      so = "POSSIBLE";
    }
    else if (test3 === 3) {
      a = "POSSIBLE";
    }
    else {
      su = "POSSIBLE";
    }
  }

  return JSON.parse('{ "joy":"' + j + 
                '", "sorrow":"' + so + 
                 '", "anger":"' + a + 
              '", "surprise":"' + su + '" }');
}

// Just hardcodes AUs for now
function get_AUs() {
  let temp: string[] = ["eyebrows raised", "eyebrows lowered", "cheeks scrunched", "cheeks flushed", "cheeks raised",
                        "one eye closed", "both eyes closed", "both eyes open", "mouth curved up", "mouth curved down",
                        "eyes averted", "eye contact", "lips pursed", "one eyebrow raised", "both eyebrows raised"]

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

        var emotions = get_sentiment();

        if (emotions.joy === "VERY_LIKELY") {
          this.joy_level = 100;
        }

        else if (emotions.joy === "POSSIBLE") {
          this.joy_level = rand(35, 65);
        }

        if (emotions.sorrow === "VERY_LIKELY") {
          this.sorrow_level = 100;
        }

        else if (emotions.sorrow === "POSSIBLE") {
          this.sorrow_level = rand(35, 65);
        }

        if (emotions.anger === "VERY_LIKELY") {
          this.anger_level = 100;
        }

        else if (emotions.anger === "POSSIBLE") {
          this.anger_level = rand(35, 65);
        }

        if (emotions.surprise === "VERY_LIKELY") {
          this.surprise_level = 100;
        }

        else if (emotions.surprise === "POSSIBLE") {
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
          })} legend={legendOpts} height={160}/>
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
          })} legend={legendOpts} height={190} />
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
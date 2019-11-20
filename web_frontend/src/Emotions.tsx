import React from 'react';
import {Polar} from 'react-chartjs-2';
import {Doughnut} from 'react-chartjs-2';

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

export default class Emotions extends React.Component<EmotionProps, EmotionState> {
    private timer: any;
    private joy_level = 0;
    private sorrow_level = 0;
    private anger_level = 0;
    private surprise_level = 0;
  
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
  
    componentDidMount() {
      this.timer = setInterval(() => {
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

        return ( <Polar data={() => ({
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
        })} legend={legendOpts} height={190}/> 
        );
    }
  }
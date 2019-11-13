import React from 'react';
import {Doughnut} from 'react-chartjs-2';

interface EmotionProps {
    current_phrase_count: number;
}

interface EmotionState {
    current_phrase_count: number;
}

export default class Emotions extends React.Component<EmotionProps, EmotionState> {
    private timer: any;
    private positive_level = 0;
    private negative_level = 0;
  
    constructor(props: EmotionProps) {
      super(props);
      this.setState({
        current_phrase_count: props.current_phrase_count
      });
    }
  
    determineEmotionLevels() {

        if (globalThis.phrase_count === 0) {
            this.positive_level = 0;
            this.negative_level = 0;
            this.setState({
                current_phrase_count: 0
              });
        }
      
        else {
          // This if statement is to ensure that emotion levels are adjusted only when a new phrase is added
          if (this.state.current_phrase_count !== globalThis.phrase_count) {
      
            if (sentiment[globalThis.phrase_count - 1] === 1) {
                this.positive_level++;
            }
            else if (sentiment[globalThis.phrase_count - 1] === 2) {
                this.negative_level++;
            }
            else {} // Statement is neutral, emotion levels do not change

            this.setState({
                current_phrase_count: globalThis.phrase_count
              });
          }
        }
      
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

        return ( <Doughnut data={() => ({
            labels: [
              'Positive',
              'Negative'
            ],
            datasets: [{
              data: [this.positive_level, this.negative_level],
              backgroundColor: [
              '#ffef61',
              '#6c61ff',
              ],
              hoverBackgroundColor: [
              '#fae632',
              '#3e30fc'
              ]
            }]
          })} /> 
        );
    }
  }
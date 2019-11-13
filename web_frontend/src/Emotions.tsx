import React from 'react';
import {Doughnut} from 'react-chartjs-2';

let positive_level = 0;
let negative_level = 0;
let current_phrase_count = 0;


const getState = () => ({
  labels: [
    'Positive',
    'Negative'
  ],
  datasets: [{
    data: [positive_level, negative_level],
    backgroundColor: [
    '#ffef61',
    '#6c61ff',
    ],
    hoverBackgroundColor: [
    '#fae632',
    '#3e30fc'
    ]
  }]
});



function determineEmotionLevels() {

  if (globalThis.phrase_count === 0) {
    positive_level = 0;
    negative_level = 0;
    current_phrase_count = 0;
  }

  else {

    // This if statement is to ensure that emotion levels are adjusted only when a new phrase is added
    if (current_phrase_count !== globalThis.phrase_count) {

      current_phrase_count = globalThis.phrase_count;

      if (globalThis.phrase_count === 1) {
        positive_level = 0;
        negative_level = 0;
      }

      if (sentiment[globalThis.phrase_count - 1] === 1) {
        positive_level++;
      }
      else if (sentiment[globalThis.phrase_count - 1] === 2) {
        negative_level++;
      }
      else {} // Statement is neutral, emotion levels do not change
    }
  }

  return(0);
}

export default class Emotions extends React.Component {

  render() {
    determineEmotionLevels();
    
    return (
        <div>
          <h2>Dynamically refreshed Doughnut Example</h2>
          <Doughnut data={getState} />
        </div>
      );
  }
}
import React from 'react';
import {Doughnut} from 'react-chartjs-2';

let positive_level = 0;
let negative_level = 0;


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
  }

  else {
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

  return(0);
}

export default function Emotions() {
  
  determineEmotionLevels();
  
  return (
      <div>
        <h2>Dynamically refreshed Doughnut Example</h2>
        <Doughnut data={getState} />
      </div>
    );
  
}
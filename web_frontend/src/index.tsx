import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import DoctorInterface from './DoctorInterface'
import PatientInterface from './PatientInterface'

// Initializing global variables
globalThis.words = new Map();
globalThis.display_words = Array.from( globalThis.words.keys() );
globalThis.sentiment = Array.from( globalThis.words.values() ); 
globalThis.point_in_transcript = 0;
globalThis.phrase_count = 0;

class Server extends React.Component {
  checkCred() {
    // XXX
    return true
  }

  render() {
    return (
      <Router>
        <Route exact path='/'><Dashboard /></Route>
        <Route path='/dashboard'><Dashboard /></Route>
        <Route path='/DoctorInterface'><DoctorInterface /></Route>
        <Route path='/PatientInterface'><PatientInterface /></Route>
      </Router>
    )
  }
}

ReactDom.render(
  <Server />,
  document.getElementById('root')
)

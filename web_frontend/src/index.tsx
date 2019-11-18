import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './Login';
import DashBoard from './DashBoard';
import DoctorInterface from './DoctorInterface'
import PatientInterface from './PatientInterface'
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';

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
        <Route exact path='/'><Login /></Route>
        <Route path='/join' onEnter={ this.checkCred() }><DashBoard /></Route>
        <Route path="/DoctorInterface" onEnter={ this.checkCred() } component={DoctorInterface} />
        <Route path="/PatientInterface" onEnter={ this.checkCred() } component={PatientInterface} />
      </Router>
    )
  }
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <Server />
  </ThemeProvider>,
  document.querySelector('#root'),
)
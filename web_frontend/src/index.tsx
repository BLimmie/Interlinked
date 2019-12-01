import React from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Login from './Login'
import PrivilegedRoute from './PrivilegedRoute'
import Dashboard from './DashboardWrapper'
import DoctorInterface from './DoctorInterface'
import PatientInterface from './PatientInterface'
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
  render() {
    return (
      <Router>
        <Route path='/login'><Login /></Route>
        <PrivilegedRoute exact path='/'><Dashboard /></PrivilegedRoute>
        <PrivilegedRoute path='/dashboard'><Dashboard /></PrivilegedRoute>
        <PrivilegedRoute path='/DoctorInterface'><DoctorInterface /></PrivilegedRoute>
        <PrivilegedRoute path='/PatientInterface'><PatientInterface /></PrivilegedRoute>
      </Router>
    )
  }
}

ReactDom.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <Server />
  </ThemeProvider>,
  document.querySelector('#root'),
)

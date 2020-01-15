import React from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './Login'
import CreateAccount from './CreateAccount'
import PrivilegedRoute from './PrivilegedRoute'
import Dashboard from './DashboardWrapper'
import DoctorInterface from './DoctorInterface'

import PatientInterface from './PatientInterface'
import PatientMainPage from './PatientMainPage'
import PatientProfile from './PatientProfile'
import PatientMyDoctor from './PatientMyDoctor'
import PatientFindDoctor from './PatientFindDoctor'
import PatientAppointments from './PatientAppointments'
import PatientSummary from './PatientSummary'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';




// Initializing global variables
var globalThis = window
globalThis.words = new Map();
globalThis.display_words = Array.from( globalThis.words.keys() );
globalThis.sentiment = Array.from( globalThis.words.values() ); 
globalThis.point_in_transcript = 0;
globalThis.phrase_count = 0;

class Server extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
        <Route path='/login'><Login /></Route>
        <Route path='/createAccount'><CreateAccount /></Route>
        <PrivilegedRoute exact path='/'><Dashboard /></PrivilegedRoute>
        <PrivilegedRoute path='/dashboard'><Dashboard /></PrivilegedRoute>
        <PrivilegedRoute path='/DoctorInterface/:link' component={DoctorInterface} ></PrivilegedRoute>
        <PrivilegedRoute path='/PatientInterface/:link' component={PatientInterface} ></PrivilegedRoute>
        <PrivilegedRoute path='/PatientMainPage'><PatientMainPage /></PrivilegedRoute>
        <PrivilegedRoute path='/PatientProfile'><PatientProfile /></PrivilegedRoute>
        <PrivilegedRoute path='/PatientMyDoctor'><PatientMyDoctor /></PrivilegedRoute>
        <PrivilegedRoute path='/PatientFindDoctor'><PatientFindDoctor current_selection={0}/></PrivilegedRoute>
        <PrivilegedRoute path='/PatientAppointments'><PatientAppointments current_selection={0}/></PrivilegedRoute>
        <PrivilegedRoute path='/PatientSummary'><PatientSummary current_selection={0}/></PrivilegedRoute>
        </Switch>
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

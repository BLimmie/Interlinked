import React from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './Login'
import CreateAccount from './CreateAccount'
import PrivilegedRoute from './PrivilegedRoute'
import Dashboard from './DashboardWrapper'
import DoctorInterface from './DoctorInterface'
import DoctorMainPage from './DoctorMainPage'
import DoctorProfile from './DoctorProfile'
import DoctorMyPatients from './DoctorMyPatients'
import DoctorFindPatients from './DoctorFindPatients'
import DoctorAppointments from './DoctorAppointments'
import DoctorFindPatient from './DoctorFindPatient'

import PatientInterface from './PatientPages/PatientInterface'
import PatientMainPage from './PatientPages/PatientMainPage'
import PatientProfile from './PatientPages/PatientProfile'
import PatientMyDoctor from './PatientPages/PatientMyDoctor'
import PatientFindDoctor from './PatientPages/PatientFindDoctor'
import PatientAppointments from './PatientPages/PatientAppointments'
import PatientSummary from './PatientPages/PatientSummary'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-oldschool-dark'




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
        <PrivilegedRoute path='/DoctorMainPage'><DoctorMainPage /></PrivilegedRoute>
        <PrivilegedRoute path='/DoctorProfile'><DoctorProfile /></PrivilegedRoute>
        <PrivilegedRoute path='/DoctorMyPatients'><DoctorMyPatients current_selection={0} /></PrivilegedRoute>
        <PrivilegedRoute path='/DoctorFindPatients'><DoctorFindPatients current_selection={0} /></PrivilegedRoute>
        <PrivilegedRoute path='/DoctorAppointments'><DoctorAppointments current_selection={0}/></PrivilegedRoute>
        <PrivilegedRoute path='/DoctorFindPatient'><DoctorFindPatient current_selection={0}/></PrivilegedRoute>

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

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
}

ReactDom.render(
  <ThemeProvider theme={theme}>
    <AlertProvider template={AlertTemplate} {...options}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Server />
    </AlertProvider>
  </ThemeProvider>,
  document.querySelector('#root'),
)

import React, { FunctionComponent } from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import Login from './Login'
import CreateAccount from './CreateAccount'
import PrivilegedRoute from './PrivilegedRoute'

import DoctorInterface from './TrueDoctorUI/DoctorInterface'
import PatientInterface from './TruePatientUI/PatientInterface'

// Once the original UI files are no longer needed, just delete them and replace them
// with the ones in the "True" folders.
// The only code that needs to be modified after that is
// 1. The imports below
// 2. The PrivilegedRoute contents in this file
// 3. The Links tied to each button in each UI file
// 4. The Image and Asset imports in each UI file
import TrueDoctorMainPage from './TrueDoctorUI/DoctorMainPage'
import TrueDoctorProfile from './TrueDoctorUI/DoctorProfile'
import TrueDoctorAppointments from './TrueDoctorUI/DoctorAppointments'

import TruePatientMainPage from './TruePatientUI/PatientMainPage'
import TruePatientProfile from './TruePatientUI/PatientProfile'
import TruePatientAppointments from './TruePatientUI/PatientAppointments'
import TruePatientSummary from './TruePatientUI/PatientSummary'

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
  MainPageRoute: FunctionComponent<{}> = (props: {}) => {
    let userType = sessionStorage.getItem("userType")
    if (userType === "patient") {
      return (<Redirect to='/client/TruePatientMainPage'/>)
    } else {
      return (<Redirect to='/client/TrueDoctorMainPage'/>)
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path='/client/login'><Login /></Route>
          <Route path='/client/createAccount'><CreateAccount /></Route>
          <PrivilegedRoute exact path='/'><this.MainPageRoute /></PrivilegedRoute>
          <PrivilegedRoute path='/client/DoctorInterface/:link' component={DoctorInterface} ></PrivilegedRoute>
          <PrivilegedRoute path='/client/PatientInterface/:link' component={PatientInterface} ></PrivilegedRoute>
          
          <PrivilegedRoute path='/client/TrueDoctorMainPage'><TrueDoctorMainPage /></PrivilegedRoute>
          <PrivilegedRoute path='/client/TrueDoctorProfile'><TrueDoctorProfile /></PrivilegedRoute>
          <PrivilegedRoute path='/client/TrueDoctorAppointments'><TrueDoctorAppointments current_selection={0}/></PrivilegedRoute>

          <PrivilegedRoute path='/client/TruePatientMainPage'><TruePatientMainPage /></PrivilegedRoute>
          <PrivilegedRoute path='/client/TruePatientProfile'><TruePatientProfile /></PrivilegedRoute>
          <PrivilegedRoute path='/client/TruePatientAppointments'><TruePatientAppointments current_selection={0}/></PrivilegedRoute>
          <PrivilegedRoute path='/client/TruePatientSummary'><TruePatientSummary current_selection={0}/></PrivilegedRoute>
          
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

import React from 'react'
import { Route, BrowserRouter} from 'react-router-dom'

import LoginPage from './LoginPage'
import DoctorInterface from './DoctorInterface'
import PatientInterface from './PatientInterface'

export default function App() {  
  return (
    <BrowserRouter>
      <Route path="/" component={LoginPage} exact/>
      <Route path="/DoctorInterface" component={DoctorInterface} />
      <Route path="/PatientInterface" component={PatientInterface} />
    </BrowserRouter>
  )
}
import React from 'react'
import { Route, BrowserRouter} from 'react-router-dom'

import DoctorInterface from './DoctorInterface'
import PatientInterface from './PatientPages/PatientInterface'

export default function App() {  
  return (
    <BrowserRouter>
      <Route path="/DoctorInterface" component={DoctorInterface} />
      <Route path="/PatientInterface" component={PatientInterface} />
    </BrowserRouter>
  )
}

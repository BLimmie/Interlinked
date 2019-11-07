import React from 'react'
import { Route, BrowserRouter} from 'react-router-dom'

import LoginPage from './LoginPage'
import Interface from './Interface'
import CreateRoom from './Video/CreateRoom'
import JoinRoom from './Video/JoinRoom'

export default function App() {  
  return (
    <BrowserRouter>
      <Route path="/" component={LoginPage} exact/>
      <Route path="/CreateRoom" component={CreateRoom} />
      <Route path="/JoinRoom" component={JoinRoom} />
      <Route path="/DoctorInterface" component={Interface} />
      <Route path="/PatientInterface" component={Interface} />
    </BrowserRouter>
  )
}
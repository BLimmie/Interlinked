import React from 'react';
import { Redirect } from 'react-router-dom'

export default function PatientMainPage() {
    return (
      <Redirect to='/client/TruePatientProfile'/>
    )
}

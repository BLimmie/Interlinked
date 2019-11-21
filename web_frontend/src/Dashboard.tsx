import React from 'react'
import { Link } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core'

export default class Dashboard extends React.Component {
  render() {
    return (
      <Grid
        container
        spacing={5}
        alignItems='center'
        justify='center'
      >
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item>
          <Link to='/DoctorInterface'>
            <Button variant='contained'>
              Join as Doctor
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Link to='/PatientInterface'>
            <Button variant='contained'>
              Join as Patient
            </Button>
          </Link>
        </Grid>
      </Grid>
    )
  }
}

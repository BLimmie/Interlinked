import React from 'react'
import { Link } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core'

export default class Dashboard extends React.Component {
  render() {
    return (
      <Grid
        container
        spacing={3}
        wrap='nowrap'
        alignItems='center'
        justify='center'
      >
        <Grid item>
          <Link to='/DoctorInterface'>
            <Button variant='contained'>
              Join
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Link to='/DoctorInterface'>
            <Button variant='contained'>
              Start
            </Button>
          </Link>
        </Grid>
      </Grid>
    )
  }
}

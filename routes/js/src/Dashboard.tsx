import React from 'react'
import { Link } from 'react-router-dom';
import { Box, Grid, Button } from '@material-ui/core'

type DashboardProps = { }

export default class Dashboard extends React.Component<DashboardProps> {
  props: DashboardProps

  constructor(props: DashboardProps) {
    super(props);
    this.props = props
  }

  render() {
    return (
      <Box justifyContent="center"
        style={{
          backgroundImage: `url(${Image})`,
          height: "100vh",
          width: "100vw",
          backgroundSize: 'cover',
        }}>
        <Grid
          container
          spacing={5}
          direction='column'
          alignItems='center'
          justify='center'
        >
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
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
      </Box>
    )
  }
}

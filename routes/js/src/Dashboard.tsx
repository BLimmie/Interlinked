import React from 'react'
import { Link } from 'react-router-dom';
import { Box, Grid, Button } from '@material-ui/core'
import { Theme } from '@material-ui/core/styles'
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles'

const styles = (_: Theme) => createStyles({
  background: {
    height: "100vh",
    width: "100vw",
    backgroundSize: 'cover'
  },
})

interface DashboardProps extends WithStyles<typeof styles> { }

export class Dashboard extends React.Component<DashboardProps> {
  props: DashboardProps

  constructor(props: DashboardProps) {
    super(props);
    this.props = props
  }

  render() {
    return (
      <Box justifyContent="center"
           className={this.props.classes.background}
           style={{backgroundImage: `url(${Image})` }}>
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

export default withStyles(styles, { withTheme: true })(Dashboard)

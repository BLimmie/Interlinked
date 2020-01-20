import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Image from '../TrueImages/background_Main_16-9.png'
import ProfileButtonImage from '../ButtonAssets/MyProfile.png'
import AppointmentsButtonImage from '../ButtonAssets/Appointments.png'
import SummaryButtonImage from '../ButtonAssets/Summary.png'
import { Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core'


const useStyles = makeStyles((theme: Theme) =>
createStyles({
  background: {
    height: "100vh",
    width: "100vw",
    backgroundSize: 'cover'
  },
  button_background: {
    backgroundSize: 'cover'
  },
  top_button: {
    min_width: "17vw",
    width: "17vw",
    min_height: "5vh",
    height: "5vh"
  }
}),
);

export default function PatientMainPage() {
    const classes = useStyles();

    return (
      <Box justifyContent="center"
           className={classes.background}
           style={{backgroundImage: `url(${Image})` }}>
        <div style={{ padding: 20 }}>
            <Grid
                container
                spacing={1}
                direction='row'
                alignItems='flex-start'
                justify='space-around'
            >

                <Grid item>
                  <Box className={classes.button_background} style={{backgroundImage: `url(${ProfileButtonImage})` }}>
                    <Link to='/client/TruePatientProfile'>
                        <Button className={classes.top_button}>
                        
                        </Button>
                    </Link>
                  </Box>
                </Grid>

                <Grid item>
                  <Box className={classes.button_background} style={{backgroundImage: `url(${AppointmentsButtonImage})` }}>
                    <Link to='/client/TruePatientAppointments'>
                        <Button className={classes.top_button}>
                        
                        </Button>
                    </Link>
                  </Box>
                </Grid>

                <Grid item>
                  <Box className={classes.button_background} style={{backgroundImage: `url(${SummaryButtonImage})` }}>
                    <Link to='/client/TruePatientSummary'>
                        <Button className={classes.top_button}>
                        
                        </Button>
                    </Link>
                  </Box>
                </Grid>                
            </Grid>
        </div>
      </Box>
    )
}
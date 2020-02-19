import React from 'react';
import { Box, ButtonBase, Grid } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import ProfileButtonImage from '../ButtonAssets/MyProfileSelected.png'
import AppointmentsButtonImage from '../ButtonAssets/Appointments.png'
import SummaryButtonImage from '../ButtonAssets/Summary.png'

import Image from '../TrueImages/background_MyProfile_16-9.png'

const useStyles = makeStyles((theme: Theme) => createStyles({
  background: {
    height: "100vh",
    width: "100vw",
    backgroundSize: 'cover',
    backgroundImage: `url(${Image})`
  },
  button_background: {
    backgroundSize: 'cover',
  },
  top_button: {
    min_width: "17vw",
    width: "17vw",
    min_height: "5vh",
    height: "5vh",
  },
  current_top_button: {
    min_width: "17vw",
    width: "17vw",
    min_height: "7vh",
    height: "7vh",
  },
}));

export default function UserAppBar(props: {role: string}) {
  const classes = useStyles();
  return (
    <Box
      height="50px"
      padding="10px"
      className={classes.background}
    >
      <Grid
          container
          spacing={1}
          direction='row'
          alignItems='flex-start'
          justify='space-around'
      >
        <Grid item>
          <Box className={classes.button_background} style={{backgroundImage: `url(${ProfileButtonImage})` }}>
            <ButtonBase href='/client/TruePatientMainPage' className={classes.top_button} />
          </Box>
        </Grid>

        <Grid item>
          <Box className={classes.button_background} style={{backgroundImage: `url(${AppointmentsButtonImage})` }}>
            <ButtonBase href='/client/TruePatientAppointments' className={classes.top_button} />
          </Box>
        </Grid>

        <Grid item>
          <Box className={classes.button_background} style={{backgroundImage: `url(${SummaryButtonImage})` }}>
            <ButtonBase href='/client/TruePatientSummary' className={classes.top_button} />
          </Box>
        </Grid>              
      </Grid>              
    </Box>
  )
}


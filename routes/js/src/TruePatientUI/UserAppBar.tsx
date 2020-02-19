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
  top_button: {
    min_width: "17vw",
    width: "17vw",
    min_height: "5vh",
    height: "5vh",
    backgroundSize: 'cover',
  },
  current_top_button: {
    min_width: "17vw",
    width: "17vw",
    min_height: "7vh",
    height: "7vh",
    backgroundSize: 'cover',
  },
}));

export default function UserAppBar(props: {role: string}) {
  const classes = useStyles();
  return     <Box
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
        <ButtonBase
          href='/client/TruePatientMainPage'
          style={{backgroundImage: `url(${ProfileButtonImage})`}}
          className={classes.top_button}
        />
      </Grid>

      <Grid item>
        <ButtonBase
          href='/client/TruePatientAppointments'
          style={{backgroundImage: `url(${AppointmentsButtonImage})`}}
          className={classes.top_button}
        />
      </Grid>

      <Grid item>
        <ButtonBase
          href='/client/TruePatientSummary'
          style={{backgroundImage: `url(${SummaryButtonImage})`}}
          className={classes.top_button}
        />
      </Grid>              
    </Grid>              
  </Box>
}


import React from 'react';
import { Box, ButtonBase, Grid } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import MyProfileButtonSelectedImage from './ButtonAssets/MyProfileSelected.png'
import AppointmentsButtonSelectedImage from './ButtonAssets/AppointmentsSelected.png'
import SummaryButtonSelectedImage from './ButtonAssets/SummarySelected.png'
import AppointmentsButtonImage from './ButtonAssets/Appointments.png'
import SummaryButtonImage from './ButtonAssets/Summary.png'
import MyProfileButtonImage from './ButtonAssets/MyProfile.png'

const useStyles = makeStyles((theme: Theme) => {
  const top_button_base = {
    min_width: "17vw",
    width: "17vw",
    min_height: "5vh",
    height: "5vh",
    backgroundSize: 'cover',
  }
  const selected_top_button_base = {
    ...top_button_base,
    min_height: "7vh",
    height: "7vh",
  }
  return createStyles({
    MyProfileButton: {
      ...top_button_base,
      backgroundImage: `url(${MyProfileButtonImage})`,
    },
    MyProfileButtonSelected: {
      ...selected_top_button_base,
      backgroundImage: `url(${MyProfileButtonSelectedImage})`,
    },
    AppointmentsButton: {
      ...top_button_base,
      backgroundImage: `url(${AppointmentsButtonImage})`,
    },
    AppointmentsButtonSelected: {
      ...selected_top_button_base,
      backgroundImage: `url(${AppointmentsButtonSelectedImage})`,
    },
    SummaryButton: {
      ...top_button_base,
      backgroundImage: `url(${SummaryButtonImage})`,
    },
    SummaryButtonSelected: {
      ...selected_top_button_base,
      backgroundImage: `url(${SummaryButtonSelectedImage})`,
    },
  })
});

export enum UserInterfaceRole {
  MyProfile,
  Appointments,
  Summary,
}

export function UserAppBar(props: {in: UserInterfaceRole}) {
  const classes = useStyles();
  return (
    <Box
      height="65px"
      padding="15px"
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
            className={
              props.in === UserInterfaceRole.MyProfile
              ? classes.MyProfileButtonSelected : classes.MyProfileButton
            }
          />
        </Grid>

        <Grid item>
          <ButtonBase
            href='/client/TruePatientAppointments'
            className={
              props.in === UserInterfaceRole.Appointments
              ? classes.AppointmentsButtonSelected : classes.AppointmentsButton
            }
          />
        </Grid>

        <Grid item>
          <ButtonBase
            href='/client/TruePatientSummary'
            className={
              props.in === UserInterfaceRole.Summary
              ? classes.SummaryButtonSelected : classes.SummaryButton
            }
          />
        </Grid>              
      </Grid>              
    </Box>
  )
}


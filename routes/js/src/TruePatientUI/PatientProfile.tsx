import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Image from '../TrueImages/background_MyProfile_16-9.png'
import DefaultPic from '../TrueImages/default.png'
import ProfileButtonImage from '../ButtonAssets/MyProfileSelected.png'
import AppointmentsButtonImage from '../ButtonAssets/Appointments.png'
import SummaryButtonImage from '../ButtonAssets/Summary.png'
import ChangePhotoButtonImage from '../ButtonAssets/ChangePhoto.png'
import { Box, Typography, CardMedia } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core'
import { UserAppBar, UserInterfaceRole } from '../UserAppBar'


const useStyles = makeStyles((theme: Theme) =>
createStyles({
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
  profile_pic: {
    height: "56vh",
    width: "29vw",
  },
  change_pic: {
    min_width: "29vw",
    width: "29vw",
    min_height: "5vh",
    height: "5vh",
  },
  profile_contents: {
    height: "64vh",
    width: "60vw",
  }
}),
);

export default function PatientProfile() {
    const classes = useStyles();

    var profile_contents = "profile profile profile profile profile profile profile profile profile profile profile profile ";
    profile_contents = profile_contents + profile_contents;

    return (
        <Box justifyContent="center"
          className={classes.background}
        >
          <UserAppBar in={ UserInterfaceRole.MyProfile } />
          <Grid
              container
              spacing={5}
              direction='row'
              alignItems='flex-start'
              justify='space-between'
          >
            <Grid item>
                <CardMedia
                    className={classes.profile_pic}
                    image={DefaultPic}
                />
            </Grid>

            <Grid item>
                <Button disabled>
                </Button>
            </Grid>

            <Grid item>
              <Box className={classes.button_background} style={{backgroundImage: `url(${ChangePhotoButtonImage})` }}>
                <Button className={classes.change_pic}/>
              </Box>
            </Grid>

            <Grid item>
              <Box
                  className={classes.profile_contents}
                  bgcolor="#cac7d6">
                  <Typography variant="body1" color="primary">
                      {profile_contents}
                  </Typography>
              </Box>
            </Grid>
          </Grid>              
        </Box>
      )
}

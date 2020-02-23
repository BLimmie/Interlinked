import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Image from '../TrueImages/background_MyProfile_16-9.png'
import DefaultPic from '../TrueImages/default.png'
import ChangePhotoButtonImage from '../ButtonAssets/ChangePhoto.png'
import { Box, Typography, CardMedia } from '@material-ui/core';
import { Grid, Button } from '@material-ui/core'
import { UserAppBar, UserInterfaceRole, UserType } from '../UserAppBar'


const useStyles = makeStyles((theme: Theme) =>
createStyles({
  background: {
    height: "100vh",
    width: "100vw",
    backgroundSize: 'cover',
    backgroundImage: `url(${Image})`
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
    backgroundSize: 'cover',
    backgroundImage: `url(${ChangePhotoButtonImage})`
  },
  profile_contents: {
  }
}),
);

export default function PatientProfile() {
    const classes = useStyles();

    var profile_contents = "profile profile profile profile profile profile profile profile profile profile profile profile ";
    profile_contents = profile_contents + profile_contents;

    return (
      <Box
        className={classes.background}
      >
        <UserAppBar in={ UserInterfaceRole.MyProfile } for={ UserType.Patient } />
        <Box padding="10%">
          <Grid
            container
            direction='row'
            spacing={5}
          >
            <Grid item container direction='column' spacing={5} xs={5}>
              <Grid item>
                <CardMedia
                  className={classes.profile_pic}
                  image={DefaultPic}
                />
              </Grid>

              <Grid item>
                <Button className={classes.change_pic}/>
              </Grid>
            </Grid>

            <Grid item xs={7}>
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
      </Box>
    )
}

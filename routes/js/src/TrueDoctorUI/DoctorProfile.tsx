import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Image from '../TrueImages/background_MyProfile_16-9.png'
import DefaultPic from '../TrueImages/default.png'
import ProfileButtonImage from '../ButtonAssets/MyProfileSelected.png'
import FindPatientsButtonImage from '../ButtonAssets/FindPatients.png'
import AppointmentsButtonImage from '../ButtonAssets/Appointments.png'
import ChangePhotoButtonImage from '../ButtonAssets/ChangePhoto.png'
import { Box, Typography, CardMedia } from '@material-ui/core';
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
  },
  current_top_button: {
    min_width: "17vw",
    width: "17vw",
    min_height: "7vh",
    height: "7vh"
  },
  profile_pic: {
    height: "56vh",
    width: "29vw"
  },
  change_pic: {
    min_width: "29vw",
    width: "29vw",
    min_height: "5vh",
    height: "5vh"
  },
  profile_contents: {
    height: "64vh",
    width: "60vw"
  }
}),
);

export default function DoctorProfile() {
    const classes = useStyles();

    var profile_contents = "profile profile profile profile profile profile profile profile profile profile profile profile ";
    profile_contents = profile_contents + profile_contents;

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
                    <Link to='/client/TrueDoctorMainPage'>
                        <Button className={classes.current_top_button}>
                        
                        </Button>
                    </Link>
                  </Box>
                </Grid>

                <Grid item>
                  <Box className={classes.button_background} style={{backgroundImage: `url(${FindPatientsButtonImage})` }}>
                    <Link to='/client/TrueDoctorFindPatients'>
                        <Button className={classes.top_button}>
                        
                        </Button>
                    </Link>
                  </Box>
                </Grid>

                <Grid item>
                  <Box className={classes.button_background} style={{backgroundImage: `url(${AppointmentsButtonImage})` }}>
                    <Link to='/client/TrueDoctorAppointments'>
                        <Button className={classes.top_button}>
                        
                        </Button>
                    </Link>
                  </Box>
                </Grid>                
            </Grid>
        </div>

        <div style={{ padding: 50}}>

            <Grid 
                container
                spacing={7}
                direction='column'
            >
                <Grid item></Grid>
                <Grid item></Grid>
                
            </Grid>

            <Grid
                container
                spacing={5}
                direction='row'
                alignItems='flex-start'
                justify='space-between'
            >
                <Grid
                    item
                    spacing={2}
                    direction='column'
                    alignItems='flex-start'
                    justify='flex-start'
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
                            <Button className={classes.change_pic}>
                            
                            </Button>
                        </Box>
                    </Grid>
                </Grid>


                <Grid
                    item
                    spacing={0}
                    direction='column'
                    alignItems='flex-start'
                    justify='flex-start'
                >

                    <Grid item>
                        <Box
                            className={classes.profile_contents}
                            bgcolor="#b5b3bc">
                            <Typography variant="body1" color="primary">
                                {profile_contents}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </div>

      </Box>
    )
}
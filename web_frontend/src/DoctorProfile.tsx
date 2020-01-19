import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Image from './Images/background_doctorProfile_16-9.png'
import DefaultPic from './Images/default.png'
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
  top_button: {
    min_width: 230,
    width: 230,
    min_height: 40,
    height: 40
  },
  padding: {
    min_width: "3vw",
    width: "3vw"
  },
  small_padding: {
    min_width: 5,
    width: 5
  },
  profile_pic: {
    height: 483,
    width: 449
  },
  change_pic: {
    min_width: 450,
    width: 450,
    min_height: 40,
    height: 40
  },
  profile_contents: {
    height: 548,
    width: 920
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
                alignItems='center'
                justify='flex-start'
            >
                <Grid item>
                <Button className={classes.padding} disabled>
                    
                    </Button>
                </Grid>

                <Grid item>
                <Link to='/DoctorMainPage'>
                    <Button className={classes.top_button}>
                    
                    </Button>
                </Link>
                </Grid>

                <Grid item>
                <Button className={classes.padding} disabled>
                    
                    </Button>
                </Grid>
                <Grid item>
                </Grid>
                <Grid item>
                </Grid>
                <Grid item>
                </Grid>
                <Grid item>
                </Grid>
                <Grid item>
                </Grid>
                <Grid item>
                </Grid>
                <Grid item>
                </Grid>
                <Grid item>
                </Grid>

                

                <Grid item>
                <Link to='/DoctorMyPatients'>
                    <Button className={classes.top_button}>
                    
                    </Button>
                </Link>
                </Grid>

                <Grid item>
                <Button className={classes.padding} disabled>
                    
                    </Button>
                </Grid>
                <Grid item>
                </Grid>
                <Grid item>
                </Grid>
                <Grid item>
                </Grid>
                <Grid item>
                </Grid>
                <Grid item>
                </Grid>
                <Grid item>
                </Grid>
                <Grid item>
                </Grid>
                <Grid item>
                </Grid>


                <Grid item>
                <Link to='/DoctorFindPatients'>
                    <Button className={classes.top_button}>
                    
                    </Button>
                </Link>
                </Grid>

                <Grid item>
                <Button className={classes.padding} disabled>
                    
                    </Button>
                </Grid>
                <Grid item>
                </Grid>
                <Grid item>
                </Grid>
                <Grid item>
                </Grid>
                <Grid item>
                </Grid>
                <Grid item>
                </Grid>
                <Grid item>
                </Grid>
                <Grid item>
                </Grid>
                <Grid item>
                </Grid>

                <Grid item>
                <Link to='/DoctorAppointments'>
                    <Button className={classes.top_button}>
                    
                    </Button>
                </Link>
                </Grid>

                <Grid item className={classes.padding}></Grid>
            </Grid>

            <Grid
                container
                spacing={0}
                direction='column'
                alignItems='center'
                justify='center'
            >
                <Grid item>
                    <Button className={classes.padding} disabled>
                    </Button>
                </Grid>
                <Grid item>
                    <Button className={classes.padding} disabled>
                    </Button>
                </Grid>
                <Grid item>
                    <Button className={classes.padding} disabled>
                    </Button>
                </Grid>
                <Grid item>
                    <Button className={classes.padding} disabled>
                    </Button>
                </Grid>
            </Grid>
        </div>

        <div style={{ padding: 50}}>
            <Grid
                container
                spacing={0}
                direction='row'
                alignItems='flex-start'
                justify='flex-start'
            >
                <Grid
                    item
                    spacing={0}
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
                        <Button className={classes.small_padding} disabled>
                        </Button>
                    </Grid>

                    <Grid item>
                        <Button className={classes.change_pic}>
                          
                        </Button>
                    </Grid>
                </Grid>

                <Grid item>
                    <Button className={classes.small_padding} disabled>
                    </Button>
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
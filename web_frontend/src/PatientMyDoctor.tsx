import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Image from './Images/background_patientMyDoctor_16-9.png'
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
  make_appt: {
    min_width: 920,
    width: 920,
    min_height: 40,
    height: 40
  },
  profile_contents: {
    height: 400,
    width: 920
  },
  remove_doc: {
    min_width: 920,
    width: 920,
    min_height: 50,
    height: 50
  },
}),
);

export default function PatientMyDoctor() {
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
                <Link to='/PatientProfile'>
                    <Button className={classes.top_button}>
                    
                    </Button>
                </Link>
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
                <Link to='/PatientMainPage'>
                    <Button className={classes.top_button}>
                    
                    </Button>
                </Link>
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

                <Grid item className={classes.small_padding}></Grid>
                <Grid item>
                <Link to='/PatientFindDoctor'>
                    <Button className={classes.top_button}>
                    
                    </Button>
                </Link>
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
                <Link to='/PatientAppointments'>
                    <Button className={classes.top_button}>
                    
                    </Button>
                </Link>
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
                <Link to='/PatientSummary'>
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
                        <Button className={classes.make_appt} >
                          
                        </Button>
                    </Grid>

                    
                    <Grid item>
                        <Button className={classes.small_padding} disabled>
                        </Button>
                    </Grid>

                    <Grid item>
                        <Box
                            className={classes.profile_contents}
                            bgcolor="#b5b3bc">
                            <Typography variant="body1" color="primary">
                                {profile_contents}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item>
                        <Button className={classes.small_padding} disabled>
                        </Button>
                    </Grid>

                    <Grid item>
                        <Button className={classes.remove_doc} >
                          
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>

      </Box>
    )
}
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Image from './Images/mainDoc.png'
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
  }
}),
);

export default function DoctorMainPage() {
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
                alignItems='center'
                justify='flex-start'
            >
                <Grid item>
                <Button className={classes.padding} disabled>
                    
                    </Button>
                </Grid>

                <Grid item>
                <Link to='/client/DoctorProfile'>
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
                <Link to='/client/DoctorMyPatients'>
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
                <Link to='/client/DoctorFindPatient'>
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
                <Link to='/client/DoctorAppointments'>
                    <Button className={classes.top_button}>
                    
                    </Button>
                </Link>
                </Grid>

                <Grid item className={classes.padding}></Grid>
            </Grid>
        </div>
      </Box>
    )
}
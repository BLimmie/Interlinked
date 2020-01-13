import React from 'react';
import { withStyles, makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Image from '../Images/summaryPatient.png'
import { Box, Typography, CardMedia, WithStyles, Input } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core'

interface PageProps extends WithStyles<typeof styles>{
    current_selection: number;
}

interface PageState {
    current_selection: number;
}

const styles = (_: Theme) => createStyles({
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
})

// Appointment class to fill out info in list
class Appointment {
    name: string = "";
    date: string = "";

    constructor(name: string, date: string) {
        this.name = name;
        this.date = date;
    }
}


class PatientAppointments extends React.Component<PageProps, PageState> {
    private appointments: Appointment[] = [];
  
    constructor(props: PageProps) {
        super(props);
        this.setState({
            current_selection: props.current_selection
         });
    }

    render() {

        // It's just a png for now
        return (
            <Box justifyContent="center"
                 className={this.props.classes.background}
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
                      <Button className={this.props.classes.padding} disabled>
                          
                          </Button>
                      </Grid>
      
                      <Grid item>
                      <Link to='/PatientProfile'>
                          <Button className={this.props.classes.top_button}>
                          
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
                      <Link to='/PatientMyDoctor'>
                          <Button className={this.props.classes.top_button}>
                          
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
      
                      <Grid item className={this.props.classes.small_padding}></Grid>
                      <Grid item>
                      <Link to='/PatientFindDoctor'>
                          <Button className={this.props.classes.top_button}>
                          
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
                          <Button className={this.props.classes.top_button}>
                          
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
                      <Link to='/PatientMainPage'>
                          <Button className={this.props.classes.top_button}>
                          
                          </Button>
                      </Link>
                      </Grid>
                      <Grid item className={this.props.classes.padding}></Grid>
                  </Grid>
              </div>
            </Box>
        )
    }
}

export default withStyles(styles, { withTheme: true })(PatientAppointments)
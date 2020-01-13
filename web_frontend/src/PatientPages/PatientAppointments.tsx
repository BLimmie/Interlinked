import React from 'react';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles'
import Image from '../Images/background_patientAppointments_16-9.png'
import { Box, Typography, WithStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

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
  },
  appt_list: {
    width: '100%',
    height: 540,
    maxWidth: 449,
    backgroundColor: "#b5b3bc",
  },
  view_profile: {
    min_width: 920,
    width: 920,
    min_height: 40,
    height: 40
  },
  start_appt: {
    min_width: 920,
    width: 920,
    min_height: 50,
    height: 50
  },
  line: {
    height: 3,
    width: 920
  },
  line2: {
    height: 2,
    width: 920
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
    private doc_name: string = "";
    private date: string = "";
  
    constructor(props: PageProps) {
        super(props);
        // A hardcoded batch of appointments
        this.appointments.push(new Appointment("Doctor Wu", "01/30/20_1700"));
        this.appointments.push(new Appointment("Poor Tom", "02/12/20_0800"));
        this.appointments.push(new Appointment("Head Doctor", "06/15/20_2100"));
        this.appointments.push(new Appointment("Urban Guerilla", "01/30/20_1700"));
        this.appointments.push(new Appointment("Doremifasolati Do", "02/12/20_0800"));
        this.appointments.push(new Appointment("Naval Doctor Kira", "06/15/20_2100"));
        this.appointments.push(new Appointment("Holly Kira", "01/30/20_1700"));
        this.appointments.push(new Appointment("Dr. Ferdinand", "02/12/20_0800"));
        this.appointments.push(new Appointment("Beverly Crusher", "06/15/20_2100"));
        this.appointments.push(new Appointment("Julian Bashir", "01/30/20_1700"));
        this.appointments.push(new Appointment("Dr. Nishikino", "02/12/20_0800"));
        this.format_dates()

        this.doc_name = this.appointments[0].name;
        this.date = this.appointments[0].date;

        // If you're having problems with callbacks and "this is undefined", then use these types of lines
        this.page_alter = this.page_alter.bind(this);
        this.render_row = this.render_row.bind(this);

        this.setState({
            current_selection: props.current_selection
         });
    }

    page_alter(index: any) {
        this.doc_name = this.appointments[index].name;
        this.date = this.appointments[index].date;
        this.setState({
            current_selection: index
        });

        return null
    }

    render_row(props: ListChildComponentProps) {
        const { index, style } = props;

        var temp_appts = this.appointments;
      
        return (
          <ListItem button style={style} key={index} onClick={() => this.page_alter(index)}>
            <ListItemText primary={temp_appts[index].date} />
          </ListItem>
        );
    }

    format_dates() {
        for (let appt of this.appointments) {
            var temp = appt.date.split("_");
            var M = "AM";
            if (+temp[1] >= 1200) {
                M = "PM";
                if (+temp[1] >= 1300) {
                    var temp2 = +temp[1] - 1200;
                    if (temp2 < 1000) {
                        temp[1] = "0" + temp2.toString();
                    }
                    else {
                        temp[1] = temp2.toString();
                    }
                }
            }



            appt.date = temp[0] + ", at " + temp[1][0] + temp[1][1] + ":" + temp[1][2] + temp[1][3] + " " + M;
        }
    }    

    render() {


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
                    <Link to='/PatientMainPage'>
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
                    <Link to='/PatientSummary'>
                        <Button className={this.props.classes.top_button}>
                        
                        </Button>
                    </Link>
                    </Grid>
                    <Grid item className={this.props.classes.padding}></Grid>
                </Grid>

                <Grid
                    container
                    spacing={0}
                    direction='column'
                    alignItems='center'
                    justify='center'
                >
                    <Grid item>
                        <Button className={this.props.classes.padding} disabled>
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button className={this.props.classes.padding} disabled>
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button className={this.props.classes.padding} disabled>
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button className={this.props.classes.padding} disabled>
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
                            <div className={this.props.classes.appt_list}>
                                <FixedSizeList height={540} width={449} itemSize={50} itemCount={this.appointments.length}>
                                    {this.render_row}
                                </FixedSizeList>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Button className={this.props.classes.small_padding} disabled>
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
                                className={this.props.classes.line}
                                bgcolor="#6e6b7a"
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" color="primary">
                                    {"Appointment Date and Time: " + this.date}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Box
                                className={this.props.classes.line2}
                                bgcolor="#6e6b7a"
                            />
                        </Grid>
                        
                        <Grid item>
                            <Button className={this.props.classes.small_padding} disabled>
                            </Button>
                        </Grid>

                        <Grid item>
                            <Box
                                className={this.props.classes.line}
                                bgcolor="#6e6b7a"
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" color="primary">
                                    {"Doctor Name: " + this.doc_name}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Box
                                className={this.props.classes.line2}
                                bgcolor="#6e6b7a"
                            />
                        </Grid>

                        <Grid item>
                            <Button className={this.props.classes.small_padding} disabled>
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button className={this.props.classes.view_profile} >
                            
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button className={this.props.classes.small_padding} disabled>
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button className={this.props.classes.small_padding} disabled>
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button className={this.props.classes.small_padding} disabled>
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button className={this.props.classes.small_padding} disabled>
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button className={this.props.classes.small_padding} disabled>
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button className={this.props.classes.small_padding} disabled>
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button className={this.props.classes.small_padding} disabled>
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button className={this.props.classes.start_appt} >
                            
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </div>

        </Box>
        )
    }
}

export default withStyles(styles, { withTheme: true })(PatientAppointments)
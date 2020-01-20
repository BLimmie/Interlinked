import React from 'react';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles'
import Image from '../TrueImages/background_Appointments_16-9.png'
import DefaultImage from '../TrueImages/default.png'
import ProfileButtonImage from '../ButtonAssets/MyProfile.png'
import AppointmentsButtonImage from '../ButtonAssets/AppointmentsSelected.png'
import SummaryButtonImage from '../ButtonAssets/Summary.png'
import ViewProfileButtonImage from '../ButtonAssets/ViewProfile.png'
import StartAppointmentButtonImage from '../ButtonAssets/StartAppointment.png'
import { Box, Typography, CardMedia, WithStyles, Input } from '@material-ui/core';
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
  patient_list: {
    width: '100%',
    height: 487,
    maxWidth: "29vw",
    backgroundColor: "#b5b3bc",
  },
  pic: {
    width: "15vw",
    height: "28vh"
  },
  side_button: {
    min_width: "36vw",
    width: "36vw",
    min_height: "5vh",
    height: "5vh"
  },
  line: {
    width: "36vw",
    height: 2
  },
  profile_contents: {
    height: "25vh",
    width: "60vw"
  },
  start_button: {
    min_width: "60vw",
    width: "60vw",
    min_height: "5vh",
    height: "5vh"
  }
})

// Person class to fill out info in list
class Person {
    name: string =  "";
    pic: string = "";
    profile: string = "";

    constructor(name: string, pic: string, profile: string) {
        this.name = name;
        this.pic = pic;
        this.profile = profile;
    }
}


class PatientAppointments extends React.Component<PageProps, PageState> {
    private people: Person[] = [];
    private profile_contents: string = "";
    private name: string = "";
    private picture: string = "";
    private search_term: string = '';
  
    constructor(props: PageProps) {
        super(props);
        // A hardcoded batch of people
        this.people.push(new Person("Doctor Wu", "../TrueImages/default.png", "Has never failed."));
        this.people.push(new Person("Head Doctor", "../TrueImages/default.png", "89 years old"));
        this.people.push(new Person("Poor Tom", "../TrueImages/default.png", "Popular with the ladies."));
        this.people.push(new Person("Urban Guerilla", "../TrueImages/default.png", "A doctor?"));
        this.people.push(new Person("Doremifasolati Do", "../TrueImages/default.png", "profile profile profile"));
        this.people.push(new Person("Naval Doctor Kira", "../TrueImages/default.png", "Dislikes people who can't choose between the land and the sea."));
        this.people.push(new Person("Holly Kira", "../TrueImages/default.png", "WILL forget your name."));
        this.people.push(new Person("Dr. Ferdinand", "../TrueImages/default.png", "Worthy of respect."));
        this.people.push(new Person("Beverly Crusher", "../TrueImages/default.png", "Has military experience."));
        this.people.push(new Person("Julian Bashir", "../TrueImages/default.png", "Custom made."));
        this.people.push(new Person("Dr. Nishikino", "../TrueImages/default.png", "profile profile profile"));

        this.name = this.people[0].name;
        this.profile_contents = this.people[0].profile;
        this.picture = this.people[0].pic;

        // If you're having problems with callbacks and "this is undefined", then use these types of lines
        this.page_alter = this.page_alter.bind(this);
        this.render_row = this.render_row.bind(this);

        this.setState({
            current_selection: props.current_selection
         });
    }

    page_alter(index: any) {
        this.name = this.people[index].name
        this.profile_contents = this.people[index].profile
        this.picture = this.people[index].pic
        this.setState({
            current_selection: index
        });

        return null
    }

    render_row(props: ListChildComponentProps) {
        const { index, style } = props;

        var temp_people = this.people
      
        return (
          <ListItem button style={style} key={index} onClick={() => this.page_alter(index)}>
            <ListItemText primary={temp_people[index].name} />
          </ListItem>
        );
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
                 alignItems='flex-start'
                 justify='space-around'
             >
 
                 <Grid item>
                   <Box className={this.props.classes.button_background} style={{backgroundImage: `url(${ProfileButtonImage})` }}>
                     <Link to='/client/TruePatientProfile'>
                         <Button className={this.props.classes.top_button}>
                         
                         </Button>
                     </Link>
                   </Box>
                 </Grid>
 
                 <Grid item>
                   <Box className={this.props.classes.button_background} style={{backgroundImage: `url(${AppointmentsButtonImage})` }}>
                     <Link to='/client/TruePatientMainPage'>
                         <Button className={this.props.classes.current_top_button}>
                         
                         </Button>
                     </Link>
                   </Box>
                 </Grid>
 
                 <Grid item>
                   <Box className={this.props.classes.button_background} style={{backgroundImage: `url(${SummaryButtonImage})` }}>
                     <Link to='/client/TruePatientSummary'>
                         <Button className={this.props.classes.top_button}>
                         
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
                        <Input
                            id='search'
                            placeholder='Search'
                            fullWidth
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.search_term = e.target.value}}
                        />

                        <Grid item>
                            <Button disabled>
                            </Button>
                        </Grid>

                        <Grid item>
                            <div className={this.props.classes.patient_list}>
                                <FixedSizeList height={487} width={"29vw"} itemSize={50} itemCount={this.people.length}>
                                    {this.render_row}
                                </FixedSizeList>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        spacing={0}
                        direction='column'
                        alignItems='flex-start'
                        justify='flex-start'
                    >
                        <Grid
                            container
                            spacing={0} 
                            direction='row'
                            alignItems='flex-start'
                            justify='flex-start'
                        >
                            <Grid item>
                                <Button disabled>
                                </Button>
                            </Grid>

                            <Grid item>
                                <CardMedia
                                    className={this.props.classes.pic}
                                    image={DefaultImage}
                                />
                            </Grid>

                            <Grid item>
                                <Button disabled>
                                </Button>
                            </Grid>

                            <Grid
                                item
                                spacing={0}
                                direction='column'
                                alignItems='center'
                                justify='flex-start'
                            >
                                <Grid item>
                                    <Button disabled>
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
                                            {"Doctor Name: " + this.name}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Box
                                        className={this.props.classes.line}
                                        bgcolor="#6e6b7a"
                                    />
                                </Grid>

                                <Grid item>
                                    <Button disabled>
                                    </Button>
                                </Grid>

                                <Grid item>
                                    <Box className={this.props.classes.button_background} style={{backgroundImage: `url(${ViewProfileButtonImage})` }}>
                                        <Button className={this.props.classes.side_button} >
                                        
                                        </Button>
                                    </Box>
                                </Grid>

                            </Grid>
                        </Grid>

                        
                        <Grid item>
                            <Button disabled>
                            </Button>
                        </Grid>

                        <Grid item>
                            <Box
                                className={this.props.classes.profile_contents}
                                bgcolor="#b5b3bc">
                                <Typography variant="body1" color="primary">
                                    {this.profile_contents}
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item>
                            <Button disabled>
                            </Button>
                        </Grid>

                        <Grid item>
                            <Box className={this.props.classes.button_background} style={{backgroundImage: `url(${StartAppointmentButtonImage})` }}>
                                <Button className={this.props.classes.start_button} >
                            
                                </Button>
                            </Box>
                        </Grid>

                    </Grid>
                </Grid>
            </div>

        </Box>
        )
    }
}

export default withStyles(styles, { withTheme: true })(PatientAppointments)
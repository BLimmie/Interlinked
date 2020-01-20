import React from 'react';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles'
import Image from '../TrueImages/background_FindPatients_16-9.png'
import DefaultImage from '../TrueImages/default.png'
import ProfileButtonImage from '../ButtonAssets/MyProfile.png'
import FindPatientsButtonImage from '../ButtonAssets/FindPatientsSelected.png'
import AppointmentsButtonImage from '../ButtonAssets/Appointments.png'
import ViewProfileButtonImage from '../ButtonAssets/ViewProfile.png'
import ViewSummaryButtonImage from '../ButtonAssets/ViewSummary.png'
import MakeAppointmentButtonImage from '../ButtonAssets/MakeAppointment.png'
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
  profile_contents: {
    height: "33vh",
    width: "60vw"
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


class DoctorFindPatients extends React.Component<PageProps, PageState> {
    private people: Person[] = [];
    private profile_contents: string = "";
    private picture: string = "";
    private search_term: string = '';
  
    constructor(props: PageProps) {
        super(props);
        // A hardcoded batch of people
        this.people.push(new Person("Mountain Tim", "../TrueImages/default.png", "A lonely man."));
        this.people.push(new Person("Lucy Steel", "../TrueImages/default.png", "Head's in the right place."));
        this.people.push(new Person("Scarlet Valentine", "../TrueImages/default.png", "First Lady."));
        this.people.push(new Person("Blackmore", "../TrueImages/default.png", "When it rains, it pours."));
        this.people.push(new Person("Mike O.", "../TrueImages/default.png", "The bells are ringing."));
        this.people.push(new Person("Stephen Steel", "../TrueImages/default.png", "profile profile profile"));
        this.people.push(new Person("William Riker", "../TrueImages/default.png", "Number One."));
        this.people.push(new Person("Miles O'Brien", "../TrueImages/default.png", "One of the little guys."));
        this.people.push(new Person("Hal Emmerich", "../TrueImages/default.png", "profile profile profile"));
        this.people.push(new Person("Duncan MacLeod", "../TrueImages/default.png", "In great health."));
        this.people.push(new Person("Nico Y.", "../TrueImages/default.png", "profile profile profile"));


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
                     <Link to='/client/TrueDoctorProfile'>
                         <Button className={this.props.classes.top_button}>
                         
                         </Button>
                     </Link>
                   </Box>
                 </Grid>
 
                 <Grid item>
                   <Box className={this.props.classes.button_background} style={{backgroundImage: `url(${FindPatientsButtonImage})` }}>
                     <Link to='/client/TrueDoctorMainPage'>
                         <Button className={this.props.classes.current_top_button}>
                         
                         </Button>
                     </Link>
                   </Box>
                 </Grid>
 
                 <Grid item>
                   <Box className={this.props.classes.button_background} style={{backgroundImage: `url(${AppointmentsButtonImage})` }}>
                     <Link to='/client/TrueDoctorAppointments'>
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
                                    <Box className={this.props.classes.button_background} style={{backgroundImage: `url(${ViewProfileButtonImage})` }}>
                                        <Button className={this.props.classes.side_button} >
                                        
                                        </Button>
                                    </Box>
                                </Grid>

                                <Grid item>
                                    <Button disabled>
                                    </Button>
                                </Grid>

                                <Grid item>
                                    <Box className={this.props.classes.button_background} style={{backgroundImage: `url(${ViewSummaryButtonImage})` }}>
                                        <Button className={this.props.classes.side_button} >
                                        
                                        </Button>
                                    </Box>
                                </Grid>

                                <Grid item>
                                    <Button disabled>
                                    </Button>
                                </Grid>

                                <Grid item>
                                    <Box className={this.props.classes.button_background} style={{backgroundImage: `url(${MakeAppointmentButtonImage})` }}>
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

                    </Grid>
                </Grid>
            </div>

        </Box>
        )
    }
}

export default withStyles(styles, { withTheme: true })(DoctorFindPatients)
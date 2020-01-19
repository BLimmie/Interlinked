import React from 'react';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles'
import Image from './Images/background_doctorMyPatients_16-9.png'
import DefaultImage from './Images/default.png'
import { Box, Typography, CardMedia, WithStyles } from '@material-ui/core';
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
  patient_list: {
    width: '100%',
    height: 540,
    maxWidth: 449,
    backgroundColor: "#b5b3bc",
  },
  pic: {
    width: 220,
    height: 230
  },
  make_appt: {
    min_width: 570,
    width: 570,
    min_height: 40,
    height: 40
  },
  profile_contents: {
    height: 210,
    width: 920
  },
  remove_patient: {
    min_width: 920,
    width: 920,
    min_height: 50,
    height: 50
  },
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


class DoctorMyPatients extends React.Component<PageProps, PageState> {
    private people: Person[] = [];
    private profile_contents: string = "";
    private picture: string = "";
  
    constructor(props: PageProps) {
        super(props);
        // A hardcoded batch of people
        this.people.push(new Person("Mountain Tim", "./Images/default.png", "A lonely man."));
        this.people.push(new Person("Lucy Steel", "./Images/default.png", "profile profile profile"));
        this.people.push(new Person("Scarlet Valentine", "./Images/default.png", "First Lady."));
        this.people.push(new Person("Blackmore", "./Images/default.png", "When it rains, it pours."));
        this.people.push(new Person("Mike O.", "./Images/default.png", "profile profile profile"));
        this.people.push(new Person("Stephen Steel", "./Images/default.png", "profile profile profile"));
        this.people.push(new Person("William Riker", "./Images/default.png", "Number One."));
        this.people.push(new Person("Miles O'Brien", "./Images/default.png", "One of the little guys."));
        this.people.push(new Person("Hal Emmerich", "./Images/default.png", "profile profile profile"));
        this.people.push(new Person("Duncan MacLeod", "./Images/default.png", "In great health."));
        this.people.push(new Person("Nico Y.", "./Images/default.png", "profile profile profile"));


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
                alignItems='center'
                justify='flex-start'
            >
                <Grid item>
                <Button className={this.props.classes.padding} disabled>
                    
                    </Button>
                </Grid>

                <Grid item>
                <Link to='/DoctorProfile'>
                    <Button className={this.props.classes.top_button}>
                    
                    </Button>
                </Link>
                </Grid>

                <Grid item>
                <Button className={this.props.classes.padding} disabled>
                    
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
                <Link to='/DoctorMainPage'>
                    <Button className={this.props.classes.top_button}>
                    
                    </Button>
                </Link>
                </Grid>

                <Grid item>
                <Button className={this.props.classes.padding} disabled>
                    
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
                    <Button className={this.props.classes.top_button}>
                    
                    </Button>
                </Link>
                </Grid>

                <Grid item>
                <Button className={this.props.classes.padding} disabled>
                    
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
                            <div className={this.props.classes.patient_list}>
                                <FixedSizeList height={540} width={449} itemSize={50} itemCount={this.people.length}>
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
                        <Grid
                            container
                            spacing={0} 
                            direction='row'
                            alignItems='flex-start'
                            justify='flex-start'
                        >
                            <Grid item>
                            <Button className={this.props.classes.small_padding} disabled>
                            </Button>
                            </Grid>

                            <Grid item>
                                <CardMedia
                                    className={this.props.classes.pic}
                                    image={DefaultImage}
                                />
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
                                <Button className={this.props.classes.small_padding} disabled>
                                </Button>
                                </Grid>

                                <Grid item>
                                    <Button className={this.props.classes.make_appt} >
                                    
                                    </Button>
                                </Grid>

                                <Grid item>
                                <Button className={this.props.classes.small_padding} disabled>
                                </Button>
                                </Grid>

                                <Grid item>
                                    <Button className={this.props.classes.make_appt} >
                                    
                                    </Button>
                                </Grid>

                                <Grid item>
                                <Button className={this.props.classes.small_padding} disabled>
                                </Button>
                                </Grid>

                                <Grid item>
                                    <Button className={this.props.classes.make_appt} >
                                    
                                    </Button>
                                </Grid>

                            </Grid>
                        </Grid>

                        
                        <Grid item>
                            <Button className={this.props.classes.small_padding} disabled>
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
                            <Button className={this.props.classes.small_padding} disabled>
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button className={this.props.classes.remove_patient} >
                            
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </div>

        </Box>
        )
    }
}

export default withStyles(styles, { withTheme: true })(DoctorMyPatients)
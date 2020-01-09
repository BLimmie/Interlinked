import React from 'react';
import { withStyles, makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Image from './Images/background_patientFindDoctor_16-9.png'
import DefaultImage from './Images/default.png'
import { Box, Typography, CardMedia, WithStyles, InputLabel, Input } from '@material-ui/core';
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
  doctor_list: {
    width: '100%',
    height: 478,
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
  add_doc: {
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


class PatientFindDoctor extends React.Component<PageProps, PageState> {
    private people: Person[] = [];
    private profile_contents: string = "";
    private picture: string = "";
    private search_term: string = '';
  
    constructor(props: PageProps) {
        super(props);
        // A hardcoded batch of people
        this.people.push(new Person("Doctor Wu", "./Images/default.png", "profile profile profile"));
        this.people.push(new Person("Head Doctor", "./Images/default.png", "89 years old"));
        this.people.push(new Person("Poor Tom", "./Images/default.png", "Looks like a baby, but hey - his medical skill has yet to be determined."));
        this.people.push(new Person("Urban Guerilla", "./Images/default.png", "profile profile profile"));
        this.people.push(new Person("Doremifasolati Do", "./Images/default.png", "profile profile profile"));
        this.people.push(new Person("Naval Doctor Kira", "./Images/default.png", "Dislikes people who can't choose between the land and the sea."));
        this.people.push(new Person("Holly Kira", "./Images/default.png", "WILL forget your name."));
        this.people.push(new Person("University Doctor", "./Images/default.png", "profile profile profile"));
        this.people.push(new Person("Hospital Staff", "./Images/default.png", "profile profile profile"));
        this.people.push(new Person("Researcher", "./Images/default.png", "profile profile profile"));
        this.people.push(new Person("Rock Doctor", "./Images/default.png", "The Ayatollah of Rock n' Rolla"));

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
                        <Button className={this.props.classes.top_button} disabled>
                        
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
                        <Input
                            id='search'
                            placeholder='Search'
                            fullWidth
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.search_term = e.target.value}}
                        />

                        <Grid item>
                            <Button className={this.props.classes.small_padding} disabled>
                            </Button>
                        </Grid>

                        <Grid item>
                            <div className={this.props.classes.doctor_list}>
                                <FixedSizeList height={478} width={449} itemSize={50} itemCount={this.people.length}>
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
                            <Button className={this.props.classes.add_doc} >
                            
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </div>

        </Box>
        )
    }
}

export default withStyles(styles, { withTheme: true })(PatientFindDoctor)
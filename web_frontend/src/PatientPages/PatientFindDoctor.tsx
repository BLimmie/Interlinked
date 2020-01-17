import React from 'react';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles'
import Image from '../Images/background_patientFindDoctor_16-9.png'
import DefaultImage from '../Images/default.png'
import { Box, Typography, CardMedia, WithStyles, Input } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { Grid, Button, Snackbar } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { httpCall } from '../funcs'

// Person class to fill out info in list
class Person {
    name: string =  "";
    pic: string = "";
    profile: string = "";
    username: string = "";

    constructor(name: string, pic: string, profile: string, username: string) {
        this.name = name;
        this.pic = pic;
        this.profile = profile;
        this.username = username;
    }
}

interface PageProps extends WithStyles<typeof styles>{
    current_selection: number;
}

interface PageState {
    current_selection: number;
    people: Person[];
    joinSessOnce: boolean
    redirectLink: boolean
    link: string
    resMsg: string
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

class PatientFindDoctor extends React.Component<PageProps, PageState> {
    // private people: Person[] = [];
    private profile_contents: string = "";
    private picture: string = "";
    private search_term: string = '';
    private username: string = sessionStorage.getItem('username')!
  
    constructor(props: PageProps) {
        super(props);
        this.state = {
            current_selection: props.current_selection,
            people: [],
            joinSessOnce: false,
            redirectLink: false,
            link: '',
            resMsg: 'failed: session not joined'
        }
        // A hardcoded batch of people
        // this.people.push(new Person("Doctor Wu", "./Images/default.png", "Has never failed."));
        // this.people.push(new Person("Head Doctor", "./Images/default.png", "89 years old"));
        // this.people.push(new Person("Poor Tom", "./Images/default.png", "Popular with the ladies."));
        // this.people.push(new Person("Urban Guerilla", "./Images/default.png", "A doctor?"));
        // this.people.push(new Person("Doremifasolati Do", "./Images/default.png", "profile profile profile"));
        // this.people.push(new Person("Naval Doctor Kira", "./Images/default.png", "Dislikes people who can't choose between the land and the sea."));
        // this.people.push(new Person("Holly Kira", "./Images/default.png", "WILL forget your name."));
        // this.people.push(new Person("Dr. Ferdinand", "./Images/default.png", "Worthy of respect."));
        // this.people.push(new Person("Beverly Crusher", "./Images/default.png", "Has military experience."));
        // this.people.push(new Person("Julian Bashir", "./Images/default.png", "Custom made."));
        // this.people.push(new Person("Dr. Nishikino", "./Images/default.png", "profile profile profile"));


        // this.profile_contents = this.state.people[0].profile;
        // this.picture = this.state.people[0].pic;
        this.profile_contents = ""
        this.picture = "../Images/default.png"

        // If you're having problems with callbacks and "this is undefined", then use these types of lines
        this.page_alter = this.page_alter.bind(this);
        this.render_row = this.render_row.bind(this);
        this.getAssociatedUsers = this.getAssociatedUsers.bind(this);
        this.joinSession = this.joinSession.bind(this);
        this.getAssociatedUsers()

        this.setState({
            current_selection: props.current_selection
         });
    }

    page_alter(index: any) {
        this.profile_contents = this.state.people[index].profile
        this.picture = this.state.people[index].pic
        this.setState({
            current_selection: index
        });

        return null
    }

    render_row(props: ListChildComponentProps) {
        const { index, style } = props;

        var temp_people = this.state.people
      
        return (
          <ListItem button style={style} key={index} onClick={() => this.page_alter(index)}>
            <ListItemText primary={temp_people[index].name} secondary={temp_people[index].username} />
          </ListItem>
        );
    }

    joinSession() {
        if (this.state.people.length > 0) {
            let pro = this.state.people[this.state.current_selection].username
            httpCall('POST', "http://localhost:8080/latestsession", [['Provusername', pro], 
                                ['Patusername', this.username]], null, (result:any, rr:number) => {
                if (rr === 200) {
                    console.log(result)
                    let ret = JSON.parse(result)
                    this.setState({link: ret.ID, 
                    redirectLink: true})
                } else {
                    this.setState({joinSessOnce: true})
                }
            })
        }
    }

    getAssociatedUsers() {
        httpCall('POST', "http://localhost:8080/patient/" + this.username, [], null, (result:any, rr:number) => {
            if (rr === 200) {
              let arr = JSON.parse(result).Providers
              if (arr !== null) {
                let temp: Person[] = []
                arr = arr.forEach((element: Object) => {
                    let name = Object.values(element)[1]
                    let username = Object.values(element)[2]
                   temp.push(new Person(name as string, "../Images/default.png", "yes mam", username as string)) 
                });
                this.profile_contents = temp[0].profile;
                this.picture = temp[0].pic;
                this.setState({people: temp})
              }
            } 
          })
    }

    render() {
        return this.state.redirectLink ? (<Redirect to={'/PatientInterface/' + this.state.link} />) : (
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
                                <FixedSizeList height={478} width={449} itemSize={50} itemCount={this.state.people.length}>
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
                                    <Button className={this.props.classes.make_appt} onClick={this.joinSession} >
                                    
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
                        <Snackbar open={this.state.joinSessOnce}
                message={this.state.resMsg} />
                    </Grid>
                </Grid>
            </div>

        </Box>
        )
    }
}

export default withStyles(styles, { withTheme: true })(PatientFindDoctor)
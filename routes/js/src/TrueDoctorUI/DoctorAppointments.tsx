import React from 'react';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles'
import Image from '../TrueImages/background_Appointments_16-9.png'
import DefaultImage from '../TrueImages/default.png'
import ProfileButtonImage from '../ButtonAssets/MyProfile.png'
import FindPatientsButtonImage from '../ButtonAssets/FindPatients.png'
import AppointmentsButtonImage from '../ButtonAssets/AppointmentsSelected.png'
import ViewProfileButtonImage from '../ButtonAssets/ViewProfile.png'
import ViewSummaryButtonImage from '../ButtonAssets/ViewSummary.png'
import StartAppointmentButtonImage from '../ButtonAssets/StartAppointment.png'
import AddPatientButtonImage from '../ButtonAssets/AddPatient.png'
import { Box, Typography, CardMedia, WithStyles, Input } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { Grid, Button, Snackbar } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { httpCall } from '../funcs'

interface PageProps extends WithStyles<typeof styles>{
    current_selection: number;
}

interface PageState {
    current_selection: number;
    people: Person[];
    addPatOnce: boolean
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
    username: string = "";

    constructor(name: string, pic: string, profile: string, username: string) {
        this.name = name;
        this.pic = pic;
        this.profile = profile;
        this.username = username;
    }
}


class DoctorAppointments extends React.Component<PageProps, PageState> {
    private profile_contents: string = "";
    private name: string = "";
    private picture: string = "";
    private patToAdd: string = '';
    // TODO Don't use username or id from sessionstorage
    private username: string = sessionStorage.getItem('username')!
    private id: string = sessionStorage.getItem('id')!
  
    constructor(props: PageProps) {
        super(props);
        this.state = {
            current_selection: props.current_selection,
            people: [],
            addPatOnce: false,
            redirectLink: false,
            link: '',
            resMsg: '',
        }

        this.name = ''
        this.profile_contents = ""
        this.picture = "./TrueImages/default.png"

        // If you're having problems with callbacks and "this is undefined", then use these types of lines
        this.page_alter = this.page_alter.bind(this);
        this.render_row = this.render_row.bind(this);
        this.createSession = this.createSession.bind(this);
        this.associateUser = this.associateUser.bind(this);
        this.getAssociatedUsers = this.getAssociatedUsers.bind(this);
        this.getAssociatedUsers()

        this.setState({
            current_selection: props.current_selection
         });
    }

    page_alter(index: any) {
        this.name = this.state.people[index].name
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

    createSession() {
        if (this.state.people.length > 0) {
            let pat = this.state.people[this.state.current_selection].username
            httpCall('POST', "http://localhost:8080/session", [['Provusername', this.username!],
            ['Patusername', pat]], null, (result:any, rr:number) => {
                if (rr === 200) {
                    console.log(result)
                    let ret = JSON.parse(result)
                    this.setState({link: ret.id, 
                    redirectLink: true})
                } else {
                    this.setState({resMsg: 'failed: session not created', 
                    addPatOnce: true})
                }
            })
        }
    }

    associateUser() {
        if (this.patToAdd !== "") {
          httpCall('POST', "http://localhost:8080/associateUser", [['Provid', this.id!],
          ['Patusername', this.patToAdd]], null, (result:any, rr:number) => {
              if (rr === 200) {
                this.setState({resMsg: 'success: added user'})
              } else {
                this.setState({resMsg: 'failed: invalid user added'})
              }
            })
        } else {
          this.setState({resMsg: 'failed: no username entered'})
        }
        this.setState({addPatOnce: true})
    }

    getAssociatedUsers() {
        httpCall('POST', "http://localhost:8080/provider/" + this.username, [], null, (result:any, rr:number) => {
            if (rr === 200) {
              let arr = JSON.parse(result).Patients
              if (arr !== null) {
                let temp: Person[] = []
                arr = arr.forEach((element: Object) => {
                    let name = Object.values(element)[1]
                    let username = Object.values(element)[2]
                   temp.push(new Person(name as string, "./TrueImages/default.png", "yes mam", username as string)) 
                });
                this.profile_contents = temp[0].profile;
                this.picture = temp[0].pic;
                this.setState({people: temp})
              }
            } 
          })
    }

    render() {



        return this.state.redirectLink ? (<Redirect to={'/client/DoctorInterface/' + this.state.link} />) : (
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
                   <Box className={this.props.classes.button_background} style={{backgroundImage: `url(${AppointmentsButtonImage})` }}>
                     <Link to='/client/TrueDoctorMainPage'>
                         <Button className={this.props.classes.current_top_button}>
                         
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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.patToAdd = e.target.value}}
                        />

                        <Grid item>
                            <Button disabled>
                            </Button>
                        </Grid>

                        <Grid item>
                            <div className={this.props.classes.patient_list}>
                                <FixedSizeList height={487} width={"29vw"} itemSize={50} itemCount={this.state.people.length}>
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
                                            {"Patient Name: " + this.name}
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

                            </Grid>
                        </Grid>

                        
                        <Grid item>
                            <Button disabled>
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button disabled>
                            </Button>
                        </Grid>

                        <Grid item>
                            <Box className={this.props.classes.button_background} style={{backgroundImage: `url(${StartAppointmentButtonImage})` }}>
                                <Button className={this.props.classes.start_button} onClick = {this.createSession}>
                            
                                </Button>
                            </Box>
                        </Grid>
                        
                        <Grid item>
                            <Button disabled>
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button disabled>
                            </Button>
                        </Grid>
                                                
                        <Grid item>
                            <Button disabled>
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button disabled>
                            </Button>
                        </Grid>
                                                
                        <Grid item>
                            <Button disabled>
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button disabled>
                            </Button>
                        </Grid>
                        
                        <Grid item>
                            <Box className={this.props.classes.button_background} style={{backgroundImage: `url(${AddPatientButtonImage})` }}>
                                <Button className={this.props.classes.start_button} onClick = {this.associateUser}>
                            
                                </Button>
                            </Box>
                        </Grid>

                        <Snackbar open={this.state.addPatOnce}
                message={this.state.resMsg} />
                    </Grid>
                </Grid>
            </div>

        </Box>
        )
    }
}

export default withStyles(styles, { withTheme: true })(DoctorAppointments)

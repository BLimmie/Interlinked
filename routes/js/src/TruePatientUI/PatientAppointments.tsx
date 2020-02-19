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
import { Link, Redirect } from 'react-router-dom';
import { Grid, Button, Snackbar } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { httpCall } from '../funcs'
import { UserAppBar, UserInterfaceRole } from '../UserAppBar'

interface PageProps extends WithStyles<typeof styles> {
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
        backgroundColor: "#cac7d6",
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
    name: string = "";
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


class PatientAppointments extends React.Component<PageProps, PageState> {
    private profile_contents: string = "";
    private name: string = "";
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
        this.name = ''
        this.profile_contents = ""
        this.picture = "../TrueImages/default.png"

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

    joinSession() {
        if (this.state.people.length > 0) {
            let pro = this.state.people[this.state.current_selection].username
            httpCall('POST', "http://localhost:8080/latestsession", [['Provusername', pro],
            ['Patusername', this.username]], null, (result: any, rr: number) => {
                if (rr === 200) {
                    console.log(result)
                    let ret = JSON.parse(result)
                    this.setState({
                        link: ret.ID,
                        redirectLink: true
                    })
                } else {
                    this.setState({ joinSessOnce: true })
                }
            })
        }
    }

    getAssociatedUsers() {
        httpCall('POST', "http://localhost:8080/patient/" + this.username, [], null, (result: any, rr: number) => {
            if (rr === 200) {
                let arr = JSON.parse(result).Providers
                if (arr !== null) {
                    let temp: Person[] = []
                    arr = arr.forEach((element: Object) => {
                        let name = Object.values(element)[1]
                        let username = Object.values(element)[2]
                        temp.push(new Person(name as string, "../TrueImages/default.png", "yes mam", username as string))
                    });
                    this.setState({ people: temp })
                    this.page_alter(0)
                }
            }
        })
    }

    render() {
        return this.state.redirectLink ? (<Redirect to={'/client/PatientInterface/' + this.state.link} />) : (
            <Box justifyContent="center"
                className={this.props.classes.background}
                style={{ backgroundImage: `url(${Image})` }}>

                <UserAppBar in={UserInterfaceRole.Appointments}/>

                <div style={{ padding: 50 }}>

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
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { this.search_term = e.target.value }}
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
                                            bgcolor="#5f587d"
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
                                            bgcolor="#5f587d"
                                        />
                                    </Grid>

                                    <Grid item>
                                        <Button disabled>
                                        </Button>
                                    </Grid>

                                    <Grid item>
                                        <Box className={this.props.classes.button_background} style={{ backgroundImage: `url(${ViewProfileButtonImage})` }}>
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
                                    bgcolor="#cac7d6">
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
                                <Box className={this.props.classes.button_background} style={{ backgroundImage: `url(${StartAppointmentButtonImage})` }}>
                                    <Button className={this.props.classes.start_button} onClick={this.joinSession} >

                                    </Button>
                                </Box>
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

export default withStyles(styles, { withTheme: true })(PatientAppointments)

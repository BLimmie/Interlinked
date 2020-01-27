import React from 'react';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles'
import Image from '../TrueImages/background_Summary_16-9.png'
import ProfileButtonImage from '../ButtonAssets/MyProfile.png'
import AppointmentsButtonImage from '../ButtonAssets/Appointments.png'
import SummaryButtonImage from '../ButtonAssets/SummarySelected.png'
import { Box, Typography, CardMedia, WithStyles, Input } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import {Line} from 'react-chartjs-2';
import {ChartData} from 'chart.js';
import {httpCall} from '../funcs'

const data: ChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
}

interface PageProps extends WithStyles<typeof styles>{
    current_selection: number;
}

interface PageState {
    current_selection: number;
    sessions: Session[];
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
class Session {
    createdTime: string =  "";
    providerName: string = "";
    providerUsername: string = "";

    constructor(createdTime: string, providerName: string, providerUsername: string) {
        this.createdTime = createdTime;
        this.providerName = providerName;
        this.providerUsername = providerUsername;
    }
}


class PatientSummary extends React.Component<PageProps, PageState> {
    private createdTime: string = "";
    private providerName: string = "";
    private providerUsername: string = "";
    private search_term: string = '';
    private id: string = sessionStorage.getItem('id')!
  
    constructor(props: PageProps) {
        super(props);
        this.state = {
          current_selection: props.current_selection,
          sessions: []
        }

        this.createdTime = ''
        this.providerName = ''
        this.providerUsername = ''

        // If you're having problems with callbacks and "this is undefined", then use these types of lines
        this.page_alter = this.page_alter.bind(this);
        this.render_row = this.render_row.bind(this);
        this.getSessions = this.getSessions.bind(this);
        this.getSessions()

        this.setState({
            current_selection: props.current_selection
         });
    }

    page_alter(index: any) {
        this.createdTime = this.state.sessions[index].createdTime
        this.providerName = this.state.sessions[index].providerName
        this.providerUsername = this.state.sessions[index].providerUsername
        this.setState({
            current_selection: index
        });

        return null
    }

    render_row(props: ListChildComponentProps) {
        const { index, style } = props;

        var temp_sessions = this.state.sessions
      
        return (
          <ListItem button style={style} key={index} onClick={() => this.page_alter(index)}>
            <ListItemText primary={temp_sessions[index].providerName} secondary={temp_sessions[index].providerUsername + " " + temp_sessions[index].createdTime} />
          </ListItem>
        );
    }

    getSessions() {
        httpCall('POST', "http://localhost:8080/sessions/" + this.id, [], null, (result:any, rr:number) => {
            if (rr === 200) {
              let arr = JSON.parse(result)
              if (arr !== null) {
                let temp: Session[] = []
                arr = arr.forEach((element: Object) => {
                    let date = new Date(+Object.values(element)[2] * 1e3)
                    let createdTime = date.toLocaleDateString("en-US") + " " + date.toLocaleTimeString("en-US")
                    let providerName = Object.values(Object.values(element)[4])[1]
                    let providerUsername = Object.values(Object.values(element)[4])[2]
                   temp.push(new Session(createdTime as string, providerName as string, providerUsername as string)) 
                });
                this.createdTime = temp[0].createdTime
                this.providerName = temp[0].providerName;
                this.providerUsername = temp[0].providerUsername;
                this.setState({sessions: temp})
              }
            } 
          })

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
          {/* <Line data={data} />  */}
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
                         <Button className={this.props.classes.top_button}>
                         
                         </Button>
                     </Link>
                   </Box>
                 </Grid>
 
                 <Grid item>
                   <Box className={this.props.classes.button_background} style={{backgroundImage: `url(${SummaryButtonImage})` }}>
                     <Link to='/client/TruePatientSummary'>
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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.search_term = e.target.value}}
                        />

                        <Grid item>
                            <Button disabled>
                            </Button>
                        </Grid>

                        <Grid item>
                            <div className={this.props.classes.patient_list}>
                                <FixedSizeList height={487} width={"29vw"} itemSize={50} itemCount={this.state.sessions.length}>
                                    {this.render_row}
                                </FixedSizeList>
                            </div>
                        </Grid>
                    </Grid>
                  </Grid>
            </div>


        </Box>
        )
    }
}

export default withStyles(styles, { withTheme: true })(PatientSummary)
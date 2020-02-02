import React, { RefObject } from 'react';
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
import {ChartData, ChartOptions} from 'chart.js';
import {httpCall} from '../funcs'
import 'chartjs-plugin-annotation';

// const data: ChartData = {
//   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//   datasets: [
//     {
//       label: 'My First dataset',
//       fill: false,
//       lineTension: 0.1,
//       backgroundColor: 'rgba(75,192,192,0.4)',
//       borderColor: 'rgba(75,192,192,1)',
//       borderCapStyle: 'butt',
//       data: [65, 59, 80, 81, 56, 55, 40]
//     }
//   ]
// }

interface PageProps extends WithStyles<typeof styles>{
    current_selection: number;
}

interface PageState {
    current_selection: number;
    sessions: Session[];
    transcript: TranscriptLine[];
    data: ChartData;
    options: any;
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
  transcript_list: {
    width: '70%',
    height: 487,
    maxWidth: "25vw",
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

// Session class to fill out info in list
class Session {
    createdTime: string =  "";
    providerName: string = "";
    providerUsername: string = "";
    sesId: string = "";

    constructor(createdTime: string, providerName: string, providerUsername: string, sesId: string) {
        this.createdTime = createdTime;
        this.providerName = providerName;
        this.providerUsername = providerUsername;
        this.sesId = sesId;
    }
}

class TranscriptLine {
    timestamp: string =  "";
    text: string = "";

    constructor(timestamp: string, text: string) {
        this.timestamp = timestamp;
        this.text = text;
    }
}


class PatientSummary extends React.Component<PageProps, PageState> {
    private createdTime: string = "";
    private providerName: string = "";
    private providerUsername: string = "";
    private sesId: string = "";
    private search_term: string = '';
    private id: string = sessionStorage.getItem('id')!
    private listRef: RefObject<FixedSizeList> = React.createRef();
    private chartRef: RefObject<Line> = React.createRef();
  
    constructor(props: PageProps) {
        super(props);
        this.state = {
          current_selection: props.current_selection,
          sessions: [],
          // transcript: [],
          transcript: [new TranscriptLine("1", "hello"), new TranscriptLine("2", "world"),
          new TranscriptLine("3", "yes"),
          new TranscriptLine("4", "yes"),
          new TranscriptLine("5", "yes"),
          new TranscriptLine("6", "yes"),
          new TranscriptLine("7", "yes"),
          new TranscriptLine("8", "yes"),
          new TranscriptLine("9", "yes"),
          new TranscriptLine("10", "yes"),
          ],
          data: {labels: [], datasets: [{}]},
          // data: {
          //   labels: ["1", "2", "3", "4", "5"],
          //   datasets: [
          //     {
          //       label: 'Test',
          //       data: [1, 2, 3, 4, 5]
          //     }
          //   ],
          // },
          options: {}
        }

        this.createdTime = ''
        this.providerName = ''
        this.providerUsername = ''
        this.sesId = ''

        // If you're having problems with callbacks and "this is undefined", then use these types of lines
        this.page_alter = this.page_alter.bind(this);
        this.render_row = this.render_row.bind(this);
        this.transcript_alter = this.transcript_alter.bind(this);
        this.transcript_render = this.transcript_render.bind(this);
        this.getSessions = this.getSessions.bind(this);
        this.alter_transcript = this.alter_transcript.bind(this);
        this.getSessions()

        this.setState({
            current_selection: props.current_selection
         });
    }

    page_alter(index: any) {
        this.createdTime = this.state.sessions[index].createdTime
        this.providerName = this.state.sessions[index].providerName
        this.providerUsername = this.state.sessions[index].providerUsername
        this.sesId = this.state.sessions[index].sesId
        this.setState({
            current_selection: index
        });
        // httpCall('POST', "http://localhost:8080/metrics/" + this.sesId + "/aggregate", [], null, (result:any, rr:number) => {
        //     if (rr === 200) {
        //       let metrics = JSON.parse(result)
        //       console.log(metrics)
        //     } 
        // })
        this.setState({
          data: {
            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            datasets: [
              {
                label: 'Test',
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
              }
            ],
          }
        })

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

    alter_transcript(element: any) {
      console.log(element)
      if (element.length > 0) {
        this.listRef.current?.scrollToItem(element[0]._index)
        this.setState({options: { maintainAspectRatio: false,
                    annotation: {
                      drawTime: 'afterDatasetsDraw',
                      annotations: [{
                          type: 'line',
                          mode: 'vertical',
                          scaleID: 'x-axis-0',
                          value: (element[0]._index),
                          borderColor: 'red',
                          borderWidth: 2,
                      }]
                    }
                }
            })
      }
    }

    transcript_alter(index: any) {
      this.setState({options: { maintainAspectRatio: false,
                  annotation: {
                    drawTime: 'afterDatasetsDraw',
                    annotations: [{
                        type: 'line',
                        mode: 'vertical',
                        scaleID: 'x-axis-0',
                        value: parseInt(this.state.transcript[index].timestamp) - 1,
                        borderColor: 'red',
                        borderWidth: 2,
                    }]
                  }
              }
          })
    }

    transcript_render(props: ListChildComponentProps) {
        const { index, style } = props;

        var tempTranscript = this.state.transcript
      
        return (
          <ListItem button style={style} onClick={() => this.transcript_alter(index)}>
            <ListItemText primary={tempTranscript[index].text} secondary={tempTranscript[index].timestamp} />
          </ListItem>
        );
    }

    getSessions() {
        httpCall('POST', "http://localhost:8080/sessions/" + this.id, [], null, (result:any, rr:number) => {
            if (rr === 200) {
              let arr = JSON.parse(result)
              console.log(arr)
              if (arr !== null) {
                let temp: Session[] = []
                arr = arr.forEach((element: Object) => {
                    let vals = Object.values(element)
                    let date = new Date(+vals[2] * 1e3)
                    let createdTime = date.toLocaleDateString("en-US") + " " + date.toLocaleTimeString("en-US")
                    let providerName = Object.values(vals[4])[1]
                    let providerUsername = Object.values(vals[4])[2]
                    let id = vals[0]
                   temp.push(new Session(createdTime as string, providerName as string, providerUsername as string, id as string)) 
                });
                this.createdTime = temp[0].createdTime
                this.providerName = temp[0].providerName;
                this.providerUsername = temp[0].providerUsername;
                this.sesId = temp[0].sesId;
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

                    {/* <Grid
                      container
                      spacing={1}
                      direction='row'
                      alignItems='flex-start'
                      justify='flex-start'
                    > */}
                      <Grid item>
                        <Line ref={this.chartRef}
                              data={this.state.data}
                              options={this.state.options}
                              width={400}
                              height={380}
                              getElementAtEvent={this.alter_transcript} /> 
                      </Grid>

                      <Grid item>
                          <div className={this.props.classes.transcript_list}>
                              <FixedSizeList ref={this.listRef} height={487} width={"25vw"} itemSize={30} itemCount={this.state.transcript.length}>
                                  {this.transcript_render}
                              </FixedSizeList>
                          </div>
                      </Grid>

                    {/* </Grid> */}

                  </Grid>
            </div>


        </Box>
        )
    }
}

export default withStyles(styles, { withTheme: true })(PatientSummary)
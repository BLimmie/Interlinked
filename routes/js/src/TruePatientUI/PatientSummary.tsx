import React, { RefObject } from 'react';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles'
import Image from '../TrueImages/background_Summary_16-9.png'
import ProfileButtonImage from '../ButtonAssets/MyProfile.png'
import AppointmentsButtonImage from '../ButtonAssets/Appointments.png'
import SummaryButtonImage from '../ButtonAssets/SummarySelected.png'
import { Box, WithStyles, Input } from '@material-ui/core'
import { Link } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { VariableSizeList, FixedSizeList, ListChildComponentProps } from 'react-window';
import {Line} from 'react-chartjs-2';
import {ChartData, ChartOptions} from 'chart.js';
import {httpCall} from '../funcs'
import 'chartjs-plugin-annotation';
import { MultiButtonController } from '../MultiButtonController'

interface PageProps extends WithStyles<typeof styles>{
    current_selection: number;
}

interface PageState {
    current_selection: number;
    sessions: Session[];
    transcript: TranscriptLine[];
    emotiondata: ChartData;
    textdata: ChartData;
    audata: ChartData;
    emotionoptions: any;
    textoptions: any;
    auoptions: any;
    avgtextoptions: any;
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
    timestamp: number =  0;
    text: string = "";

    constructor(timestamp: number, text: string) {
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
  
    constructor(props: PageProps) {
        super(props);
        this.state = {
          current_selection: props.current_selection,
          sessions: [],
          // transcript: [],
          transcript: [
          new TranscriptLine(0, "yes"),
            new TranscriptLine(1, "hello"), new TranscriptLine(2, "world"),
          new TranscriptLine(3, "yes"),
          new TranscriptLine(4, "yes"),
          new TranscriptLine(5, "yes"),
          new TranscriptLine(6, "yes"),
          new TranscriptLine(7, "yes"),
          new TranscriptLine(8, "yes"),
          new TranscriptLine(9, "yes"),
          new TranscriptLine(10, "yes"),
          new TranscriptLine(11, "yes"),
          new TranscriptLine(12, "yes"),
          new TranscriptLine(13, "yes"),
          new TranscriptLine(14, "yes"),
          new TranscriptLine(15, "yes"),
          new TranscriptLine(16, "yes"),
          new TranscriptLine(17, "yes"),
          new TranscriptLine(18, "yes"),
          new TranscriptLine(19, "yes"),
          new TranscriptLine(20, "yes"),
          ],
          emotiondata: {labels: [], datasets: [{}]},
          textdata: {labels: [], datasets: [{}]},
          audata: {labels: [], datasets: [{}]},
          // data: {
          //   labels: ["1", "2", "3", "4", "5"],
          //   datasets: [
          //     {
          //       label: 'Test',
          //       data: [1, 2, 3, 4, 5]
          //     }
          //   ],
          // },
          emotionoptions: {},
          textoptions: {},
          auoptions: {},
          avgtextoptions: {}
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
        this.data_search = this.data_search.bind(this);
        this.transcript_search = this.transcript_search.bind(this);
        this.render_left = this.render_left.bind(this);
        this.getSessions()

        this.setState({
            current_selection: props.current_selection
         });
    }

    data_search(arr: number[], ll: number, rr: number, ii: number): number {
      if (rr >= ll) {
        let mid = ll + Math.floor((rr - ll) / 2)
        if (arr[mid] === ii) {
          return mid
        }
        if (arr[mid] > ii) {
          return this.data_search(arr, ll, mid - 1, ii)
        }
        return this.data_search(arr, mid + 1, rr, ii)
      } else if (rr < 0) { return 0 }
      else { return rr }
    }

    transcript_search(ll: number, rr: number, ii: number): number {
      if (rr >= ll) {
        let mid = ll + Math.floor((rr - ll) / 2)
        if (this.state.transcript[mid].timestamp === ii) {
          return mid
        }
        if (this.state.transcript[mid].timestamp > ii) {
          return this.transcript_search(ll, mid - 1, ii)
        }
        return this.transcript_search(mid + 1, rr, ii)
      } else if (rr < 0) { return 0 }
      else { return rr }
    }

    page_alter(index: any) {
        this.createdTime = this.state.sessions[index].createdTime
        this.providerName = this.state.sessions[index].providerName
        this.providerUsername = this.state.sessions[index].providerUsername
        this.sesId = this.state.sessions[index].sesId
        this.setState({
            current_selection: index
        });
        httpCall('POST', "http://localhost:8080/metrics/" + this.sesId + "/aggregate", [], null, (result:any, rr:number) => {
            if (rr === 200) {
              let metrics = JSON.parse(result)
              let frameMetrics: Array<any> = metrics["Frame Metrics"]
              let emotionLabels: string[] = []
              let anger: number[] = []
              let joy: number[] = []
              let sorrow: number[] = []
              let surprise: number[] = []
              let baseTime = 0
              let convStringToProb = (ss: string) => {
                if (ss === "VERY_UNLIKELY") {
                  return 0;
                } else if (ss === "UNLIKELY") {
                  return 0.25;
                } else if (ss === "POSSIBLE") {
                  return 0.5;
                } else if (ss === "LIKELY") {
                  return 0.75;
                } else {
                  return 1;
                }
              };

              if (frameMetrics.length > 0) {
                baseTime = frameMetrics[0]!!["Time"]
              }

              frameMetrics.forEach(element => {
                emotionLabels.push((element["Time"] as number - baseTime).toString())
                let emotion = element["Emotion"]
                anger.push(convStringToProb(emotion["anger"]))
                joy.push(convStringToProb(emotion["joy"]))
                sorrow.push(convStringToProb(emotion["sorrow"]))
                surprise.push(convStringToProb(emotion["surprise"]))
              });
              let textMetrics: [] = metrics["Text Metrics"]
              let textLabels: string[] = []
              let transcript: TranscriptLine[] = []
              let textSentiment: number[] = []
              textMetrics.forEach(element => {
                let time = element["Time"] as number - baseTime
                textLabels.push(time.toString())
                transcript.push(new TranscriptLine(time, element["Text"]))
                textSentiment.push(element["Sentiment"])
              })
              let avgtext = Math.round((metrics["Average Text Sentiment"]["AvgTextSentiment"] + 1) / 2.0 * 40)
              this.setState({
                transcript: transcript,
                emotiondata: {
                  labels: emotionLabels,
                  datasets: [
                    {
                      label: "Anger",
                      data: anger,
                    },
                    {
                      label: "Joy",
                      data: joy,
                    },
                    {
                      label: "Sorrow",
                      data: sorrow,
                    },
                    {
                      label: "Surprise",
                      data: surprise,
                    },
                  ]
                },
                textdata: {
                  labels: textLabels,
                  datasets: [
                    {
                      label: "Text Sentiment",
                      data: textSentiment,
                    }
                  ]
                },
                avgtextoptions: { maintainAspectRatio: false,
                  annotation: {
                    drawTime: 'afterDatasetsDraw',
                    annotations: [{
                        type: 'line',
                        mode: 'vertical',
                        scaleID: 'x-axis-0',
                        value: avgtext,
                        borderColor: 'red',
                        borderWidth: 2,
                    }]
                  },
                  scales: {
                    yAxes: [{
                      ticks: {
                          display: false
                      }
                    }]
                }
                },
              }
              )
            } 
        })
        // let avgtext = Math.round((0.63 + 1) / 2.0 * 40)
        // this.setState({
        //   emotiondata: {
        //     labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "12", "13"],
        //     datasets: [
        //       {
        //         label: 'Test',
        //         data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13],
        //       }
        //     ],
        //   },
        //   textdata: {
        //     labels: ["11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "22", "23"],
        //     datasets: [
        //       {
        //         label: 'Test',
        //         data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13]
        //       }
        //     ],
        //   },
        //   audata: {
        //     labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "12", "13"],
        //     datasets: [
        //       {
        //         label: 'Test',
        //         data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13]
        //       }
        //     ],
        //   },
        //   avgtextoptions: { maintainAspectRatio: false,
        //     annotation: {
        //       drawTime: 'afterDatasetsDraw',
        //       annotations: [{
        //           type: 'line',
        //           mode: 'vertical',
        //           scaleID: 'x-axis-0',
        //           value: avgtext,
        //           borderColor: 'red',
        //           borderWidth: 2,
        //       }]
        //     },
        //     scales: {
        //       yAxes: [{
        //         ticks: {
        //             display: false
        //         }
        //       }]
        //   }
        //   },
        // })

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

    alter_transcript(chartid: number): (element: any) => void {
      return (element: any) => {
        console.log(element)
        
        if (element.length > 0) {
          let labels, indexa, indexb, indexc, target
          if (chartid === 0) {
            labels = this.state.emotiondata.labels!!
            target = +labels[element[0]._index]
            indexa = element[0]._index
            indexb = this.data_search(this.state.textdata.labels!!.map(Number), 0, this.state.textdata.labels!!.length as number - 1, target) 
            indexc = this.data_search(this.state.audata.labels!!.map(Number), 0, this.state.audata.labels!!.length as number - 1, target) 
          } else if (chartid === 1) {
            labels = this.state.textdata.labels!!
            target = +labels[element[0]._index]
            indexa = this.data_search(this.state.emotiondata.labels!!.map(Number), 0, this.state.emotiondata.labels!!.length as number - 1, target) 
            indexb = element[0]._index
            indexc = this.data_search(this.state.audata.labels!!.map(Number), 0, this.state.audata.labels!!.length as number - 1, target) 
          } else {
            labels = this.state.audata.labels!!
            target = +labels[element[0]._index]
            indexa = this.data_search(this.state.emotiondata.labels!!.map(Number), 0, this.state.emotiondata.labels!!.length as number - 1, target) 
            indexb = this.data_search(this.state.textdata.labels!!.map(Number), 0, this.state.textdata.labels!!.length as number - 1, target) 
            indexc = element[0]._index
          }
          let index = this.transcript_search(0, this.state.transcript.length - 1, target)
          this.listRef.current?.scrollToItem(index)
          this.setState({emotionoptions: { maintainAspectRatio: false,
                    annotation: {
                      drawTime: 'afterDatasetsDraw',
                      annotations: [{
                          type: 'line',
                          mode: 'vertical',
                          scaleID: 'x-axis-0',
                          value: indexa,
                          borderColor: 'red',
                          borderWidth: 2,
                      }]
                    }
                },
                    textoptions: { maintainAspectRatio: false,
                      annotation: {
                        drawTime: 'afterDatasetsDraw',
                        annotations: [{
                            type: 'line',
                            mode: 'vertical',
                            scaleID: 'x-axis-0',
                            value: indexb,
                            borderColor: 'red',
                            borderWidth: 2,
                        }]
                      }
                    },
                    auoptions: { maintainAspectRatio: false,
                      annotation: {
                        drawTime: 'afterDatasetsDraw',
                        annotations: [{
                            type: 'line',
                            mode: 'vertical',
                            scaleID: 'x-axis-0',
                            value: indexc,
                            borderColor: 'red',
                            borderWidth: 2,
                        }]
                      }
                    }
            })
        }
      }
    }

    transcript_alter(index: any) {
      let emotion_index = this.data_search(this.state.emotiondata.labels!!.map(Number), 0, this.state.emotiondata.labels!!.length as number - 1, this.state.transcript[index].timestamp)
      let text_index = this.data_search(this.state.textdata.labels!!.map(Number), 0, this.state.textdata.labels!!.length as number - 1, this.state.transcript[index].timestamp)
      let au_index = this.data_search(this.state.audata.labels!!.map(Number), 0, this.state.audata.labels!!.length as number - 1, this.state.transcript[index].timestamp)
      this.setState({emotionoptions: { maintainAspectRatio: false,
                  annotation: {
                    drawTime: 'afterDatasetsDraw',
                    annotations: [{
                        type: 'line',
                        mode: 'vertical',
                        scaleID: 'x-axis-0',
                        value: emotion_index,
                        borderColor: 'red',
                        borderWidth: 2,
                    }]
                  }
              },
                  textoptions: { maintainAspectRatio: false,
                    annotation: {
                      drawTime: 'afterDatasetsDraw',
                      annotations: [{
                          type: 'line',
                          mode: 'vertical',
                          scaleID: 'x-axis-0',
                          value: text_index,
                          borderColor: 'red',
                          borderWidth: 2,
                      }]
                    }
                  },
                  auoptions: { maintainAspectRatio: false,
                    annotation: {
                      drawTime: 'afterDatasetsDraw',
                      annotations: [{
                          type: 'line',
                          mode: 'vertical',
                          scaleID: 'x-axis-0',
                          value: au_index,
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

    render_left(props: ListChildComponentProps) {
        const { index, style } = props;
      
        if (index === 0) {
          return (
                <Line 
                      data={this.state.emotiondata}
                      options={this.state.emotionoptions}
                      width={400}
                      height={380}
                      getElementAtEvent={this.alter_transcript(0)} />)

        } else if (index === 1) {
          return (
                <Line 
                      data={{labels: Array.from(Array(41).keys()).map((ii) => {
                        let temp = ((ii / 40.0 * 2) - 1).toFixed(2)
                        return temp.toString()
                      }), datasets: [{}]}}
                      options={this.state.avgtextoptions}
                      width={400}
                      height={125} />)
        } else {
          return (
                <Line 
                      data={this.state.textdata}
                      options={this.state.textoptions}
                      width={400}
                      height={380}
                      getElementAtEvent={this.alter_transcript(1)} />

          )
        }
    }

    getSessions() {
        httpCall('POST', "http://localhost:8080/sessions/" + this.id, [], null, (result:any, rr:number) => {
            if (rr === 200) {
              let arr = JSON.parse(result)
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

          <div style={{ padding: 50, marginTop: "64px"}}>

                <Grid container spacing={2}>
                  <Grid
                      item
                      id="LeftComponent"
                      xs={4}
                      spacing={2}
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
                  <Grid item xs={4} id="MiddleComponent">  
                      <MultiButtonController leftComponent={
                        <VariableSizeList itemData={this.state} height={487} width={"25vw"} itemSize={(index) => {
                          if (index === 0 || index === 2) {
                            return 380
                          } else {
                            return 125
                          }
                        }} itemCount={3}>
                          {this.render_left}
                        </VariableSizeList>
                        }
                        />
                  </Grid>
                  <Grid item xs={4}id="RightComponent">
                          <div className={this.props.classes.transcript_list}>
                              <FixedSizeList ref={this.listRef} height={487} width={"25vw"} itemSize={30} itemCount={this.state.transcript.length}>
                                  {this.transcript_render}
                              </FixedSizeList>
                          </div>
                  </Grid>
                </Grid>
            </div>
        </Box>
        )
    }
}

export default withStyles(styles, { withTheme: true })(PatientSummary)

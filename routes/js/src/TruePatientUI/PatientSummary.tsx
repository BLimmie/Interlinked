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
import { Line, Scatter } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import { httpCall } from '../funcs'
import 'chartjs-plugin-annotation';
import { MultiButtonController } from '../MultiButtonController'

interface PageProps extends WithStyles<typeof styles> {
  current_selection: number;
}

interface PageState {
  current_selection: number;
  component_num: number;
  sessions: Session[];
  transcript: TranscriptLine[];
  emotiondata: ChartData;
  smoothemotiondata: ChartData;
  // TODO: text needs labels as member because data is a function that returns labels if given a canvas, refactor to not need this
  textdata: any;
  textlabels: number[];
  smoothtextdata: any;
  smoothtextlabels: number[];
  audata: ChartData;
  // auanom uses these as props for the component au anom chart
  auanomdata: Array<any>[];
  auanompointscolors: Array<string>[];
  avgtextoptions: any;
  genoptions: any;

  // ranges of x values (inclusive) that have diverging text and emotion sentiment
  divergingranges: [number, number][];
  testemotionlabels: string[];
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
  },
  buttonStyle: {
    background: "#b5b3bc",
    marginRight: "8px"
  }
})

// Session class to fill out info in list
class Session {
  createdTime: string = "";
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
  timestamp: number = 0;
  text: string = "";

  constructor(timestamp: number, text: string) {
    this.timestamp = timestamp;
    this.text = text;
  }
}

interface AUChartProps {
  auanomData: Array<any>[]
  auanomPointColors: Array<string>[]
  auanomOpts: any
  func: (any: any) => void
}

export const AUChart: React.SFC<AUChartProps> = (props) => {

  const auTypes = ["Blink", "BrowLowerer", "CheekRaiser", "ChinRaiser", "Dimpler", "InnerBrowRaiser", "JawDrop", "LidTightener", "LipCornerDepressor", "LipCornerPuller", "LipStretcher", "LipTightener", "LipsPart", "NoseWrinkler", "OuterBrowRaiser", "UpperLidRaiser", "UpperLipRaiser"]
  const charts = []
  const getData = (data: Array<any>, pointColors: Array<string>, index: number) => {
    return {
      datasets: [
        {
          label: auTypes[index],
          data: data,
          pointBackgroundColor: pointColors,
          showLine: true
        }
      ]
    } as ChartData
  }
  const getComponent = (index: number) => {
    return (
      <Scatter
        data={getData(props.auanomData[index], props.auanomPointColors[index], index)}
        options={props.auanomOpts}
        height={100}
        getElementAtEvent={props.func} />
    )
  }
  for (let ii = 0; ii < 17; ii++) {
    charts.push(getComponent(ii))
  }

  return (
    <div>
      {charts}
    </div>
  )

}

class PatientSummary extends React.Component<PageProps, PageState> {
  private createdTime: string = "";
  private providerName: string = "";
  private providerUsername: string = "";
  private sesId: string = "";
  private search_term: string = '';
  private id: string = sessionStorage.getItem('id')!
  private listRef: RefObject<FixedSizeList> = React.createRef();
  private auTypes = ["Blink", "BrowLowerer", "CheekRaiser", "ChinRaiser", "Dimpler", "InnerBrowRaiser", "JawDrop", "LidTightener", "LipCornerDepressor", "LipCornerPuller", "LipStretcher", "LipTightener", "LipsPart", "NoseWrinkler", "OuterBrowRaiser", "UpperLidRaiser", "UpperLipRaiser"]

  constructor(props: PageProps) {
    super(props);
    this.state = {
      current_selection: props.current_selection,
      component_num: 0,
      sessions: [],
      transcript: [],
      emotiondata: { datasets: [{ data: [] }] },
      smoothemotiondata: { datasets: [{ data: [] }] },
      textdata: { datasets: [{ data: [] }] },
      textlabels: [],
      smoothtextdata: { datasets: [{ data: [] }] },
      smoothtextlabels: [],
      audata: { datasets: [{ data: [] }] },
      auanomdata: [[]],
      auanompointscolors: [],

      avgtextoptions: {},
      genoptions: {},
      divergingranges: [],
      testemotionlabels: []
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
    this.getOption = this.getOption.bind(this);
    this.getXValues = this.getXValues.bind(this);
    this.alter_transcript = this.alter_transcript.bind(this);
    this.transcript_search = this.transcript_search.bind(this);
    this.getSessions()

    this.setState({
      current_selection: props.current_selection
    });
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
    httpCall('POST', "http://localhost:8080/metrics/" + this.sesId + "/aggregate", [], null, (result: any, rr: number) => {
      if (rr === 200) {
        let metrics = JSON.parse(result)
        let frameMetrics: Array<any> = metrics["Frame Metrics"]
        let emotionLabels: string[] = []
        let anger: any[] = []
        let joy: any[] = []
        let sorrow: any[] = []
        let surprise: any[] = []
        let auMetrics: Array<any>[] = []
        for (let ii = 0; ii < 17; ii++) { auMetrics.push(new Array<number>()) }
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

        // real time sentiment and au metrics
        let baseTime = metrics["Created Time"]
        frameMetrics.forEach(element => {
          let xval = (element["Time"] as number - baseTime)
          emotionLabels.push(xval.toString())
          let emotion = element["Emotion"]
          anger.push({ x: xval, y: convStringToProb(emotion["anger"]) })
          joy.push({ x: xval, y: convStringToProb(emotion["joy"]) })
          sorrow.push({ x: xval, y: convStringToProb(emotion["sorrow"]) })
          surprise.push({ x: xval, y: convStringToProb(emotion["surprise"]) })
          for (let ii = 0; ii < auMetrics.length; ii++) {
            auMetrics[ii].push({ x: xval, y: element["AU"][this.auTypes[ii]] })
          }
        });
        let auData = []
        for (let ii = 0; ii < auMetrics.length; ii++) {
          auData.push({
            label: this.auTypes[ii],
            data: auMetrics[ii],
            hidden: ii >= 5,
            showLine: true
          })
        }

        // au anomaly metrics
        let auanomData: Array<any>[] = []
        let auanomPointColors: Array<string>[] = []
        for (let ii = 0; ii < 17; ii++) {
          auanomData.push(new Array<any>())
          auanomPointColors.push(new Array<string>())
        }
        (Object.keys(metrics["AU Anomalies"])).forEach(element => {
          let obj = metrics["AU Anomalies"][element]
          for (let ii = 0; ii < auanomData.length; ii++) {
            auanomData[ii].push({ x: +element, y: obj[this.auTypes[ii]]["Intensity"] })
            if (obj[this.auTypes[ii]]["Anomalous"]) {
              auanomPointColors[ii].push("#90cd8a")
            } else {
              auanomPointColors[ii].push("rgba(148, 148, 148, 0.54)")
            }
          }
        })

        // smooth sentiment metrics
        let smoothsentimentLabels: string[] = []
        let smoothanger: any[] = []
        let smoothjoy: any[] = []
        let smoothsorrow: any[] = []
        let smoothsurprise: any[] = [];
        (Object.keys(metrics["Percent in Facial Emotion over last 10 seconds"])).forEach(element => {
          smoothsentimentLabels.push(element)
          let obj = metrics["Percent in Facial Emotion over last 10 seconds"][element]["Percentage"]
          smoothanger.push({ x: +element, y: obj["anger"] })
          smoothjoy.push({ x: +element, y: obj["joy"] })
          smoothsorrow.push({ x: +element, y: obj["sorrow"] })
          smoothsurprise.push({ x: +element, y: obj["surprise"] })
        })

        // text sentiment metrics
        let textMetrics: [] = metrics["Text Metrics"]
        let textLabels: number[] = []
        let transcript: TranscriptLine[] = []
        let textSentiment: any[] = []
        textMetrics.forEach(element => {
          let time = element["Time"] as number - baseTime
          textLabels.push(time)
          transcript.push(new TranscriptLine(time, element["Text"]))
          textSentiment.push({ x: time, y: element["Sentiment"] })
        })
        let textChartData = (canvas: any) => {
          const ctx = canvas.getContext("2d")
          const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
          gradient.addColorStop(0, "#E6D725");
          gradient.addColorStop(1, "#47CDD5");
          return {
            datasets: [
              {
                label: "Text Sentiment",
                data: textSentiment,
                borderColor: gradient,
                pointBorderColor: gradient,
                showLine: true
              }
            ]
          }
        }

        //smooth text sentiment metrics
        let smoothtextLabels: number[] = []
        let smoothtext: any[] = [];
        (Object.keys(metrics["Text sentiment over last 10 seconds"])).forEach(element => {
          smoothtextLabels.push(+element)
          let obj = metrics["Text sentiment over last 10 seconds"][element]
          smoothtext.push({ x: +element, y: obj })
        })
        let smoothtextChartData = (canvas: any) => {
          const ctx = canvas.getContext("2d")
          const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
          gradient.addColorStop(0, "#E6D725");
          gradient.addColorStop(1, "#47CDD5");
          return {
            datasets: [
              {
                label: "Text Sentiment",
                data: smoothtext,
                borderColor: gradient,
                pointBorderColor: gradient,
                showLine: true
              }
            ]
          }
        }

        //diverging sentiment ranges
        let divergingRanges: [number, number][] = []
        let leftBound = -1
        let rightBound = -1;
        (Object.keys(metrics["_Diverging Sentiment"])).forEach(element => {
          let obj = metrics["_Diverging Sentiment"][element]
          if (obj) {
            if (leftBound < 0) {
              leftBound = +element
              rightBound = leftBound
            } else {
              rightBound = +element
            }
          } else {
            if (rightBound > -1) {
              divergingRanges.push([leftBound, rightBound])
              leftBound = -1
              rightBound = -1
            }
          }
        })
        if (rightBound > -1) { divergingRanges.push([leftBound, rightBound]) }


        let avgtext: number = metrics["Average Text Sentiment"]["AvgTextSentiment"].toPrecision(2)
        this.setState({
          testemotionlabels: emotionLabels,
          transcript: transcript,
          auanomdata: auanomData,
          auanompointscolors: auanomPointColors,
          emotiondata: {
            // labels: emotionLabels,
            datasets: [
              {
                label: "Anger",
                data: anger,
                borderColor: "red",
                showLine: true
              },
              {
                label: "Joy",
                data: joy,
                borderColor: "yellow",
                showLine: true
              },
              {
                label: "Sorrow",
                data: sorrow,
                borderColor: "blue",
                showLine: true
              },
              {
                label: "Surprise",
                data: surprise,
                borderColor: "green",
                showLine: true
              },
            ]
          },
          smoothemotiondata: {
            datasets: [
              {
                label: "Anger",
                data: smoothanger,
                borderColor: "red",
                showLine: true,
                fill: false
              },
              {
                label: "Joy",
                data: smoothjoy,
                borderColor: "yellow",
                fill: false,
                showLine: true
              },
              {
                label: "Sorrow",
                data: smoothsorrow,
                borderColor: "blue",
                fill: false,
                showLine: true
              },
              {
                label: "Surprise",
                data: smoothsurprise,
                borderColor: "green",
                fill: false,
                showLine: true
              },
            ]
          },
          textdata: textChartData,
          textlabels: textLabels,
          smoothtextdata: smoothtextChartData,
          smoothtextlabels: smoothtextLabels,
          audata: {
            datasets: auData
          },
          avgtextoptions: {
            annotation:
            {
              drawTime: 'afterDatasetsDraw',
              annotations: [{
                type: 'line',
                mode: 'vertical',
                scaleID: 'x-axis-0',
                value: avgtext,
                borderColor: 'red',
                borderWidth: 2,
                label: { enabled: true, content: avgtext, position: "center" }
              }]
            },

            scales: {
              xAxes: [{
                type: 'linear',
                id: 'x-axis-0',
                // ticks: {
                //   max: 1,
                //   min: 0
                // }
              }],
              yAxes: [{
                ticks: {
                  display: false,
                  max: 0.9,
                  min: 0
                }
              }],
            }
          },
        }
        )
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

  getOption(index: number) {
    return {
      annotation: {
        drawTime: 'afterDatasetsDraw',
        annotations: [{
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: index,
          borderColor: 'red',
          borderWidth: 2,
          label: { backgroundColor: 'rgba(148, 148, 148, 0.54)', enabled: true, content: index, position: "top" },
        }],
      },
      scales: {
        xAxes: [{
          type: 'linear',
          id: 'x-axis-0'
        }]
      }
    }
  }

  getXValues(cd: any) {
    return (cd.datasets!![0].data!! as any[]).map(element => element.x) as number[]
  }

  alter_transcript(labels: number[]): (element: any) => void {
    return (element: any) => {
      console.log(element)

      if (element.length > 0) {
        let target = +labels[element[0]._index]
        let index = this.transcript_search(0, this.state.transcript.length - 1, target)
        this.listRef.current?.scrollToItem(index)
        let op = this.getOption(target)
        this.setState({
          genoptions: op,
        })
      }
    }
  }

  transcript_alter(time: any) {
    let op = this.getOption(time)
    this.setState({
      genoptions: op,
    })
  }

  transcript_render(props: ListChildComponentProps) {
    const { index, style } = props;

    var tempTranscript = this.state.transcript

    return (
      <ListItem button style={style} onClick={() => this.transcript_alter(tempTranscript[index].timestamp)}>
        <ListItemText primary={tempTranscript[index].text} secondary={tempTranscript[index].timestamp} />
      </ListItem>
    );
  }

  getSessions() {
    httpCall('POST', "http://localhost:8080/sessions/" + this.id, [], null, (result: any, rr: number) => {
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
          this.setState({ sessions: temp })
        }
      }
    })

  }

  render() {



    return (
      <Box justifyContent="center"
        className={this.props.classes.background}
        style={{ backgroundImage: `url(${Image})` }}>
        <div style={{ padding: 20 }}>
          <Grid
            container
            spacing={1}
            direction='row'
            alignItems='flex-start'
            justify='space-around'
          >
            <Grid item>
              <Box className={this.props.classes.button_background} style={{ backgroundImage: `url(${ProfileButtonImage})` }}>
                <Link to='/client/TruePatientProfile'>
                  <Button className={this.props.classes.top_button}>

                  </Button>
                </Link>
              </Box>
            </Grid>

            <Grid item>
              <Box className={this.props.classes.button_background} style={{ backgroundImage: `url(${AppointmentsButtonImage})` }}>
                <Link to='/client/TruePatientMainPage'>
                  <Button className={this.props.classes.top_button}>

                  </Button>
                </Link>
              </Box>
            </Grid>

            <Grid item>
              <Box className={this.props.classes.button_background} style={{ backgroundImage: `url(${SummaryButtonImage})` }}>
                <Link to='/client/TruePatientSummary'>
                  <Button className={this.props.classes.current_top_button}>

                  </Button>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </div>

        <div style={{ padding: 50, marginTop: "64px" }}>

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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => { this.search_term = e.target.value }}
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
                (<div style={{ overflow: 'auto', height: 487, display: 'block', maxWidth: 380 }}>
                  <Scatter
                    data={this.state.emotiondata}
                    options={this.state.genoptions}
                    // width={400}
                    height={380}
                    // getElementAtEvent={this.alter_transcript(this.state.emotiondata.labels as string[])} />
                    getElementAtEvent={this.alter_transcript(this.getXValues(this.state.emotiondata))} />
                  <Scatter
                    data={(canvas: any) => {
                      const gradient = canvas.getContext("2d").createLinearGradient(0, 0, canvas.width, 0)
                      gradient.addColorStop(0, "#47CDD5");
                      gradient.addColorStop(1, "#E6D725");
                      return {
                        datasets: [{
                          data: [{ x: 0, y: 1 }, { x: 1, y: 1 }], backgroundColor: gradient, showLine: true
                        }]
                      }
                    }}
                    options={this.state.avgtextoptions}
                    // width={400}
                    height={125}
                  />
                  <Scatter
                    data={this.state.textdata}
                    options={this.state.genoptions}
                    // width={400}
                    height={380}
                    getElementAtEvent={this.alter_transcript(this.state.textlabels)} />
                  <Scatter
                    data={this.state.smoothemotiondata}
                    options={this.state.genoptions}
                    // width={400}
                    height={380}
                    getElementAtEvent={this.alter_transcript(this.getXValues(this.state.smoothemotiondata))} />
                  <Scatter
                    data={this.state.smoothtextdata}
                    options={this.state.genoptions}
                    // width={400}
                    height={380}
                    getElementAtEvent={this.alter_transcript(this.state.smoothtextlabels)} />
                  <Scatter
                    data={this.state.audata}
                    options={this.state.genoptions}
                    // width={400}
                    height={380}
                    getElementAtEvent={this.alter_transcript(this.getXValues(this.state.audata))} />
                  <AUChart
                    auanomData={this.state.auanomdata}
                    auanomOpts={this.state.genoptions}
                    auanomPointColors={this.state.auanompointscolors}
                    func={this.alter_transcript(this.state.auanomdata[0].map(element => element.x))}
                  />
                </div>)}
              />
            </Grid>
            <Grid item xs={4} id="RightComponent">
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

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
import { Line } from 'react-chartjs-2';
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
  textlabels: string[];
  smoothtextdata: any;
  smoothtextlabels: string[];
  audata: ChartData;
  // auanom uses these as props for the component au anom chart
  auanomdata: Array<number>[];
  auanompointscolors: Array<string>[];
  auanomlabels: string[];
  emotionoptions: any;
  smoothemotionoptions: any;
  textoptions: any;
  smoothtextoptions: any;
  auoptions: any;
  auanomoptions: any;
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
  auanomData: Array<number>[]
  auanomPointColors: Array<string>[]
  auanomOpts: any
  labels: string[]
  func: (any: any) => void
}

export const AUChart: React.SFC<AUChartProps> = (props) => {

  const auTypes = ["Blink", "BrowLowerer", "CheekRaiser", "ChinRaiser", "Dimpler", "InnerBrowRaiser", "JawDrop", "LidTightener", "LipCornerDepressor", "LipCornerPuller", "LipStretcher", "LipTightener", "LipsPart", "NoseWrinkler", "OuterBrowRaiser", "UpperLidRaiser", "UpperLipRaiser"]
  const charts = []
  const getData = (data: Array<number>, pointColors: Array<string>, index: number) => {
    return {
      labels: props.labels,
      datasets: [
        {
          label: auTypes[index],
          data: data,
          pointBackgroundColor: pointColors,
        }
      ]
    } as ChartData
  }
  const getComponent = (index: number) => {
    return (
      <Line
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
      emotiondata: { labels: [], datasets: [{}] },
      smoothemotiondata: { labels: [], datasets: [{}] },
      textdata: { labels: [], datasets: [{}] },
      textlabels: [],
      smoothtextdata: { labels: [], datasets: [{}] },
      smoothtextlabels: [],
      audata: { labels: [], datasets: [{}] },
      auanomdata: [],
      auanompointscolors: [],
      auanomlabels: [],
      emotionoptions: {},
      smoothemotionoptions: {},
      textoptions: {},
      smoothtextoptions: {},
      auoptions: {},
      auanomoptions: {},
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
    this.getOption = this.getOption.bind(this);
    this.alter_transcript = this.alter_transcript.bind(this);
    this.data_search = this.data_search.bind(this);
    this.transcript_search = this.transcript_search.bind(this);
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
    httpCall('POST', "http://localhost:8080/metrics/" + this.sesId + "/aggregate", [], null, (result: any, rr: number) => {
      if (rr === 200) {
        let metrics = JSON.parse(result)
        let frameMetrics: Array<any> = metrics["Frame Metrics"]
        let emotionLabels: string[] = []
        let anger: number[] = []
        let joy: number[] = []
        let sorrow: number[] = []
        let surprise: number[] = []
        let auMetrics: Array<number>[] = []
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
          emotionLabels.push((element["Time"] as number - baseTime).toString())
          let emotion = element["Emotion"]
          anger.push(convStringToProb(emotion["anger"]))
          joy.push(convStringToProb(emotion["joy"]))
          sorrow.push(convStringToProb(emotion["sorrow"]))
          surprise.push(convStringToProb(emotion["surprise"]))
          for (let ii = 0; ii < auMetrics.length; ii++) {
            auMetrics[ii].push(element["AU"][this.auTypes[ii]])
          }
        });
        let auData = []
        for (let ii = 0; ii < auMetrics.length; ii++) {
          auData.push({
            label: this.auTypes[ii],
            data: auMetrics[ii],
            hidden: ii >= 5,
          })
        }

        // au anomaly metrics
        let auanomLabels: string[] = []
        let auanomData: Array<number>[] = []
        let auanomPointColors: Array<string>[] = []
        for (let ii = 0; ii < 17; ii++) {
          auanomData.push(new Array<number>())
          auanomPointColors.push(new Array<string>())
        }
        (Object.keys(metrics["AU Anomalies"])).forEach(element => {
          auanomLabels.push(element)
          let obj = metrics["AU Anomalies"][element]
          for (let ii = 0; ii < auanomData.length; ii++) {
            auanomData[ii].push(obj[this.auTypes[ii]]["Intensity"])
            if (obj[this.auTypes[ii]]["Anomalous"]) {
              auanomPointColors[ii].push("#90cd8a")
            } else {
              auanomPointColors[ii].push("rgba(148, 148, 148, 0.54)")
            }
          }
        })

        // smooth sentiment metrics
        let smoothsentimentLabels: string[] = []
        let smoothanger: number[] = []
        let smoothjoy: number[] = []
        let smoothsorrow: number[] = []
        let smoothsurprise: number[] = [];
        (Object.keys(metrics["Percent in Facial Emotion over last 10 seconds"])).forEach(element => {
          smoothsentimentLabels.push(element)
          let obj = metrics["Percent in Facial Emotion over last 10 seconds"][element]["Percentage"]
          smoothanger.push(obj["anger"])
          smoothjoy.push(obj["joy"])
          smoothsorrow.push(obj["sorrow"])
          smoothsurprise.push(obj["surprise"])
        })

        // text sentiment metrics
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
        let textChartData = (canvas: any) => {
          const ctx = canvas.getContext("2d")
          const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
          gradient.addColorStop(0, "#E6D725");
          gradient.addColorStop(1, "#47CDD5");
          return {
            labels: textLabels,
            datasets: [
              {
                label: "Text Sentiment",
                data: textSentiment,
                borderColor: gradient,
                pointBorderColor: gradient,
              }
            ]
          }
        }

        //smooth text sentiment metrics
        let smoothtextLabels: string[] = []
        let smoothtext: number[] = [];
        (Object.keys(metrics["Text sentiment over last 10 seconds"])).forEach(element => {
          smoothtextLabels.push(element)
          let obj = metrics["Text sentiment over last 10 seconds"][element]
          smoothtext.push(obj)
        })
        let smoothtextChartData = (canvas: any) => {
          const ctx = canvas.getContext("2d")
          const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
          gradient.addColorStop(0, "#E6D725");
          gradient.addColorStop(1, "#47CDD5");
          return {
            labels: smoothtextLabels,
            datasets: [
              {
                label: "Text Sentiment",
                data: smoothtext,
                borderColor: gradient,
                pointBorderColor: gradient,
              }
            ]
          }
        }

        let avgtext = Math.round((metrics["Average Text Sentiment"]["AvgTextSentiment"] + 1) / 2.0 * 40)
        this.setState({
          transcript: transcript,
          auanomdata: auanomData,
          auanomlabels: auanomLabels,
          auanompointscolors: auanomPointColors,
          emotiondata: {
            labels: emotionLabels,
            datasets: [
              {
                label: "Anger",
                data: anger,
                borderColor: "red",
              },
              {
                label: "Joy",
                data: joy,
                borderColor: "yellow",
              },
              {
                label: "Sorrow",
                data: sorrow,
                borderColor: "blue",
              },
              {
                label: "Surprise",
                data: surprise,
                borderColor: "green",
              },
            ]
          },
          smoothemotiondata: {
            labels: smoothsentimentLabels,
            datasets: [
              {
                label: "Anger",
                data: smoothanger,
                borderColor: "red",
                fill: false
              },
              {
                label: "Joy",
                data: smoothjoy,
                borderColor: "yellow",
                fill: false
              },
              {
                label: "Sorrow",
                data: smoothsorrow,
                borderColor: "blue",
                fill: false
              },
              {
                label: "Surprise",
                data: smoothsurprise,
                borderColor: "green",
                fill: false
              },
            ]
          },
          textdata: textChartData,
          textlabels: textLabels,
          smoothtextdata: smoothtextChartData,
          smoothtextlabels: smoothtextLabels,
          audata: {
            labels: emotionLabels,
            datasets: auData
          },
          avgtextoptions: {
            annotation: this.getOption(avgtext),
            scales: {
              yAxes: [{
                ticks: {
                  display: false,
                  max: 0.9,
                  min: 0
                }
              }]
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
      drawTime: 'afterDatasetsDraw',
      annotations: [{
        type: 'line',
        mode: 'vertical',
        scaleID: 'x-axis-0',
        value: index,
        borderColor: 'red',
        borderWidth: 2,
      }]
    }
  }

  alter_transcript(labels: string[]): (element: any) => void {
    return (element: any) => {
      console.log(element)

      if (element.length > 0) {
        let target = +labels[element[0]._index]
        let indexa = this.data_search(this.state.emotiondata.labels!!.map(Number), 0, this.state.emotiondata.labels!!.length as number - 1, target)
        let indexb = this.data_search(this.state.textlabels.map(Number), 0, this.state.textlabels.length as number - 1, target)
        let indexc = this.data_search(this.state.audata.labels!!.map(Number), 0, this.state.audata.labels!!.length as number - 1, target)
        let indexd = this.data_search(this.state.auanomlabels.map(Number), 0, this.state.auanomlabels.length as number - 1, target)
        let indexe = this.data_search(this.state.smoothemotiondata.labels!!.map(Number), 0, this.state.smoothemotiondata.labels!!.length as number - 1, target)
        let indexf = this.data_search(this.state.smoothtextlabels.map(Number), 0, this.state.smoothtextlabels.length as number - 1, target)
        let index = this.transcript_search(0, this.state.transcript.length - 1, target)
        this.listRef.current?.scrollToItem(index)
        this.setState({
          emotionoptions: {
            annotation: this.getOption(indexa)
          },
          textoptions: {
            annotation: this.getOption(indexb)
          },
          auoptions: {
            annotation: this.getOption(indexc)
          },
          auanomoptions: {
            annotation: this.getOption(indexd)
          },
          smoothemotionoptions: {
            annotation: this.getOption(indexe)
          },
          smoothtextoptions: {
            annotation: this.getOption(indexf)
          },
        })
      }
    }
  }

  transcript_alter(index: any) {
    let emotion_index = this.data_search(this.state.emotiondata.labels!!.map(Number), 0, this.state.emotiondata.labels!!.length as number - 1, this.state.transcript[index].timestamp)
    let text_index = this.data_search(this.state.textlabels.map(Number), 0, this.state.textlabels.length as number - 1, this.state.transcript[index].timestamp)
    let au_index = this.data_search(this.state.audata.labels!!.map(Number), 0, this.state.audata.labels!!.length as number - 1, this.state.transcript[index].timestamp)
    let auanom_index = this.data_search(this.state.auanomlabels.map(Number), 0, this.state.auanomlabels.length as number - 1, this.state.transcript[index].timestamp)
    let smoothemotion_index = this.data_search(this.state.smoothemotiondata.labels!!.map(Number), 0, this.state.smoothemotiondata.labels!!.length as number - 1, this.state.transcript[index].timestamp)
    let smoothtext_index = this.data_search(this.state.smoothtextlabels.map(Number), 0, this.state.smoothtextlabels.length as number - 1, this.state.transcript[index].timestamp)
    this.setState({
      emotionoptions: {
        annotation: this.getOption(emotion_index)
      },
      textoptions: {
        annotation: this.getOption(text_index)
      },
      auoptions: {
        annotation: this.getOption(au_index)
      },
      auanomoptions: {
        annotation: this.getOption(auanom_index)
      },
      smoothemotionoptions: {
        annotation: this.getOption(smoothemotion_index)
      },
      smoothtextoptions: {
        annotation: this.getOption(smoothtext_index)
      },
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
                  <Line
                    data={this.state.emotiondata}
                    options={this.state.emotionoptions}
                    // width={400}
                    height={380}
                    getElementAtEvent={this.alter_transcript(this.state.emotiondata.labels as string[])} />
                  <Line
                    data={(canvas: any) => {
                      const gradient = canvas.getContext("2d").createLinearGradient(0, 0, canvas.width, 0)
                      gradient.addColorStop(0, "#47CDD5");
                      gradient.addColorStop(1, "#E6D725");
                      return {
                        labels: Array.from(Array(41).keys()).map((ii) => {
                          let temp = ((ii / 40.0 * 2) - 1).toFixed(2)
                          return temp.toString()
                        }), datasets: [{ data: Array.from(Array(41).keys()).map((_) => 1), backgroundColor: gradient }]
                      }
                    }}
                    options={this.state.avgtextoptions}
                    // width={400}
                    height={125}
                  />
                  <Line
                    data={this.state.textdata}
                    options={this.state.textoptions}
                    // width={400}
                    height={380}
                    getElementAtEvent={this.alter_transcript(this.state.textlabels)} />
                  <Line
                    data={this.state.smoothemotiondata}
                    options={this.state.smoothemotionoptions}
                    // width={400}
                    height={380}
                    getElementAtEvent={this.alter_transcript(this.state.smoothemotiondata.labels as string[])} />
                  <Line
                    data={this.state.smoothtextdata}
                    options={this.state.smoothtextoptions}
                    // width={400}
                    height={380}
                    getElementAtEvent={this.alter_transcript(this.state.smoothtextlabels)} />
                  <Line
                    data={this.state.audata}
                    options={this.state.emotionoptions}
                    // width={400}
                    height={380}
                    getElementAtEvent={this.alter_transcript(this.state.audata.labels as string[])} />
                  <AUChart
                    auanomData={this.state.auanomdata}
                    auanomOpts={this.state.auanomoptions}
                    auanomPointColors={this.state.auanompointscolors}
                    labels={this.state.auanomlabels}
                    func={this.alter_transcript(this.state.auanomlabels)}
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

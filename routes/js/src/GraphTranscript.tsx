import React, { RefObject } from 'react';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { Scatter } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import 'chartjs-plugin-annotation';
import { SessionData, TranscriptLine, getOption, getXValues } from './funcs';
import { AUChart } from './AUChart';

interface PageProps extends WithStyles<typeof styles> {
  current_selection: number;
  data: SessionData[]
  graph_selection: number
}

interface PageState {
  current_selection: number;
  component_num: number;
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
}

const styles = (_: Theme) =>
  createStyles({
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
    transcript_list: {
      height: 200,
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
      background: "#cac7d6",
      marginRight: "8px"
    }
  })

class GraphTranscript extends React.Component<PageProps, PageState> {
  private listRef: RefObject<FixedSizeList> = React.createRef();

  constructor(props: PageProps) {
    super(props);
    this.state = {
      current_selection: props.current_selection,
      component_num: 0,
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
    }

    // If you're having problems with callbacks and "this is undefined", then use these types of lines
    this.page_alter = this.page_alter.bind(this);
    this.transcript_alter = this.transcript_alter.bind(this);
    this.transcript_render = this.transcript_render.bind(this);
    this.alter_transcript = this.alter_transcript.bind(this);
    this.transcript_search = this.transcript_search.bind(this);
  }
  componentDidMount() {
    this.page_alter()
  }
  componentWillReceiveProps() {
    this.page_alter()
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

  page_alter() {
    const currentSesh = this.props.data[this.props.current_selection]
    this.setState({
      transcript: currentSesh.transcript,
      auanomdata: currentSesh.auanomdata,
      auanompointscolors: currentSesh.auanompointscolors,
      emotiondata: {
        datasets: [
          {
            label: "Anger",
            data: currentSesh.angerData,
            borderColor: "red",
            showLine: true,
            lineTension: 0.22
          },
          {
            label: "Joy",
            data: currentSesh.joyData,
            borderColor: "yellow",
            showLine: true,
            lineTension: 0.22
          },
          {
            label: "Sorrow",
            data: currentSesh.sorrowData,
            borderColor: "blue",
            showLine: true,
            lineTension: 0.22
          },
          {
            label: "Surprise",
            data: currentSesh.supriseData,
            borderColor: "green",
            showLine: true,
            lineTension: 0.22
          },
        ]
      },
      smoothemotiondata: {
        datasets: [
          {
            label: "Anger",
            data: currentSesh.smoothangerData,
            borderColor: "red",
            showLine: true,
            fill: false,
            lineTension: 0.22
          },
          {
            label: "Joy",
            data: currentSesh.smoothjoyData,
            borderColor: "yellow",
            showLine: true,
            fill: false,
            lineTension: 0.22
          },
          {
            label: "Sorrow",
            data: currentSesh.smoothsorrowData,
            borderColor: "blue",
            showLine: true,
            fill: false,
            lineTension: 0.22
          },
          {
            label: "Surprise",
            data: currentSesh.smoothsupriseData,
            borderColor: "green",
            showLine: true,
            fill: false,
            lineTension: 0.22
          },
        ]
      },
      textdata: currentSesh.textData,
      textlabels: currentSesh.textLabels,
      smoothtextdata: currentSesh.smoothtextData,
      smoothtextlabels: currentSesh.smoothtextLabels,
      audata: {
        datasets: currentSesh.auDataSets
      },
      avgtextoptions: {
        annotation:
        {
          drawTime: 'afterDatasetsDraw',
          annotations: [{
            type: 'line',
            mode: 'vertical',
            scaleID: 'x-axis-0',
            value: currentSesh.avgTextAnnotationValue,
            borderColor: 'red',
            borderWidth: 2,
            label: { enabled: true, content: currentSesh.avgTextAnnotationValue, position: "center" }
          }]
        },

        scales: {
          xAxes: [{
            type: 'linear',
            id: 'x-axis-0',
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
    })
    return null
  }

  alter_transcript(labels: number[]): (element: any) => void {
    return (element: any) => {
      if (element.length > 0) {
        let target = +labels[element[0]._index]
        let index = this.transcript_search(0, this.state.transcript.length - 1, target)
        this.listRef.current?.scrollToItem(index)
        let op = getOption(target)
        this.setState({
          genoptions: op,
        })
      }
    }
  }

  transcript_alter(time: any) {
    let op = getOption(time)
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

  render() {
    return (
      <div style={{ padding: 8, marginTop: "16px" }}>
        <Grid container alignItems="center" justify="center" spacing={2}>
          <Grid item xs={12}>
            <div style={{ overflow: 'auto', height: 400, maxWidth: 900, margin: 'auto' }}>
              {
                this.props.graph_selection == 0 &&
                <Scatter
                  data={this.state.emotiondata}
                  options={this.state.genoptions}
                  width={900}
                  height={380}
                  getElementAtEvent={this.alter_transcript(getXValues(this.state.emotiondata))} />
              }
              {
                this.props.graph_selection == 1 &&
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
                  width={900}
                  height={125}
                />
              }
              {
                this.props.graph_selection == 2 &&
                <Scatter
                  data={this.state.textdata}
                  options={this.state.genoptions}
                  width={900}
                  height={380}
                  getElementAtEvent={this.alter_transcript(this.state.textlabels)} />
              }
              {
                this.props.graph_selection == 3 &&
                <Scatter
                  data={this.state.smoothemotiondata}
                  options={this.state.genoptions}
                  width={900}
                  height={380}
                  getElementAtEvent={this.alter_transcript(getXValues(this.state.smoothemotiondata))} />
              }
              {
                this.props.graph_selection == 4 &&
                <Scatter
                  data={this.state.smoothtextdata}
                  options={this.state.genoptions}
                  width={900}
                  height={380}
                  getElementAtEvent={this.alter_transcript(this.state.smoothtextlabels)} />
              }
              {
                this.props.graph_selection == 5 &&
                <Scatter
                  data={this.state.audata}
                  options={this.state.genoptions}
                  width={900}
                  height={380}
                  getElementAtEvent={this.alter_transcript(getXValues(this.state.audata))} />
              }
              {
                this.props.graph_selection == 6 &&
                <AUChart
                  auanomData={this.state.auanomdata}
                  auanomOpts={this.state.genoptions}
                  auanomPointColors={this.state.auanompointscolors}
                  func={this.alter_transcript(this.state.auanomdata[0].map(element => element.x))}
                />
              }
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={this.props.classes.transcript_list}>
              <FixedSizeList ref={this.listRef} height={487} width={"25vw"} itemSize={30} itemCount={this.state.transcript.length}>
                {this.transcript_render}
              </FixedSizeList>
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(GraphTranscript)

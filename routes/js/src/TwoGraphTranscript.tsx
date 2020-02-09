import React, { RefObject }  from 'react';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { Line } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import 'chartjs-plugin-annotation';
import { SessionData } from './funcs';

interface PageProps extends WithStyles<typeof styles> {
  current_selection: number;
  data: SessionData[]
  graphOne: number
  graphTwo: Number
}

interface PageState {
  current_selection: number;
  component_num: number;
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
        backgroundColor: "#b5b3bc",
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
        background: "#b5b3bc",
        marginRight: "8px"
    }
})

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
        width={900}
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

class TwoGraphTranscript extends React.Component<PageProps, PageState> {
  private listRef: RefObject<FixedSizeList> = React.createRef();

  constructor(props: PageProps) {
    super(props);
    this.state = {
      current_selection: props.current_selection,
      component_num: 0,
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

    // If you're having problems with callbacks and "this is undefined", then use these types of lines
    this.page_alter = this.page_alter.bind(this);
    this.transcript_alter = this.transcript_alter.bind(this);
    this.transcript_render = this.transcript_render.bind(this);
    this.getOption = this.getOption.bind(this);
    this.alter_transcript = this.alter_transcript.bind(this);
    this.data_search = this.data_search.bind(this);
    this.transcript_search = this.transcript_search.bind(this);
  }
  componentDidMount(){
      this.page_alter()
  }
  componentWillReceiveProps(){
    this.page_alter()
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

  page_alter() {
    const currentSesh = this.props.data[this.props.current_selection]
    this.setState({
        transcript: currentSesh.transcript,
        auanomdata: currentSesh.auanomdata,
        auanomlabels: currentSesh.auanomlabels,
        auanompointscolors: currentSesh.auanompointscolors,
        emotiondata: {
        labels: currentSesh.emotionLabels,
        datasets: [
            {
            label: "Anger",
            data: currentSesh.angerData,
            borderColor: "red",
            },
            {
            label: "Joy",
            data: currentSesh.joyData,
            borderColor: "yellow",
            },
            {
            label: "Sorrow",
            data: currentSesh.sorrowData,
            borderColor: "blue",
            },
            {
            label: "Surprise",
            data: currentSesh.supriseData,
            borderColor: "green",
            },
        ]
        },
        smoothemotiondata: {
        labels: currentSesh.smoothsentimentLabels,
        datasets: [
            {
            label: "Anger",
            data: currentSesh.smoothangerData,
            borderColor: "red",
            fill: false
            },
            {
            label: "Joy",
            data: currentSesh.smoothjoyData,
            borderColor: "yellow",
            fill: false
            },
            {
            label: "Sorrow",
            data: currentSesh.smoothsorrowData,
            borderColor: "blue",
            fill: false
            },
            {
            label: "Surprise",
            data: currentSesh.smoothsupriseData,
            borderColor: "green",
            fill: false
            },
        ]
        },
        textdata: currentSesh.textData,
        textlabels: currentSesh.textLabels,
        smoothtextdata: currentSesh.smoothtextData,
        smoothtextlabels: currentSesh.smoothtextLabels,
        audata: {
        labels: currentSesh.emotionLabels,
        datasets: currentSesh.auDataSets
        },
        avgtextoptions: {
        annotation: this.getOption(currentSesh.avgTextAnnotationValue),
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
    })
    return null
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
  
  render() {
    return (   
      <div style={{ padding: 8, marginTop: "16px" }}>
        <Grid container alignItems="center" justify="center" spacing={2}>
          <Grid item xs={6}>
            <div style={{ overflow: 'auto', height: 400, maxWidth: 900 , margin: 'auto'}}>
              {
                this.props.graphOne == 0 &&
                <Line
                  data={this.state.emotiondata}
                  options={this.state.emotionoptions}
                  width={900}
                  height={380}
                  getElementAtEvent={this.alter_transcript(this.state.emotiondata.labels as string[])} />
              }
              {
                this.props.graphOne == 1 &&
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
                  width={900}
                  height={125}
                />
              }
              {
                this.props.graphOne == 2 &&
                <Line
                  data={this.state.textdata}
                  options={this.state.textoptions}
                  width={900}
                  height={380}
                  getElementAtEvent={this.alter_transcript(this.state.textlabels)} />
              }
              {
                this.props.graphOne == 3 &&
                <Line
                  data={this.state.smoothemotiondata}
                  options={this.state.smoothemotionoptions}
                  width={900}
                  height={380}
                  getElementAtEvent={this.alter_transcript(this.state.smoothemotiondata.labels as string[])} />
              }
              {
                this.props.graphOne == 4 &&
                <Line
                  data={this.state.smoothtextdata}
                  options={this.state.smoothtextoptions}
                  width={900}
                  height={380}
                  getElementAtEvent={this.alter_transcript(this.state.smoothtextlabels)} />
              }
              {
                this.props.graphOne == 5 &&
                <Line
                  data={this.state.audata}
                  options={this.state.emotionoptions}
                  width={900}
                  height={380}
                  getElementAtEvent={this.alter_transcript(this.state.audata.labels as string[])} />
              }
              {
                this.props.graphOne == 6 &&
                <AUChart
                  auanomData={this.state.auanomdata}
                  auanomOpts={this.state.auanomoptions}
                  auanomPointColors={this.state.auanompointscolors}
                  labels={this.state.auanomlabels}
                  func={this.alter_transcript(this.state.auanomlabels)}
                />
              }
            </div>
          </Grid>
          <Grid item xs={6}>
            <div style={{ overflow: 'auto', height: 400, maxWidth: 900 , margin: 'auto'}}>
              {
                this.props.graphTwo == 0 &&
                <Line
                  data={this.state.emotiondata}
                  options={this.state.emotionoptions}
                  width={900}
                  height={380}
                  getElementAtEvent={this.alter_transcript(this.state.emotiondata.labels as string[])} />
              }
              {
                this.props.graphTwo == 1 &&
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
                  width={900}
                  height={125}
                />
              }
              {
                this.props.graphTwo == 2 &&
                <Line
                  data={this.state.textdata}
                  options={this.state.textoptions}
                  width={900}
                  height={380}
                  getElementAtEvent={this.alter_transcript(this.state.textlabels)} />
              }
              {
                this.props.graphTwo == 3 &&
                <Line
                  data={this.state.smoothemotiondata}
                  options={this.state.smoothemotionoptions}
                  width={900}
                  height={380}
                  getElementAtEvent={this.alter_transcript(this.state.smoothemotiondata.labels as string[])} />
              }
              {
                this.props.graphTwo == 4 &&
                <Line
                  data={this.state.smoothtextdata}
                  options={this.state.smoothtextoptions}
                  width={900}
                  height={380}
                  getElementAtEvent={this.alter_transcript(this.state.smoothtextlabels)} />
              }
              {
                this.props.graphTwo == 5 &&
                <Line
                  data={this.state.audata}
                  options={this.state.emotionoptions}
                  width={900}
                  height={380}
                  getElementAtEvent={this.alter_transcript(this.state.audata.labels as string[])} />
              }
              {
                this.props.graphTwo == 6 &&
                <AUChart
                  auanomData={this.state.auanomdata}
                  auanomOpts={this.state.auanomoptions}
                  auanomPointColors={this.state.auanompointscolors}
                  labels={this.state.auanomlabels}
                  func={this.alter_transcript(this.state.auanomlabels)}
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

export default withStyles(styles, {withTheme: true})(TwoGraphTranscript)

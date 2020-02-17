import React, { RefObject } from 'react';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { Scatter, Bar } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import 'chartjs-plugin-annotation';
import { SessionData, TranscriptLine, PageState, getOption, getXValues, getState, getDivergingOption, getScales } from './funcs';
import { SessionSummaryCharts } from './SessionSummaryCharts';

interface PageProps extends WithStyles<typeof styles> {
  current_selection: number;
  data: SessionData[]
  graphOne: number
  graphTwo: number
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
      width: '100%',
      height: 220,
      maxWidth: "100vw",
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

class TwoGraphTranscript extends React.Component<PageProps, PageState> {
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
      aggremotiondata: { datasets: [{ data: [] }] },

      avgtextoptions: {},
      genoptions: {},
      divergingoptions: {},
      divergingannotations: [],
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
    this.setState(getState(currentSesh))
    return null
  }

  alter_transcript(labels: number[]): (element: any) => void {
    return (element: any) => {
      if (element.length > 0) {
        let target = +labels[element[0]._index]
        let index = this.transcript_search(0, this.state.transcript.length - 1, target)
        this.listRef.current?.scrollToItem(index)
        let op = getOption(target)
        let dop = getDivergingOption(this.state.divergingannotations, target)
        this.setState({
          genoptions: op,
          divergingoptions: dop,
        })
      }
    }
  }

  transcript_alter(time: any) {
    let op = getOption(time)
    let dop = getDivergingOption(this.state.divergingannotations, time)
    this.setState({
      genoptions: op,
      divergingoptions: dop,
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
          <Grid item xs={6}>
            <SessionSummaryCharts
              emotiondata={this.state.emotiondata}
              aggremotiondata={this.state.aggremotiondata}
              textdata={this.state.textdata}
              smoothemotiondata={this.state.smoothemotiondata}
              smoothtextdata={this.state.smoothtextdata}
              audata={this.state.audata}
              auanomdata={this.state.auanomdata}
              genoptions={this.state.genoptions}
              divergingoptions={this.state.divergingoptions}
              avgtextoptions={this.state.avgtextoptions}
              textlabels={this.state.textlabels}
              smoothtextlabels={this.state.smoothtextlabels}
              auanompointscolors={this.state.auanompointscolors}
              selection={this.props.graphOne}
              alter_transcript={this.alter_transcript}
            />

          </Grid>
          <Grid item xs={6}>
            <SessionSummaryCharts
              emotiondata={this.state.emotiondata}
              aggremotiondata={this.state.aggremotiondata}
              textdata={this.state.textdata}
              smoothemotiondata={this.state.smoothemotiondata}
              smoothtextdata={this.state.smoothtextdata}
              audata={this.state.audata}
              auanomdata={this.state.auanomdata}
              genoptions={this.state.genoptions}
              divergingoptions={this.state.divergingoptions}
              avgtextoptions={this.state.avgtextoptions}
              textlabels={this.state.textlabels}
              smoothtextlabels={this.state.smoothtextlabels}
              auanompointscolors={this.state.auanompointscolors}
              selection={this.props.graphTwo}
              alter_transcript={this.alter_transcript}
            />

          </Grid>
          <Grid item xs={12}>
            <div className={this.props.classes.transcript_list}>
              <FixedSizeList ref={this.listRef} height={220} width={"100vw"} itemSize={50} itemCount={this.state.transcript.length}>
                {this.transcript_render}
              </FixedSizeList>
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(TwoGraphTranscript)

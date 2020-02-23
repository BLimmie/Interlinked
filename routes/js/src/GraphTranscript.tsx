import React, { RefObject } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import 'chartjs-plugin-annotation';
import 'chartjs-plugin-zoom';
import { SessionData, TranscriptLine, getOption, getDivergingOption, getState, PageState } from './funcs';
import { SessionSummaryCharts } from './SessionSummaryCharts';

interface PageProps {
  currentSesh: SessionData
  graph_selection: number
  graph_selection_two: number
}

const useStyles = makeStyles((theme: Theme) =>
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
      background: "#cac7d6",
      marginRight: "8px"
    },
    primaryListFontSize: {
      '& span': { fontSize: "38px" }
    },
  })
)

export default function GraphTranscript(props: PageProps) {
  const { currentSesh, graph_selection, graph_selection_two } = props
  const classes = useStyles();


  const listRef: RefObject<FixedSizeList> = React.createRef();
  const transcript: TranscriptLine[] = currentSesh.transcript

  const pageState: PageState = getState(currentSesh)

  const [divergingoptions, setDivergingoptions] = React.useState(pageState.divergingoptions)
  const [genoptions, setGenOptions] = React.useState(pageState.genoptions)

  const transcript_search = (ll: number, rr: number, ii: number): number => {
    if (rr >= ll) {
      let mid = ll + Math.floor((rr - ll) / 2)
      if (transcript[mid].timestamp === ii) {
        return mid
      }
      if (transcript[mid].timestamp > ii) {
        return transcript_search(ll, mid - 1, ii)
      }
      return transcript_search(mid + 1, rr, ii)
    } else if (rr < 0) { return 0 }
    else { return rr }
  }

  const alter_transcript = (labels: number[]): (element: any) => void => {
    return (element: any) => {
      if (element.length > 0) {
        let target = +labels[element[0]._index]
        let index = transcript_search(0, transcript.length - 1, target)
        listRef.current?.scrollToItem(index)
        let op = getOption(target)
        let dop = getDivergingOption(pageState.divergingannotations, target)
        setGenOptions(op)
        setDivergingoptions(dop)
      }
    }
  }

  const transcript_alter = (time: any) => {
    let op = getOption(time)
    let dop = getDivergingOption(pageState.divergingannotations, time)
    setGenOptions(op)
    setDivergingoptions(dop)
  }

  const transcript_render = (props: ListChildComponentProps) => {
    const { index, style } = props;

    return (
      <ListItem button style={style} onClick={() => transcript_alter(currentSesh.transcript[index].timestamp)}>
        <ListItemText className={classes.primaryListFontSize} primary={currentSesh.transcript[index].text}
          secondary={currentSesh.transcript[index].timestamp}
        />
      </ListItem>
    );
  }

  return (
    <div style={{ padding: 8, marginTop: "16px" }}>
      <Grid container alignItems="center" justify="center" spacing={2}>
        {graph_selection_two == -1 &&
          <Grid item xs={12}>
            <SessionSummaryCharts
              emotiondata={pageState.emotiondata}
              aggremotiondata={pageState.aggremotiondata}
              textdata={pageState.textdata}
              smoothemotiondata={pageState.smoothemotiondata}
              smoothtextdata={pageState.smoothtextdata}
              audata={pageState.audata}
              auanomdata={pageState.auanomdata}
              genoptions={genoptions}
              divergingoptions={divergingoptions}
              avgtextoptions={pageState.avgtextoptions}
              textlabels={pageState.textlabels}
              smoothtextlabels={pageState.smoothtextlabels}
              auanompointscolors={pageState.auanompointscolors}
              selection={graph_selection}
              alter_transcript={alter_transcript}
            />
          </Grid>
        }
        {graph_selection_two >= 0 &&
          <Grid container>
            <Grid item xs={6}>
              <SessionSummaryCharts
                emotiondata={pageState.emotiondata}
                aggremotiondata={pageState.aggremotiondata}
                textdata={pageState.textdata}
                smoothemotiondata={pageState.smoothemotiondata}
                smoothtextdata={pageState.smoothtextdata}
                audata={pageState.audata}
                auanomdata={pageState.auanomdata}
                genoptions={genoptions}
                divergingoptions={divergingoptions}
                avgtextoptions={pageState.avgtextoptions}
                textlabels={pageState.textlabels}
                smoothtextlabels={pageState.smoothtextlabels}
                auanompointscolors={pageState.auanompointscolors}
                selection={graph_selection}
                alter_transcript={alter_transcript}
              />
            </Grid>
            <Grid item xs={6}>
              <SessionSummaryCharts
                emotiondata={pageState.emotiondata}
                aggremotiondata={pageState.aggremotiondata}
                textdata={pageState.textdata}
                smoothemotiondata={pageState.smoothemotiondata}
                smoothtextdata={pageState.smoothtextdata}
                audata={pageState.audata}
                auanomdata={pageState.auanomdata}
                genoptions={genoptions}
                divergingoptions={divergingoptions}
                avgtextoptions={pageState.avgtextoptions}
                textlabels={pageState.textlabels}
                smoothtextlabels={pageState.smoothtextlabels}
                auanompointscolors={pageState.auanompointscolors}
                selection={graph_selection_two}
                alter_transcript={alter_transcript}
              />
            </Grid>
          </Grid>
        }
        <Grid item xs={12}>
          <div className={classes.transcript_list}>
            <FixedSizeList ref={listRef} height={220} width={"100vw"} itemSize={80} itemCount={transcript.length}>
              {transcript_render}
            </FixedSizeList>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

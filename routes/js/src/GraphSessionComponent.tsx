import React from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Grid, FormControl, InputLabel, Select, MenuItem, Typography } from '@material-ui/core'
import { SessionData, PageState, getState, TranscriptLine } from './funcs'
import GraphTranscript from './GraphTranscript';

const clone = require('rfdc')()

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    width: {
      width: '100%'
    }
  })
)

interface GraphSessionProps extends React.HTMLAttributes<HTMLElement> {
  SessionDataArr: SessionData[]
  CompareGraphs?: boolean
}

// This function is what arranges all of the individual elements into the complete UI
export default function GraphSessionComponent(props: GraphSessionProps) {
  const { SessionDataArr, CompareGraphs } = props

  const [activeGraph, setActiveGraph] = React.useState<number>(0)
  const [activeSession, setActiveSession] = React.useState<number>(0)
  const [currentSesh, setCurrentSesh] = React.useState<SessionData>(SessionDataArr[0])
  const [secondGraph, setSecondGraph] = React.useState<number>(0)

  const classes = useStyles();

  const selectGraph = (event: React.ChangeEvent<{ value: unknown }>) => {
    setActiveGraph(event.target.value as number)
  }

  const selectSecondGraph = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSecondGraph(event.target.value as number)
  }

  const selectSession = (event: React.ChangeEvent<{ value: unknown }>) => {
    setActiveSession(event.target.value as number)
    setCurrentSesh(SessionDataArr[event.target.value as number])
  }
  if (CompareGraphs != undefined && CompareGraphs) {
    return (
      <Grid container style={{ height: '100%', width: '100%' }}>
        <Grid item xs={3} style={{ marginRight: '16px' }}>
          <FormControl className={classes.width}>
            <InputLabel> Select Graph Type </InputLabel>
            <Select
              value={activeGraph}
              onChange={selectGraph}
            >
              <MenuItem value={0}>Emotion Graph</MenuItem>
              <MenuItem value={1}>Aggregate Emotion/Text Sentiment</MenuItem>
              <MenuItem value={2}>Text Sentiment Graph</MenuItem>
              <MenuItem value={3}>Smooth Emotion Graph</MenuItem>
              <MenuItem value={4}>Smooth Text Graph</MenuItem>
              <MenuItem value={5}>Smooth AU Graph</MenuItem>
              <MenuItem value={6}>AU Charts</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={3}>
          <FormControl className={classes.width}>
            <InputLabel> Select Session </InputLabel>
            <Select
              value={activeSession}
              onChange={selectSession}
            >
              {
                SessionDataArr.map((session, index) => {
                  return <MenuItem value={index}>{session.seshDate}</MenuItem>
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={3} style={{ marginRight: '16px' }}>
          <FormControl className={classes.width}>
            <InputLabel> Select Graph Type </InputLabel>
            <Select
              value={secondGraph}
              onChange={selectSecondGraph}
            >
              <MenuItem value={0}>Emotion Graph</MenuItem>
              <MenuItem value={1}>Aggregate Emotion/Text Sentiment</MenuItem>
              <MenuItem value={2}>Text Sentiment Graph</MenuItem>
              <MenuItem value={3}>Smooth Emotion Graph</MenuItem>
              <MenuItem value={4}>Smooth Text Graph</MenuItem>
              <MenuItem value={5}>Smooth AU Graph</MenuItem>
              <MenuItem value={6}>AU Charts</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={3} />
        <Grid item xs={12}>
          <GraphTranscript
            transcript={currentSesh.transcript}
            pageState={clone(getState(currentSesh))}
            graph_selection={activeGraph}
            graph_selection_two={secondGraph}
          />
        </Grid>
      </Grid>
    )
  }
  return (
    <Grid container style={{ height: '100%', width: '100%' }}>
      <Grid item xs={3} />
      <Grid item xs={3} style={{ marginRight: '16px' }}>
        <FormControl className={classes.width}>
          <InputLabel> Select Graph Type </InputLabel>
          <Select
            value={activeGraph}
            onChange={selectGraph}
          >
            <MenuItem value={0}>Emotion Graph</MenuItem>
            <MenuItem value={1}>Aggregate Emotion/Text Sentiment</MenuItem>
            <MenuItem value={2}>Text Sentiment Graph</MenuItem>
            <MenuItem value={3}>Smooth Emotion Graph</MenuItem>
            <MenuItem value={4}>Smooth Text Graph</MenuItem>
            <MenuItem value={5}>Smooth AU Graph</MenuItem>
            <MenuItem value={6}>AU Charts</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <FormControl className={classes.width}>
          <InputLabel> Select Session </InputLabel>
          <Select
            value={activeSession}
            onChange={selectSession}
          >
            {
              SessionDataArr.map((session, index) => {
                return <MenuItem value={index}>{session.seshDate}</MenuItem>
              })
            }
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={12}>
        <GraphTranscript
          transcript={currentSesh.transcript}
          pageState={clone(getState(currentSesh))}
          graph_selection={activeGraph}
          graph_selection_two={-1}
        />
      </Grid>
    </Grid>
  )
}
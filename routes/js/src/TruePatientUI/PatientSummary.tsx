import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import Image from '../TrueImages/background_Summary_16-9.png'
import ProfileButtonImage from '../ButtonAssets/MyProfile.png'
import AppointmentsButtonImage from '../ButtonAssets/Appointments.png'
import SummaryButtonImage from '../ButtonAssets/SummarySelected.png'
import { Box, CircularProgress, FormControlLabel, Switch } from '@material-ui/core'
import { Link } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core'
import { SessionData, getPatientSessions, getSessionsData } from '../funcs'
import GraphSessionComponent from '../GraphSessionComponent'

const useStyles = makeStyles((theme: Theme) => createStyles({
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
  buttonStyle: {
    background: "#cac7d6",
    marginRight: "8px"
  }
})
)

interface PatientSummaryProps { }

const PatientSummary = (props: PatientSummaryProps) => {
  const id: string = sessionStorage.getItem('id')!

  const classes = useStyles();

  const [AllSessionData, SetAllSessionData] = React.useState<SessionData[]>([])
  const [CompareSessions, SetCompareSessions] = React.useState<boolean>(false)
  const [CompareGraphs, SetCompareGraphs] = React.useState<boolean>(false)

  React.useEffect(() => {
    getPatientSessions(id).then(async (patientSessions) => {
      getSessionsData(patientSessions).then((value) => {
        SetAllSessionData(value)
      })
    })
  }, [])

  const changeCompareSessions = () => {
    SetCompareSessions(!CompareSessions)
  }

  const changeCompareGraphs = () => {
    SetCompareGraphs(!CompareGraphs)
  }

  return (
    <Box justifyContent="center"
      className={classes.background}
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
            <Box className={classes.button_background} style={{ backgroundImage: `url(${ProfileButtonImage})` }}>
              <Link to='/client/TruePatientProfile'>
                <Button className={classes.top_button}>

                </Button>
              </Link>
            </Box>
          </Grid>

          <Grid item>
            <Box className={classes.button_background} style={{ backgroundImage: `url(${AppointmentsButtonImage})` }}>
              <Link to='/client/TruePatientAppointments'>
                <Button className={classes.top_button}>

                </Button>
              </Link>
            </Box>
          </Grid>

          <Grid item>
            <Box className={classes.button_background} style={{ backgroundImage: `url(${SummaryButtonImage})` }}>
              <Link to='/client/TruePatientMainPage'>
                <Button className={classes.current_top_button}>

                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </div>

      <div style={{ padding: 16, marginTop: "88px" }}>
        {
          AllSessionData.length == 0 &&
          <CircularProgress />
        }
        {AllSessionData.length > 0 &&
          <Grid container>
            {
              !CompareSessions &&
              <Grid container>
                <Grid xs={8} />
                <Grid xs={2} >
                  <FormControlLabel
                    control={
                      <Switch checked={CompareGraphs} onChange={changeCompareGraphs} value="CompareGraphs" />
                    }
                    label="Compare Graphs"
                  />
                </Grid>
                <Grid xs={2} >
                  <FormControlLabel
                    control={
                      <Switch checked={CompareSessions} onChange={changeCompareSessions} value="CompareSessions" />
                    }
                    label="Compare Sessions"
                  />
                </Grid>
              </Grid>
            }
            {
              CompareSessions &&
              <Grid container>
                <Grid xs={9} />
                <Grid xs={3} >
                  <FormControlLabel
                    control={
                      <Switch checked={CompareSessions} onChange={changeCompareSessions} value="CompareSessions" />
                    }
                    label="Compare Sessions"
                  />
                </Grid>
              </Grid>
            }
            {
              !CompareSessions &&
              <Grid xs={12} >
                <GraphSessionComponent
                  SessionDataArr={AllSessionData}
                  CompareGraphs={CompareGraphs}
                />
              </Grid>
            }
            {
              CompareSessions &&
              <Grid container>
                <Grid xs={6} >
                  <GraphSessionComponent SessionDataArr={AllSessionData} />
                </Grid>
                <Grid xs={6} >
                  <GraphSessionComponent SessionDataArr={AllSessionData} />
                </Grid>
              </Grid>
            }
          </Grid>
        }
      </div>
    </Box>
  )
}

export default (PatientSummary)
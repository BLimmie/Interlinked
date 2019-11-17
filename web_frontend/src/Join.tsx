import React from 'react'
import { Grid, Button } from '@material-ui/core'

export default class Join extends React.Component {
  render() {
    return (
      <Grid
        container
        spacing={3}
        wrap='nowrap'
        alignItems='center'
        justify='center'
      >
        <Grid item>
          <Button variant='contained'>
            Join
          </Button>
        </Grid>
        <Grid item>
          <Button variant='contained'>
            Start
          </Button>
        </Grid>
      </Grid>
    )
  }
}

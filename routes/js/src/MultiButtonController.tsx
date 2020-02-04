import React, { ReactComponentElement } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Button, Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
  },
  buttonStyle :{
    background: "#b5b3bc",
    marginRight: "8px"
  }

}));

interface MultiButtonControllerProps {
  leftComponent: React.ReactElement
}

export const MultiButtonController: React.SFC<MultiButtonControllerProps> = (props) => {
  const classes = useStyles();
  const [componentNum, setComponentNum] = React.useState<number>(0)


  return (
    <Grid container>
        <Grid item xs={4}>
          <Button className={classes.buttonStyle} onClick={() => {setComponentNum(0)}}>
            Left Component
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button className={classes.buttonStyle} onClick={() => {setComponentNum(1)}}>
            Middle Component
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button className={classes.buttonStyle} onClick={() => {setComponentNum(2)}}>
            Right Component
          </Button>
        </Grid>
        <Grid item xs={12}>
          <div>
          {componentNum == 0 &&
            props.leftComponent}
          </div>
          {componentNum == 1 &&
          <div />
          }
          {componentNum == 2 &&
          <div />
          }
        </Grid>
    </Grid>
  )
}
import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Input, InputLabel, Button, Grid } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  white: {
    color: 'white'
  }
}));

interface roomTextFieldProps {
    setRoomName: React.Dispatch<React.SetStateAction<string>>
    roomName: string
    submitRoom: () => void
    inputLabel: string
}

export const RoomTextField: React.SFC<roomTextFieldProps> = (props) => {
  const classes = useStyles();
  const {roomName, setRoomName, submitRoom, inputLabel} = props
  return (
    <Grid container>
        <Grid item xs={12}>
          <InputLabel className={classes.white}>{inputLabel}</InputLabel>
          <Input
          className={classes.white}
          placeholder='room name'
          value={roomName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setRoomName(e.target.value)
          }}
          />
        </Grid>
        <Grid item>
            <Button
                color="primary"
                size="large"
                variant="outlined"
                onClick={() => submitRoom()}
            >
                Submit
            </Button>
        </Grid>
    </Grid>
  );
}
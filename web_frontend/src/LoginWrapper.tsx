import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Login from './Login';

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    flexGrow: 1,
    background: '#cdddf7'
  },
  button: {
    background: "#ffffff"
  }
}),
);

export default function LoginWrapper() {
    const classes = useStyles();

    return (<Login class={classes} />)
}
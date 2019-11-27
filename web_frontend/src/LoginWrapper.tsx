import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Login from './Login';
import Image from './Images/test.png';
import { Box } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    flexGrow: 1,
    background: '#cdddf7'
  },
  button: {
    background: "#ffffff"
  },
  background: {
    height: "100vh",
    width: "100vw",
  },
}),
);

export default function LoginWrapper() {
    const classes = useStyles();

    return (
      <Box justifyContent="center"
           className={classes.background}
           style={{backgroundImage: `url(${Image})` }}>
        <Login class={classes} />
      </Box>
    )
}
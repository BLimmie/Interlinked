import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Dashboard from './Dashboard';
import Image from './Images/background_login_16-9.png'
import { Box } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
createStyles({
  background: {
    height: "100vh",
    width: "100vw",
    backgroundSize: 'cover'
  },
}),
);

export default function DashboardWrapper() {
    const classes = useStyles();

    return (
      <Box justifyContent="center"
           className={classes.background}
           style={{backgroundImage: `url(${Image})` }}>
        <Dashboard />
      </Box>
    )
}
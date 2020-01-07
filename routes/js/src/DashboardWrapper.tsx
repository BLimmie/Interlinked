import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Dashboard from './Dashboard';
import Image from './Images/test.png';
import { Box } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
createStyles({
  background: {
    height: "100vh",
    width: "100vw",
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
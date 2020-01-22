import React from 'react';
import {Bar} from 'react-chartjs-2'
import { Grid, Button, Box, ThemeProvider, createMuiTheme, Container } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';

var globalThis = window

const AU_theme = createMuiTheme({
    palette: {
      primary: {
        main: '#6e6b7a',
      },
      secondary: {
        main: '#c7c6ce'
      }
    },
    typography: {
      fontSize: 15,
    }
  });


var AU_strings = ["Upper Lid Raiser", "Lid Tightener", "Inner Brow Raiser", "Outer Brow Raiser", "Brow Lowerer", "Blink",
  "Nose Wrinkler", "Cheek Raiser", "Dimpler", "Upper Lip Raiser", "Lip Corner Depressor",
  "Lip Corner Puller", "Lip Stretcher", "Lip Tightener", "Lips Part",
  "Chin Raiser", "Jaw Drop"]

function Display_AU0() {   
    if (globalThis.AU_exists[15] === true) {
        return (
            <ThemeProvider theme={AU_theme}>
                <Typography variant="body1" color="primary" align="center" gutterBottom>
                    {AU_strings[0]}
                </Typography>
            </ThemeProvider>
        );
    }

    else {
        return (
            <ThemeProvider theme={AU_theme}>
                <Typography variant="body1" color="secondary" align="center" gutterBottom>
                    {AU_strings[0]}
                </Typography>
            </ThemeProvider>
        );
    }
}

function Display_AU1() {   
    if (globalThis.AU_exists[7] === true) {
        return (
            <ThemeProvider theme={AU_theme}>
                <Typography variant="body1" color="primary" align="center" gutterBottom>
                    {AU_strings[1]}
                </Typography>
            </ThemeProvider>
        );
    }

    else {
        return (
            <ThemeProvider theme={AU_theme}>
                <Typography variant="body1" color="secondary" align="center" gutterBottom>
                    {AU_strings[1]}
                </Typography>
            </ThemeProvider>
        );
    }
}

function Display_AU2() {   
    if (globalThis.AU_exists[5] === true) {
        return (
            <ThemeProvider theme={AU_theme}>
                <Typography variant="body1" color="primary" align="center" gutterBottom>
                    {AU_strings[2]}
                </Typography>
            </ThemeProvider>
        );
    }

    else {
        return (
            <ThemeProvider theme={AU_theme}>
                <Typography variant="body1" color="secondary" align="center" gutterBottom>
                    {AU_strings[2]}
                </Typography>
            </ThemeProvider>
        );
    }
}

function Display_AU3() {   
    if (globalThis.AU_exists[14] === true) {
        return (
            <ThemeProvider theme={AU_theme}>
                <Typography variant="body1" color="primary" align="center" gutterBottom>
                    {AU_strings[3]}
                </Typography>
            </ThemeProvider>
        );
    }

    else {
        return (
            <ThemeProvider theme={AU_theme}>
                <Typography variant="body1" color="secondary" align="center" gutterBottom>
                    {AU_strings[3]}
                </Typography>
            </ThemeProvider>
        );
    }
}

function Display_AU4() {   
    if (globalThis.AU_exists[1] === true) {
        return (
            <ThemeProvider theme={AU_theme}>
                <Typography variant="body1" color="primary" align="center" gutterBottom>
                    {AU_strings[4]}
                </Typography>
            </ThemeProvider>
        );
    }

    else {
        return (
            <ThemeProvider theme={AU_theme}>
                <Typography variant="body1" color="secondary" align="center" gutterBottom>
                    {AU_strings[4]}
                </Typography>
            </ThemeProvider>
        );
    }
}

function Display_AU5() {   
    if (globalThis.AU_exists[0] === true) {
        return (
            <ThemeProvider theme={AU_theme}>
                <Typography variant="body1" color="primary" align="center" gutterBottom>
                    {AU_strings[5]}
                </Typography>
            </ThemeProvider>
        );
    }

    else {
        return (
            <ThemeProvider theme={AU_theme}>
                <Typography variant="body1" color="secondary" align="center" gutterBottom>
                    {AU_strings[5]}
                </Typography>
            </ThemeProvider>
        );
    }
}

function Display_AU6() {   
    if (globalThis.AU_exists[13] === true) {
        return (
            <ThemeProvider theme={AU_theme}>
                <Typography variant="body1" color="primary" align="center" gutterBottom>
                    {AU_strings[6]}
                </Typography>
            </ThemeProvider>
        );
    }

    else {
        return (
            <ThemeProvider theme={AU_theme}>
                <Typography variant="body1" color="secondary" align="center" gutterBottom>
                    {AU_strings[6]}
                </Typography>
            </ThemeProvider>
        );
    }
}

function Display_AU7() {   
    if (globalThis.AU_exists[2] === true) {
        return (
            <ThemeProvider theme={AU_theme}>
                <Typography variant="body1" color="primary" align="center" gutterBottom>
                    {AU_strings[7]}
                </Typography>
            </ThemeProvider>
        );
    }

    else {
        return (
            <ThemeProvider theme={AU_theme}>
                <Typography variant="body1" color="secondary" align="center" gutterBottom>
                    {AU_strings[7]}
                </Typography>
            </ThemeProvider>
        );
    }
}

function Display_AU8() {   
    if (globalThis.AU_exists[4] === true) {
        return (
            <ThemeProvider theme={AU_theme}>
                <Typography variant="body1" color="primary" align="center" gutterBottom>
                    {AU_strings[8]}
                </Typography>
            </ThemeProvider>
        );
    }

    else {
        return (
            <ThemeProvider theme={AU_theme}>
                <Typography variant="body1" color="secondary" align="center" gutterBottom>
                    {AU_strings[8]}
                </Typography>
            </ThemeProvider>
        );
    }
}

function Display_AU9() {   
    if (globalThis.AU_exists[16] === true) {
        return (
            <ThemeProvider theme={AU_theme}>
                <Typography variant="body1" color="primary" align="center" gutterBottom>
                    {AU_strings[9]}
                </Typography>
            </ThemeProvider>
        );
    }

    else {
        return (
            <ThemeProvider theme={AU_theme}>
                <Typography variant="body1" color="secondary" align="center" gutterBottom>
                    {AU_strings[9]}
                </Typography>
            </ThemeProvider>
        );
    }
}

function Display_AU10() {   
    if (globalThis.AU_exists[8] === true) {
        return (
            <ThemeProvider theme={AU_theme}>
                <Typography variant="body1" color="primary" align="center" gutterBottom>
                    {AU_strings[10]}
                </Typography>
            </ThemeProvider>
        );
    }

    else {
        return (
            <ThemeProvider theme={AU_theme}>
                <Typography variant="body1" color="secondary" align="center" gutterBottom>
                    {AU_strings[10]}
                </Typography>
            </ThemeProvider>
        );
    }
}

function Display_AU11() {   
    if (globalThis.AU_exists[9] === true) {
        return (
            <ThemeProvider theme={AU_theme}>
                <Typography variant="body1" color="primary" align="center" gutterBottom>
                    {AU_strings[11]}
                </Typography>
            </ThemeProvider>
        );
    }

    else {
        return (
            <ThemeProvider theme={AU_theme}>
                <Typography variant="body1" color="secondary" align="center" gutterBottom>
                    {AU_strings[11]}
                </Typography>
            </ThemeProvider>
        );
    }
}

function Display_AU12() {   
    if (globalThis.AU_exists[10] === true) {
        return (
            <ThemeProvider theme={AU_theme}>
                <Typography variant="body1" color="primary" align="center" gutterBottom>
                    {AU_strings[12]}
                </Typography>
            </ThemeProvider>
        );
    }

    else {
        return (
            <ThemeProvider theme={AU_theme}>
                <Typography variant="body1" color="secondary" align="center" gutterBottom>
                    {AU_strings[12]}
                </Typography>
            </ThemeProvider>
        );
    }
}

function Display_AU13() {   
    if (globalThis.AU_exists[11] === true) {
        return (
            <ThemeProvider theme={AU_theme}>
                <Typography variant="body1" color="primary" align="center" gutterBottom>
                    {AU_strings[13]}
                </Typography>
            </ThemeProvider>
        );
    }

    else {
        return (
            <ThemeProvider theme={AU_theme}>
                <Typography variant="body1" color="secondary" align="center" gutterBottom>
                    {AU_strings[13]}
                </Typography>
            </ThemeProvider>
        );
    }
}

function Display_AU14() {   
    if (globalThis.AU_exists[12] === true) {
        return (
            <ThemeProvider theme={AU_theme}>
                <Typography variant="body1" color="primary" align="center" gutterBottom>
                    {AU_strings[14]}
                </Typography>
            </ThemeProvider>
        );
    }

    else {
        return (
            <ThemeProvider theme={AU_theme}>
                <Typography variant="body1" color="secondary" align="center" gutterBottom>
                    {AU_strings[14]}
                </Typography>
            </ThemeProvider>
        );
    }
}

function Display_AU15() {   
    if (globalThis.AU_exists[3] === true) {
        return (
            <ThemeProvider theme={AU_theme}>
                <Typography variant="body1" color="primary" align="center" gutterBottom>
                    {AU_strings[15]}
                </Typography>
            </ThemeProvider>
        );
    }

    else {
        return (
            <ThemeProvider theme={AU_theme}>
                <Typography variant="body1" color="secondary" align="center" gutterBottom>
                    {AU_strings[15]}
                </Typography>
            </ThemeProvider>
        );
    }
}

function Display_AU16() {   
    if (globalThis.AU_exists[6] === true) {
        return (
            <ThemeProvider theme={AU_theme}>
                <Typography variant="body1" color="primary" align="center" gutterBottom>
                    {AU_strings[16]}
                </Typography>
            </ThemeProvider>
        );
    }

    else {
        return (
            <ThemeProvider theme={AU_theme}>
                <Typography variant="body1" color="secondary" align="center" gutterBottom>
                    {AU_strings[16]}
                </Typography>
            </ThemeProvider>
        );
    }
}


export default function AUs() {
    return (
        <Container maxWidth="lg">
          <Display_AU0 />
          <Display_AU1 />
          <Display_AU2 />
          <Display_AU3 />
          <Display_AU4 />
          <Display_AU5 />
          <Display_AU6 />
          <Display_AU7 />
          <Display_AU8 />
          <Display_AU9 />
          <Display_AU10 />
          <Display_AU11 />
          <Display_AU12 />
          <Display_AU13 />
          <Display_AU14 />
          <Display_AU15 />
          <Display_AU16 />
        </Container>
      );
}

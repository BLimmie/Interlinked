import React from 'react'
import { Grid } from '@material-ui/core'
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core/styles'
import { Redirect } from 'react-router-dom'
import { FormControl, Input, InputLabel, Button } from '@material-ui/core'
import { Snackbar } from '@material-ui/core'
import { Box } from '@material-ui/core'

import Image from './Images/test.png'

const styles = (_: Theme) => createStyles({
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
})

interface LoginProps extends WithStyles<typeof styles> { }

type LoginState = {
  username: string,
  password: string,
  loggedIn: boolean,
  loginOnceFailed: boolean,
}

class Login extends React.Component<LoginProps, LoginState> {
  props: LoginProps

  constructor(props: LoginProps) {
    super(props);
    this.props = props
    this.state = {
      username: '',
      password: '',
      loggedIn: false,
      loginOnceFailed: false,
    }
    this.authenticate = this.authenticate.bind(this)
  }

  render() {
    return this.state.loggedIn ? (<Redirect to='/dashboard' />) : (
      <Box justifyContent="center"
           className={this.props.classes.background}
           style={{backgroundImage: `url(${Image})` }}>
        <Grid
          container
          spacing={3}
          wrap='nowrap'
          direction='column'
          alignItems='center'
          justify='center'
        >
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
          <Grid item>
            <FormControl required>
              <InputLabel>Username</InputLabel>
              <Input
                id='username'
                placeholder='username'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({username: e.target.value})}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl required>
              <InputLabel>Password</InputLabel>
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({password: e.target.value})}
                id='password'
                placeholder='password'/>
            </FormControl>
          </Grid>
          <Button
            className={this.props.classes.button}
            variant='contained'
            onClick={ this.authenticate }
          >Log In</Button>
          <Snackbar open={this.state.loginOnceFailed}
            message='invalid credentials' />
        </Grid>
      </Box>
    )
  }

  authenticate() {
    // XXX
    if (this.state.username === 'admin' && this.state.password === 'admin') {
      sessionStorage.setItem('authenticated', 'yes_you_are_admin')
      this.setState({loggedIn: true})
    } else {
      this.setState({loginOnceFailed: true})
    }
  }
}

export default withStyles(styles, { withTheme: true })(Login)

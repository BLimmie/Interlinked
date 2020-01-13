import React from 'react'
import { Grid } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import { FormControl, Input, InputLabel, Button } from '@material-ui/core'
import { Snackbar } from '@material-ui/core'
import { Box } from '@material-ui/core'

import Image from './Images/background_login_16-9.png'

type LoginProps = { }

type LoginState = {
  username: string,
  password: string,
  loggedIn: boolean,
  loginOnceFailed: boolean,
}

export default class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
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
        style={{
          backgroundImage: `url(${Image})`,
          height: "100vh",
          width: "100vw",
          backgroundSize: 'cover'
        }}>
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
            variant='contained'
            onClick={ this.authenticate }
            style = {{ background: "#ffffff" }}
          >Log In</Button>
          <Snackbar open={this.state.loginOnceFailed}
            message='invalid credentials' />
        </Grid>
      </Box>
    )
  }

  authenticate() {
    // XXX
    // MZ: Now that we are able to visit the Gin server and get the frontend
    // pages, we should let the frontend send requests to the Gin server.
    // TODO
    // Create some user in the database for testing login.
    /*
       fetch("http://localhost/login")
     */
    if (this.state.username === 'admin' && this.state.password === 'admin') {
      sessionStorage.setItem('authenticated', 'yes_you_are_admin')
      this.setState({loggedIn: true})
    } else {
      this.setState({loginOnceFailed: true})
    }
  }
}

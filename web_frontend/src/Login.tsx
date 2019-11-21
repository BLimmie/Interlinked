import React from 'react'
import { Grid } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import { FormControl, Input, InputLabel, Button } from '@material-ui/core'
import { Snackbar } from '@material-ui/core'

type LoginProps = {
  class: any
}

type LoginState = {
  username: string,
  password: string,
  loggedIn: boolean,
  loginOnceFailed: boolean,
}

export default class Login extends React.Component<LoginProps, LoginState> {
  private classes: any

  constructor(props: LoginProps) {
    super(props);
    this.classes = props.class
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
      <Grid
        container
        spacing={3}
        wrap='nowrap'
        direction='column'
        alignItems='center'
        justify='center'
      >
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
              type='password'
              placeholder='password'/>
          </FormControl>
        </Grid>
        <Button
          className={(this.classes).button}
          variant='contained'
          onClick={ this.authenticate }
        >Log In</Button>
        <Snackbar open={this.state.loginOnceFailed}
          message='invalid credentials' />
      </Grid>
    )
  }

  async authenticate() {
    // XXX
    fetch('http://localhost:8080/patient/' + this.state.username, {
      method:'GET',
      headers: {
        'Authorization': 'Basic ' + btoa(this.state.username + ':' +
                                         this.state.password),
      },
    }).then((auth_res) => {
      console.log(auth_res.ok)
      console.log(auth_res.status)
      auth_res.text().then((t) => console.log(t))
      if (auth_res.ok) {
        console.log("loggedin")
        sessionStorage.setItem('authenticated', 'yes_you_are_admin')
        this.setState({loggedIn: true})
      } else {
        console.log("not loggedin")
        this.setState({loginOnceFailed: true})
      }
    }).catch((_) => {
      console.log("not loggedin")
      this.setState({loginOnceFailed: true})
    })
  }
}

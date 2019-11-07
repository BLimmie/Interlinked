import React from 'react'
import { Grid } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import { FormControl, Input, InputLabel, Button } from '@material-ui/core'
import { Snackbar } from '@material-ui/core'

type LoginState = {
  username: string,
  password: string,
  loggedIn: boolean,
  loginOnceFailed: boolean,
}

export default class Login extends React.Component<{}, LoginState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loggedIn: false,
      loginOnceFailed: false,
    }
    this.submit = this.submit.bind(this)
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <Redirect to='/join' />
      )
    }

    return (
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
              placeholder='password'/>
          </FormControl>
        </Grid>
        <Button
          color='primary'
          variant='contained'
          onClick={ this.submit }
        >Login</Button>
        <Snackbar open={this.state.loginOnceFailed}
          message='invalid credentials' />
      </Grid>
    )
  }

  submit() {
    // XXX
    if (this.state.username === 'admin' && this.state.password === 'admin') {
      this.setState({loggedIn: true})
    } else {
      this.setState({loginOnceFailed: true})
    }
  }
}

import React from 'react';
import { Grid } from '@material-ui/core';
import { FormControl, Input, InputLabel, Button } from '@material-ui/core';


type LoginState = {
  username: string,
  password: string,
}

export default class Login extends React.Component<{}, LoginState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
    this.submit = this.submit.bind(this);
  }

  render() {
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
      </Grid>
    );
  }

  submit() {
    if (this.state.username === 'admin' && this.state.password === 'admin') {
      alert('passed')
    } else {
      alert('invalid cred')
    }
  }
}

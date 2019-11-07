import React from 'react';
import { Grid } from '@material-ui/core';
import { FormControl, Input, InputLabel, Button } from '@material-ui/core';

export default class Login extends React.Component {
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
            <Input id='username' placeholder='username'/>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl required>
            <InputLabel>Password</InputLabel>
            <Input id='password' placeholder='password'/>
          </FormControl>
        </Grid>
        <Button color='primary' variant='contained'>Login</Button>
      </Grid>
    );
  }
}


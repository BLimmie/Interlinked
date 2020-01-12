import React from 'react'
import { Grid } from '@material-ui/core'
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core/styles'
import { Redirect } from 'react-router-dom'
import { FormControl, FormControlLabel, Input, InputLabel, Button, Switch } from '@material-ui/core'
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

interface CreateAccountProps extends WithStyles<typeof styles> { }

type CreateAccountState = {
  name: string,
  username: string,
  password: string,
  createdAccount: boolean,
  invalidUsername: boolean,
  isPatient: boolean,
}

class CreateAccount extends React.Component<CreateAccountProps, CreateAccountState> {
  props: CreateAccountProps

  constructor(props: CreateAccountProps) {
    super(props);
    this.props = props
    this.state = {
      name: '',
      username: '',
      password: '',
      createdAccount: false,
      invalidUsername: false,
      isPatient: true,
    }
    this.applyForCreation = this.applyForCreation.bind(this)
  }

  render() {
    return this.state.createdAccount ? (<Redirect to='/login' />) : (
      <Box justifyContent="center"
           className={this.props.classes.background}
           style={{backgroundImage: `url(${Image})` }}>
        <Grid
          container
          spacing={5}
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
          <Grid item>
            <FormControl required>
              <InputLabel>Full Name</InputLabel>
              <Input
                id='name'
                placeholder='full name'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({name: e.target.value})}
              />
            </FormControl>
          </Grid>
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
          <Grid item>
            {/* <ToggleButtonGroup>
              <ToggleButton value="Patient" aria-label="patient">
                Patient
              </ToggleButton>
              <ToggleButton value="Provider" aria-label="provider">
                Provider
              </ToggleButton>
              </ToggleButtonGroup> */}
            <FormControlLabel 
              control={
              <Switch
                classes={this.props.classes}
                checked={this.state.isPatient}
                onClick={ () => this.changeUserType(this) }
              />}
                labelPlacement="start"
                label={this.state.isPatient ? "Patient" : "Provider"}
            />
          </Grid>
                    <Button
            className={this.props.classes.button}
            variant='contained'
            onClick={ this.applyForCreation }
          >Create Account</Button>
          <Snackbar open={this.state.invalidUsername}
            message='invalid username' />
        </Grid>
      </Box>
    )
  }

  applyForCreation() {
    // XXX
    var userType = "patient"
    if (!this.state.isPatient) {
      userType = "provider"
    }

    httpCall('POST', "http://localhost:8080/" + userType, [['Name', this.state.name], 
      ['Username', this.state.username], 
      ['Password', this.state.password]], null, (result:any, rr:number) => {
        if (rr === 200) {
          sessionStorage.setItem('authenticated', 'yes_you_are_admin')
          this.setState({createdAccount: true})
        } else {
          this.setState({invalidUsername: true})
        }
      })
  }

  changeUserType = (context: CreateAccount) => {
      context.setState({isPatient: !this.state.isPatient})
  }
}

export default withStyles(styles, { withTheme: true })(CreateAccount)

export function httpCall(method: string, url:string, header: Array<[string, string]>, data:any, callback:(result:any, r:number)=>any) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  if (callback) xhr.onload = function() { callback(this['responseText'], this['status']); };
  header.forEach((ii) => {
    xhr.setRequestHeader(ii[0], ii[1])
  })
  if (data != null) {
      xhr.setRequestHeader('Content-Type', 'text/plain');
      xhr.send(data);
  }
  else xhr.send();
}

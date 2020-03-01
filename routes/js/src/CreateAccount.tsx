import React from 'react'
import { Grid } from '@material-ui/core'
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core/styles'
import { Redirect } from 'react-router-dom'
import { FormControl, FormControlLabel, Input, InputLabel, Button, Switch } from '@material-ui/core'
import { Snackbar } from '@material-ui/core'
import { Box } from '@material-ui/core'
import { httpCall } from './funcs'
import CreateAccountButtonImage from './ButtonAssets/CreateAccount.png'

import Image from './TrueImages/background_LogIn_16-9.png'

const styles = (_: Theme) => createStyles({
  root: {
    flexGrow: 1,
    background: '#dddce7'
  },
  button_background: {
    backgroundSize: 'cover'
  },
  button: {
    min_width: "15vw",
    width: "15vw",
    min_height: "4vh",
    height: "4vh"
  },
  background: {
    height: "100vh",
    width: "100vw",
    backgroundSize: 'cover'
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
    return this.state.createdAccount ? (<Redirect to='/client/login' />) : (
      <Box justifyContent="center"
           className={this.props.classes.background}
           style={{backgroundImage: `url(${Image})` }}>
             <div style={{ padding: 40 }}>
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

          <Grid item>
            <FormControl required>
              <InputLabel>Full Name</InputLabel>
              <Input
                id='name'
                placeholder='Full Name'
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
                placeholder='Username'
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
                placeholder='Password'/>
            </FormControl>
          </Grid>
          <Grid item>
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
          <Box className={this.props.classes.button_background} style={{backgroundImage: `url(${CreateAccountButtonImage})` }}>
                    <Button
            className={this.props.classes.button}
            onClick={ this.applyForCreation }
          ></Button>
          </Box>
          <Snackbar open={this.state.invalidUsername}
            message='Invalid Username' />
        </Grid>
        </div>
      </Box>
    )
  }

  applyForCreation() {
    var userType = "patient"
    if (!this.state.isPatient) {
      userType = "provider"
    }

    httpCall('POST', backendServerName + ":8080/" + userType, [['Name', this.state.name], 
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

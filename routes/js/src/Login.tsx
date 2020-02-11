import React from 'react'
import { Grid } from '@material-ui/core'
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core/styles'
import { Redirect } from 'react-router-dom'
import { FormControl, FormControlLabel, Input, InputLabel, Button, Switch } from '@material-ui/core'
import { Snackbar } from '@material-ui/core'
import { Box } from '@material-ui/core'
import { httpCall } from './funcs'
import LogInButtonImage from './ButtonAssets/LogIn.png'
import SignUpButtonImage from './ButtonAssets/SignUp.png'

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

interface LoginProps extends WithStyles<typeof styles> { }

type LoginState = {
  username: string,
  password: string,
  loggedIn: boolean,
  loginOnceFailed: boolean,
  createAccount: boolean,
  isPatient: boolean,
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
      createAccount: false,
      isPatient: true,
    }
    this.authenticate = this.authenticate.bind(this)
  }

  // The "div style" line is a necessary workaround for a bug in Material UI Grid that causes it to extend too far,
  // resulting in the scrollbars you may have seen. The aforementioned line fixes that.
  render() {
    return this.state.loggedIn ? (this.state.isPatient ? (<Redirect to='/client/TruePatientMainPage' />) : (<Redirect to='/client/TrueDoctorMainPage' />)) : (this.state.createAccount ? (<Redirect to='/client/createAccount' />) : (
      <Box justifyContent="center"
           className={this.props.classes.background}
           style={{backgroundImage: `url(${Image})` }}>     
        <div style={{ padding: 15 }}>
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
                type='password'
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
          <Box className={this.props.classes.button_background} style={{backgroundImage: `url(${LogInButtonImage})` }}>
          <Button
            className={this.props.classes.button}
            onClick={ this.authenticate }
          ></Button>
          </Box>
          <Grid item xs={12}></Grid>
          <Box className={this.props.classes.button_background} style={{backgroundImage: `url(${SignUpButtonImage})` }}>
          <Button
            className={this.props.classes.button}
            onClick={ () => this.createAccount(this) }
          ></Button>
          </Box>
          <Snackbar open={this.state.loginOnceFailed}
            message='invalid credentials' />
        </Grid>
        </div>
      </Box>
    ))
  }

  authenticate() {
    if (this.state.username !== '' && this.state.password !== '') {
      let cb = (result:any, rr:number) => {
        console.log(result)
        if (rr === 200) {
          try {
            let ret = JSON.parse(result)
            sessionStorage.setItem('token', ret.token as string)
            sessionStorage.setItem('userType', ret.userType as string)
            this.setState({loggedIn: true})
          } catch (e) {
              this.setState({loginOnceFailed: true})
          }
        } else {
          this.setState({loginOnceFailed: true})
        }
      }
      httpCall('POST', "http://localhost:8080/login?userType=" + (this.state.isPatient ? "patient" : "provider"), [['Authorization', 'Basic ' + btoa(this.state.username + ":" + this.state.password)]], null, cb)

    }
  }

  createAccount(context: Login) {
    context.setState({createAccount: true})
  }

  changeUserType = (context: Login) => {
    context.setState({isPatient: !this.state.isPatient})
  }
}

export default withStyles(styles, { withTheme: true })(Login)

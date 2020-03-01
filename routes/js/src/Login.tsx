import React from 'react'
import { Grid } from '@material-ui/core'
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core/styles'
import { Redirect } from 'react-router-dom'
import { Link } from '@material-ui/core'
import { FormControl, FormControlLabel, Input, InputLabel, ButtonBase } from '@material-ui/core'
import { Radio, RadioGroup } from '@material-ui/core'
import { Snackbar } from '@material-ui/core'
import { Box } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { httpCall } from './funcs'
import LogInButtonImage from './ButtonAssets/LogIn.png'
import SignUpButtonImage from './ButtonAssets/SignUp.png'

import BackgroundImage from './TrueImages/background_LogIn_16-9.png'

const styles = (_: Theme) => createStyles({
  root: {
    flexGrow: 1,
    background: '#dddce7',
  },
  button: {
    min_width: "15vw",
    width: "15vw",
    min_height: "4vh",
    height: "4vh",
    backgroundSize: 'cover',
    backgroundImage: `url(${LogInButtonImage})`,
  },
  background: {
    height: "100vh",
    width: "100vw",
    backgroundSize: 'cover',
    backgroundImage: `url(${BackgroundImage})`,
  },
})

interface LoginProps extends WithStyles<typeof styles> { }

type LoginState = {
  username: string,
  password: string,
  loggedIn: boolean,
  loginOnceFailed: boolean,
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
      isPatient: true,
    }
    this.authenticate = this.authenticate.bind(this)
  }

  // The "div style" line is a necessary workaround for a bug in Material UI Grid that causes it to extend too far,
  // resulting in the scrollbars you may have seen. The aforementioned line fixes that.
  render() {
    return this.state.loggedIn
      ? (this.state.isPatient
          ? (<Redirect to='/client/TruePatientMainPage' />)
          : (<Redirect to='/client/TrueDoctorMainPage' />)
        )
      : (
        <Box
          padding="10%"
          className={ this.props.classes.background }
        >
          <Grid
            container
            direction='column'
            alignItems='center'
            spacing={3}
          >
            <Grid item>
              <Typography variant='h5'>Log in to Interlinked</Typography>
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
                  type='password'
                  id='password'
                  placeholder='password'/>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl required>
                <RadioGroup onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({
                    isPatient: (e.target.value == 'Patient') ? true : false
                  })}
                >
                  <FormControlLabel 
                    control={ <Radio /> } value='Patient' label="I'm a patient"
                  />
                  <FormControlLabel 
                    control={ <Radio /> } value='Doctor' label="I'm a doctor"
                  />
                </ RadioGroup>
              </FormControl>
            </Grid>
            <Grid item>
              <ButtonBase
                className={ this.props.classes.button }
                onClick={ this.authenticate }
              ></ButtonBase>
            </Grid>
            <Grid item>
              <Link
                href='/client/createAccount'
              >Don't have an account?</Link>
            </Grid>
            <Grid item>
              <Snackbar open={this.state.loginOnceFailed}
                message='invalid credentials'
              />
            </Grid>
          </Grid>
        </Box>
      )
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
      httpCall('POST', backendServerName + ":8080/login?userType=" + (this.state.isPatient ? "patient" : "provider"), [['Authorization', 'Basic ' + btoa(this.state.username + ":" + this.state.password)]], null, cb)

    }
  }
}

export default withStyles(styles, { withTheme: true })(Login)

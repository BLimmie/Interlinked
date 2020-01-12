import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom';
import { Grid, Button, Snackbar, FormControl, Input, InputLabel } from '@material-ui/core'
import InfiniteScroll from "react-infinite-scroll-component"
import { httpCall } from './CreateAccount'
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core/styles'

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

interface User {
  id: any
  name: string
  username: string
}
type DashboardState = {
  users: []
  newuser: string
  addUserResultMsg: string
  addOnce: boolean
  hasMore: boolean
}
export default class Dashboard extends React.Component<{}, DashboardState> {
  props: {}
  username = sessionStorage.getItem('username')
  userType = sessionStorage.getItem('userType')
  id = (sessionStorage.getItem('id')) ? sessionStorage.getItem('id') : ""
  redirect = (this.userType === 'provider' ? '/DoctorInterface/' : '/PatientInterface/') + 'idk'
  constructor(props: {}) {
    super(props);
    this.props = props
    this.state = {
      users: [],
      newuser: '',
      addUserResultMsg: '',
      addOnce: false,
      hasMore: true,
    }
    this.getAssociatedUsers = this.getAssociatedUsers.bind(this)
    this.createSessionBut = this.createSessionBut.bind(this)
    this.fetchData = this.fetchData.bind(this)
    this.associateUser = this.associateUser.bind(this)
    this.AddUserComponent = this.AddUserComponent.bind(this)
    this.getAssociatedUsers()
  }

  render() {
    return (
      <Grid
        container
        spacing={5}
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
                <Grid item>
          <Link to={this.redirect}>
            <Button variant='contained'>
              Join Session
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <this.AddUserComponent />
        </Grid>
        <Grid item>
          <InfiniteScroll
            dataLength = {this.state.users.length}
            next = {this.fetchData}
            hasMore = {this.state.hasMore}
            loader = {<h4>Loading more users</h4>}
          >
            {
              this.state.users.map((ii, index) => {
                if (this.userType === "patient") {
                  return (
                    <div>{String(Object.values(ii)[2])}
                          </div>
                  )
                } else {
                  return (
                    <div>{String(Object.values(ii)[2])}
                          {this.createSessionBut(String(Object.values(ii)[2]))}
                          </div>
                  )
                }
              })
            }

          </InfiniteScroll>
        </Grid>
        <Snackbar open={true}
          message={this.userType} />
      </Grid>
    )
  }

  AddUserComponent: FunctionComponent<{}> = (props: {}) => {
    if (this.userType === "provider") {
      return <Grid item>
                <FormControl required>
                  <InputLabel>Username</InputLabel>
                  <Input
                    id='username'
                    placeholder='username'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      this.setState({newuser: e.target.value})}
                  />
                </FormControl>
              <Button
                onClick={ () => this.associateUser() }
              >Add Patient</Button>
              <Snackbar open={this.state.addOnce}
                message={this.state.addUserResultMsg} />
              </Grid>


    } else {
      return (<div />)
    }
  }
  associateUser() {
    if (this.state.newuser !== "") {
      httpCall('POST', "http://localhost:8080/associateUser", [['Providerid', this.id!],
      ['Patientusername', this.state.newuser]], null, (result:any, rr:number) => {
          if (rr === 200) {
            this.setState({addUserResultMsg: 'success: added user'})
          } else {
            this.setState({addUserResultMsg: 'failed: invalid user added'})
          }
        })
    } else {
      this.setState({addUserResultMsg: 'failed: no username entered'})
    }
    this.setState({addOnce: true})
  }
  createSessionBut(user: string) {
    return <Button
              onClick={ () => user }
              >Create Session for {user}</Button>
  }
  // unnecessary if we just display all user data at once
  fetchData() {
  }
  getAssociatedUsers() {
    httpCall('POST', "http://localhost:8080/" + this.userType + "/" + this.username, [], null, (result:any, rr:number) => {
        if (rr === 200) {
          let arr
          if (this.userType === "patient") {
            arr = JSON.parse(result).Providers
          } else {
            arr = JSON.parse(result).Patients
          }
          if (arr !== null) {
            this.setState({users: arr})
          }
          this.setState({hasMore: false})
        } 
      })
  }
}

import React from 'react'
import {Link} from 'react-router-dom'
import {Container, Grid, Button} from '@material-ui/core' 
import LocalVideo from './LocalVideo'
//Generated from https://www.twilio.com/console/video/project/testing-tools with name Patient

const patientToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2I4NWUxZjdjZmNhYzc2NDA4ODU0MzA0ODZhYzM1NGJlLTE1NzI4OTg0MTciLCJpc3MiOiJTS2I4NWUxZjdjZmNhYzc2NDA4ODU0MzA0ODZhYzM1NGJlIiwic3ViIjoiQUMwMDU3ZjM4MjZlNzVkMzljNWE4MmE1ZmZiMjdjOTM3YiIsImV4cCI6MTU3MjkwMjAxNywiZ3JhbnRzIjp7ImlkZW50aXR5IjoiUGF0aWVudCIsInZpZGVvIjp7fX19.cYa8YLjjFV9E2fvW02d8zcK2vL3viOlK5FVrxYoOIKg"

export default function CreateRoom() {
  return (
    <Container maxWidth="sm">
      <Grid container spacing={2}>
        <Link to={{
          pathname:'/PatientInterface',
          state: patientToken
        }}>
          <Button
            variant="contained"
            color="primary"
          >Join Room</Button>
        </Link>
        <LocalVideo />
      </Grid>
    </Container>
  );
}
  
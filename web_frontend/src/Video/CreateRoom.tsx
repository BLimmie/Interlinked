import React from 'react'
import {Link} from 'react-router-dom'
import {Container, Typography, Grid, Button, TextField} from '@material-ui/core' 
//Generated from https://www.twilio.com/console/video/project/testing-tools with name Doctor
const Doctortoken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2I4NWUxZjdjZmNhYzc2NDA4ODU0MzA0ODZhYzM1NGJlLTE1NzI4OTg0NDMiLCJpc3MiOiJTS2I4NWUxZjdjZmNhYzc2NDA4ODU0MzA0ODZhYzM1NGJlIiwic3ViIjoiQUMwMDU3ZjM4MjZlNzVkMzljNWE4MmE1ZmZiMjdjOTM3YiIsImV4cCI6MTU3MjkwMjA0MywiZ3JhbnRzIjp7ImlkZW50aXR5IjoiRG9jdG9yIiwidmlkZW8iOnt9fX0.jrC24KnEsYG7HD33qiglV3OaThuaDK_iTTorCfzqYdE"

export default function CreateRoom() {
  return (
    <Container maxWidth="sm">
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Typography>Create Room:</Typography>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={3}>
          <TextField 
            label="Room"
            margin="normal"
          />
        </Grid>
        <Grid item xs={5}>
        <Link to={{
          pathname:'/DoctorInterface',
          state:Doctortoken
        }}>
          <Button
            variant="contained"
            color="primary"
          >Join Room</Button>
        </Link>
        </Grid>
      </Grid>
    </Container>
  );
}
  
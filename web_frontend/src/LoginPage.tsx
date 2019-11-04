import React from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  return (
    <div>
      <Link to={{
        pathname:'/CreateRoom'
      }}>
        <Button
          variant="contained"
          color="primary"
          >Join as Doctor</Button>
      </Link>
      <Link to={{
        pathname:'/JoinRoom',
      }}>
        <Button
          variant="contained"
          color="secondary"
          >Join as Patient</Button>
      </Link>
    </div>
  )
} 
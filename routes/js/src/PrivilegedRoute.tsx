import React, { useState, useEffect } from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'
import { httpCall } from './funcs'

type PrivilegedRouteProps = RouteProps;

export default function PrivilegedRoute(props: PrivilegedRouteProps) {
  let { children, ...rest } = props
  const [status, setStatus] = useState("loading")
  function authenticate() {
    // XXX
    let token = sessionStorage.getItem('token')
    // while (!token) {
    //   token = sessionStorage.getItem('token')
    //   console.log(token)
    // }
    httpCall('POST', backendServerName + ":8080/user/" + token, [], null, (result: any, rr: number) => {
      console.log(result)
      console.log(status)
      if (rr === 200) {
        let ret = JSON.parse(result)
        // TODO do not use session storage to keep this info
        sessionStorage.setItem('id', ret.ID as string)
        sessionStorage.setItem('username', ret.Username as string)
        setStatus("success")
      } else {
        setStatus("failure")
      }
    })
    // async function http(url: string) {
    //   // fetch
    // }
    // fetch("http://localhost:8080/user/" + token, {method: 'POST'})
    // .then(response => {
    //   if (response.ok) {
    //     setStatus("success")
    //   } else {
    //     setStatus("failure")
    //   }
    // })
    // http("http://localhost:8080/user/" + token)
  }
  useEffect(authenticate, [])
    // let a = sessionStorage.getItem('authenticated')
    // return a && a === 'yes_you_are_admin'
  return (
    <Route
      {...rest}
      render={
        () => ( (status === "success") ? children : (status === "failure") ? <Redirect to='/client/login' /> : <div /> )
      }
    />
  )

}

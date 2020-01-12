import React from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'

type PrivilegedRouteProps = RouteProps;

export default function PrivilegedRoute(props: PrivilegedRouteProps) {
  let { children, ...rest } = props
  return (
    <Route
      {...rest}
      render={
        () => ( authenticated() ? children : <Redirect to='/login' /> )
      }
    />
  )
}

function authenticated() {
  // XXX
  let a = sessionStorage.getItem('authenticated')
  return a && a === 'yes_you_are_admin'
}

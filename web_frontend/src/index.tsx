import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './Login';
import Join from './Join';

class Server extends React.Component {
  checkCred() {
    // XXX
    return true
  }

  render() {
    return (
      <Router>
        <Route exact path='/'><Login /></Route>
        <Route path='/join' onEnter={ this.checkCred() }><Join /></Route>
      </Router>
    )
  }
}

ReactDom.render(
  <Server />,
  document.getElementById('root')
)

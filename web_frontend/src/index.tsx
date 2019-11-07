import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './Login';

ReactDom.render(
  <Router>
    <Route path='/' component={Login} />
  </Router>,
  document.getElementById('root')
)

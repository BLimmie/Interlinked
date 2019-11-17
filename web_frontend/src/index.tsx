import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './Login';
import Join from './Join';
import App from './App';

// import CssBaseline from '@material-ui/core/CssBaseline';
// import { ThemeProvider } from '@material-ui/styles';
// import theme from './theme';

// Initializing global variables
globalThis.words = new Map();
globalThis.display_words = Array.from( globalThis.words.keys() );
globalThis.sentiment = Array.from( globalThis.words.values() ); 
globalThis.point_in_transcript = 0;
globalThis.phrase_count = 0;

// export default function Run() {
//   ReactDOM.render(
//     <ThemeProvider theme={theme}>
//       {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
//       <CssBaseline />
//       <App />
//     </ThemeProvider>,
//     document.querySelector('#root'),
//   );
//   return(0);
// }

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
        <Route path='/video' onEnter={ this.checkCred() }><App /></Route>
      </Router>
    )
  }
}

ReactDom.render(
  <Server />,
  document.getElementById('root')
)

import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5f587d',
    },
    secondary: {
      main: '#cac7d6',
    },
    error: {
      main: '#dddce7',
    },
    background: {
      default: '#dddce7',
    },
  },
  typography: {
    fontSize: 18,
  }
});

export default theme;

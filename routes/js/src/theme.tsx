import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6e6b7a',
    },
    secondary: {
      main: '#ffef61',
    },
    error: {
      main: '#6c61ff',
    },
    background: {
      default: '#c7c6ce',
    },
  },
  typography: {
    fontSize: 18,
  }
});

export default theme;

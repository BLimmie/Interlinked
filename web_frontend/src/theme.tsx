import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#ffef61',
    },
    error: {
      main: '#6c61ff',
    },
    background: {
      default: '#16001f',
    },
  },
  typography: {
    fontSize: 18,
  }
});

export default theme;

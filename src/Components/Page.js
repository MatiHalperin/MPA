import React, { Component } from 'react';

import red from '@material-ui/core/colors/red';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

class Page extends Component {
  render() {
    const theme = createMuiTheme({
      palette: {
        primary: red,
      },
      typography: {
        useNextVariants: true,
      },
    });

    return (
      <MuiThemeProvider theme={theme}>
        {this.props.children}
      </MuiThemeProvider>
    );
  }
}

export default Page;
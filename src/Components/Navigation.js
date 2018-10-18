import React, { Component } from 'react';
import { Link } from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import SessionHandler from '../Helpers/SessionHandler';

class Navigation extends Component {
  render() {
    const styles = {
      root: {
        flexGrow: 1,
      },
      grow: {
        flexGrow: 1,
      },
      menuLink: {
        color: "white",
        textDecoration: "none",
      },
    };

    var navbarButtons = SessionHandler.isLoggedIn()
                          ? (
                              <div>
                                <Button color="inherit">
                                  <Link to="/profile" style={styles.menuLink}>Profile</Link>
                                </Button>
                                <Button color="inherit">
                                  <Link to="/logout" style={styles.menuLink}>Logout</Link>
                                </Button>
                              </div>
                            )
                          : (
                              <Button color="inherit">
                                <Link to="/login" style={styles.menuLink}>Login</Link>
                              </Button>
                            );

    return (
      <div style={styles.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" style={styles.grow}>
              <Link to="/" style={styles.menuLink}>MPA</Link>
            </Typography>
            <Button color="inherit">
              <Link to="/concerts" style={styles.menuLink}>Concerts</Link>
            </Button>
            {navbarButtons}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Navigation;
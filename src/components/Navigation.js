import React, { Component } from 'react';
import { Link } from "react-router-dom";

import SessionHandler from './SessionHandler';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class Navigation extends Component {
  render() {
    const styles = {
      root: {
        flexGrow: 1,
      },
      flex: {
        flexGrow: 1,
      },
      menuButton: {
        marginLeft: -12,
        marginRight: 20,
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
            <Typography variant="title" color="inherit" style={styles.flex}>
              <Link to="/" style={styles.menuLink}>MPA</Link>
            </Typography>
            <Button color="inherit">
              <Link to="/concerts" style={styles.menuLink}>Conciertos</Link>
            </Button>
            {navbarButtons}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Navigation;

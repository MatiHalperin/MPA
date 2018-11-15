import React, { Component } from 'react';
import { Link } from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import SessionHandler from '../Helpers/SessionHandler';

class Navigation extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    const styles = {
      root: {
        flexGrow: 1,
      },
      grow: {
        flexGrow: 1,
      },
      navbarLink: {
        color: "white",
        textDecoration: "none",
      },
      menuLink: {
        color: 'inherit',
        textDecoration: "none",
      },
    };

    let menu, menuButton;

    if (SessionHandler.isLoggedIn()) {
      let variableButton;

      if (sessionStorage.getItem("isMusician") === "true")
        variableButton = (
          <Link to="/profile" style={styles.menuLink}>
            <MenuItem>Perfil</MenuItem>
          </Link>
        )
      else if (!SessionHandler.isAdmin())
        variableButton = (
          <Link to="/forms/musician" style={styles.menuLink}>
            <MenuItem>Soy músico</MenuItem>
          </Link>
        )

      menu = (
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
          <MenuItem style={{backgroundColor: "#eeeeee", marginTop: '-8px', paddingTop: '16px', height: 'fit-content'}}>
            <span style={{textAlign: 'center', width: '100%'}}>
              <b>{sessionStorage.getItem("username")}</b>
              <br />
              {sessionStorage.getItem("email")}
            </span>
          </MenuItem>
          {variableButton}
          <Link to="/logout" style={styles.menuLink}>
            <MenuItem>Cerrar sesión</MenuItem>
          </Link>
        </Menu>
      );

      menuButton = (
        <Button color="inherit" aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup="true" onClick={this.handleClick}>
          {sessionStorage.getItem("username")}
        </Button>
      )
    }
    else
      menuButton = (
        <Link to="/login" style={styles.navbarLink}>
          <Button color="inherit">Iniciar sesión</Button>
        </Link>
      );

    return (
      <div style={styles.root}>
        {menu}

        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" style={styles.grow}>
              <Link to="/" style={styles.navbarLink}>MPA</Link>
            </Typography>
            <Link to="/concerts" style={styles.navbarLink}>
              <Button color="inherit">Conciertos</Button>
            </Link>
            {menuButton}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Navigation;
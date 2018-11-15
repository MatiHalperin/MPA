import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';

import Page from '../Components/Page';
import Server from '../Helpers/Server';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = name => event => {
    this.setState({
      error: false,
      [name]: event.target.value,
    });
  };

  handleSubmit(event) {
    Server.interact("POST", "/log", {
      email: this.state.email,
      password: this.state.password
    })
    .then(response => {
      if (response.userId != null && response.accessToken != null) {
        Server.interact("GET", "/users/" + response.userId)
        .then(userData => {
          sessionStorage.setItem("userId", response.userId);
          sessionStorage.setItem("accessToken", response.accessToken);

          sessionStorage.setItem("isMusician", userData.isMusician);
          sessionStorage.setItem("username", userData.username);
          sessionStorage.setItem("email", userData.email);

          if (this.state.email === "admin@mpa.org")
            sessionStorage.setItem("isAdmin", true);

          this.props.history.push("/");
        });
      }
      else
        this.setState({error: true});
    });

    event.preventDefault();
  }

  render() {
    const styles = {
      cardStyle: {
        width: '25%',
        padding: '16px',
        margin: '8px',
        borderRadius: '8px',
      },
      emailTextFieldStyle: {
        width: '100%',
      },
      passwordTextFieldStyle: {
        width: '100%',
        marginTop: '16px',
      },
      registerLink: {
        marginLeft: '16px',
        textDecoration: 'none',
      }
    };

    return (
      <Page>
        <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '100%'}}>
          <Card style={{width: '40%', margin: '0 30%', borderRadius: '8px'}}>
            <CardContent>
              <Link to="/">
                <img src={require("../logo.svg")} alt="logo" style={{width: '40%', margin: '16px 30% 24px'}} />
              </Link>
              <form onSubmit={this.handleSubmit}>
                <TextField error={this.state.error} InputLabelProps={{ required: false }} required style={styles.emailTextFieldStyle} label="Email" type="email" value={this.state.email} onChange={this.handleChange('email')} />
                <TextField error={this.state.error} InputLabelProps={{ required: false }} required style={styles.passwordTextFieldStyle} label="Contraseña" type="password" value={this.state.password} onChange={this.handleChange('password')} />
                <div style={{marginTop: '24px'}}>
                  <Button variant="contained" type="submit" color="primary">Iniciar sesión</Button>
                  <Link to="/register" style={styles.registerLink}>
                    <Button color="primary">Registrarse</Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </Page>
    );
  }
}

export default Login;
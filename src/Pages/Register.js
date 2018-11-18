import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';

import Page from '../Components/Page';
import Server from '../Helpers/Server';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
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
    Server.interact("POST", "/signup", {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    })
    .then(response => {
      if (response && response.userId != null && response.accessToken != null) {
        sessionStorage.setItem("userId", response.userId);
        sessionStorage.setItem("accessToken", response.accessToken);

        sessionStorage.setItem("isMusician", false);
        sessionStorage.setItem("username", this.state.username);
        sessionStorage.setItem("email", this.state.email);

        if (this.state.email === "admin@mpa.org")
          sessionStorage.setItem("isAdmin", true);

        this.props.history.push("/");
      }
      else
        this.setState({error: true});
    });

    event.preventDefault();
  }

  render() {
    const styles = {
      cardWrapperStyle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
      },
      cardStyle: {
        width: '450px',
        margin: '0 auto',
        padding: '36px 24px 24px',
        borderRadius: '8px',
      },
      imageWrapperStyle: {
        width: '100%',
        marginBottom: '48px',
        textAlign: 'center',
      },
      imageStyle: {
        width: '150px',
      },
      firstTextFieldStyle: {
        width: '100%',
      },
      textFieldStyle: {
        width: '100%',
        marginTop: '32px',
      },
      actionsStyle: {
        marginTop: '48px',
      },
      loginLink: {
        textDecoration: 'none',
      },
      registerButtonStyle: {
        float: 'right',
      }
    };

    return (
      <Page>
        <div style={styles.cardWrapperStyle}>
        <Card style={styles.cardStyle}>
            <CardContent> 
              <div style={styles.imageWrapperStyle}>
                <Link to="/">
                  <img src={require("../logo.svg")} alt="logo" style={styles.imageStyle} />
                </Link>
              </div>
              <form onSubmit={this.handleSubmit}>
                <TextField error={this.state.error} InputLabelProps={{ required: false }} required style={styles.firstTextFieldStyle} label="Usuario" type="text" value={this.state.username} onChange={this.handleChange('username')} />
                <TextField error={this.state.error} InputLabelProps={{ required: false }} required style={styles.textFieldStyle} label="Email" type="email" value={this.state.email} onChange={this.handleChange('email')} />
                <TextField error={this.state.error} InputLabelProps={{ required: false }} required style={styles.textFieldStyle} label="Contraseña" type="password" value={this.state.password} onChange={this.handleChange('password')} />
                <div style={styles.actionsStyle}>
                  <Link to="/login" style={styles.loginLink}>
                    <Button color="primary">Iniciar sesión</Button>
                  </Link>
                  <Button variant="contained" type="submit" color="primary" style={styles.registerButtonStyle}>Registrarse</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </Page>
    );
  }
}

export default Register;
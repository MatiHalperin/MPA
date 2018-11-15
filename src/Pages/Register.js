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
      firstTextFieldStyle: {
        width: '100%',
      },
      textFieldStyle: {
        width: '100%',
        marginTop: '32px',
      },
      loginLink: {
        textDecoration: 'none',
      }
    };

    return (
      <Page>
        <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '100%'}}>
        <Card style={{width: '450px', margin: '0 auto', borderRadius: '8px', padding: '36px 24px 24px'}}>
            <CardContent> 
              <div style={{width: '100%', textAlign: 'center', marginBottom: '48px'}}>
                <Link to="/">
                  <img src={require("../logo.svg")} alt="logo" style={{width: '150px'}} />
                </Link>
              </div>
              <form onSubmit={this.handleSubmit}>
                <TextField error={this.state.error} InputLabelProps={{ required: false }} required style={styles.firstTextFieldStyle} label="Usuario" type="text" value={this.state.username} onChange={this.handleChange('username')} />
                <TextField error={this.state.error} InputLabelProps={{ required: false }} required style={styles.textFieldStyle} label="Email" type="email" value={this.state.email} onChange={this.handleChange('email')} />
                <TextField error={this.state.error} InputLabelProps={{ required: false }} required style={styles.textFieldStyle} label="Contraseña" type="password" value={this.state.password} onChange={this.handleChange('password')} />
                <div style={{marginTop: '48px'}}>
                  <Link to="/login" style={styles.loginLink}>
                    <Button color="primary">Iniciar sesión</Button>
                  </Link>
                  <Button variant="contained" type="submit" color="primary" style={{float: 'right'}}>Registrarse</Button>
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
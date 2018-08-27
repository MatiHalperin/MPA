import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Navigation from '../Navigation';
import Page from '../Page';
import Server from '../Server';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = name => event => {
    this.setState({error: false});

    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit(event) {
    Server.postJson("/api/Musicos/login", { email: this.state.email, password: this.state.password })
    .then(response => {
      if (response.userId != null && response.id != null)
      {
        sessionStorage.setItem("userId", response.userId);
        sessionStorage.setItem("accessToken", response.id);
        this.props.history.push("/");
      }
      else
        this.setState({error: true});
    });

    event.preventDefault();
  }

  render() {
    const styles = {
      cardStyle: {
        width: 'fit-content',
        padding: '16px',
        margin: '8px',
      },
      emailTextFieldStyle: {
        width: '100%',
      },
      passwordTextFieldStyle: {
        width: '100%',
        marginTop: '16px',
      },
      buttonStyle: {
        marginTop: '16px',
      },
      registerLink: {
        textDecoration: 'none',
      }
    };

    return (
      <Page>
        <Navigation />

        <Card style={styles.cardStyle}>
          <form onSubmit={this.handleSubmit}>
            <TextField error={this.state.error} InputLabelProps={{ required: false }} required style={styles.emailTextFieldStyle} label="Email" type="email" value={this.state.email} onChange={this.handleChange('email')} />
            <TextField error={this.state.error} InputLabelProps={{ required: false }} required style={styles.passwordTextFieldStyle} label="Password" type="password" value={this.state.password} onChange={this.handleChange('password')} />
            <Button style={styles.buttonStyle} type="submit" color="primary">Login</Button>
            <Link to="/register" style={styles.registerLink}>
              <Button style={styles.buttonStyle} color="primary">Register</Button>
            </Link>
          </form>
        </Card>
      </Page>
    );
  }
}

export default Login;

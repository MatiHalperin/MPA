import React, { Component } from 'react';

import Navigation from '../Navigation';
import Server from '../Server';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    if (sessionStorage.getItem("userId") !== null && sessionStorage.getItem("accessToken") !== null)
      console.log("Logged in");
    else
      console.log("Nope");
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit(event) {
    Server.postJson("/api/Users/login", { email: this.state.email, password: this.state.password })
    .then(response => {
      sessionStorage.setItem("userId", response.userId);
      sessionStorage.setItem("accessToken", response.id);
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
      }
    };

    return (
      <div>
        <Navigation />

        <Card style={styles.cardStyle}>
          <form onSubmit={this.handleSubmit}>
            <TextField style={styles.emailTextFieldStyle} label="Email" type="email" value={this.state.email} onChange={this.handleChange('email')} />
            <TextField style={styles.passwordTextFieldStyle} label="Password" type="password" value={this.state.password} onChange={this.handleChange('password')} />
            <Button style={styles.buttonStyle} type="submit" color="primary">Login</Button>
          </form>
        </Card>
      </div>
    );
  }
}

export default Login;

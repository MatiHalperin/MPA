import React, { Component } from 'react';

import Navigation from '../Navigation';
import Page from '../Page';
import Server from '../Server';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit(event) {
    Server.postJson("/api/Users", { email: this.state.email, password: this.state.password })
    .then(response => {
      console.log(response);
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
      <Page>
        <Navigation />

        <Card style={styles.cardStyle}>
          <form onSubmit={this.handleSubmit}>
            <TextField style={styles.emailTextFieldStyle} label="Email" type="email" value={this.state.email} onChange={this.handleChange('email')} />
            <TextField style={styles.passwordTextFieldStyle} label="Password" type="password" value={this.state.password} onChange={this.handleChange('password')} />
            <Button style={styles.buttonStyle} type="submit" color="primary">Register</Button>
          </form>
        </Card>
      </Page>
    );
  }
}

export default Register;

import React, { Component } from 'react';

import Navigation from '../Navigation';
import Page from '../Page';
import Server from '../Server';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.path = "/api/Users/" + sessionStorage.getItem("userId") + "?access_token=" + sessionStorage.getItem("accessToken");

    Server.getJson(this.path)
    .then(response => {
      this.setState({email: response.email});
    });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit(event) {
    Server.postJson(this.path, { email: this.state.email })
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
            <Button style={styles.buttonStyle} type="submit" color="primary">Save</Button>
          </form>
        </Card>
      </Page>
    );
  }
}

export default Profile;

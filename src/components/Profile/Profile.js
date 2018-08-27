import React, { Component } from 'react';

import Navigation from '../Navigation';
import Page from '../Page';
import Server from '../Server';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ''
    };

    this.handleChange = this.handleChange.bind(this);

    this.path = "/api/Musicos/" + sessionStorage.getItem("userId") + "?access_token=" + sessionStorage.getItem("accessToken");

    Server.getJson(this.path)
    .then(response => {
      this.setState({username: response.username});
      this.setState({email: response.email});
    });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const styles = {
      cardStyle: {
        width: 'fit-content',
        padding: '16px',
        margin: '8px',
      },
      buttonStyle: {
        marginTop: '16px',
      }
    };

    return (
      <Page>
        <Navigation />

        <Card style={styles.cardStyle}>
          <p>
            <b>Username: </b>{this.state.username}
            <br />
            <b>Email: </b>{this.state.email}
          </p>
          <Button style={styles.buttonStyle} color="primary">Change password</Button>
        </Card>
      </Page>
    );
  }
}

export default Profile;

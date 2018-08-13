import React, { Component } from 'react';
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

    fetch('http://10.10.5.35:3000/api/Users/' + sessionStorage.getItem("userId") + '?access_token=' + sessionStorage.getItem("accessToken"), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
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
    fetch('http://10.10.5.35:3000/api/Users/' + sessionStorage.getItem("userId") + '/replace?access_token=' + sessionStorage.getItem("accessToken"), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
      })
    })
    .then(response => response.json())
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
      <Card style={styles.cardStyle}>
        <form onSubmit={this.handleSubmit}>
          <p><b>Profile</b></p>
          <TextField style={styles.emailTextFieldStyle} label="Email" type="email" value={this.state.email} onChange={this.handleChange('email')} />
          <Button style={styles.buttonStyle} type="submit" color="primary">Save</Button>
        </form>
      </Card>
    );
  }
}

export default Profile;

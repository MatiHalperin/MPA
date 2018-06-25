import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

class Musician extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      sirname: '',
      video: '',
      city: ''
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
    fetch('http://10.10.4.12:3000/api/Users/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
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
      nameTextFieldStyle: {
        width: '49%',
        marginRight: '1%',
      },
      sirnameTextFieldStyle: {
        width: '49%',
        marginLeft: '1%',
      },
      videoTextFieldStyle: {
        width: '100%',
        marginTop: '16px',
      },
      cityTextFieldStyle: {
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
          <p><b>Register musician</b></p>
          <TextField style={styles.nameTextFieldStyle} label="Name" type="text" value={this.state.name} onChange={this.handleChange('name')} />
          <TextField style={styles.sirnameTextFieldStyle} label="Sirname" type="text" value={this.state.sirname} onChange={this.handleChange('sirname')} />
          <TextField style={styles.videoTextFieldStyle} label="Video" type="text" value={this.state.video} onChange={this.handleChange('video')} />
          <TextField style={styles.cityTextFieldStyle} label="City" type="text" value={this.state.city} onChange={this.handleChange('city')} />
          <Button style={styles.buttonStyle} type="submit" color="primary">Register</Button>
        </form>
      </Card>
    );
  }
}

export default Musician;

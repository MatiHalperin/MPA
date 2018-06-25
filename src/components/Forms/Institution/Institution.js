import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

class Institution extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      city: '',
      phone: ''
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
        width: '100%',
      },
      cityTextFieldStyle: {
        width: '100%',
        marginTop: '16px',
      },
      phoneTextFieldStyle: {
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
          <p><b>Register institution</b></p>
          <TextField style={styles.nameTextFieldStyle} label="Name" type="text" value={this.state.name} onChange={this.handleChange('name')} />
          <TextField style={styles.cityTextFieldStyle} label="City" type="text" value={this.state.city} onChange={this.handleChange('city')} />
          <TextField style={styles.phoneTextFieldStyle} label="Phone" type="text" value={this.state.phone} onChange={this.handleChange('phone')} />
          <Button style={styles.buttonStyle} type="submit" color="primary">Register</Button>
        </form>
      </Card>
    );
  }
}

export default Institution;

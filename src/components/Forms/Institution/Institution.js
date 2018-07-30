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
      phone: '',
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
    fetch('http://10.10.7.28:3000/api/institucions', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: this.state.name,
        ciudad: this.state.city,
        telefono: this.state.phone,
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
      firstTextFieldStyle: {
        width: '100%',
      },
      textFieldStyle: {
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
          <TextField style={styles.firstTextFieldStyle} label="Name" type="text" value={this.state.name} onChange={this.handleChange('name')} />
          <TextField style={styles.textFieldStyle} label="City" type="text" value={this.state.city} onChange={this.handleChange('city')} />
          <TextField style={styles.textFieldStyle} label="Phone" type="text" value={this.state.phone} onChange={this.handleChange('phone')} />
          <TextField style={styles.textFieldStyle} label="Email" type="text" value={this.state.email} onChange={this.handleChange('email')} />
          <TextField style={styles.textFieldStyle} label="Password" type="text" value={this.state.password} onChange={this.handleChange('password')} />
          <Button style={styles.buttonStyle} type="submit" color="primary">Register</Button>
        </form>
      </Card>
    );
  }
}

export default Institution;

import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

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
    })

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p><b>Login</b></p>
        <label>
          Email:
          <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
        </label>
        <br />
        <br />
        <label>
          Password:
          <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
        </label>
        <br />
        <br />
        <input type="submit" value="Login" />
      </form>
    );
  }
}

export default Login;

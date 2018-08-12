import React, { Component } from 'react';
import { Link } from "react-router-dom";
import logo from './logo.svg';
import './Index.css';

class Index extends Component {
  render() {
      return (
        <div className="Index">
          <header className="Index-header">
            <img src={logo} className="Index-logo" alt="logo" />
            <h1 className="Index-title">Welcome to React</h1>
          </header>
          <p className="Index-intro">
            <Link to="/login">Login</Link>
            <br />
            <Link to="/register">Register</Link>
            <br />
            <Link to="/forms/concert">Create concert</Link>
            <br />
            <Link to="/forms/institution">Register institution</Link>
            <br />
            <Link to="/forms/musician">Register musician</Link>
            <br />
            <Link to="/profile">Profile</Link>
          </p>
        </div>
      );
  }
}

export default Index;

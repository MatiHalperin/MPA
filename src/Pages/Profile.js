import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

import Navigation from '../Components/Navigation';
import Page from '../Components/Page';
import Server from '../Helpers/Server';
import SessionHandler from '../Helpers/SessionHandler';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: new URLSearchParams(this.props.location.search).get('id'),
      reported: false,
      isMusician: '',
      name: '',
      surname: '',
      idCard: '',
      country: '',
      province: '',
      city: '',
      instrument: '',
      style: '',
      experience: '',
      formation: '',
      band: ''
    };

    if (!this.state.userId) {
      if (SessionHandler.isLoggedIn())
      this.state.userId = sessionStorage.getItem("userId");
      else
        this.props.history.push("/");
    }

    if (this.state.userId) {
      Server.interact("GET", "/users/" + this.state.userId)
      .then(response => {
        this.setState({
          isMusician: response.isMusician,
          username: response.username,
          email: response.email,
          name: response.name,
          surname: response.surname,
          idCard: response.idCard,
          country: response.country,
          province: response.province,
          city: response.city,
          instrument: response.instrument,
          style: response.style,
          experience: response.experience,
          formation: response.formation,
          band: response.band
        });

        if ("rate" in response)
          this.setState({ reported: true });
      });
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleReportClick = this.handleReportClick.bind(this);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleReportClick(event) {
    Server.interact("POST", "/users/" + this.state.userId, {
      rate: 1
    })
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
        borderRadius: '8px',
      },
      username: {
        textAlign: 'center',
        margin: 0,
      },
      email: {
        textAlign: 'center',
        marginTop: '0.5em',
      },
      musicianData: {
        border: '1px solid black',
        borderRadius: '8px',
        padding: '0 1em',
      },
      buttonStyle: {
        marginTop: '8px',
      },
      registerLink: {
        textDecoration: 'none',
      }
    };

    let musicianBlock, reportButton;
    
    if (this.state.isMusician) {
      musicianBlock = (
        <div style={styles.musicianData}>
          <p><b>Name: </b>{this.state.name}</p>
          <p><b>Surname: </b>{this.state.surname}</p>
          <p><b>ID Card: </b>{this.state.idCard}</p>
          <p><b>Country: </b>{this.state.country}</p>
          <p><b>Province: </b>{this.state.province}</p>
          <p><b>City: </b>{this.state.city}</p>
          <p><b>Instrument: </b>{this.state.instrument}</p>
          <p><b>Style: </b>{this.state.style}</p>
          <p><b>Experience: </b>{this.state.experience}</p>
          <p><b>Formation: </b>{this.state.formation}</p>
          <p><b>Band: </b>{this.state.band}</p>
        </div>
      )
    }
    else if (SessionHandler.isLoggedIn() && this.state.userId === sessionStorage.getItem("userId")) {
      musicianBlock = (
        <Link to="/forms/musician" style={styles.registerLink}>
          <Button style={styles.buttonStyle} color="primary">I am musician</Button>
        </Link>
      );
    }

    if (this.state.reported)
      reportButton = (
        <Button disabled style={styles.buttonStyle} type="submit" color="primary">Reported</Button>
      )
    else if (SessionHandler.isAdmin() && this.state.userId !== sessionStorage.getItem("userId"))
      reportButton = (
        <Button style={styles.buttonStyle} onClick={this.handleReportClick} type="submit" color="primary">Report</Button>
      );

    return (
      <Page>
        <Navigation />

        <Card style={styles.cardStyle}>
          <h1 style={styles.username}>{this.state.username}</h1>
          <p style={styles.email}>{this.state.email}</p>
          {musicianBlock}
          {reportButton}
        </Card>
      </Page>
    );
  }
}

export default Profile;
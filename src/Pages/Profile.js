import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

import Navigation from '../Components/Navigation';
import Page from '../Components/Page';
import Server from '../Helpers/Server';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMusician: '',
      username: '',
      email: '',
      name: '',
      surname: '',
      country: '',
      province: '',
      city: '',
      idCard: '',
      photo: '',
      video: ''
    };

    this.handleChange = this.handleChange.bind(this);

    Server.interact("GET", "/users/" + sessionStorage.getItem("userId"))
    .then(response => {
      this.setState({isMusician: response.isMusician});
      this.setState({username: response.username});
      this.setState({email: response.email});
      this.setState({name: response.name});
      this.setState({surname: response.surname});
      this.setState({country: response.country});
      this.setState({province: response.province});
      this.setState({city: response.city});
      this.setState({idCard: response.idCard});
      this.setState({photo: response.photo});
      this.setState({video: response.video});
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
        padding: '0 1em',
      },
      buttonStyle: {
        marginTop: '16px',
      },
      registerLink: {
        textDecoration: 'none',
      }
    };

    var musicianBlock = this.state.isMusician
                      ? (
                          <div style={styles.musicianData}>
                            <p><b>Name: </b>{this.state.name}</p>
                            <p><b>Surname: </b>{this.state.surname}</p>
                            <p><b>Country: </b>{this.state.country}</p>
                            <p><b>Province: </b>{this.state.province}</p>
                            <p><b>City: </b>{this.state.city}</p>
                            <p><b>ID Card: </b>{this.state.idCard}</p>
                            <p><b>Photo: </b>{this.state.photo}</p>
                            <p><b>Video: </b>{this.state.video}</p>
                          </div>
                        )
                      : (
                          <Link to="/forms/musician" style={styles.registerLink}>
                            <Button style={styles.buttonStyle} color="primary">I am musician</Button>
                          </Link>
                        );

    return (
      <Page>
        <Navigation />

        <Card style={styles.cardStyle}>
          <h1 style={styles.username}>{this.state.username}</h1>
          <p style={styles.email}>{this.state.email}</p>
          {musicianBlock}
        </Card>
      </Page>
    );
  }
}

export default Profile;
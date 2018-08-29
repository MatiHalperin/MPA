import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Navigation from '../Navigation';
import Page from '../Page';
import Server from '../Server';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      isMusician: '',
      name: '',
      sirname: '',
      video: '',
      city: ''
    };

    this.handleChange = this.handleChange.bind(this);

    this.path = "/api/Musicos/" + sessionStorage.getItem("userId") + "?access_token=" + sessionStorage.getItem("accessToken");

    Server.getJson(this.path)
    .then(response => {
      console.log(response);
      this.setState({username: response.username});
      this.setState({email: response.email});
      this.setState({isMusician: response.esmusico});
      this.setState({name: response.nombre});
      this.setState({sirname: response.apellido});
      this.setState({video: response.video});
      this.setState({city: response.ciudad});
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
      username: {
        textAlign: 'center',
        marginBottom: 0,
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
                            <p><b>Nombre: </b>{this.state.name}</p>
                            <p><b>Apellido: </b>{this.state.sirname}</p>
                            <p><b>Video: </b>{this.state.video}</p>
                            <p><b>Ciudad: </b>{this.state.city}</p>
                          </div>
                        )
                      : (
                          <Link to="/forms/Musician" style={styles.registerLink}>
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

import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

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
    .then(() => {
      this.setState({ reported: true });
    });

    event.preventDefault();
  }

  render() {
    const styles = {
      cardStyle: {
        width: 'fit-content',
        padding: '16px 24px',
        margin: '16px auto 0',
        borderRadius: '8px',
        textAlign: 'center',
      },
      musicianData: {
        width: 'fit-content',
        margin: '16px auto 0',
        padding: '16px 24px',
        border: '1px solid black',
        borderRadius: '8px',
        textAlign: 'initial',
      },
      buttonStyle: {
        marginTop: '16px',
      }
    };

    let musicianBlock, reportButton;
    
    if (this.state.isMusician) {
      musicianBlock = (
        <div style={styles.musicianData}>
          <Typography variant="body1">
            <b>Nombre: </b>{this.state.name}
            <br />
            <b>Apellido: </b>{this.state.surname}
            <br />
            <b>DNI: </b>{this.state.idCard}
            <br />
            <b>País: </b>{this.state.country}
            <br />
            <b>Provincia: </b>{this.state.province}
            <br />
            <b>Ciudad: </b>{this.state.city}
            <br />
            <b>Instrumento: </b>{this.state.instrument}
            <br />
            <b>Estilo: </b>{this.state.style}
            <br />
            <b>Experiencia: </b>{this.state.experience}
            <br />
            <b>Formación: </b>{this.state.formation}
            <br />
            <b>Banda: </b>{this.state.band}
          </Typography>
        </div>
      )
    }

    if (this.state.reported)
      reportButton = (
        <Button disabled style={styles.buttonStyle} type="submit" color="primary">Reportado</Button>
      )
    else if (SessionHandler.isAdmin() && this.state.userId !== sessionStorage.getItem("userId"))
      reportButton = (
        <Button style={styles.buttonStyle} onClick={this.handleReportClick} type="submit" color="primary">Reportar</Button>
      );

    return (
      <Page>
        <Navigation />

        <Card style={styles.cardStyle}>
          <Typography variant="h4">{this.state.username}</Typography>
          <Typography variant="h6">{this.state.email}</Typography>
          {musicianBlock}
          {reportButton}
        </Card>
      </Page>
    );
  }
}

export default Profile;
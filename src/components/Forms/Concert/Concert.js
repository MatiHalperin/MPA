import React, { Component } from 'react';

import Navigation from '../../Navigation';
import Page from '../../Page';
import Server from '../../Server';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

class ConcertForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      latitude: '',
      longitude: '',
      description: '',
      institucionId: ''
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
    Server.postJson("/api/Conciertos", {
      Fecha: this.state.date,
      Ubicacion: { lat: this.state.latitude, lng: this.state.longitude },
      Descripcion: this.state.description,
      Confirmado: true,
      institucionId: this.state.institucionId
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
      <Page>
        <Navigation />

        <Card style={styles.cardStyle}>
          <form onSubmit={this.handleSubmit}>
            <TextField style={styles.firstTextFieldStyle} label="Date" type="text" value={this.state.date} onChange={this.handleChange('date')} />
            <TextField style={styles.textFieldStyle} label="Latitude" type="text" value={this.state.latitude} onChange={this.handleChange('latitude')} />
            <TextField style={styles.textFieldStyle} label="Longitude" type="text" value={this.state.longitude} onChange={this.handleChange('longitude')} />
            <TextField style={styles.textFieldStyle} label="Description" type="text" value={this.state.description} onChange={this.handleChange('description')} />
            <TextField style={styles.textFieldStyle} label="institucionId" type="text" value={this.state.institucionId} onChange={this.handleChange('institucionId')} />
            <Button style={styles.buttonStyle} type="submit" color="primary">Create</Button>
          </form>
        </Card>
      </Page>
    );
  }
}

export default ConcertForm;
